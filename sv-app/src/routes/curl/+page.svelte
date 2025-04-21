
<script lang="ts">
	import { parseCurl, type CurlParsed, type PropVal } from "$lib";
	import PropValueTable from "../../components/PropValueTable.svelte";
	import TextArea from "../../components/TextArea.svelte";
	import Handlebars from "handlebars";

	let curlCommand = $state(`curl \\
	'https://example.com/api?x=1' \\
	-H "X-Test: test" \\
	--cookie 'a=1; b=2' \\
	--data '{"foo":"bar"}`);
	let generatedCode = $state('');
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
		renderCode(stuff);
	}

	function renderCode (stuff: CurlParsed) {
		fetch('templates/handlebars/python-requests.hbs').then(res => res.text()).then(templateContent => {
			const template = Handlebars.compile(templateContent);
			const method = stuff.args.includes('-X') || stuff.args.includes('--request')
				? stuff.args[stuff.args.findIndex(a => a === '-X' || a === '--request') + 1].toUpperCase()
				: stuff.data ? 'POST' : 'GET';
			const formatDict = (items: { prop: string; value: string }[]): string =>
				items.length
					? `{\n${items.map(({ prop, value }) => `\t"${prop}": "${value}"`).join(',\n')}\n}`
					: '{}';

			const renderedCode = template({
				url: baseUrl,
				method: method.toLowerCase(),
				hasParams: params.length > 0,
				params: formatDict(params),
				hasHeaders: headers.length > 0,
				headers: formatDict(headers),
				hasCookies: cookies.length > 0,
				cookies: formatDict(cookies),
				hasData: !!data,
				data: data?.replace(/"/g, '\\"') ?? ''
			});

			generatedCode = renderedCode;
			return renderedCode;
		});
	}
</script>

<section class="max-w-3xl mx-auto p-4 pb-36">
	<TextArea bind:value={curlCommand} submitText="Convert" onSubmit={onclick} />

	<footer class="py-4 space-y-6">
		<section class="bg-base-300 p-4">
			<pre class="text-wrap break-words">{generatedCode}</pre>
		</section>

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
