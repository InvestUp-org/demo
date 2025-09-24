<script lang="ts">
	import { page } from '$app/stores';
	import { contentStore } from '$lib/stores/content';
	import type { ContentItem } from '$lib/stores/content';

	const creator_id = $page.params.creator_id || '';
	let activeTab = 'all';
	let contentItems: ContentItem[] = [];

	$: {
		switch (activeTab) {
			case 'lectures':
				contentItems = contentStore.filterByType('lecture', creator_id);
				break;
			case 'posts':
				contentItems = contentStore.filterByType('post', creator_id);
				break;
			case 'drafts':
				contentItems = contentStore.filterByStatus('draft', creator_id);
				break;
			default:
				contentItems = contentStore.getByCreator(creator_id);
		}
	}

	function deleteContent(id: string) {
		if (confirm('Are you sure you want to delete this content?')) {
			contentStore.delete(id);
			// Refresh the content list
			contentItems = contentStore.getByCreator(creator_id);
		}
	}

	function editContent(id: string) {
		window.location.href = `/studio/${creator_id}/editor?id=${id}`;
	}

	function viewContent(item: ContentItem) {
		if (item.type === 'lecture') {
			window.location.href = `/creator/${creator_id}/lecture/category/${item.id}`;
		} else {
			window.location.href = `/creator/${creator_id}/post/${item.id}`;
		}
	}
</script>

