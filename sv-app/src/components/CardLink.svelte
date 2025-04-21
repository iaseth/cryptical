
<script lang="ts">
	interface Props {
		href: string,
		title: string,
		description?: string
	}
	let { href, title, description }: Props = $props();
</script>

<div class="card bg-base-200 shadow-sm">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		{#if description}
			<p>{description}</p>
		{/if}

		<div class="justify-end card-actions">
			<a {href} class="btn btn-primary">Open</a>
		</div>
	</div>
</div>
