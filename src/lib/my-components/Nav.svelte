<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { AlignJustify } from 'lucide-svelte';
    import * as Sheet from "$lib/components/ui/sheet";
	import DarkMode from './DarkMode.svelte';
    import { navState } from '$lib';
	import { goto, invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import type { ResultModel } from '$lib/types';
	import Loader from './Loader.svelte';

    let mobileSlider = false;
    let logoutLoader = false;

    const logoutHandlerNews: SubmitFunction = () => 
    {
        logoutLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg} } = result as ResultModel<{msg: string}>
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg} );
                    $navState.session = null;
                    $navState.creator = $navState.defaultNav;
                    goto("/login")
                    logoutLoader = false;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    logoutLoader = false;
                    break;
            };
            await update();
        };
    };

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
                        {#each $navState.creator as route }
                            <a href={route.url} class="text-base text-muted-foreground w-full py-2 text-center {$navState.activeItem === route.url ? "text-slate-950 dark:text-white" : ""}"
                            on:click={() => {
                                $navState.activeItem = route.url;
                                mobileSlider = false;
                            }}
                            >{route.title}</a>
                        {/each}
                      
                        <div class="flex flex-col gap-2">
                            {#if $navState.session}
                                <form method="post" action="/login?/logoutHandler" enctype="multipart/form-data" use:enhance={logoutHandlerNews}>
                                    <Button disabled={logoutLoader} type="submit" variant="destructive">
                                        <Loader name="Log out" loader={logoutLoader} loader_name="Logging out..." />
                                    </Button>
                                </form>
                            {:else}
                                <Button variant="secondary" on:click={() => goto("/login")}>Sign In</Button>
                                <Button on:click={() => goto("/login?register=true")}>Sign Up Free</Button>
                            {/if}
                        </div>
    
                    </Sheet.Header>
                </Sheet.Content>
            </Sheet.Root>
        </div>
    
        <div class="hidden md:flex items-center gap-4">
    
            {#each $navState.creator as route }
                <a href={route.url} class="text-base text-muted-foreground w-full py-2 text-center {$navState.activeItem === route.url ? "text-slate-950 dark:text-white" : ""}"
                on:click={() => {
                    $navState.activeItem = route.url;
                    mobileSlider = false;
                }}
                >{route.title}</a>
            {/each}
    
        </div>
    
        <div class="flex items-center gap-2">
            
            {#if $navState.session}
                <form method="post" action="/login?/logoutHandler" enctype="multipart/form-data" use:enhance={logoutHandlerNews}>
                    <Button disabled={logoutLoader} type="submit" variant="destructive">
                        <Loader name="Log out" loader={logoutLoader} loader_name="Logging out..." />
                    </Button>
                </form>
            {:else}
                <Button variant="secondary" on:click={() => goto("/login")}>Sign In</Button>
                <Button on:click={() => goto("/login?register=true")}>Sign Up Free</Button>
            {/if}
            
            <DarkMode />
        </div>
    </div>
</nav>


