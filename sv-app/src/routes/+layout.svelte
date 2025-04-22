<script lang="ts">
	import '../app.css';
	import sections from "$lib/data/apps.json";

	let { children } = $props();

	const headerClass = "grow basis-0 btn py-8 rounded-t-none";
</script>

<svelte:head>
	<title>Cryptical</title>
</svelte:head>

<div class="grid grid-cols-4 h-1">
	<div class="bg-red-500"></div>
	<div class="bg-yellow-500"></div>
	<div class="bg-green-500"></div>
	<div class="bg-blue-500"></div>
</div>

<main class="min-h-screen pb-24">
	{@render children()}
</main>

<footer class="bg-neutral text-neutral-content px-4 py-24">
	<section class="container footer sm:footer-horizontal">
	{#each sections as section}
		<nav>
			<h6 class="footer-title">{section.title}</h6>

			{#each section.apps as app}
				<a class="link link-hover" href={app.href}>{app.title}</a>
			{/each}
		</nav>
	{/each}
	</section>
</footer>
