<script lang="ts">
	import { goto } from "$app/navigation";
    import { page } from "$app/stores";
	import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowLeft } from 'lucide-svelte';
    import { ShieldAlert } from 'lucide-svelte';

    const errorObject: {msg: string, callbackUrl: string, title: string} = JSON.parse($page.error?.message as string);

</script>

<div class="min-h-[60dvh] flex flex-col gap-2 justify-center items-center p-4">
    <ShieldAlert size="100px"/>
    <p class="text-center">Sorry it seems you are using the website in a wrong way!</p>
    <p class="text-red-600 font-bold">Error {$page.status} {errorObject.msg}</p>
    <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto(errorObject.callbackUrl)}>
        <ArrowLeft size="18px" />
        Back to {errorObject.title}
    </Button>
    
</div>