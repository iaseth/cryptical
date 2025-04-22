
<script lang="ts">
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import * as hashwasm from "hash-wasm";

	interface HashDS {
		algo: string,
		hash: string
	}

	let inputText = $state('Hello, World!');
	let hashes: HashDS[] = $state([]);

	async function onclick () {
		const text = inputText;
		hashes = [
			{ algo: "SHA-1", hash: await hashwasm.sha1(text) },
			{ algo: "SHA-256", hash: await hashwasm.sha256(text) },
			{ algo: "SHA-384", hash: await hashwasm.sha384(text) },
			{ algo: "SHA-512", hash: await hashwasm.sha512(text) },
		];
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
		<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each hashes as hash}
				<CodeBlock code={hash.hash} title={hash.algo} />
			{/each}
		</section>
	{/if}
</section>
