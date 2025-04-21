
<script lang="ts">
	import { threeBytesToBase64 } from "$lib";

	interface Props {
		bytes: number[]
	}

	let { bytes }: Props = $props();
	let base64chars: string[] = $derived(threeBytesToBase64(bytes));

	const common = "py-1.5 rounded"
</script>

<section class="grid gap-1.5 text-center font-mono">
	<section class="grid grid-cols-3 gap-1">
		{#each bytes as byte}
			<div class={["bg-base-300 border border-primary", common]}>{String.fromCharCode(byte)}</div>
		{/each}
	</section>

	<section class="grid grid-cols-3 gap-1">
		{#each bytes as byte}
			<div class={["bg-base-200", common]}>{byte}</div>
		{/each}
	</section>

	<section class="grid grid-cols-4 gap-1">
		{#each base64chars as ch}
			<div class={["bg-base-300 border border-secondary", common]}>{ch}</div>
		{/each}
	</section>
</section>
