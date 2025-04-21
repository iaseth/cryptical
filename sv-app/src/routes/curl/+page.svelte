
<script lang="ts">
	import { formatDict, getTemplate, parseCurl, type CurlParsed, type PropVal } from "$lib";
	import PropValueTable from "../../components/PropValueTable.svelte";
	import TextArea from "../../components/TextArea.svelte";

	let curlCommand = $state(`curl \\
	'https://example.com/api?x=1' \\
	-H "X-Test: test" \\
	--cookie 'a=1; b=2' \\
	--data '{"foo":"bar"}`);
	let generatedCode = $state('');
	let parsed: CurlParsed|null = $state(null);

	function onclick () {
		parsed = parseCurl(curlCommand);
		renderCode();
	}

	function renderCode () {
		getTemplate('python-requests').then(template => {
			if (!parsed) return "";

			const renderedCode = template({
				url: parsed.baseUrl,
				method: parsed.method.toLowerCase(),
				hasParams: parsed.params.length > 0,
				params: formatDict(parsed.params),
				hasHeaders: parsed.headers.length > 0,
				headers: formatDict(parsed.headers),
				hasCookies: parsed.cookies.length > 0,
				cookies: formatDict(parsed.cookies),
				hasData: !!parsed.data,
				data: parsed.data?.replace(/"/g, '\\"') ?? '',
				json: parsed.json
			});

			generatedCode = renderedCode;
			return renderedCode;
		});
	}
</script>

<section class="container p-4 pb-36">
	<TextArea bind:value={curlCommand}
		title="Curl Converter" key="curl-command"
		submitText="Convert" onSubmit={onclick} />

	<footer class="py-4 space-y-6">
		<section class="bg-base-300 p-4">
			<pre class="text-wrap break-words">{generatedCode}</pre>
		</section>

		{#if parsed}
			<PropValueTable header="Basics" records={[
				{ prop: 'Base URL', value: parsed.baseUrl },
				{ prop: 'URL', value: parsed.url },
				{ prop: 'data', value: parsed.data || "" },
			]} />

			<PropValueTable header="Params" records={parsed.params} />
			<PropValueTable header="Headers" records={parsed.headers} />
			<PropValueTable header="Cookies" records={parsed.cookies} />
		{/if}
	</footer>
</section>
