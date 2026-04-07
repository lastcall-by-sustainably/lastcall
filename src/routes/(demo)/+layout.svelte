<script lang="ts">
  import { page } from "$app/state";
  import DemoHeader from "$lib/components/demo-header.svelte";
  import DemoFooter from "$lib/components/demo-footer.svelte";

  let { children } = $props();
</script>

<div class={['min-h-svh flex flex-col items-center max-w-md mx-auto', page.url.pathname === '/demo' && 'bg-[#e6f5de]']}>
	<DemoHeader />

	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>

	<DemoFooter class={page.url.pathname === '/demo' ? 'hidden' : undefined} />
</div>
