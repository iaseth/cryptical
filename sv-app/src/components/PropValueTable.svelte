
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
</script>

{#if records.length}
	<button class="mx-auto block px-4 py-4 text-center" {onclick}>
		<h3 class="text-xl font-bold">{header}</h3>
		<p class="text-sm">{records.length} records</p>
	</button>

	<table class="table" {hidden}>
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
{/if}
