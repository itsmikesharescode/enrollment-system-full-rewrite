<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";


</script>

<footer class="bg-black dark:bg-white flex items-center justify-center">
    <p class="leading-7 [&:not(:first-child)]:mt-6 text-white dark:text-black">
        Created and Maintain by
    </p>

    <Button variant="link" class="text-white dark:text-black" on:click={() => window.open("https://www.youtube.com/@mikeSharesCode")}>@mikeSharesCode</Button>
</footer>