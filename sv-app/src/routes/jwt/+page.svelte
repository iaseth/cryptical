
<script lang="ts">
	import { jwtDecode } from "jwt-decode";

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
	<header class="space-y-4 mb-6">
		<textarea class="textarea block w-full bg-base-200" bind:value={jwtToken} rows=10></textarea>
		<button {onclick} class="btn btn-primary">Decode</button>
	</header>

	<footer class="px-4 py-4 bg-base-200">
		<pre class="text-wrap break-words">{JSON.stringify(decodedToken, null, 4)}</pre>
	</footer>
</section>
