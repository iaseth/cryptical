
<script lang="ts">
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import * as hashwasm from "hash-wasm";

	type HashDefinition = {
		group: string;
		algo: string;
		fn: (text: string) => Promise<string>;
	};

	type HashDS = {
		group: string;
		algo: string;
		hash: string;
	};

	let inputText = $state('Hello, World!');
	let hashes: HashDS[] = $state([]);

	export const GROUPS = [
		'SHA-1/2',
		// 'SHA-3',
		'BLAKE',
		'Legacy',
		'Non-Crypto'
	];

	export const hashAlgorithms: HashDefinition[] = [
		// SHA-1/2
		{ group: 'SHA-1/2', algo: 'SHA-1', fn: hashwasm.sha1 },
		{ group: 'SHA-1/2', algo: 'SHA-256', fn: hashwasm.sha256 },
		{ group: 'SHA-1/2', algo: 'SHA-384', fn: hashwasm.sha384 },
		{ group: 'SHA-1/2', algo: 'SHA-512', fn: hashwasm.sha512 },

		// BLAKE
		{ group: 'BLAKE', algo: 'BLAKE2b', fn: (text) => hashwasm.blake2b(text, 64) },
		{ group: 'BLAKE', algo: 'BLAKE2s', fn: (text) => hashwasm.blake2s(text, 32) },
		{ group: 'BLAKE', algo: 'BLAKE3', fn: hashwasm.blake3 },

		// Legacy
		{ group: 'Legacy', algo: 'MD4', fn: hashwasm.md4 },
		{ group: 'Legacy', algo: 'MD5', fn: hashwasm.md5 },
		{ group: 'Legacy', algo: 'RIPEMD-160', fn: hashwasm.ripemd160 },
		{ group: 'Legacy', algo: 'Whirlpool', fn: hashwasm.whirlpool },

		// Non-Crypto
		{ group: 'Non-Crypto', algo: 'CRC32', fn: hashwasm.crc32 },
		{ group: 'Non-Crypto', algo: 'CRC64', fn: hashwasm.crc64 },
		{ group: 'Non-Crypto', algo: 'xxHash32', fn: hashwasm.xxhash32 },
		{ group: 'Non-Crypto', algo: 'xxHash64', fn: hashwasm.xxhash64 }
	];

	async function onclick () {
		const text = inputText;
		hashes = [];
		for (const algo of hashAlgorithms) {
			hashes.push({
				group: algo.group,
				algo: algo.algo,
				hash: await algo.fn(text)
			});
		}
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
