<script lang="ts">
	import logop from '$lib/assets/images/logo_blue.svg';
	import logob from '$lib/assets/images/logo_black.svg';
	let showChat = $state(false);
	const isShowChat = () => {
		showChat = !showChat;
	};
</script>

{#if showChat}
	<div class="chatbot">
		<div class="container">
			<div class="info">
				<span>InvestUp 챗봇</span>
				<p>현재 강의에서 궁금한 내용이 있다면 물어보세요!</p>
			</div>
			<div class="chatbox">
				<div class="chat user">
					<p>지지가 구체적으로 어떤 의미야?</p>
					<span>08:15 AM</span>
				</div>
				<div class="chat bot">
					<span class="botname">InvestUp AI</span>
					<p>
						'지지’란 내리던 주가가 어떤 특정한 지점에서 더 이상 떨어지지 않는(지지) 상황을 말합니다.
					</p>
					<span>08:16 AM</span>
				</div>
				<div class="chat user">
					<p>그러면 지지나 저항이 구체적으로 일어나는 상황을 알려줄래?</p>
					<span>08:17 AM</span>
				</div>
				<div class="chat bot">
					<span class="botname">InvestUp AI</span>
					<p>...</p>
				</div>
			</div>
			<div class="input">
				<form action="" method="get">
					<input type="text" />
					<button type="submit">
						<img src={logob} alt="" />
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<button class="chatbot-button" onclick={() => isShowChat()}>
	<img src={logop} alt="" />
</button>

<style scoped>
	.chatbot {
		position: fixed;
		bottom: calc(var(--space-16) * 5);
		right: var(--space-16);
		width: 20rem;
		background-color: var(--white-0);
		border-radius: var(--border-r8);
		box-shadow: 1px 1px 10px #236fea30;

		.info {
			padding: var(--space-16);
			background-color: var(--primary);
			border-radius: var(--border-r8);

			span,
			p {
				color: var(--white-0);
			}
			span {
				font-size: var(--font-large);
				font-weight: var(--font-bold);
			}
			p {
				font-size: var(--font-small);
			}
		}

		.chatbox {
			display: flex;
			flex-direction: column;
			gap: var(--space-16);
			padding: var(--space-16);

			.user {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: var(--space-4);

				p {
					max-width: 15rem;
					width: fit-content;
					background-color: var(--primary);
					padding: var(--border-r8);
					color: var(--white-0);
					border-radius: var(--border-r8);
				}
				span {
					font-size: var(--font-small);
					color: var(--black-3);
				}
			}
			.bot {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: var(--space-4);

				.botname {
					font-size: var(--font-base);
					color: var(--black-0);
				}
				p {
					max-width: 15rem;
					width: fit-content;
					background-color: var(--white-3);
					padding: var(--border-r8);
					color: var(--black-0);
					border-radius: var(--border-r8);
				}
				span {
					font-size: var(--font-small);
					color: var(--black-3);
				}
			}
		}
		.input form {
			padding: var(--space-16);
            display: grid;
            grid-template-columns: 5fr 1fr;

			input[type='text'] {
				background-color: var(--white-1);
				padding: var(--space-8);
				border-radius: var(--border-r8);
				width: 100%;
			}
			button {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: var(--space-8);

				img {
					height: 1.5rem;
				}
			}
		}
	}

	.chatbot-button {
		padding: var(--space-16);
		position: fixed;
		bottom: var(--space-16);
		right: var(--space-16);
		border-radius: var(--border-rc);
		border: var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--white-0);

		img {
			height: 1.5rem;
		}
	}
</style>
