
<script lang="ts">
	let curlCommand = $state('');

	function onclick () {
		//
	}
</script>

<section class="max-w-3xl mx-auto p-4 overflow-x-hidden">
	<header class="space-y-4 mb-6">
		<textarea class="textarea block w-full" bind:value={curlCommand} rows=10></textarea>
		<button {onclick} class="btn btn-primary">Convert</button>
	</header>

	<footer class="px-4 py-4 bg-base-200">
		<pre class="text-wrap break-words">Output</pre>
	</footer>
</section>
