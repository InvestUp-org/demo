<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import CardHorizontal from '$lib/components/CardHorizontal.svelte';
	import CardVertical from '$lib/components/CardVertical.svelte';
	import ex_table from '$lib/assets/example/ex_table.png';
	import ex1 from '$lib/assets/example/ex1.jpg';
	import ex2 from '$lib/assets/example/ex2.jpg';
	import ex3 from '$lib/assets/example/ex3.jpg';
	import ex4 from '$lib/assets/example/ex4.jpg';
	import ex5 from '$lib/assets/example/ex5.jpg';
	import ex6 from '$lib/assets/example/ex6.jpg';
	import ex7 from '$lib/assets/example/ex7.jpg';
</script>

<Header />

<main class="content">
	<div class="container">
		<section class="content-main">
			<div class="content-title">
				<h1 class="title">[공시분석] A기업 2025년 3분기 사업보고서 핵심 분석</h1>
				<div class="meta">2025.09.10 | 평균 30분 소요 | 조회수 100회</div>
			</div>
			<div class="content-section">
				<div class="text">
					<h2><strong>1. 요약: 3분기 실적, 우려와 기대가 교차하는 시점</strong></h2>
					<p>
						A기업이 2025년 3분기 사업보고서를 공시했습니다. 매출은 전년 동기 대비 15% 증가하며
						성장세를 이어갔지만, 영업이익은 5% 감소해 수익성이 악화된 것으로 나타났습니다. 이는 주력
						사업인 'B' 사업부의 신규 투자 비용 증가와 원자재 가격 상승 때문으로 보입니다.
					</p>
				</div>
				<div class="image">
					<img src={ex_table} alt="" />
				</div>
				<div class="text">
					<h2><strong>2. 세부 분석: 숫자 뒤에 숨겨진 이야기</strong></h2>
					<h3><strong>① 매출 증가의 원동력: C 신규 사업부의 가파른 성장</strong></h3>
					<p>
						공시 자료에 따르면, 전체 매출 증가는 신규로 시작한 'C' 사업부의 매출이 3분기 만에 200억
						원을 돌파하며 가파른 성장세를 보였기 때문입니다. 이는 시장의 예상치를 뛰어넘는 성과로,
						A기업의 새로운 성장 동력이 될 가능성을 보여줍니다.
					</p>
					<ul>
						<li>
							긍정적 요인: 신규 사업의 성공적 시장 안착은 향후 기업 가치 상승의 중요한 신호로 해석될
							수 있습니다.
						</li>
						<li>
							투자자 체크리스트: C 사업부의 추가 투자 계획 및 목표치는? C 사업부의 매출이 전체
							매출에서 차지하는 비중은? (현재는 약 16.7%)
						</li>
					</ul>
					<h3><strong>② 영업이익 감소의 원인: 고정 비용과 원자재 가격 상승</strong></h3>
					<p>
						반면, 영업이익 감소는 주로 두 가지 원인 때문입니다. 첫째, 주력 사업인 'B' 사업의 생산
						시설 증설을 위한 신규 설비 투자 비용이 3분기에 집중적으로 발생했습니다. 둘째, 'D' 원자재
						가격이 급등하면서 원가 부담이 커진 것도 수익성 악화에 영향을 주었습니다.
					</p>
					<ul>
						<li>
							부정적 요인: 비용 증가가 일시적인지, 구조적인 문제인지 파악하는 것이 중요합니다.
						</li>
						<li>
							투자자 체크리스트: 신규 설비 투자 비용은 언제까지 발생할 예정인가? 원자재 가격 변동에
							대비한 기업의 리스크 관리 전략은? 4분기에는 비용 부담이 완화될 것인가?
						</li>
					</ul>
				</div>
				<div class="text">
					<h2><strong>1. 요약: 3분기 실적, 우려와 기대가 교차하는 시점</strong></h2>
					<p>
						A기업이 2025년 3분기 사업보고서를 공시했습니다. 매출은 전년 동기 대비 15% 증가하며
						성장세를 이어갔지만, 영업이익은 5% 감소해 수익성이 악화된 것으로 나타났습니다. 이는 주력
						사업인 'B' 사업부의 신규 투자 비용 증가와 원자재 가격 상승 때문으로 보입니다.
					</p>
				</div>
				<div class="text">
					<h2><strong>1. 요약: 3분기 실적, 우려와 기대가 교차하는 시점</strong></h2>
					<p>
						A기업이 2025년 3분기 사업보고서를 공시했습니다. 매출은 전년 동기 대비 15% 증가하며
						성장세를 이어갔지만, 영업이익은 5% 감소해 수익성이 악화된 것으로 나타났습니다. 이는 주력
						사업인 'B' 사업부의 신규 투자 비용 증가와 원자재 가격 상승 때문으로 보입니다.
					</p>
				</div>
			</div>
			<div class="content-order">
				<div class="next">
					<span>이전 콘텐츠</span>
					<a href="/">
						<CardHorizontal
							thumbnail={ex2}
							title="30분만에 끝내는 경제 뉴스 읽기"
							meta="2025.09.10"
						/>
					</a>
				</div>
				<div class="before">
					<span>다음 콘텐츠</span>
					<a href="/">
						<CardHorizontal thumbnail={ex3} title="직장인을 위한 생활 경제학" meta="2025.09.10" />
					</a>
				</div>
			</div>
		</section>
		<aside class="content-more">
			<div class="more">
				<span>콘텐츠 모아보기</span>
				<div class="cards-vert">
					<a href="/"
						><CardVertical
							thumbnail={ex4}
							title="내 집 마련을 위한 부동산 경제학"
							meta="2025.09.10"
						/></a
					>
					<a href="/"
						><CardVertical thumbnail={ex5} title="그림으로 배우는 거시 경제" meta="2025.09.10" /></a
					>
					<a href="/"
						><CardVertical
							thumbnail={ex6}
							title="워렌 버핏처럼 생각하기: 투자 철학 입문"
							meta="2025.09.10"
						/></a
					>
					<a href="/"
						><CardVertical
							thumbnail={ex7}
							title="2025년 경제 전망과 투자 전략"
							meta="2025.09.10"
						/></a
					>
				</div>
			</div>
			<div class="trending">
				<span>지금 많이보는 콘텐츠</span>
				<div class="cards-hori">
					<a href="/"
						><CardHorizontal
							thumbnail={ex1}
							title="30분만에 끝내는 경제 뉴스 읽기"
							meta="2025.09.10"
						/></a
					>
					<a href="/"
						><CardHorizontal
							thumbnail={ex2}
							title="직장인을 위한 생활 경제학"
							meta="2025.09.10"
						/></a
					>
					<a href="/"
						><CardHorizontal
							thumbnail={ex6}
							title="2025년 경제 전망과 투자 전략"
							meta="2025.09.10"
						/></a
					>
					<a href="/"><CardHorizontal thumbnail={ex7} title="행동 경제학" meta="2025.09.10" /></a>
				</div>
			</div>
		</aside>
	</div>
</main>

<style scoped>
	.container {
		display: grid;
		grid-template-columns: 5fr 1fr;
		gap: var(--space-32);
	}
	.content-more {
		display: flex;
		flex-direction: column;
		gap: var(--space-48);

		.more,
		.trending {
			display: flex;
			flex-direction: column;
			gap: var(--space-16);

			span {
				font-size: var(--font-base);
				font-weight: var(--font-bold);
			}
			.cards-hori {
				display: flex;
				flex-direction: column;
				gap: var(--space-16);
			}
			.cards-vert {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr 1fr;
				gap: var(--space-16);
			}
		}
	}
	.content-order {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		gap: var(--space-16);
		margin-top: var(--space-48);

		.next,
		.before {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: var(--space-8);

			span {
				font-size: var(--font-base);
				font-weight: var(--font-semi);
			}
		}
	}
</style>
