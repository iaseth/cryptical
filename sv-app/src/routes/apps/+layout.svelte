<script lang="ts">
	let { children } = $props();

	const headerClass = "grow basis-0 btn py-8 rounded-t-none";
</script>

<header class="container px-4 text-center flex gap-x-4 justify-between">
	<a class={headerClass} href="/">Home</a>
	<a class={headerClass} href="https://github.com/iaseth/cryptical">GitHub</a>
	<a class={headerClass} href="https://github.com/iaseth">Author</a>
</header>

{@render children()}
