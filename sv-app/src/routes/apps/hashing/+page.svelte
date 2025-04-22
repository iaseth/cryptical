
<script lang="ts">
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";

	let inputText = $state('Hello, World!');

	let sha1Hash = $state('');
	let sha256Hash = $state('');
	let sha384Hash = $state('');
	let sha512Hash = $state('');

	async function hashText(text: string, algo: string): Promise<string> {
		const encoder = new TextEncoder();
		const data = encoder.encode(text);
		const hashBuffer = await crypto.subtle.digest(algo, data);
		return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
	}

	async function onclick () {
		sha1Hash = await hashText(inputText, 'SHA-1');
		sha256Hash = await hashText(inputText, 'SHA-256');
		sha384Hash = await hashText(inputText, 'SHA-384');
		sha512Hash = await hashText(inputText, 'SHA-512');
	}
</script>

<svelte:head>
	<title>Hashing by Cryptical</title>
</svelte:head>

<section class="container p-4 overflow-x-hidden space-y-4">
	<TextArea bind:value={inputText} key="hashing-input"
		submitText="Hash" onSubmit={onclick}
		rows={5} title="Enter Text" />

	<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<CodeBlock code={sha1Hash} title="SHA 1" />
		<CodeBlock code={sha256Hash} title="SHA 256" />
		<CodeBlock code={sha384Hash} title="SHA 384" />
		<CodeBlock code={sha512Hash} title="SHA 512" />
	</section>
</section>
