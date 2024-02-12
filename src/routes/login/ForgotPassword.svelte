<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import Loader from "$lib/my-components/Loader.svelte";
	import type { ServerNews } from "$lib/types";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import { fade } from "svelte/transition";


    type ForgotPassValTypes = {
        email_address: string[]
    };

    type ForgotPasswordHandlerTypes = {
        msg: string
        errors: ForgotPassValTypes
    };

    let inputErrors: ForgotPassValTypes | null = null;
    let forgotPassLoader = false;

    const forgotPasswordHandlerNews: SubmitFunction = () => 
    {
        forgotPassLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, errors}} = result as ServerNews<ForgotPasswordHandlerTypes>
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg});
                    forgotPassLoader = false;
                    inputErrors = null;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    forgotPassLoader = false;
                    inputErrors = null;
                    break;
                
                case 401:
                    inputErrors = errors;
                    forgotPassLoader = false;
                    break;
            };
            await update();
        };
    };

</script>

<form method="post" action="?/forgotPasswordHandler" enctype="multipart/form-data" use:enhance={forgotPasswordHandlerNews}
class="flex flex-col gap-4 sm:max-w-sm mx-auto p-4 mt-[10dvh]" in:fade>

    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Recover your account</h3>
    <small class="text-sm font-medium leading-none text-center opacity-50">Log in your account to ICCT Enrollment System</small>

    <div class="flex flex-col w-full gap-1.5 mt-5">
        <Label for="email_address">Email</Label>
        <Input disabled={forgotPassLoader}  name="email_address" type="email" id="email_address" placeholder="Enter your email address." />
        {#each inputErrors?.email_address ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <Button type="submit" disabled={forgotPassLoader}>
        <Loader name="Send Password Reset" loader={forgotPassLoader} loader_name="Sending..." />
    </Button>

    <div class="flex flex-col items-center">
        <div class="flex items-center">
            <p class="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                Already recovered?
            </p>
    
            <Button variant="link" on:click={() => goto("/login")}>Login in here</Button>
        </div>
    
        
    </div>
</form>