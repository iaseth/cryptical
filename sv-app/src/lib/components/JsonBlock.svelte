
<script lang="ts">
	import type { ClassValue } from "svelte/elements";

	interface Props {
		jo: any,
		title?: string,
		className?: ClassValue
	}
	let { jo, title, className }: Props = $props();
</script>

<section class={["bg-base-300 px-4 py-4 space-y-1 rounded-lg", className]}>
	{#if title}
		<header class="prose font-mono">
			<h4 class="text-primary">{title}</h4>
		</header>
	{/if}
	
	<section class="">
		<pre class="text-wrap break-words">{JSON.stringify(jo, null, 4)}</pre>
	</section>
</section>
