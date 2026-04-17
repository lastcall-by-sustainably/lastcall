<script lang="ts">
  import SEO from "$lib/components/seo.svelte";
  import { Button } from '$lib/components/ui/button';
</script>

<SEO title="Demo" />

<div class="flex flex-col items-center gap-16 p-8">
  <div class="size-full">
    <enhanced:img
      src="$lib/assets/logo-with-tagline.png"
      width="708"
      height="978"
      alt="LastCall logo with tagline"
    />
  </div>

  <div class="w-full max-w-72 flex flex-col gap-4">
    <Button class="h-16 w-full text-xl font-semibold rounded-full border-border border-4" variant="default" size="lg" href="/demo/browse">Log in</Button>
    <Button class="h-16 w-full text-xl font-semibold rounded-full border-border border-4 dark:bg-secondary dark:hover:bg-secondary/80" variant="outline" size="lg" href="/demo/browse">Sign up</Button>
  </div>
</div>
