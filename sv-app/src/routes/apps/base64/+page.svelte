
<script lang="ts">
	import { threeBytesToBase64 } from "$lib";
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import ThreeByteGroup from "./ThreeByteGroup.svelte";

	let inputText = $state('Hello, World!');
	let threeByteGroups: number[][] = $state([]);
	let base64encoded: string = $state("");

	function splitInto3ByteChunks(str: string): number[][] {
		const encoder = new TextEncoder();
		const bytes = encoder.encode(str);
		const chunks = [];

		for (let i = 0; i < bytes.length; i += 3) {
			const chunk = [...bytes.slice(i, i + 3)];
			chunks.push(chunk);
		}

		return chunks;
	}

	function onclick () {
		const groups = splitInto3ByteChunks(inputText);
		threeByteGroups = groups;
		base64encoded = groups.map(threeBytesToBase64).flat().join("");
	}
</script>

<svelte:head>
	<title>Base64 by Cryptical</title>
</svelte:head>

<section class="container p-4 overflow-x-hidden space-y-4">
	<TextArea bind:value={inputText} key="base64"
		submitText="Encode" onSubmit={onclick} />

	<CodeBlock code={base64encoded} title="Base64" />

	{#if threeByteGroups.length > 0}
		<section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
			{#each threeByteGroups as bytes}
				<ThreeByteGroup {bytes} />
			{/each}
		</section>
	{/if}
</section>
