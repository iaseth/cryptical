
<script lang="ts">
	interface Props {
		href: string,
		title: string,
		description?: string
	}
	let { href, title, description }: Props = $props();
</script>

<a {href} class="card bg-base-200 shadow-sm">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		{#if description}
			<p>{description}</p>
		{/if}
	</div>
</a>
