
<script lang="ts">
	import { jwtDecode } from "jwt-decode";
	import TextArea from "../../lib/components/TextArea.svelte";
	import JsonBlock from "$lib/components/JsonBlock.svelte";
	import CodeBlock from "$lib/components/CodeBlock.svelte";

	let jwtToken = $state('');
	let parts: string[] = $state([]);
	let payload = $state({});
	let header = $state({});

	function decodeJwtToken (token: string) {
		try {
			return [jwtDecode(jwtToken), jwtDecode(jwtToken, { header: true })];
		} catch (error) {
			return [{}, {}];
		}
	}

	function onclick () {
		parts = jwtToken.split('.');
		[payload, header] = decodeJwtToken(jwtToken);
	}
</script>

<section class="container p-4 overflow-x-hidden space-y-4">
	<TextArea bind:value={jwtToken} key="jwt"
		submitText="Decode" onSubmit={onclick} />

	<section class="grid md:grid-cols-3 gap-4 items-start">
		<JsonBlock jo={header} title="header" />
		<JsonBlock jo={payload} title="payload" className="md:col-span-2" />
	</section>

	{#if parts.length === 3}
		<section class="grid md:grid-cols-3 gap-4 items-start">
			<section class="space-y-4">
				<CodeBlock code={parts[0]} title="Part I" />
				<CodeBlock code={parts[2]} title="Part III" />
			</section>

			<CodeBlock code={parts[1]} title="Part II" className="md:col-span-2" />
		</section>
	{/if}
</section>
