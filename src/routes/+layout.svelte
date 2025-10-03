<script lang="ts">
	import '../app.css';
	import icon from '$lib/assets/icon-pste.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Lab. PSTE</title>
	<link rel="icon" href={icon} />
</svelte:head>

{@render children?.()}
