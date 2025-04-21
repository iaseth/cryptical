<script lang="ts">
	import sections from "$lib/data/apps.json";
	import AppLink from "../lib/components/AppLink.svelte";
</script>

<div class="hero bg-base-200 py-20">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Cryptical</h1>
			<p class="py-6">This is just a small collection of single page apps related to Cryptography and Web Scraping.</p>
			<a class="btn btn-primary" href="https://github.com/iaseth/cryptical">GitHub</a>
		</div>
	</div>
</div>

{#each sections as section}
<section class="container px-4 py-12 space-y-8">
	<header class="prose text-center mx-auto">
		<h3>{section.title}</h3>
	</header>

	<section class="grid gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
		{#each section.apps as app}
			<AppLink {...app} />
		{/each}
	</section>
</section>
{/each}
