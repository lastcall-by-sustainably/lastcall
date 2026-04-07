<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import SearchIcon from '@lucide/svelte/icons/search';
  import ShoppingBagIcon from '@lucide/svelte/icons/shopping-bag';
  import CircleUserIcon from '@lucide/svelte/icons/circle-user';

  interface Props {
    class?: string;
  }
  let { class: className }: Props = $props();
</script>

<div class={['fixed inset-x-0 bottom-0 z-50', className]}>
  <div class="mx-auto w-full max-w-md flex flex-col bg-background">
    <Separator />

    <div class="w-full flex flex-row items-center p-4">
      <Button class={['flex-1 h-full', page.url.pathname.startsWith('/demo/browse') ? 'text-foreground' : 'text-muted-foreground']} variant="ghost" href="/demo/browse">
        <div class="flex flex-col items-center gap-1">
          <SearchIcon class="size-6" />
          Browse
        </div>
      </Button>

      <Button class={['flex-1 h-full', page.url.pathname.startsWith('/demo/cart') ? 'text-foreground' : 'text-muted-foreground']} variant="ghost" href="/demo/cart">
        <div class="flex flex-col items-center gap-1">
          <ShoppingBagIcon class="size-6" />
          Cart
        </div>
      </Button>

      <Button class={['flex-1 h-full', page.url.pathname.startsWith('/demo/account') ? 'text-foreground' : 'text-muted-foreground']} variant="ghost" href="/demo">
        <div class="flex flex-col items-center gap-1">
          <CircleUserIcon class="size-6" />
          Account
        </div>
      </Button>
    </div>
  </div>
</div>
