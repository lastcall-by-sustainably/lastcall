<script lang="ts">
  import SEO from "$lib/components/seo.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import logo from "$lib/assets/logo.png?enhanced";
  import designHome from "$lib/assets/design/design-home.png?enhanced";
  import designBrowse from "$lib/assets/design/design-browse.png?enhanced";
  import designCatalog from "$lib/assets/design/design-catalog.png?enhanced";
  import designCart from "$lib/assets/design/design-cart.png?enhanced";
  import Smartphone from "@lucide/svelte/icons/smartphone";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import Leaf from "@lucide/svelte/icons/leaf";
  import CircleDollarSign from "@lucide/svelte/icons/circle-dollar-sign";
  import Store from "@lucide/svelte/icons/store";
</script>

<SEO />

<div class="w-full flex flex-col items-center">
  <section class="w-full max-w-7xl px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
    <div class="flex-1 flex flex-col items-center md:items-start space-y-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-2">
        <Leaf class="w-4 h-4" /> Eco-friendly grocery shopping
      </div>
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
        Food is calling, <span class="text-primary block mt-2">pick up!</span>
      </h1>
      <p class="text-lg text-muted-foreground max-w-xl leading-relaxed">
        Save the planet and your wallet. LastCall connects you to local grocery stores offering surplus and near-expiration food at a discount.
      </p>
      <div class="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
        <Button href="/demo" class="h-auto rounded-full px-8 py-3.5 text-base font-semibold shadow-sm">
          Try the Demo App <ArrowRight class="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
    <div class="flex-1 shrink-0 flex justify-center">
      <div class="relative">
        <enhanced:img src={logo} alt="LastCall Logo" class="h-64 md:h-80 w-auto object-contain drop-shadow-md" />
      </div>
    </div>
  </section>

  <section class="w-full px-6 py-12">
    <Card.Root class="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center shadow-sm relative overflow-hidden">
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <h2 class="text-3xl font-bold mb-6 text-card-foreground">Why We Re-imagined Groceries</h2>
      <p class="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto relative z-10">
        LastCall is a sustainability-forward app connecting users to grocery stores to help eliminate
        waste. Grocery stores upload surplus or near-expiration items to an online catalog, where you
        can reserve exactly what you want. Our goal is to lower disposal costs for stores, decrease food waste, and provide cheaper grocery options for everyone.
      </p>
    </Card.Root>
  </section>

  <div class="w-full max-w-7xl mx-auto px-6 py-4">
    <Separator class="bg-border/60" />
  </div>

  <section class="w-full px-6 py-20 relative">
    <div class="max-w-350 mx-auto text-center mb-16">
      <h2 class="text-3xl font-bold mb-4">A Seamless Experience</h2>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto">Browse nearby stores, build your cart item by item, and pick it up. Simple and effective.</p>
    </div>
    <div class="max-w-350 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
      {#each [
        { title: "Home Page", img: designHome },
        { title: "Store Search", img: designBrowse },
        { title: "Catalog", img: designCatalog },
        { title: "Shopping Cart", img: designCart }
      ] as design}
        <div class="flex flex-col items-center w-full max-w-75 group">
          <Card.Root class="w-full rounded-2xl p-4 pb-0 shadow-sm mb-6 group-hover:-translate-y-2 transition-transform duration-300">
            <enhanced:img src={design.img} alt={design.title} class="w-full object-contain rounded-t-xl" />
          </Card.Root>
          <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
            <Smartphone class="w-5 h-5 text-primary" /> {design.title}
          </h3>
        </div>
      {/each}
    </div>
  </section>

  <div class="w-full max-w-7xl mx-auto px-6 py-4">
    <Separator class="bg-border/60" />
  </div>

  <section class="w-full px-6 py-24">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">Flexible Pricing</h2>
        <p class="text-muted-foreground text-lg">Choose a plan that fits your grocery needs.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card.Root class="rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-sm hover:border-primary/50 transition-colors">
          <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
            <Store class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold mb-2">One Time Service</h3>
          <p class="text-muted-foreground mb-6 flex-1">
            Pay for an itemized bag when you please. Does not require a subscription. Options range from $0.25 to $7.50.
          </p>
          <div class="text-2xl font-bold">Pay as you go</div>
        </Card.Root>
        
        <Card.Root class="border-2 border-primary rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-md">
          <div class="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-xl font-medium text-sm">Most Popular</div>
          <div class="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mb-6">
            <CircleDollarSign class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold mb-2">Monthly Subscription</h3>
          <p class="text-muted-foreground mb-6 flex-1">
            Get $25 of value to use every single month. Replenishes monthly for consistent savings.
          </p>
          <div class="text-auth"><span class="text-4xl font-bold">$12.99</span><span class="text-muted-foreground">/mo</span></div>
        </Card.Root>
        
        <Card.Root class="rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-sm hover:border-primary/50 transition-colors">
          <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
            <Leaf class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold mb-2">Yearly Subscription</h3>
          <p class="text-muted-foreground mb-6 flex-1">
            Pay for a full year upfront. Enjoy $25 to use every single month on products all year long.
          </p>
          <div class="text-auth"><span class="text-4xl font-bold">$120</span><span class="text-muted-foreground">/yr</span></div>
        </Card.Root>
      </div>
    </div>
  </section>

  <div class="w-full max-w-7xl mx-auto px-6 py-4">
    <Separator class="bg-border/60" />
  </div>

  <section class="w-full px-6 py-20 text-primary-foreground text-center">
    <Card.Root class="max-w-5xl mx-auto flex flex-col items-center bg-primary rounded-3xl p-10 md:p-16 shadow-lg text-primary-foreground">
      <h2 class="text-3xl md:text-5xl font-bold mb-6">Why choose LastCall?</h2>
      <p class="text-primary-foreground/90 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
        Unlike our competitors, we allow users to have more freedom. You pick the groceries you need—our platform is focused on ingredients rather than whole meals. Skip the mystery bags and disappointment, and get exactly the food you want and need.
      </p>
      <Button href="/demo" variant="secondary" class="h-auto rounded-full px-10 py-4 text-lg font-bold shadow-lg">
        Launch Demo App <ArrowRight class="w-5 h-5" />
      </Button>
    </Card.Root>
  </section>
</div>
