<script lang="ts">
    import { Loader } from 'lucide-svelte';

    export let name = "";
    export let loader = false;
    export let loader_name = "";
</script>

{#if loader}
    <div class="flex items-center gap-2">
        <p>{loader_name}</p>
        <Loader size="15px" class="animate-spin"/>
    </div>
{:else}
    <p>{name}</p>
{/if}