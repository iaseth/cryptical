
<script lang="ts">
	interface Props {
		href: string,
		title: string
	}
	let { href, title }: Props = $props();
</script>

<div class="card bg-base-100 card-md shadow-sm">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
		<div class="justify-end card-actions">
			<a {href} class="btn btn-primary">Open</a>
		</div>
	</div>
</div>
