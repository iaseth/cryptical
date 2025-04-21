
<script lang="ts">
	import { getLocalStorage, setLocalStorage } from "$lib";

	interface Props {
		value: string,
		key: string,
		submitText?: string,
		onSubmit: () => void
	}
	let { value = $bindable(), key, submitText="Submit", onSubmit }: Props = $props();
	let me: HTMLTextAreaElement|null = $state(null);

	let isEmpty = $derived(value === "");

	function copyToClipboard () {
		if (me) {
			me.select();
			document.execCommand("copy");
		}
	}

	function pasteFromClipboard () {
		navigator.clipboard.readText().then(text => {
			value = text;
		});
	}

	function loadFromLS () {
		const cache = getLocalStorage(key);
		if (cache) {
			value = cache;
		}
	}

	function saveToLS () {
		if (value) {
			setLocalStorage(key, value);
		}
	}
</script>

<section class="py-16 space-y-4">
	<textarea class="textarea textarea-primary font-mono block w-full bg-base-200 resize-none"
		bind:value={value} bind:this={me} rows=10 spellcheck="false"></textarea>
	
	<footer class="flex gap-x-2">
		<button onclick={onSubmit} class="btn btn-primary">{submitText}</button>
		<div class="grow"></div>

		{#if isEmpty}
			<button class="btn btn-neutral" onclick={loadFromLS}>Load</button>
			<button class="btn btn-neutral" onclick={pasteFromClipboard}>Paste</button>
		{:else}
			<button class="btn btn-neutral" onclick={() => value = ""}>Clear</button>
			<button class="btn btn-neutral" onclick={copyToClipboard}>Copy</button>
			<button class="btn btn-neutral" onclick={saveToLS}>Save</button>
		{/if}
	</footer>
</section>
