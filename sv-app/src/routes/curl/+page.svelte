
<script lang="ts">
	import { parseCurl, type PropVal } from "$lib";
	import PropValueTable from "../../components/PropValueTable.svelte";

	let curlCommand = $state('');
	let pythonCode = $state('');

	let headers: PropVal[] = $state([]);
	let cookies: PropVal[] = $state([]);
	let params: PropVal[] = $state([]);

	function onclick () {
		const v = parseCurl(curlCommand);
		console.log(v);
		headers = v.headers;
		cookies = v.cookies;
		params = v.params;
	}
</script>

<section class="max-w-3xl mx-auto p-4 py-16 pb-36">
	<header class="space-y-4 mb-6">
		<textarea class="textarea block w-full" bind:value={curlCommand} rows=10></textarea>
		<button {onclick} class="btn btn-primary">Convert</button>
	</header>

	<footer class="px-4 py-4 bg-base-200">
		<pre class="text-wrap break-words">{pythonCode}</pre>

		<PropValueTable header="Headers" records={headers} />
		<PropValueTable header="Cookies" records={cookies} />
		<PropValueTable header="Params" records={params} />
	</footer>
</section>
