
<script lang="ts">
	import { jwtDecode } from "jwt-decode";
	import TextArea from "../../lib/components/TextArea.svelte";
	import JsonBlock from "$lib/components/JsonBlock.svelte";

	let jwtToken = $state('');
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
		[payload, header] = decodeJwtToken(jwtToken);
	}
</script>

<section class="container p-4 overflow-x-hidden">
	<TextArea bind:value={jwtToken} key="jwt"
		submitText="Decode" onSubmit={onclick} />

	<footer class="grid md:grid-cols-3 gap-4 items-start">
		<JsonBlock jo={header} title="header" />
		<JsonBlock jo={payload} title="payload" className="md:col-span-2" />
	</footer>
</section>
