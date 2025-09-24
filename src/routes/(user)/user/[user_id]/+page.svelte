<script lang="ts">
	import type { PageData } from './$types';
	import {
		userStore,
		subscriptionStore,
		courseProgressStore,
		paymentMethodStore,
		transactionStore
	} from '$lib/stores/user';
	import type {
		UserProfile,
		Subscription,
		CourseProgress,
		PaymentMethod,
		Transaction
	} from '$lib/stores/user';

	let { data }: { data: PageData } = $props();

	let activeSection = $state('profile');
	let userProfile = $state(data.userProfile);
	let subscriptions = $state(data.subscriptions);
	let courseProgress = $state(data.courseProgress);
	let paymentMethods = $state(data.paymentMethods);
	let transactions = $state(data.transactions);

	function updateProfile() {
		if (userProfile) {
			userStore.updateProfile(userProfile);
			alert('프로필이 성공적으로 업데이트되었습니다.');
		}
	}

	function cancelSubscription(subscriptionId: string) {
		if (confirm('구독을 취소하시겠습니까?')) {
			subscriptions = subscriptions.map((sub) => {
				if (sub.id === subscriptionId) {
					return { ...sub, status: 'cancelled' as const, autoRenewal: false };
				}
				return sub;
			}) as typeof subscriptions;
		}
	}

	function toggleAutoRenewal(subscriptionId: string) {
		subscriptions = subscriptions.map((sub) =>
			sub.id === subscriptionId ? { ...sub, autoRenewal: !sub.autoRenewal } : sub
		);
	}

	function removePaymentMethod(methodId: string) {
		if (confirm('결제 방법을 삭제하시겠습니까?')) {
			paymentMethods = paymentMethods.filter((method) => method.id !== methodId);
		}
	}

	function setDefaultPaymentMethod(methodId: string) {
		paymentMethods = paymentMethods.map((method) => ({
			...method,
			isDefault: method.id === methodId
		}));
	}

	function formatPrice(price: number) {
		return new Intl.NumberFormat('ko-KR').format(price);
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('ko-KR');
	}
</script>

