<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher defaultMode="light" />

<Toaster richColors />

<div class="min-h-svh flex flex-col items-center max-w-md mx-auto">
	<Header />

	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>
</div>
