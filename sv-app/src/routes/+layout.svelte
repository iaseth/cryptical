<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Cryptical</title>
</svelte:head>

<header class="text-center">
	<a class="btn btn-lg rounded-t-none" href="/">Cryptical</a>
</header>

<main class="min-h-screen">
	{@render children()}
</main>

<footer class="prose text-center mx-auto px-4 py-20">
	<h4>
		<a class="link" href="https://github.com/iaseth">Profile</a>
		<span> / </span>
		<a class="link" href="https://github.com/iaseth/cryptical">Repo</a>
	</h4>
</footer>
