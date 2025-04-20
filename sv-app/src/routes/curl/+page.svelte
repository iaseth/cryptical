
<script lang="ts">
	import { parseCurl, type PropVal } from "$lib";
	import PropValueTable from "../../components/PropValueTable.svelte";
	import TextArea from "../../components/TextArea.svelte";

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

<section class="max-w-3xl mx-auto p-4 pb-36">
	<TextArea bind:value={curlCommand} submitText="Convert" onSubmit={onclick} />

	<footer class="px-4 py-4 bg-base-200">
		<pre class="text-wrap break-words">{pythonCode}</pre>

		<PropValueTable header="Headers" records={headers} />
		<PropValueTable header="Cookies" records={cookies} />
		<PropValueTable header="Params" records={params} />
	</footer>
</section>
