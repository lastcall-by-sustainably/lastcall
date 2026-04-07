<script lang="ts">
  import SEO from '$lib/components/seo.svelte';
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
    <a href="/demo/browse" class="text-[#5a7a5a]" aria-label="Go back to browse">
      <ArrowLeft class="h-7 w-7" strokeWidth={2.5} />
    </a>
    <h1 class="text-2xl font-bold text-foreground">Shopping Cart</h1>
  </header>

  <div class="flex-1 overflow-auto px-4 pb-32">
    <div class="space-y-3">
      {#each cartItems as item (item.id)}
        <div class="flex gap-3 rounded-xl bg-[#f5f8f2] p-3">
          <div class="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
            <enhanced:img src={resolveAssetImage(item.image)} alt={item.name} class="h-full w-full object-cover" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-lg font-semibold text-foreground">{item.name}</h3>
            <p class="text-sm font-medium text-foreground">{item.size}</p>
            <p class="mt-0.5 text-xs leading-tight text-muted-foreground">{item.description}</p>
            <p class="mt-2 text-lg font-bold text-[#c4a000]">${item.price.toFixed(2)}</p>
          </div>

          <div class="flex items-end">
            <div class="flex items-center gap-1">
              <button
                onclick={() => updateQuantity(item.id, -1)}
                class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#5a7a5a] text-[#5a7a5a]"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus class="h-4 w-4" strokeWidth={2.5} />
              </button>
              <span class="w-8 text-center font-medium text-foreground">{item.quantity}</span>
              <button
                onclick={() => updateQuantity(item.id, 1)}
                class="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a7a5a] text-white"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus class="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <a
      href="/demo/browse"
      class="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#8db48e] py-4 font-medium text-white"
    >
      <ArrowLeft class="h-5 w-5" />
      Continue Browsing
    </a>

    <div class="my-6 border-t border-border"></div>

    <div class="mb-6 flex items-center justify-between">
      <span class="text-lg text-foreground">Subtotal</span>
      <span class="text-lg font-medium text-foreground">${subtotal.toFixed(2)}</span>
    </div>

    <div class="mb-6">
      <label for="additional-requests" class="mb-3 block text-lg text-foreground">Additional requests</label>
      <textarea
        id="additional-requests"
        bind:value={additionalRequests}
        class="min-h-20 w-full resize-none rounded-lg border border-border bg-background p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      ></textarea>
    </div>

    <button
      class="flex w-full items-center justify-center gap-3 rounded-full bg-[#3d5a3d] py-4 font-medium text-white"
      onclick={() => toast.success('Thanks for your purchase!')}
    >
      <ShoppingCart class="h-5 w-5" />
      Proceed to checkout ({totalItems} items)
    </button>
  </div>
</div>
