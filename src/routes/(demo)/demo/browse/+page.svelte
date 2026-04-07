<script lang="ts">
	import SEO from '$lib/components/seo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import Search from '@lucide/svelte/icons/search';
	import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal';

	type EnhancedImageModule = { default: any };

	interface Store {
		id: string;
		name: string;
		logo: string;
		address: string;
	}

	const logoModules = import.meta.glob(
		'/src/lib/assets/demo/browse/**/*.{png,PNG}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	) as Record<string, EnhancedImageModule>;

	const logosByFileName = Object.fromEntries(
		Object.entries(logoModules).map(([path, module]) => [path.split('/').pop()?.toLowerCase() ?? '', module])
	) as Record<string, EnhancedImageModule>;

	const fallbackLogo = Object.values(logosByFileName)[0]?.default;

	const resolveStoreLogo = (logoName: string) => {
		const key = logoName.split('/').pop()?.toLowerCase() ?? '';
		return logosByFileName[key]?.default ?? fallbackLogo;
	};

	const mostRecentStores: Store[] = [
		{
			id: '1',
			name: 'Stop & Shop',
			logo: 'stop-and-shop-logo.png',
			address: '440 Russell St, Hadley'
		}
	];

	const favoriteStores: Store[] = [
		{
			id: '2',
			name: 'Big Y',
			logo: 'big-y-logo.png',
			address: '175 Amherst Dr, Amherst'
		},
		{
			id: '1',
			name: 'Stop & Shop',
			logo: 'stop-and-shop-logo.png',
			address: '440 Russell St, Hadley'
		}
	];

	const nearbyStores: Store[] = [
		{
			id: '3',
			name: 'Whole Foods Market',
			logo: 'whole-foods-logo.png',
			address: '327 Russell St, Hadley'
		}
	];

	let searchQuery = $state('');

	const sections: { title: string; stores: Store[] }[] = [
		{ title: 'Most Recent', stores: mostRecentStores },
		{ title: 'Favorites', stores: favoriteStores },
		{ title: "What's Nearby", stores: nearbyStores }
	];
</script>

<SEO title="Demo - Browse Stores" />

<div class="min-h-screen bg-background pb-32">
	<div class="space-y-6 p-6">
		<div class="flex items-center gap-3">
			<div class="relative flex-1">
				<Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
				<Input
					type="text"
					placeholder="City, State, or ZIP"
					bind:value={searchQuery}
					class="h-auto w-full rounded-2xl border-2 border-foreground bg-background py-3 pl-12 pr-4 text-foreground placeholder:text-foreground/50"
				/>
			</div>
			<Button variant="ghost" size="icon" class="h-10 w-10 rounded-lg" aria-label="Open filters">
				<SlidersHorizontal class="h-6 w-6 text-foreground" />
			</Button>
		</div>
	</div>

	<div class="space-y-8 px-6">
		{#each sections as section (section.title)}
			<section>
				<h2 class="mb-4 border-b-2 border-foreground pb-2 text-2xl font-bold">{section.title}</h2>
				<div class="space-y-0">
					{#each section.stores as store, index (`${section.title}-${store.id}-${index}`)}
						<div class="py-6">
							<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div
									class="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border-2 border-foreground bg-white"
								>
									{#if resolveStoreLogo(store.logo)}
										<enhanced:img
											src={resolveStoreLogo(store.logo)}
											alt={store.name}
											class="h-15 w-15 object-contain"
										/>
									{:else}
										<div class="h-15 w-15 rounded bg-muted"></div>
									{/if}
								</div>
								<div>
									<h3 class="text-lg font-semibold text-foreground">{store.address}</h3>
								</div>
							</div>
							<Button
								href="/demo/browse/stop-and-shop"
								class="ml-4 whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold"
							>
								Select
							</Button>
							</div>
						</div>
						{#if index < section.stores.length - 1}
							<Separator class="bg-foreground/10" />
						{/if}
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
