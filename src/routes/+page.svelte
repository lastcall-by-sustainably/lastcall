<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-center gap-16 p-8">
  <enhanced:img class="size-full" src="$lib/assets/logo-with-tagline.png" alt="LastCall logo with tagline" />

  <div class="w-full max-w-72 flex flex-col gap-4">
    <Button class="h-16 w-full text-xl font-semibold rounded-full border-border border-4" variant="default" size="lg" href="/browse">Log in</Button>
    <Button class="h-16 w-full text-xl font-semibold rounded-full border-border border-4" variant="outline" size="lg" href="/browse">Sign up</Button>
  </div>
</div>