{#if userProfile}
	<main class="mypage">
		<div class="container">
			<header class="mypage-header">
				<div class="profile-summary">
					<img src={userProfile.avatar} alt="" class="profile-avatar" />
					<div class="profile-info">
						<h1><strong>{userProfile.name}</strong></h1>
						<p>{userProfile.email}</p>
						<span class="join-date">가입일: {formatDate(userProfile.joinedDate)}</span>
					</div>
				</div>
			</header>

			<nav class="section-nav">
				<button
					class="nav-btn"
					class:active={activeSection === 'profile'}
					onclick={() => (activeSection = 'profile')}
				>
					프로필 관리
				</button>
				<button
					class="nav-btn"
					class:active={activeSection === 'subscriptions'}
					onclick={() => (activeSection = 'subscriptions')}
				>
					구독 관리
				</button>
				<button
					class="nav-btn"
					class:active={activeSection === 'transactions'}
					onclick={() => (activeSection = 'transactions')}
				>
					결제 관리
				</button>
			</nav>

			{#if activeSection === 'profile'}
				<!-- Profile Section -->
				<section class="content-section">
					<div class="section-header">
						<h2><strong>프로필 관리</strong></h2>
					</div>

					<div class="profile-form">
						<div class="form-group">
							<label for="name">이름</label>
							<input type="text" id="name" bind:value={userProfile.name} />
						</div>

						<div class="form-group">
							<label for="email">이메일</label>
							<input type="email" id="email" bind:value={userProfile.email} />
						</div>

						<div class="form-group">
							<label for="phone">전화번호</label>
							<input type="tel" id="phone" bind:value={userProfile.phone} />
						</div>

						<div class="form-group">
							<label for="birthDate">생년월일</label>
							<input type="date" id="birthDate" bind:value={userProfile.birthDate} />
						</div>

						<div class="form-group">
							<label for="interests">관심 분야</label>
							<div class="interests-tags">
								{#each userProfile.interests as interest, index}
									<span class="interest-tag">
										{interest}
										<button
											type="button"
											onclick={() => {
												if (userProfile) {
													userProfile.interests = userProfile.interests.filter(
														(_, i) => i !== index
													);
												}
											}}>×</button
										>
									</span>
								{/each}
								<input
									type="text"
									placeholder="관심 분야 추가..."
									onkeydown={(e) => {
										const target = e.target as HTMLInputElement;
										if (e.key === 'Enter' && target?.value.trim() && userProfile) {
											userProfile.interests = [...userProfile.interests, target.value.trim()];
											target.value = '';
										}
									}}
								/>
							</div>
						</div>

						<div class="form-actions">
							<button class="save-btn" onclick={updateProfile}>변경사항 저장</button>
							<button class="cancel-btn" type="button">취소</button>
						</div>
					</div>
				</section>
			{:else if activeSection === 'subscriptions'}
				<!-- Subscriptions Section -->
				<section class="content-section">
					<div class="section-header">
						<h2><strong>구독 관리</strong></h2>
					</div>

					<div class="subscriptions-grid">
						<div class="active-subscriptions">
							<h3><strong>활성 구독</strong></h3>
							<div class="subscription-list">
								{#each subscriptions.filter((sub) => sub.status === 'active') as subscription}
									<div class="subscription-card">
										<div class="subscription-info">
											<img src={subscription.creatorAvatar} alt="" class="creator-avatar" />
											<div class="subscription-details">
												<h4>{subscription.creatorName}</h4>
												<div class="plan-info">
													<span class="plan-name">{subscription.planName}</span>
													<span class="plan-price">월 {formatPrice(subscription.price)}원</span>
												</div>
												<div class="billing-info">
													<span>다음 결제일: {formatDate(subscription.nextBillingDate)}</span>
													<span class="auto-renewal" class:active={subscription.autoRenewal}>
														자동 갱신: {subscription.autoRenewal ? '활성' : '비활성'}
													</span>
												</div>
											</div>
										</div>
										<div class="subscription-actions">
											<button class="toggle-btn" onclick={() => toggleAutoRenewal(subscription.id)}>
												{subscription.autoRenewal ? '자동갱신 끄기' : '자동갱신 켜기'}
											</button>
											<button
												class="cancel-btn"
												onclick={() => cancelSubscription(subscription.id)}
											>
												구독 취소
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<div class="course-progress">
							<h3><strong>수강 진행률</strong></h3>
							<div class="course-list">
								{#each courseProgress as course}
									<div class="course-card">
										<img src={course.thumbnail} alt="" class="course-thumbnail" />
										<div class="course-info">
											<h4>{course.courseTitle}</h4>
											<span class="creator-name">{course.creatorName}</span>
											<div class="progress-info">
												<div class="progress-bar">
													<div class="progress-fill" style="width: {course.progress}%"></div>
												</div>
												<span class="progress-text">{course.progress}% 완료</span>
											</div>
											<div class="course-stats">
												<span>{course.completedChapters}/{course.totalChapters} 챕터</span>
												<span>최근 시청: {formatDate(course.lastWatched)}</span>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>

					{#if subscriptions.filter((sub) => sub.status !== 'active').length > 0}
						<div class="expired-subscriptions">
							<h3><strong>만료된 구독</strong></h3>
							<div class="subscription-list">
								{#each subscriptions.filter((sub) => sub.status !== 'active') as subscription}
									<div class="subscription-card expired">
										<div class="subscription-info">
											<img src={subscription.creatorAvatar} alt="" class="creator-avatar" />
											<div class="subscription-details">
												<h4>{subscription.creatorName}</h4>
												<div class="plan-info">
													<span class="plan-name">{subscription.planName}</span>
													<span class="status {subscription.status}"
														>{subscription.status === 'expired' ? '만료됨' : '취소됨'}</span
													>
												</div>
												<div class="billing-info">
													<span>구독일: {formatDate(subscription.subscriptionDate)}</span>
												</div>
											</div>
										</div>
										<div class="subscription-actions">
											<button class="renew-btn">재구독</button>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</section>
			{:else if activeSection === 'transactions'}
				<!-- Transactions Section -->
				<section class="content-section">
					<div class="section-header">
						<h2><strong>결제 관리</strong></h2>
					</div>

					<div class="payment-grid">
						<div class="payment-methods">
							<h3><strong>결제 방법</strong></h3>
							<div class="payment-method-list">
								{#each paymentMethods as method}
									<div class="payment-method-card" class:default={method.isDefault}>
										<div class="method-info">
											<div class="method-icon">
												{#if method.type === 'credit_card' || method.type === 'debit_card'}
													💳
												{:else}
													🏦
												{/if}
											</div>
											<div class="method-details">
												{#if method.cardBrand}
													<h4>{method.cardBrand}</h4>
													<span>**** **** **** {method.lastFour}</span>
													<span>만료: {method.expiryDate}</span>
												{:else}
													<h4>{method.bankName}</h4>
													<span>계좌: ****** {method.lastFour}</span>
												{/if}
												{#if method.isDefault}
													<span class="default-badge">기본 결제 방법</span>
												{/if}
											</div>
										</div>
										<div class="method-actions">
											{#if !method.isDefault}
												<button
													class="set-default-btn"
													onclick={() => setDefaultPaymentMethod(method.id)}
												>
													기본으로 설정
												</button>
											{/if}
											<button class="remove-btn" onclick={() => removePaymentMethod(method.id)}>
												삭제
											</button>
										</div>
									</div>
								{/each}
								<button class="add-payment-btn">+ 새 결제 방법 추가</button>
							</div>
						</div>

						<div class="transaction-history">
							<h3><strong>결제 내역</strong></h3>
							<div class="transaction-list">
								{#each transactions as transaction}
									<div class="transaction-item">
										<div class="transaction-info">
											<div class="transaction-icon">
												{#if transaction.type === 'subscription'}
													📋
												{:else if transaction.type === 'course'}
													📚
												{:else}
													💰
												{/if}
											</div>
											<div class="transaction-details">
												<h4>{transaction.description}</h4>
												{#if transaction.creatorName}
													<span class="creator-name">{transaction.creatorName}</span>
												{/if}
												<span class="transaction-date">{formatDate(transaction.date)}</span>
											</div>
										</div>
										<div class="transaction-amount">
											<span class="amount" class:negative={transaction.amount < 0}>
												{transaction.amount >= 0 ? '+' : ''}{formatPrice(transaction.amount)}원
											</span>
											<span class="status {transaction.status}">
												{transaction.status === 'completed'
													? '완료'
													: transaction.status === 'pending'
														? '대기'
														: '실패'}
											</span>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</section>
			{/if}
		</div>
	</main>
{:else}
	<div class="loading">
		<p>사용자 정보를 불러오는 중...</p>
	</div>
{/if}

<style scoped>
	.mypage {
		width: 100%;
		display: flex;
		justify-content: center;
		min-height: 100vh;
		background: var(--white-1);
	}

	.container {
		max-width: var(--max-desk);
		width: 100%;
		padding: var(--space-32) 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
	}

	.mypage-header {
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-24);
	}

	.profile-summary {
		display: flex;
		align-items: center;
		gap: var(--space-16);
	}

	.profile-avatar {
		width: 5rem;
		height: 5rem;
		border-radius: var(--border-rc);
		object-fit: cover;
	}

	.profile-info h1 {
		font-size: var(--font-xlarge);
		margin-bottom: var(--space-4);
	}

	.profile-info p {
		color: var(--black-3);
		margin-bottom: var(--space-4);
	}

	.join-date {
		font-size: var(--font-small);
		color: var(--black-3);
	}

	.section-nav {
		display: flex;
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r8);
		overflow: hidden;
	}

	.nav-btn {
		flex: 1;
		padding: var(--space-16);
		background: none;
		border: none;
		cursor: pointer;
		font-weight: var(--font-semi);
		transition: all 0.2s;
		border-right: var(--border);
	}

	.nav-btn:last-child {
		border-right: none;
	}

	.nav-btn:hover {
		background: var(--white-1);
	}

	.nav-btn.active {
		background: var(--primary);
		color: var(--white-0);
	}

	.content-section {
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-24);
	}

	.section-header {
		margin-bottom: var(--space-24);
		padding-bottom: var(--space-16);
		border-bottom: var(--border);
	}

	.section-header h2 {
		font-size: var(--font-large);
	}

	/* Profile Section */
	.profile-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.form-group label {
		font-weight: var(--font-semi);
		color: var(--black-2);
	}

	.form-group input {
		padding: var(--space-8);
		border: var(--border);
		border-radius: var(--border-r4);
		font-family: var(--font-sans);
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--primary);
	}

	.interests-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-8);
		align-items: center;
	}

	.interest-tag {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		background: var(--primary);
		color: var(--white-0);
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
		font-size: var(--font-small);
	}

	.interest-tag button {
		background: none;
		border: none;
		color: var(--white-0);
		cursor: pointer;
		font-size: var(--font-base);
	}

	.interests-tags input {
		flex: 1;
		min-width: 200px;
	}

	.form-actions {
		display: flex;
		gap: var(--space-8);
		margin-top: var(--space-16);
	}

	.save-btn {
		background: var(--primary);
		color: var(--white-0);
		border: none;
		padding: var(--space-8) var(--space-24);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-weight: var(--font-semi);
	}

	.cancel-btn {
		background: var(--white-0);
		color: var(--black-2);
		border: var(--border);
		padding: var(--space-8) var(--space-24);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-weight: var(--font-semi);
	}

	/* Subscriptions Section */
	.subscriptions-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-32);
		margin-bottom: var(--space-32);
	}

	.subscription-list,
	.course-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
	}

	.subscription-card {
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-16);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.subscription-card.expired {
		opacity: 0.7;
		background: var(--white-1);
	}

	.subscription-info {
		display: flex;
		align-items: center;
		gap: var(--space-12);
	}

	.creator-avatar {
		width: 3rem;
		height: 3rem;
		border-radius: var(--border-rc);
		object-fit: cover;
	}

	.subscription-details h4 {
		margin-bottom: var(--space-4);
	}

	.plan-info {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		margin-bottom: var(--space-4);
	}

	.plan-name {
		font-weight: var(--font-semi);
	}

	.plan-price {
		color: var(--primary);
		font-weight: var(--font-bold);
	}

	.billing-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		font-size: var(--font-small);
		color: var(--black-3);
	}

	.auto-renewal.active {
		color: var(--success);
	}

	.subscription-actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.toggle-btn,
	.renew-btn {
		background: var(--secondary);
		color: var(--white-0);
		border: none;
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-size: var(--font-small);
	}

	.course-card {
		display: flex;
		gap: var(--space-12);
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-12);
	}

	.course-thumbnail {
		width: 4rem;
		height: 3rem;
		border-radius: var(--border-r4);
		object-fit: cover;
	}

	.course-info {
		flex: 1;
	}

	.course-info h4 {
		margin-bottom: var(--space-4);
		font-size: var(--font-base);
	}

	.creator-name {
		font-size: var(--font-small);
		color: var(--black-3);
		margin-bottom: var(--space-8);
	}

	.progress-info {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		margin-bottom: var(--space-8);
	}

	.progress-bar {
		flex: 1;
		height: 0.5rem;
		background: var(--white-2);
		border-radius: var(--border-r4);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--primary);
		transition: width 0.3s ease;
	}

	.progress-text {
		font-size: var(--font-small);
		font-weight: var(--font-semi);
		color: var(--primary);
	}

	.course-stats {
		display: flex;
		gap: var(--space-16);
		font-size: var(--font-small);
		color: var(--black-3);
	}

	/* Transactions Section */
	.payment-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-32);
	}

	.payment-method-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
	}

	.payment-method-card {
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-16);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.payment-method-card.default {
		border-color: var(--primary);
		background: linear-gradient(90deg, var(--primary) 0%, transparent 100%);
		background-size: 4px 100%;
		background-repeat: no-repeat;
	}

	.method-info {
		display: flex;
		align-items: center;
		gap: var(--space-12);
	}

	.method-icon {
		font-size: var(--font-xlarge);
	}

	.method-details h4 {
		margin-bottom: var(--space-4);
	}

	.method-details span {
		display: block;
		font-size: var(--font-small);
		color: var(--black-3);
		margin-bottom: var(--space-4);
	}

	.default-badge {
		color: var(--primary) !important;
		font-weight: var(--font-semi) !important;
	}

	.method-actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.set-default-btn {
		background: var(--primary);
		color: var(--white-0);
		border: none;
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-size: var(--font-small);
	}

	.remove-btn {
		background: var(--danger);
		color: var(--white-0);
		border: none;
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-size: var(--font-small);
	}

	.add-payment-btn {
		border: 2px dashed var(--white-3);
		background: var(--white-1);
		padding: var(--space-16);
		border-radius: var(--border-r8);
		cursor: pointer;
		color: var(--black-3);
		font-weight: var(--font-semi);
		transition: all 0.2s;
	}

	.add-payment-btn:hover {
		border-color: var(--primary);
		color: var(--primary);
	}

	.transaction-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	.transaction-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-12);
		border: var(--border);
		border-radius: var(--border-r4);
	}

	.transaction-info {
		display: flex;
		align-items: center;
		gap: var(--space-12);
	}

	.transaction-icon {
		font-size: var(--font-large);
	}

	.transaction-details h4 {
		margin-bottom: var(--space-4);
		font-size: var(--font-base);
	}

	.transaction-details span {
		display: block;
		font-size: var(--font-small);
		color: var(--black-3);
		margin-bottom: var(--space-4);
	}

	.transaction-amount {
		text-align: right;
	}

	.amount {
		display: block;
		font-weight: var(--font-bold);
		margin-bottom: var(--space-4);
	}

	.amount.negative {
		color: var(--success);
	}

	.status {
		font-size: var(--font-small);
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
	}

	.status.completed {
		background: var(--success);
		color: var(--white-0);
	}

	.status.pending {
		background: var(--warning);
		color: var(--black-1);
	}

	.status.failed {
		background: var(--danger);
		color: var(--white-0);
	}

	.status.expired,
	.status.cancelled {
		background: var(--black-3);
		color: var(--white-0);
	}

	.expired-subscriptions {
		margin-top: var(--space-32);
		padding-top: var(--space-24);
		border-top: var(--border);
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
		color: var(--black-3);
	}
</style>
