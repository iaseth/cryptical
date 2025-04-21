<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Cryptical</title>
</svelte:head>

{@render children()}
