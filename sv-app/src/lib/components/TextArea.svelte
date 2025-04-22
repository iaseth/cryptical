
<script lang="ts">
	import { getLocalStorage, setLocalStorage } from "$lib";

	interface Props {
		value: string,
		title?: string,
		rows?: number,
		key: string,
		submitText?: string,
		onSubmit?: () => void,
		hideTopPanel?: boolean,
		hideBottomPanel?: boolean,
	}
	let {
		value = $bindable(), title, rows=10, key,
		submitText="Submit", onSubmit,
		hideTopPanel=false, hideBottomPanel=false
	}: Props = $props();
	let me: HTMLTextAreaElement|HTMLInputElement|null = $state(null);

	let isEmpty = $derived(value === "");
	const textareaId = `textarea-${key}`;

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

<section class="py-4 space-y-4">
	<header class="flex gap-x-2 items-end" hidden={hideTopPanel}>
		{#if title}<label class="font-bold text-sm px-3" for={textareaId}>{title}</label>{/if}
		<div class="grow"></div>

		<div class="join">
			{#if isEmpty}
				<div class="tooltip join-item" data-tip="Load from LocalStorage">
					<button class="btn btn-sm btn-neutral" onclick={loadFromLS}>Load</button>
				</div>

				<div class="tooltip join-item" data-tip="Paste from Clipboard">
					<button class="btn btn-sm btn-neutral" onclick={pasteFromClipboard}>Paste</button>
				</div>
			{:else}
				<div class="tooltip join-item" data-tip="Clear the Input">
					<button class="btn btn-sm btn-neutral" onclick={() => value = ""}>Clear</button>
				</div>

				<div class="tooltip join-item" data-tip="Copy to Clipboard">
					<button class="btn btn-sm btn-neutral" onclick={copyToClipboard}>Copy</button>
				</div>

				<div class="tooltip join-item" data-tip="Save to LocalStorage">
					<button class="btn btn-sm btn-neutral" onclick={saveToLS}>Save</button>
				</div>
			{/if}
		</div>
	</header>

	{#if rows > 1}
		<textarea class="textarea textarea-primary font-mono block w-full bg-base-300 resize-none"
			id={textareaId} bind:value={value} bind:this={me}
			{rows} spellcheck="false"></textarea>
	{:else}
		<input class="input input-primary font-mono block w-full bg-base-300"
			id={textareaId} bind:value={value} bind:this={me}
			spellcheck="false" />
	{/if}

	{#if onSubmit}
		<footer hidden={hideBottomPanel}>
			<button onclick={onSubmit} class="btn btn-primary">{submitText}</button>
		</footer>
	{/if}
</section>
