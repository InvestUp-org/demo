<script lang="ts">
	export let thumbnail;
	export let title;
	export let meta;
</script>

<div class="card-vert">
	<img src={thumbnail} alt="" />
	<div class="information">
		<span class="title">{title}</span>
		<span class="meta">{meta}</span>
	</div>
</div>

<style scoped>
	.card-vert {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-8);
		border: var(--border);
		border-radius: var(--border-r8);

		img {
			width: 100%;
			border-radius: var(--border-r8);
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		.information {
			display: flex;
			flex-direction: column;
			gap: var(--space-8);
			padding: var(--space-16);
			padding-top: 0;

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
