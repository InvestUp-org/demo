<script lang="ts">
	import HeaderAlt from '$lib/components/HeaderAlt.svelte';
	import CardHorizontal from '$lib/components/CardHorizontal.svelte';
	import CardVertical from '$lib/components/CardVertical.svelte';
	import Chatbot from '$lib/components/Chatbot.svelte';

	import ex1 from '$lib/assets/example/ex1.jpg';
	import ex2 from '$lib/assets/example/ex2.jpg';
	import ex3 from '$lib/assets/example/ex3.jpg';
	import ex4 from '$lib/assets/example/ex4.jpg';
	import ex5 from '$lib/assets/example/ex5.jpg';
	import ex6 from '$lib/assets/example/ex6.jpg';
	import ex7 from '$lib/assets/example/ex7.jpg';

	import { page } from '$app/state';
	let {
		params: { category_name, lecture_id }
	} = page;
</script>

<HeaderAlt category={category_name} />
<main class="content">
	<div class="container">
		<aside class="content-chapter">
			<ul>
				<li class="current"><a href="#a1">강의 영상</a></li>
				<li class=""><a href="#a2">고용률과 실업률</a></li>
				<li class=""><a href="#a3">소비자 물가지수(CPI)</a></li>
				<li class=""><a href="#a4">제조업 구매관리자지수(PMI)</a></li>
			</ul>
		</aside>
		<section class="content-main">
			<div class="content-title">
				<div class="category">{category_name}</div>
				<h1 class="title">전문가처럼 시장 읽기</h1>
				<div class="meta">2025.09.10 | 평균 00분 소요 | 조회수 100회</div>
			</div>
			<div class="content-section">
				<div class="video" id="a1">
					<video src="" controls>
						<track kind="captions"/>
						<track kind="chapters"/>
					</video>
				</div>
				<div class="text">
					<h2 id="a3">
						<strong>고용률과 실업률: 숫자 너머의 경제를 읽는 법</strong>
					</h2>
					<p>
						"실업률이 낮아졌다는데, 왜 주가는 떨어지지?" 이런 생각 해보셨나요? 고용 보고서는 단순히
						실업률 숫자만으로 판단해서는 안 됩니다. 진짜 중요한 정보는 그 안에 숨겨져 있으니까요.
					</p>
					<h3><strong>1. 비농업 고용자 수, 진짜 고용 시장의 힘</strong></h3>
					<p>
						실업률이 줄어도 비정규직이나 파트타임 고용만 늘었다면 질 좋은 일자리는 오히려 줄어든
						셈입니다. 이럴 때 '비농업 고용자 수'를 보면 진짜 고용 시장이 얼마나 활발한지 알 수
						있습니다. 이 숫자가 늘어날수록 기업들의 생산 활동이 활발하다는 뜻이므로, 투자 심리에도
						긍정적인 영향을 미칩니다.
					</p>
					<h3><strong>2. 고용이 주식 시장을 움직이는 이유</strong></h3>
					<p>
						고용 보고서는 연준(Fed)이 금리를 결정할 때 가장 중요하게 보는 지표 중 하나입니다. 고용이
						너무 좋으면 임금이 오르고, 이는 물가 상승(인플레이션)으로 이어질 수 있습니다. 연준은
						이를 막기 위해 금리를 올리고, 결과적으로 주식 시장에는 부정적인 영향을 주게 됩니다.
						반대로 고용이 부진하면 경기 침체 신호로 해석되어 투자 심리가 위축될 수 있죠.
					</p>
					<h3><strong>3. 나만의 고용 지표 분석 루틴 만들기</strong></h3>
					<p>
						이제 매월 첫째 주 금요일(미국 기준)에 발표되는 고용 보고서를 체크해보세요. 전체 실업률
						외에 비농업 고용자 수, 시간당 임금 상승률 같은 지표를 함께 보면 시장이 어떻게 반응할지
						예측하는 데 큰 도움이 됩니다.
					</p>
				</div>
				<div class="image">
					<img src={ex1} alt="" />
				</div>
				<div class="text">
					<h2 id="a3">
						<strong>소비자 물가지수(CPI): 내 돈의 가치를 지키는 길</strong>
					</h2>
					<p>
						최근 뉴스에서 '물가'라는 단어를 자주 보셨을 겁니다. 우리가 흔히 말하는 '물가'는 경제
						지표로는 소비자 물가지수(CPI)를 통해 확인합니다. 그런데 CPI만 봐서는 진짜 물가 흐름을
						놓칠 수 있습니다.
					</p>
					<h3><strong>1. CPI와 코어 CPI, 다른 이유가 있다</strong></h3>
					<p>
						CPI는 우리가 소비하는 모든 상품과 서비스의 가격 변동을 측정합니다. 하지만 변동성이 큰
						식료품과 에너지 가격 때문에 실제 물가 추세를 왜곡하기도 합니다. 그래서 '코어 CPI'를 함께
						봐야 합니다. 코어 CPI는 이 두 항목을 제외해 물가 상승의 진짜 흐름을 파악하는 데
						유용합니다.
					</p>
					<h3><strong>2. 인플레이션, 내 지갑을 위협하는 방식</strong></h3>
					<p>
						물가 상승은 내 월급의 실질 가치를 떨어뜨립니다. 예를 들어, 물가가 5% 올랐는데 내 월급은
						3%밖에 오르지 않았다면, 사실상 2%의 손해를 본 셈이죠. 이런 인플레이션 시대에는 현금
						가치가 하락하므로, 주식이나 부동산 등 인플레이션 헤지가 가능한 자산에 관심을 가져야
						합니다.
					</p>
					<h3><strong>3. 물가와 금리의 상관관계</strong></h3>
					<p>
						물가 상승률이 높아지면 중앙은행은 이를 억제하기 위해 금리를 올립니다. 금리가 오르면 대출
						이자가 늘어나 소비와 투자가 위축되면서 물가가 안정될 것으로 기대하는 것이죠. 따라서 CPI
						발표를 통해 향후 금리 변화를 예측하고, 이에 맞는 재테크 계획을 세워야 합니다.
					</p>
				</div>
				<div class="text">
					<h2 id="a4">
						<strong>제조업 구매관리자지수(PMI): 경기의 방향을 알려주는 나침반</strong>
					</h2>
					<p>
						주식 투자에서 가장 중요한 것 중 하나는 '미래 예측'입니다. 제조업 구매관리자지수(PMI)는
						현재가 아닌 미래 경기의 흐름을 보여주는 대표적인 선행 지표입니다.
					</p>
					<h3><strong>1. PMI가 미래를 예측하는 원리 </strong></h3>
					<p>
						PMI는 기업의 구매 관리자들에게 앞으로의 생산, 고용, 신규 주문 등이 어떻게 될 것인지를
						물어보는 설문 조사입니다. 이들은 생산 계획을 세우는 최전선에 있기 때문에, 이들의 심리를
						보면 향후 경기 흐름을 미리 엿볼 수 있습니다.
					</p>
					<h3><strong>2. PMI 50의 의미를 정확히 파악하자 </strong></h3>
					<p>
						PMI 수치가 50을 넘으면 경기가 확장될 것으로 보는 기업이 많다는 뜻입니다. 반대로 50
						미만이면 경기가 수축될 가능성이 높다는 신호죠. 이 50이라는 숫자를 기준으로 PMI의 변화를
						읽으면 전체적인 경기 방향을 파악하는 데 큰 도움이 됩니다.
					</p>
					<h3><strong>3. 제조업 PMI와 서비스업 PMI를 함께 보자</strong></h3>
					<p>
						과거에는 제조업 PMI가 중요했지만, 이제는 서비스업이 경제에서 차지하는 비중이 더
						커졌습니다. 따라서 서비스업 PMI도 함께 보며 전체 산업의 흐름을 읽는 것이 중요합니다. 두
						지표의 흐름을 비교하면 경기 확장세가 제조업에서만 일어나는지, 아니면 전체 경제로
						확산되는지 알 수 있습니다.
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

<Chatbot />

<style scoped>
	.container {
		display: grid;
		grid-template-columns: 0.75fr 5fr 1.25fr;
		gap: var(--space-32);
	}
	.content-chapter {
		position: sticky;
		top: var(--space-32);
		display: flex;
		flex-direction: column;
		align-self: start;

		ul {
			display: flex;
			flex-direction: column;

			li {
				padding: var(--space-8);
			}
			.current {
				background-color: var(--white-1);
				border-radius: var(--border-r8);
			}
		}
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
