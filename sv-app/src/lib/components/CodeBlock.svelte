
<script lang="ts">
	import type { ClassValue } from "svelte/elements";

	interface Props {
		code: string,
		title?: string,
		className?: ClassValue
	}
	let { code, title, className }: Props = $props();
</script>

<section class={["bg-base-300 px-4 py-4 space-y-1 rounded-lg", className]}>
	{#if title}
		<header class="prose font-mono">
			<h4 class="flex">
				<span class="text-primary">{title}</span>
				<span class="grow"></span>
				<span class="text-secondary">{code.length}</span>
			</h4>
		</header>
	{/if}
	
	<section class="">
		<pre class="text-wrap break-all">{code}</pre>
	</section>
</section>
