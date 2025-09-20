<script lang="ts">
	export let thumbnail;
	export let title;
	export let meta;
</script>

<div class="card-hori">
	<div class="information">
		<span class="title">{title}</span>
		<span class="meta">{meta}</span>
	</div>
	<img src={thumbnail} alt="" />
</div>

<style scoped>
	.card-hori {
		width: 100%;
		display: flex;
		align-items: center;
		gap: var(--space-8);
		padding: var(--space-16);
		border: var(--border);
		border-radius: var(--border-r8);
		justify-content: space-between;

		img {
			height: 3rem;
			width: 3rem;
			border-radius: var(--border-r8);
		}
		.information {
			display: flex;
			flex-direction: column;
			gap: var(--space-8);

			.title {
				max-width: 10rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: var(--font-base);
				font-weight: var(--font-bold);
			}
			.meta {
				font-size: var(--font-small);
				font-weight: var(--font-regu);
				color: var(--black-3);
			}
		}
	}
</style>
