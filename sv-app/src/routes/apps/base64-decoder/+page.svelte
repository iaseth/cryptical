
<script lang="ts">
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import TextArea from "$lib/components/TextArea.svelte";

	let inputText = $state('SGVsbG8sIFdvcmxkIQ==');
	let base64decoded: string = $state("");

	function onclick () {
		base64decoded = atob(inputText);
	}
</script>

<svelte:head>
	<title>Base64 Decoder by Cryptical</title>
</svelte:head>

<section class="container p-4 overflow-x-hidden space-y-4">
	<TextArea bind:value={inputText} key="base64-decoder-input"
		submitText="Decode" onSubmit={onclick} rows={5} />

	{#if base64decoded}
		<section class="grid md:grid-cols-2 gap-4">
			<CodeBlock code={inputText} title="Input" />
			<CodeBlock code={base64decoded} title="Base64" />
		</section>
	{/if}
</section>
