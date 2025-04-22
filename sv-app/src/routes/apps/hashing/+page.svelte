
<script lang="ts">
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import { getHashes, GROUPS, type HashDS } from "./utils";

	let inputText = $state('Hello, World!');
	let hashes: HashDS[] = $state([]);

	async function onclick () {
		hashes = await getHashes(inputText);
	}
</script>

<svelte:head>
	<title>Hashing by Cryptical</title>
</svelte:head>

<section class="container p-4 overflow-x-hidden space-y-4">
	<TextArea bind:value={inputText} key="hashing-input"
		submitText="Hash" onSubmit={onclick}
		rows={5} title="Enter Text" />

	{#if hashes.length > 0}
		<section class="space-y-12">
			{#each GROUPS as group}
				<section>
					<header class="prose mx-auto py-8 text-center">
						<h2>{group}</h2>
					</header>

					<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each hashes.filter(h => h.group === group) as hash}
							<CodeBlock code={hash.hash} title={hash.algo} />
						{/each}
					</section>
				</section>
			{/each}
		</section>
	{/if}
</section>
