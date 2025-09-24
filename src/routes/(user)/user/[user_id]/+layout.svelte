<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import HeaderNo from '$lib/components/HeaderNo.svelte';
	let { children } = $props();
</script>

<Header />
{@render children?.()}
