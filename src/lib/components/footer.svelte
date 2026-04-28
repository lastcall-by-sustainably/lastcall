<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { resetMode, setMode } from 'mode-watcher';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import GitHubIcon from '$lib/icons/github-icon.svelte';
</script>

<footer class="w-full max-w-7xl flex flex-row items-center justify-between gap-8 p-8">
  <Button
    variant="outline"
    size="icon"
    href="https://github.com/lastcall-by-sustainably/lastcall"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub repository"
  >
    <GitHubIcon />
  </Button>

  <p class="text-sm text-center text-muted-foreground">
    &copy; {new Date().getFullYear()} LastCall. All rights reserved.
  </p>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
      <SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
      <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
      <span class="sr-only">Toggle theme</span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</footer>
