<script lang="ts">
	import sections from "$lib/data/apps.json";
	import AppLink from "../components/AppLink.svelte";
</script>

{#each sections as section}
<section class="container px-4 py-12 space-y-8">
	<header class="prose text-center mx-auto">
		<h3>{section.title}</h3>
	</header>

	<section class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each section.apps as app}
			<AppLink {...app} />
		{/each}
	</section>
</section>
{/each}
