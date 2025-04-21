
<script lang="ts">
	import type { ClassValue } from "svelte/elements";
	import CodeBlock from "./CodeBlock.svelte";

	interface Props {
		jo: any,
		title?: string,
		className?: ClassValue
	}
	let { jo, title, className }: Props = $props();
</script>

<CodeBlock code={JSON.stringify(jo, null, 4)} {title} {className} />
