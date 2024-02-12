<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { navState } from "$lib";
    import { Input } from "$lib/components/ui/input";
    import { admissionState } from "../resources";
	import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowLeft } from 'lucide-svelte';
    import { Search } from 'lucide-svelte';
	import { goto } from "$app/navigation";
    import {createSearchStore, searchHandler} from "$lib";
	import { onDestroy } from "svelte";
	import { fade, fly, scale } from "svelte/transition";
	import { flip } from "svelte/animate";
    import { quintOut } from 'svelte/easing';
    import { MoveUpRight } from 'lucide-svelte';

    $navState.activeItem = "/admission";

    const seniorHigh = $admissionState.seniorHigh.map( (seniorHigh) => ({
        ...seniorHigh,
        searchTerms: `${seniorHigh.courses.map((item) => (item.title))} ${seniorHigh.header}`
    }));

    const searchStore = createSearchStore(seniorHigh);
    const unsub = searchStore.subscribe((model) => searchHandler(model));

    onDestroy( () => unsub() );
   
</script>

<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    <div class="flex items-center">
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission")}>
            <ArrowLeft size="18px" />
            Back to Admission
        </Button>
    
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission/college")}>
            Jump to College
            <MoveUpRight size="18px" />
        </Button>
    </div>

    <div class="md:flex">
        <div class="px-4 flex items-center">
            <Search class="absolute ml-2" size="20px"/>
            <Input type="search" placeholder="Search Tracks" class="pl-8 transition-all hover:border-red-500 border-black dark:border-slate-300" bind:value={$searchStore.search} />
        </div>
    </div>

    <div class="flex flex-col md:flex-row md:flex-wrap gap-4 ">
        {#each $searchStore.filtered as section (section.id) }
            <div class="w-full md:max-w-[47%]" transition:fade={{duration: 450}} animate:flip={{duration:750, easing: quintOut}}>
                <Card.Root class="w-full border-none ">
                    <Card.Header>
                        <Card.Title>{section.header}</Card.Title>
                    </Card.Header>

                    <Card.Content class="flex flex-col gap-4">
                        {#each section.courses as course }
                            <a href={course.url} 
                            class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold max-w-fit transition-all hover:underline flex items-center gap-1"
                            >
                            {course.title}
                            <MoveUpRight size="18px" />
                        
                            </a>
                        {/each}
                    </Card.Content>

                </Card.Root> 
            </div>
        {/each} 
    </div>  
</div>