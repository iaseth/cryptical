<script lang="ts">
	import '../app.css';

	let { children } = $props();

	const headerClass = "grow basis-0 btn py-8 rounded-t-none";
</script>

<svelte:head>
	<title>Cryptical</title>
</svelte:head>

<header class="container px-4 text-center flex gap-x-4 justify-between">
	<a class={headerClass} href="/">Home</a>
	<a class={headerClass} href="https://github.com/iaseth/cryptical">GitHub</a>
	<a class={headerClass} href="https://github.com/iaseth">Author</a>
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
