
<script lang="ts">
	interface Props {
		href: string,
		title: string,
		description?: string
	}
	let { href, title, description }: Props = $props();
</script>

<a {href} class="card bg-base-200 shadow-sm border-2 border-transparent duration-300 hover:border-primary">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>

		<div class="opacity-70">
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
	</div>
</a>
