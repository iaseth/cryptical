<script lang="ts">
	import sections from "$lib/data/apps.json";
	import AppLinkCard from "../lib/components/AppLinkCard.svelte";
</script>

<div class="hero bg-base-200 py-20">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Cryptical</h1>
			<p class="py-6">This is just a small collection of Single Page Apps (SPAs) related to Cryptography and Web Scraping.</p>
			<a class="btn btn-primary" href="https://github.com/iaseth/cryptical" target="_blank">GitHub</a>
		</div>
	</div>
</div>

<section class="py-20 space-y-20">
	{#each sections as section}
		<section class="container px-4">
			<header class="prose text-center mx-auto mb-10">
				<h1>{section.title}</h1>
			</header>

			<section class="grid gap-4 gap-y-6 md:grid-cols-2">
				{#each section.apps as app}
					<AppLinkCard {...app} />
				{/each}
			</section>
		</section>
	{/each}
</section>
