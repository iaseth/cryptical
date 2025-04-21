
<script lang="ts">
	import TextArea from "$lib/components/TextArea.svelte";

	let headerInput = $state('');
	let payloadInput = $state('');
	let secretInput = $state('');
	let jwtToken = $state('');

	function onclick () {
		//
	}
</script>

<svelte:head>
	<title>JWT by Cryptical</title>
</svelte:head>

<section class="container p-4 overflow-x-hidden space-y-4">
	<section class="grid">
		<TextArea bind:value={secretInput} key="jwt-encoder-secret-input" rows={1} title="Secret" />
		<TextArea bind:value={headerInput} key="jwt-encoder-header-input" rows={5} title="Header" />
		<TextArea bind:value={payloadInput} key="jwt-encoder-payload-input" title="Payload"
			submitText="Encode" onSubmit={onclick} />
	</section>
</section>
