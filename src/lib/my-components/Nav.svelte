<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { AlignJustify } from 'lucide-svelte';
    import * as Sheet from "$lib/components/ui/sheet";
	import DarkMode from './DarkMode.svelte';
    import { navState } from '$lib';
	import { goto } from '$app/navigation';

    let mobileSlider = false;

</script>

<nav class="p-2 border-b-2 flex items-center justify-center">
    <div class="w-full flex items-center justify-between md:max-w-[80%]">
        <div class=" md:hidden">
            <Sheet.Root bind:open={mobileSlider}>
                <Sheet.Trigger>
                    <Button variant="ghost">
                        <AlignJustify />
                    </Button>
                </Sheet.Trigger>
                <Sheet.Content side="left" class="md:hidden">
                    <Sheet.Header class="flex flex-col gap-4 justify-center min-h-[80%]">
                        {#each $navState.defaultNav as route }
                            <a href={route.url} class="text-base text-muted-foreground w-full py-2 text-center {$navState.activeItem === route.url ? "text-slate-950 dark:text-white" : ""}"
                            on:click={() => {
                                $navState.activeItem = route.url;
                                mobileSlider = false;
                            }}
                            >{route.title}</a>
                        {/each}
                      
                        <div class="flex flex-col gap-2">
                            <Button variant="secondary" on:click={() => goto("/login")}>Sign In</Button>
                            <Button on:click={() => goto("/login?register=true")}>Sign Up Free</Button>
                        </div>
    
                    </Sheet.Header>
                </Sheet.Content>
            </Sheet.Root>
        </div>
    
        <div class="hidden md:flex items-center gap-4">
    
            {#each $navState.defaultNav as route }
                <a href={route.url} class="text-base text-muted-foreground w-full py-2 text-center {$navState.activeItem === route.url ? "text-slate-950 dark:text-white" : ""}"
                on:click={() => {
                    $navState.activeItem = route.url;
                    mobileSlider = false;
                }}
                >{route.title}</a>
            {/each}
    
        </div>
    
        <div class="flex items-center gap-2">
            <Button variant="secondary" on:click={() => goto("/login")}>Sign In</Button>
            <Button on:click={() => goto("/login?register=true")}>Sign Up Free</Button>
            <DarkMode />
        </div>
    </div>
</nav>


