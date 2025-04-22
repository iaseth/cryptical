
<script lang="ts">
	import { threeBytesToBase64 } from "$lib";
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import ThreeByteGroup from "./ThreeByteGroup.svelte";

	let inputText = $state('Hello, World!');
	let threeByteGroups: number[][] = $derived.by(() => splitInto3ByteChunks(inputText));
	let base64encoded: string = $derived(threeByteGroups.map(threeBytesToBase64).flat().join(""));

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
</script>

<svelte:head>
	<title>Base64 Encoder by Cryptical</title>
</svelte:head>

<section class="container p-4 space-y-4">
	<TextArea bind:value={inputText} key="base64-encoder-input"
		rows={5} title="Enter Text" />

	{#if base64encoded}
		<section class="grid md:grid-cols-2 gap-4">
			<CodeBlock code={inputText} title="Input" />
			<CodeBlock code={base64encoded} title="Base64" />
		</section>
	{/if}

	{#if threeByteGroups.length > 0}
		<section class="py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-6">
			{#each threeByteGroups as bytes}
				<ThreeByteGroup {bytes} />
			{/each}
		</section>
	{/if}
</section>
