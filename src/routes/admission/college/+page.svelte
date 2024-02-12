<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { navState } from "$lib";
    import { Input } from "$lib/components/ui/input";
    import { admissionState } from "../resources";
	import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowLeft, MoveUpRight } from 'lucide-svelte';
    import { Search } from 'lucide-svelte';
	import { goto } from "$app/navigation";
    import {createSearchStore, searchHandler} from "$lib";
	import { onDestroy } from "svelte";
	import { fade, fly, scale } from "svelte/transition";
	import { flip } from "svelte/animate";
    import { quintOut } from 'svelte/easing';

    $navState.activeItem = "/admission";

    const college = $admissionState.college.map( (college) => ({
        ...college,
        searchTerms: `${college.courses.map((item) => (item.title))} ${college.header}`
    }));

    const searchStore = createSearchStore(college);
    const unsub = searchStore.subscribe((model) => searchHandler(model));

    onDestroy( () => unsub() );
   
</script>

<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    <div class="flex items-center">
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission")}>
            <ArrowLeft size="18px" />
            Back to Admission
        </Button>
    
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission/seniorhigh")}>
            Jump to Senior High
            <MoveUpRight size="18px" />
        </Button>
    </div>

    <div class="md:flex mt-5">
        <div class="px-4 flex items-center">
            <Search class="absolute ml-2" size="20px"/>
            <Input type="search" placeholder="Search Course" class="pl-8 transition-all hover:border-red-500 border-black dark:border-slate-300" bind:value={$searchStore.search} />
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
                                class="relative rounded bg-muted flex items-center gap-1 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold max-w-fit transition-all hover:underline">
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