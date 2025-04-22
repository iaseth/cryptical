<script lang="ts">
	let { children } = $props();

	const headerClass = "grow basis-0 btn py-8 rounded-t-none";
</script>

<div class="navbar bg-base-100 shadow-sm container">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">Cryptical</a>
	</div>

	<div class="flex-none">
		<a class="btn btn-ghost" href="https://github.com/iaseth/cryptical" target="_blank">GitHub</a>
	</div>
</div>

{@render children()}
