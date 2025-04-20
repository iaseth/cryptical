
<script lang="ts">
	import type { PropVal } from "$lib";

	interface Props {
		header: string,
		records: PropVal[]
	}
	const { header, records }: Props = $props();

	let hidden = $state(false);
	function onclick () {
		hidden = !hidden;
	}

	function copyToClipboard () {
		//
	}
</script>

{#if records.length}
<section class="space-y-1">
	<header class="bg-base-300 px-4 py-4 text-center rounded-lg grid grid-cols-3 items-center">
		<h4 class="font-bold">{header}</h4>
		<p class="text-sm">{records.length} records</p>

		<div>
			<button {onclick} class="btn btn-primary">{hidden ? "Show" : "Hide"}</button>
			<button onclick={copyToClipboard} class="btn btn-secondary">Copy</button>
		</div>
	</header>

	<table class="table bg-base-300" {hidden}>
		<thead>
			<tr>
				<th></th>
				<th>Prop</th>
				<th>Value</th>
			</tr>
		</thead>

		<tbody>
			{#each records as record, i}
				<tr>
					<td>{i+1}</td>
					<td>
						<code>{record.prop}</code>
					</td>
					<td>
						<code class="break-all">{record.value}</code>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
{/if}
