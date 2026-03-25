<script lang="ts">
	import './layout.css';
	import { page, navigating } from '$app/state';
  import { fade } from 'svelte/transition';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher defaultMode="light" />

<Toaster richColors position="top-center" />

{#if navigating.to}
  <div
		class="fixed top-0 left-0 z-50 h-1 w-full animate-slide-gradient bg-linear-to-r from-primary via-[#b8d9b4] to-primary bg-size-[200%_100%]"
    in:fade={{ delay: 300 }}
  ></div>
{/if}

<div class={['min-h-svh flex flex-col items-center max-w-md mx-auto', page.url.pathname === '/' && 'bg-[#e6f5de]']}>
	<Header />

	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>

	<Footer class={page.url.pathname === '/' ? 'hidden' : undefined} />
</div>
