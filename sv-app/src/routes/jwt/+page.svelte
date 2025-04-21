
<script lang="ts">
	import { jwtDecode } from "jwt-decode";
	import TextArea from "../../components/TextArea.svelte";

	let jwtToken = $state('');
	let decodedToken = $state({});

	function decodeJwtToken (token: string) {
		try {
			return jwtDecode(jwtToken);
		} catch (error) {
			return {};
		}
	}

	function onclick () {
		decodedToken = decodeJwtToken(jwtToken);
	}

	$inspect(decodedToken);
</script>

<section class="max-w-3xl mx-auto p-4 overflow-x-hidden">
	<TextArea bind:value={jwtToken} key="jwt"
		submitText="Decode" onSubmit={onclick} />

	<footer class="px-4 py-4 bg-base-200">
		<pre class="text-wrap break-words">{JSON.stringify(decodedToken, null, 4)}</pre>
	</footer>
</section>
