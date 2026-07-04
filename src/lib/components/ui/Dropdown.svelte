<script lang="ts" module>
	export type DropdownOption = {
		value: string;
		label: string;
		group?: string;
	};

	type Row =
		| { type: 'header'; label: string }
		| { type: 'option'; item: DropdownOption; index: number };
</script>

<script lang="ts">
	import { tick } from 'svelte';

	interface Props {
		options: DropdownOption[];
		value: string;
		name?: string;
		placeholder?: string;
		disabled?: boolean;
		searchable?: boolean;
		searchPlaceholder?: string;
	}

	let {
		options,
		value = $bindable(),
		name,
		placeholder,
		disabled,
		searchable,
		searchPlaceholder
	}: Props = $props();

	const NO_ACTIVE_INDEX = -1;
	const STEP_NEXT = 1;
	const STEP_PREV = -1;

	const uid = $props.id();
	const listId = `${uid}-listbox`;

	let open = $state(false);
	let activeIndex = $state(NO_ACTIVE_INDEX);
	let query = $state('');
	let container = $state<HTMLDivElement>();
	let buttonEl = $state<HTMLButtonElement>();
	let listEl = $state<HTMLUListElement>();
	let searchEl = $state<HTMLInputElement>();

	const items = $derived(
		placeholder == null ? options : [{ value: '', label: placeholder }, ...options]
	);

	const selectedLabel = $derived(
		items.find((item) => item.value === value)?.label ?? placeholder ?? ''
	);

	const isPlaceholder = $derived(!value);

	// An option matches if its own label matches, or its group (event name) does —
	// so searching an event name surfaces every media item belonging to it.
	const matches = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return items.filter((item) => {
			if (item.value === '') return q === '';
			if (q === '') return true;
			return (
				item.label.toLowerCase().includes(q) || (item.group ?? '').toLowerCase().includes(q)
			);
		});
	});

	const rows = $derived.by(() => {
		const result: Row[] = [];
		let lastGroup: string | undefined = undefined;
		matches.forEach((item, index) => {
			if (item.group !== undefined && item.group !== lastGroup) {
				result.push({ type: 'header', label: item.group });
			}
			lastGroup = item.group;
			result.push({ type: 'option', item, index });
		});
		return result;
	});

	function optionId(index: number): string {
		return `${uid}-opt-${index}`;
	}

	function focusInside() {
		tick().then(() => (searchable ? searchEl?.focus() : listEl?.focus()));
	}

	function openList() {
		if (disabled) return;
		open = true;
		query = '';
		activeIndex = Math.max(
			0,
			matches.findIndex((item) => item.value === value)
		);
		focusInside();
	}

	function closeList(refocus = true) {
		open = false;
		activeIndex = NO_ACTIVE_INDEX;
		if (refocus) buttonEl?.focus();
	}

	function toggle() {
		if (open) closeList(false);
		else openList();
	}

	function selectIndex(index: number) {
		const item = matches[index];
		if (item) value = item.value;
		closeList();
	}

	function moveActive(delta: number) {
		const count = matches.length;
		if (count === 0) return;
		activeIndex = Math.min(Math.max(activeIndex + delta, 0), count - 1);
	}

	function onSearchInput() {
		activeIndex = 0;
	}

	function onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (open) moveActive(STEP_NEXT);
				else openList();
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (open) moveActive(STEP_PREV);
				else openList();
				break;
			case 'Home':
				if (open) {
					event.preventDefault();
					activeIndex = 0;
				}
				break;
			case 'End':
				if (open) {
					event.preventDefault();
					activeIndex = matches.length - 1;
				}
				break;
			case 'Enter':
				event.preventDefault();
				if (open) selectIndex(activeIndex);
				else openList();
				break;
			case 'Escape':
				if (open) {
					event.preventDefault();
					closeList();
				}
				break;
			case 'Tab':
				if (open) closeList(false);
				break;
			default:
				break;
		}
	}

	// Outside-click dismissal: bound once per open, not on every keystroke.
	$effect(() => {
		if (!open) return;

		function onPointerDown(event: PointerEvent) {
			if (container && !container.contains(event.target as Node)) closeList(false);
		}
		document.addEventListener('pointerdown', onPointerDown);
		return () => document.removeEventListener('pointerdown', onPointerDown);
	});

	// Keep the active option in view during keyboard navigation.
	$effect(() => {
		if (!open || activeIndex < 0) return;
		document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' });
	});
</script>

<div class="relative" bind:this={container}>
	<button
		type="button"
		bind:this={buttonEl}
		{disabled}
		onclick={toggle}
		onkeydown={onKeyDown}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-controls={listId}
		class="flex w-full items-center justify-between gap-2 rounded border bg-white px-3 py-2 text-left focus:ring-2 focus:ring-blue-700 focus:outline-none disabled:opacity-50"
	>
		<span class={isPlaceholder ? 'text-gray-400' : 'text-gray-900'}>{selectedLabel}</span>
		<svg
			class="h-4 w-4 shrink-0 text-gray-500 transition-transform"
			class:rotate-180={open}
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	{#if name}
		<input type="hidden" {name} {value} />
	{/if}

	{#if open}
		<div class="absolute z-20 mt-1 w-full rounded border border-gray-200 bg-white shadow-lg">
			{#if searchable}
				<div class="border-b border-gray-100 p-2">
					<input
						bind:this={searchEl}
						bind:value={query}
						oninput={onSearchInput}
						onkeydown={onKeyDown}
						type="text"
						role="combobox"
						aria-expanded="true"
						aria-controls={listId}
						aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
						aria-autocomplete="list"
						placeholder={searchPlaceholder ?? 'Suchen...'}
						class="w-full rounded border px-3 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
					/>
				</div>
			{/if}

			<ul
				bind:this={listEl}
				id={listId}
				role="listbox"
				tabindex="-1"
				aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
				onkeydown={onKeyDown}
				class="max-h-60 overflow-auto py-1 focus:outline-none"
			>
				{#each rows as row (row.type === 'option' ? row.item.value : `header-${row.label}`)}
					{#if row.type === 'header'}
						<li
							role="presentation"
							class="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase"
						>
							{row.label}
						</li>
					{:else}
						<li role="presentation">
							<button
								type="button"
								id={optionId(row.index)}
								role="option"
								tabindex="-1"
								aria-selected={row.item.value === value}
								onclick={() => selectIndex(row.index)}
								onpointerover={() => (activeIndex = row.index)}
								class="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-gray-900 focus:outline-none"
								class:bg-blue-100={row.index === activeIndex}
								class:font-semibold={row.item.value === value}
							>
								<span>{row.item.label}</span>
								{#if row.item.value === value}
									<svg
										class="h-4 w-4 shrink-0 text-blue-700"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.79 6.8-6.79a1 1 0 011.4 0z"
											clip-rule="evenodd"
										/>
									</svg>
								{/if}
							</button>
						</li>
					{/if}
				{/each}

				{#if rows.length === 0}
					<li role="presentation" class="px-3 py-2 text-sm text-gray-400">
						Keine Treffer
					</li>
				{/if}
			</ul>
		</div>
	{/if}
</div>
