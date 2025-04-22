
<script lang="ts">
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import { SignJWT } from 'jose';

	let payloadInput = $state('{\n\t"foo": "bar"\n}');
	let secretInput = $state('Pass1234');
	let jwtToken = $state('');

	async function onclick () {
		const secret = new TextEncoder().encode(secretInput);
		try {
			const jo = JSON.parse(payloadInput);
			jwtToken = await new SignJWT(jo)
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime('1h')
				.sign(secret);
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	}
</script>

<svelte:head>
	<title>JWT by Cryptical</title>
</svelte:head>

<section class="container p-4 space-y-4">
	<section class="grid">
		<TextArea bind:value={secretInput} key="jwt-encoder-input-secret" rows={1} title="Secret" />
		<TextArea bind:value={payloadInput} key="jwt-encoder-input-payload" rows={5} title="Payload"
			submitText="Encode" onSubmit={onclick} />
	</section>

	{#if jwtToken}
		<CodeBlock code={jwtToken} title="JWT Token" />
	{/if}
</section>