<main class="studio">
	<div class="container">
		<header class="studio-header">
			<h1><strong>Studio Dashboard</strong></h1>
			<p>Manage your content and profile</p>
		</header>

		<div class="studio-grid">
			<!-- CMS Section -->
			<section class="cms-section">
				<div class="section-header">
					<h2><strong>Content Management</strong></h2>
					<a href="/studio/{creator_id}/editor" class="create-btn"> + New Content </a>
				</div>

				<div class="content-tabs">
					<button
						class="tab"
						class:active={activeTab === 'all'}
						on:click={() => (activeTab = 'all')}>All Content</button
					>
					<button
						class="tab"
						class:active={activeTab === 'lectures'}
						on:click={() => (activeTab = 'lectures')}>Lectures</button
					>
					<button
						class="tab"
						class:active={activeTab === 'posts'}
						on:click={() => (activeTab = 'posts')}>Posts</button
					>
					<button
						class="tab"
						class:active={activeTab === 'drafts'}
						on:click={() => (activeTab = 'drafts')}>Drafts</button
					>
				</div>

				<div class="content-list">
					{#each contentItems as item}
						<div class="content-item">
							<div class="content-info">
								<h3>{item.title}</h3>
								<div class="content-meta">
									<span
										class="type"
										class:lecture={item.type === 'lecture'}
										class:post={item.type === 'post'}
									>
										{item.type === 'lecture' ? 'Lecture' : 'Post'}
									</span>
									<span
										class="status"
										class:published={item.status === 'published'}
										class:draft={item.status === 'draft'}
									>
										{item.status === 'published' ? 'Published' : 'Draft'}
									</span>
									<span class="date">{item.updatedAt}</span>
								</div>
							</div>
							<div class="content-actions">
								<button class="action-btn edit" on:click={() => editContent(item.id)}>Edit</button>
								<button class="action-btn view" on:click={() => viewContent(item)}>View</button>
								<button class="action-btn delete" on:click={() => deleteContent(item.id)}
									>Delete</button
								>
							</div>
						</div>
					{:else}
						<div class="no-content">
							<p>
								No content found. <a href="/studio/{creator_id}/editor">Create your first content</a
								>
							</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Profile Section -->
			<section class="profile-section">
				<div class="section-header">
					<h2><strong>Profile Management</strong></h2>
				</div>

				<div class="profile-form">
					<div class="form-group">
						<label for="creator-name">Creator Name</label>
						<input type="text" id="creator-name" value="김선생의 경제 교실" />
					</div>

					<div class="form-group">
						<label for="creator-description">Description</label>
						<textarea id="creator-description" rows="4"
							>경알못도 쉽게 따라올 수 있는 친절한 경제 강의! 내 지갑을 두둑하게 만드는 경제 상식을
							재미있게 배워보세요.</textarea
						>
					</div>

					<div class="form-group">
						<label for="profile-image">Profile Image</label>
						<div class="image-upload">
							<div class="current-image">
								<div class="image-placeholder">Current Image</div>
							</div>
							<button class="upload-btn">Upload New Image</button>
						</div>
					</div>

					<div class="form-group">
						<label for="category">Category</label>
						<select id="category">
							<option>Economics</option>
							<option>Technology</option>
							<option>Business</option>
							<option>Education</option>
						</select>
					</div>

					<div class="form-actions">
						<button class="save-btn">Save Changes</button>
						<button class="cancel-btn">Cancel</button>
					</div>
				</div>

				<div class="analytics-preview">
					<h3><strong>Quick Analytics</strong></h3>
					<div class="stats-grid">
						<div class="stat">
							<span class="stat-number">1,234</span>
							<span class="stat-label">Total Views</span>
						</div>
						<div class="stat">
							<span class="stat-number">56</span>
							<span class="stat-label">Subscribers</span>
						</div>
						<div class="stat">
							<span class="stat-number">12</span>
							<span class="stat-label">Contents</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</main>

<style scoped>
	.studio {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.container {
		max-width: var(--max-desk);
		width: 100%;
		padding: var(--space-32) 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
	}

	.studio-header {
		text-align: center;
		margin-bottom: var(--space-24);

		h1 {
			font-size: var(--font-xxlarge);
			margin-bottom: var(--space-8);
		}

		p {
			color: var(--black-3);
		}
	}

	.studio-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: var(--space-32);
	}

	.cms-section,
	.profile-section {
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-24);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-24);

		h2 {
			font-size: var(--font-large);
		}
	}

	.create-btn {
		background: var(--primary);
		color: var(--white-0);
		padding: var(--space-8) var(--space-16);
		border-radius: var(--border-r4);
		text-decoration: none;
		font-weight: var(--font-semi);
		transition: background-color 0.2s;
	}

	.create-btn:hover {
		background: var(--primary-dark);
	}

	.content-tabs {
		display: flex;
		gap: var(--space-8);
		margin-bottom: var(--space-24);
		border-bottom: var(--border);
	}

	.tab {
		padding: var(--space-8) var(--space-16);
		background: none;
		border: none;
		cursor: pointer;
		font-weight: var(--font-medi);
		color: var(--black-3);
		border-bottom: 2px solid transparent;
	}

	.tab.active {
		color: var(--primary);
		border-bottom-color: var(--primary);
	}

	.content-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
	}

	.content-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-16);
		border: var(--border);
		border-radius: var(--border-r4);
	}

	.content-info h3 {
		margin-bottom: var(--space-8);
		font-size: var(--font-base);
	}

	.content-meta {
		display: flex;
		gap: var(--space-8);
		align-items: center;
	}

	.type {
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
		font-size: var(--font-small);
		font-weight: var(--font-semi);
	}

	.type.lecture {
		background: var(--secondary);
		color: var(--white-0);
	}

	.type.post {
		background: var(--primary);
		color: var(--white-0);
	}

	.status {
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
		font-size: var(--font-small);
		font-weight: var(--font-semi);
	}

	.status.published {
		background: var(--success);
		color: var(--white-0);
	}

	.status.draft {
		background: var(--warning);
		color: var(--black-1);
	}

	.date {
		font-size: var(--font-small);
		color: var(--black-3);
	}

	.content-actions {
		display: flex;
		gap: var(--space-8);
	}

	.action-btn {
		padding: var(--space-4) var(--space-8);
		border: var(--border);
		background: var(--white-0);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-size: var(--font-small);
		transition: all 0.2s;
	}

	.action-btn.edit {
		color: var(--primary);
		border-color: var(--primary);
	}

	.action-btn.edit:hover {
		background: var(--primary);
		color: var(--white-0);
	}

	.action-btn.view {
		color: var(--secondary);
		border-color: var(--secondary);
	}

	.action-btn.view:hover {
		background: var(--secondary);
		color: var(--white-0);
	}

	.action-btn.delete {
		color: var(--danger);
		border-color: var(--danger);
	}

	.action-btn.delete:hover {
		background: var(--danger);
		color: var(--white-0);
	}

	.profile-form {
		margin-bottom: var(--space-32);
	}

	.form-group {
		margin-bottom: var(--space-16);
	}

	.form-group label {
		display: block;
		margin-bottom: var(--space-8);
		font-weight: var(--font-semi);
		color: var(--black-2);
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		width: 100%;
		padding: var(--space-8);
		border: var(--border);
		border-radius: var(--border-r4);
		font-family: var(--font-sans);
	}

	.form-group input:focus,
	.form-group textarea:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--primary);
	}

	.image-upload {
		display: flex;
		align-items: center;
		gap: var(--space-16);
	}

	.current-image {
		width: 4rem;
		height: 4rem;
		border-radius: var(--border-r4);
		overflow: hidden;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		background: var(--white-2);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-small);
		color: var(--black-3);
	}

	.upload-btn {
		padding: var(--space-8) var(--space-16);
		border: var(--border);
		background: var(--white-0);
		border-radius: var(--border-r4);
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.upload-btn:hover {
		background: var(--white-1);
	}

	.form-actions {
		display: flex;
		gap: var(--space-8);
	}

	.save-btn {
		padding: var(--space-8) var(--space-24);
		background: var(--primary);
		color: var(--white-0);
		border: none;
		border-radius: var(--border-r4);
		cursor: pointer;
		font-weight: var(--font-semi);
		transition: background-color 0.2s;
	}

	.save-btn:hover {
		background: var(--primary-dark);
	}

	.cancel-btn {
		padding: var(--space-8) var(--space-24);
		background: var(--white-0);
		color: var(--black-2);
		border: var(--border);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-weight: var(--font-semi);
		transition: background-color 0.2s;
	}

	.cancel-btn:hover {
		background: var(--white-1);
	}

	.analytics-preview h3 {
		margin-bottom: var(--space-16);
		font-size: var(--font-base);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--space-16);
	}

	.stat {
		text-align: center;
		padding: var(--space-16);
		border: var(--border);
		border-radius: var(--border-r4);
	}

	.stat-number {
		display: block;
		font-size: var(--font-large);
		font-weight: var(--font-bold);
		color: var(--primary);
		margin-bottom: var(--space-4);
	}

	.stat-label {
		font-size: var(--font-small);
		color: var(--black-3);
	}

	.no-content {
		text-align: center;
		padding: var(--space-32);
		color: var(--black-3);
	}

	.no-content a {
		color: var(--primary);
		text-decoration: underline;
	}

	.no-content a:hover {
		color: var(--primary-dark);
	}
</style>
