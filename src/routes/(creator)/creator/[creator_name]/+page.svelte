<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import CardHorizontal from '$lib/components/CardHorizontal.svelte';
	import CardVertical from '$lib/components/CardVertical.svelte';
	import logo from '$lib/assets/images/logo.svg';
	import ex1 from '$lib/assets/example/ex1.jpg';
	import ex2 from '$lib/assets/example/ex2.jpg';
	import ex3 from '$lib/assets/example/ex3.jpg';
	import ex4 from '$lib/assets/example/ex4.jpg';
	import ex5 from '$lib/assets/example/ex5.jpg';
	import ex6 from '$lib/assets/example/ex6.jpg';
	import ex7 from '$lib/assets/example/ex7.jpg';
	import ex8 from '$lib/assets/example/ex8.jpg';
	import ex9 from '$lib/assets/example/ex9.jpg';
	import ex10 from '$lib/assets/example/ex10.jpg';
	import ex_video from '$lib/assets/example/ex_video.png';
	import ex_profile from '$lib/assets/example/ex_profile.png';
</script>

<Header />
<main class="creator">
	<div class="container">
		<div class="creator-profile">
			<img src={ex_profile} alt="" class="picture" />
			<div class="text">
				<h3 class="name"><strong>김선생의 경제 교실</strong></h3>
				<span class="description">
					경알못도 쉽게 따라올 수 있는 친절한 경제 강의! 내 지갑을 두둑하게 만드는 경제 상식을
					재미있게 배워보세요.
				</span>
			</div>
			<button class="membership">멤버쉽 가입</button>
		</div>
		<nav class="nav">
			<ul>
				<li class="active"><a href="/">홈</a></li>
				<li><a href="/">강의</a></li>
				<li><a href="/">게시물</a></li>
				<li><a href="/">정보</a></li>
			</ul>
		</nav>
		<h3><strong>최근 게시한 강의</strong></h3>
		<div class="recent">
			<CardVertical
				thumbnail={ex1}
				title="30분만에 끝내는 경제 뉴스 읽기"
				meta="2025.09.10 | 평균 10분 소요"
			/>
			<CardVertical
				thumbnail={ex2}
				title="직장인을 위한 생활 경제학"
				meta="2025.09.10 | 평균 10분 소요"
			/>
			<CardVertical
				thumbnail={ex3}
				title="경제 지표 101: 전문가처럼 시장 읽기"
				meta="2025.09.10 | 평균 10분 소요"
			/>
			<CardVertical
				thumbnail={ex4}
				title="행동 경제학: 인간의 비합리적 선택 이해하기"
				meta="2025.09.10 | 평균 10분 소요"
			/>
		</div>
		<h3><strong>최근 게시물</strong></h3>
		<div class="posts">
			<CardHorizontal
				thumbnail={ex5}
				title="2025년 경제 전망과 투자 전략"
				meta="2025.09.10 | 평균 10분 소요"
			/>
			<CardHorizontal
				thumbnail={ex6}
				title="기술주 투자의 정석: 메타버스부터 AI까지"
				meta="2025.09.10 | 평균 10분 소요"
			/>
			<CardHorizontal
				thumbnail={ex7}
				title="위기를 기회로, 금리 인상기 재테크 전략"
				meta="2025.09.10 | 평균 10분 소요"
			/>
			<CardHorizontal
				thumbnail={ex9}
				title="워렌 버핏처럼 생각하기: 투자 철학 입문"
				meta="2025.09.10 | 평균 10분 소요"
			/>			
		</div>
	</div>
</main>

<style scoped>
	.creator {
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

		.creator-profile {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: var(--space-16);

			img {
				width: 5rem;
				border-radius: var(--border-rc);
			}
			.text {
				display: flex;
				flex-direction: column;
				gap: var(--space-8);

				.description {
					max-width: 50rem;
				}
			}
			.membership {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: var(--space-8) var(--space-16);
				background-color: var(--primary);
				color: var(--white-0);
				margin-left: auto;
				border-radius: var(--border-r8);
			}
		}
		.nav {
			padding: var(--space-16) 0;
			ul {
				display: flex;
				align-items: center;
				justify-content: center;

				li {
					padding: var(--space-8);
					width: 8rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: var(--font-bold);
				}
				.active {
					border-bottom: var(--border-b);
					border-color: var(--secondary);
					color: var(--secondary);
				}
			}
		}
		.recent {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap: var(--space-16);
			width: 100%;
		}
		.posts {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			gap: var(--space-8);
		}
		.information {

		}
	}
</style>
