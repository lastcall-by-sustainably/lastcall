<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import catalogLogo from '$lib/assets/browse/stop-and-shop-logo.png?enhanced';

	type EnhancedImageModule = { default: any };

	interface Product {
		id: number;
		name: string;
		price: number;
		image: string;
		available: number;
	}

	interface Filter {
		id: string;
		label: string;
	}

	const imageModules = import.meta.glob('/src/lib/assets/browse/stop-and-shop/*.{webp,WEBP,png,PNG,jpg,JPG}', {
		eager: true,
		query: {
			enhanced: true
		}
	}) as Record<string, EnhancedImageModule>;

	const imageByFile = Object.fromEntries(
		Object.entries(imageModules).map(([path, module]) => [path.split('/').pop()?.toLowerCase() ?? '', module])
	) as Record<string, EnhancedImageModule>;

	const fallbackImage = Object.values(imageByFile)[0]?.default;

	const resolveProductImage = (imageName: string) => {
		const key = imageName.split('/').pop()?.toLowerCase() ?? '';
		return imageByFile[key]?.default ?? fallbackImage;
	};

	let activeFilter = $state('available');

	const products: Product[] = [
		{
			id: 1,
			name: 'Hunt\'s Tomato Paste',
			price: 0.25,
			image: 'tomato-paste.webp',
			available: 2
		},
		{
			id: 2,
			name: 'Mission Tortillas',
			price: 1,
			image: 'tortillas.webp',
			available: 3
		},
		{
			id: 3,
			name: 'Sargento Mozzarella',
			price: 1,
			image: 'mozzarella.jpg',
			available: 7
		},
		{
			id: 4,
			name: 'Perdue Chicken',
			price: 2.5,
			image: 'chicken-breasts.jpg',
			available: 1
		},
		{
			id: 5,
			name: 'Halos Mandarins',
			price: 0.5,
			image: 'mandarins.png',
			available: 5
		},
		{
			id: 6,
			name: 'Land O Lakes Butter',
			price: 0.5,
			image: 'butter.webp',
			available: 6
		},
		{
			id: 7,
			name: 'Fresh Carrots',
			price: 0.5,
			image: 'carrots.jpg',
			available: 4
		},
		{
			id: 8,
			name: 'Cooked Perfect Meatballs',
			price: 0.75,
			image: 'meatballs.jpg',
			available: 2
		}
	];

	const filters: Filter[] = [
		{ id: 'available', label: 'Available Now' },
		{ id: 'recents', label: 'Recents' },
		{ id: 'favorites', label: 'Favorites' },
		{ id: 'sale', label: 'Sale' }
	];
</script>

<div class="mx-auto flex min-h-svh w-full max-w-md flex-col overflow-x-hidden bg-background">
	<header class="p-4 pb-3 pt-6">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div class="flex min-w-0 flex-1 items-center gap-3">
				<a href="/browse" class="text-[#5a7a5a]" aria-label="Go back to browse">
					<ArrowLeft class="h-7 w-7" strokeWidth={2.5} />
				</a>
				<h1 class="truncate text-3xl font-bold text-foreground">Catalog</h1>
			</div>

			<enhanced:img src={catalogLogo} alt="Stop & Shop" class="h-10 w-auto shrink-0 object-contain" />
		</div>

		<div class="flex flex-wrap gap-2 pb-1">
			{#each filters as filter (filter.id)}
				<button
					onclick={() => (activeFilter = filter.id)}
					class={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeFilter ===
					filter.id
						? 'bg-[#3d5a3d] text-white'
						: 'bg-[#b8d9b4] text-foreground'}`}
				>
					{#if filter.id === 'available' && activeFilter === 'available'}
						<span class="mr-1">✓</span>
					{/if}
					{filter.label}
				</button>
			{/each}
		</div>
	</header>

	<div class="flex-1 overflow-auto px-4 pb-24">
		<div class="grid grid-cols-2 gap-3">
			{#each products as product (product.id)}
				<div class="flex flex-col">
					<div class="relative mb-3 flex flex-1 flex-col items-center justify-center rounded-xl bg-[#f5f8f2] p-4">
						<span class="absolute right-3 top-3 text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>

						<div class="mb-2 flex h-32 w-full items-center justify-center">
							{#if resolveProductImage(product.image)}
								<enhanced:img
									src={resolveProductImage(product.image)}
									alt={product.name}
									class="h-20 w-20 object-cover"
								/>
							{:else}
								<div class="h-20 w-20 rounded bg-muted"></div>
							{/if}
						</div>

						<h3 class="line-clamp-2 text-center text-sm font-semibold text-foreground">{product.name}</h3>
					</div>

					<a href="/cart" class="block w-full rounded-full bg-[#3d5a3d] py-2 text-center text-xs font-medium text-white">
						Add to Cart ({product.available} Available)
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
