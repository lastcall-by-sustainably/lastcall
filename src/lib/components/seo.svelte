<script lang="ts">
  interface Props {
    title?: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>{title && `${title} - `}LastCall</title>
  <meta name="description" content="Food is calling, pick up!" />
</svelte:head>
