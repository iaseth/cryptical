
<script lang="ts">
	import { parseCurl, type PropVal } from "$lib";
	import PropValueTable from "../../components/PropValueTable.svelte";
	import TextArea from "../../components/TextArea.svelte";

	let curlCommand = $state(`curl \\
	'https://example.com/api?x=1' \\
	-H "X-Test: test" \\
	--cookie 'a=1; b=2' \\
	--data '{"foo":"bar"}`);
	let pythonCode = $state('');
	let url = $state('');
	let baseUrl = $state('');
	let data = $state('');

	let headers: PropVal[] = $state([]);
	let cookies: PropVal[] = $state([]);
	let params: PropVal[] = $state([]);

	function onclick () {
		const stuff = parseCurl(curlCommand);
		({ url, baseUrl, params, headers, cookies } = stuff);
		data = stuff.data || data;
	}
</script>

<section class="max-w-3xl mx-auto p-4 pb-36">
	<TextArea bind:value={curlCommand} submitText="Convert" onSubmit={onclick} />

	<footer class="py-4 space-y-6">
		<pre class="text-wrap break-words">{pythonCode}</pre>

		<PropValueTable header="Basics" records={[
			{ prop: 'Base URL', value: baseUrl },
			{ prop: 'URL', value: url },
			{ prop: 'data', value: data },
		]} />
		<PropValueTable header="Params" records={params} />
		<PropValueTable header="Headers" records={headers} />
		<PropValueTable header="Cookies" records={cookies} />
	</footer>
</section>
