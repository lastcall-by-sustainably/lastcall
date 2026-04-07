<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";

  let { children } = $props();
</script>

<div class="min-h-svh flex flex-col items-center mx-auto">
	<Header />

	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>

	<Footer />
</div>
