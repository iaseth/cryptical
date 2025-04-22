
<script lang="ts">
	interface Props {
		href: string,
		bigChar: string,
		subtitle: string,
		title: string,
		description?: string
	}
	let { href, bigChar, subtitle, title, description }: Props = $props();
</script>

<a {href} class="card card-side bg-base-200 shadow-sm overflow-hidden border-2 border-transparent duration-300 hover:border-primary">
	<aside class="text-center bg-base-300 w-1/4 p-4 flex items-center justify-center">
		<div>
			<h1 class="text-2xl font-bold text-primary pb-1">{bigChar}</h1>
			<p class="text-sm opacity-70">{subtitle}</p>
		</div>
	</aside>

	<div class="card-body">
		<h2 class="card-title">{title}</h2>

		<div class="opacity-70">
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
	</div>
</a>
