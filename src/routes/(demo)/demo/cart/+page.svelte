<script lang="ts">
  import SEO from '$lib/components/seo.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Textarea } from '$lib/components/ui/textarea';
  import { toast } from 'svelte-sonner';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Minus from '@lucide/svelte/icons/minus';
  import Plus from '@lucide/svelte/icons/plus';
  import ShoppingCart from '@lucide/svelte/icons/shopping-cart';

  const imageModules = import.meta.glob(
    '/src/lib/assets/demo/cart/*.{avif,AVIF,jpg,JPG}',
    {
    eager: true,
    query: {
      enhanced: true
    }
  }
  ) as Record<string, { default: any }>;

  const enhancedAssets = Object.fromEntries(
    Object.entries(imageModules).map(([path, module]) => [path.split('/').pop()?.toLowerCase() ?? '', module])
  ) as Record<string, { default: any }>;

  const fallbackImage = Object.values(enhancedAssets)[0]?.default;

  const resolveAssetImage = (imageName: string) => {
    const key = imageName.split('/').pop()?.toLowerCase() ?? '';
    return enhancedAssets[key]?.default ?? fallbackImage;
  };

  interface CartItem {
    id: number;
    name: string;
    size: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }

  let cartItems: CartItem[] = $state([
    {
      id: 1,
      name: 'Cheddar Cheese',
      size: '8oz',
      description: 'Sharp cheddar cheese block',
      price: 1.75,
      quantity: 1,
      image: 'cheddar.avif'
    },
    {
      id: 2,
      name: 'Chicken',
      size: 'Half pound',
      description: 'All natural* boneless skinless chicken breasts with rib meat',
      price: 2.5,
      quantity: 2,
      image: 'chicken.jpg'
    },
    {
      id: 3,
      name: 'Eggs',
      size: '1 dozen (12 count)',
      description: 'USDA Grade A certified eggs',
      price: 2.15,
      quantity: 1,
      image: 'eggs.avif'
    }
  ]);

  let additionalRequests = $state('');

  const updateQuantity = (id: number, delta: number) => {
    cartItems = cartItems
      .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
      .filter((item) => item.quantity > 0);
  };

  const subtotal = $derived(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const totalItems = $derived(cartItems.reduce((sum, item) => sum + item.quantity, 0));
</script>

<SEO title="Demo - Shopping Cart" />

<div class="mx-auto flex min-h-screen max-w-md flex-col bg-background">
  <header class="flex items-center gap-4 p-4 pt-6">
    <Button href="/demo/browse" variant="ghost" size="icon" class="h-10 w-10 rounded-full p-0 text-[#5a7a5a]" aria-label="Go back to browse">
      <ArrowLeft class="size-6" strokeWidth={2.5} />
    </Button>
    <h1 class="text-2xl font-bold text-foreground">Shopping Cart</h1>
  </header>

  <div class="flex-1 overflow-auto px-4 pb-32">
    <div class="space-y-3 pt-1">
      {#each cartItems as item (item.id)}
        <Card.Root class="flex flex-row items-start gap-3 rounded-xl bg-[#f5f8f2] p-3">
          <div class="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
            <enhanced:img src={resolveAssetImage(item.image)} alt={item.name} class="h-full w-full object-cover" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-lg font-semibold text-foreground">{item.name}</h3>
            <p class="text-sm font-medium text-foreground">{item.size}</p>
            <p class="mt-0.5 text-xs leading-tight text-muted-foreground">{item.description}</p>
            <p class="mt-2 text-lg font-bold text-[#c4a000]">${item.price.toFixed(2)}</p>
          </div>

          <div class="flex items-end self-stretch">
            <div class="flex items-center gap-1">
              <Button
                onclick={() => updateQuantity(item.id, -1)}
                variant="outline"
                size="icon"
                class="h-8 w-8 rounded-full border-2 border-[#5a7a5a] text-[#5a7a5a]"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus class="h-4 w-4" strokeWidth={2.5} />
              </Button>
              <span class="w-8 text-center text-base font-medium text-foreground">{item.quantity}</span>
              <Button
                onclick={() => updateQuantity(item.id, 1)}
                size="icon"
                class="h-8 w-8 rounded-full bg-[#5a7a5a] text-white hover:bg-[#4c694c]"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus class="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        </Card.Root>
      {/each}
    </div>

    <Button
      href="/demo/browse"
      class="mt-6 h-auto w-full rounded-full bg-[#8db48e] py-4 text-base font-semibold text-white hover:bg-[#7aa17b]"
    >
      <ArrowLeft class="h-5! w-5!" />
      Continue Browsing
    </Button>

    <Separator class="my-6" />

    <div class="mb-6 flex items-center justify-between">
      <span class="text-lg text-foreground">Subtotal</span>
      <span class="text-lg font-medium text-foreground">${subtotal.toFixed(2)}</span>
    </div>

    <div class="mb-6">
      <label for="additional-requests" class="mb-3 block text-lg text-foreground">Additional requests</label>
      <Textarea
        id="additional-requests"
        bind:value={additionalRequests}
        class="min-h-20 resize-none p-3"
      />
    </div>

    <Button
      class="h-auto w-full rounded-full bg-[#3d5a3d] py-4 text-base font-semibold text-white hover:bg-[#324a32]"
      onclick={() => toast.success('Thanks for your purchase!')}
    >
      <ShoppingCart class="h-5! w-5!" />
      Proceed to checkout ({totalItems} items)
    </Button>
  </div>
</div>
