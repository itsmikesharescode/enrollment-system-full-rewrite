<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowRight } from 'lucide-svelte';
    import { generatedText, navState } from "$lib";
	import { onDestroy } from "svelte";
	import { fade, scale } from "svelte/transition";
	import { goto } from "$app/navigation";

    $navState.activeItem = "/";

    let displayText = $generatedText[Math.round(Math.random() * $generatedText.length - 1)] === "undefined" ? $generatedText[Math.round(Math.random() * $generatedText.length - 1)] : $generatedText[Math.round(Math.random() * $generatedText.length - 1)];

    const unsub = setInterval(() => {
        displayText = $generatedText[Math.round(Math.random() * $generatedText.length - 1)];
    }, 3500);

    onDestroy(() => clearInterval(unsub));
    

</script>

<div class="flex flex-col items-center justify-center sm:max-w-xl mx-auto min-h-[70dvh] p-2" in:fade>
    
   {#key displayText}
        <blockquote class="mt-6 border-l-2 pl-6 italic" in:fade={{duration:450}}>"{displayText}"</blockquote>
    {/key}

    <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 max-w-fit mt-10">
        ICCT Enrollment System
    </h2>

    <p class="leading-7 [&:not(:first-child)]:mt-6 text-center">
        Where simplicity meets efficiency! Let our friendly interaction guide you through the process seamlessly, making enrollment a breeze.
    </p>

    <p class="leading-7 [&:not(:first-child)]:mt-6 text-center">
        Say goodbye to complexities and hello to hassle-free enrollment. Let's get started!"
    </p>

    <div class="mt-5">
        <Button class="flex items-center gap-2" on:click={() => goto("/login")}>
            Get started
            <ArrowRight size="20px" />
        </Button>
    </div>

</div>