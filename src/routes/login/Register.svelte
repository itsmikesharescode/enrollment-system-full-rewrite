<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import { navState } from "$lib";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import Loader from "$lib/my-components/Loader.svelte";
	import type { ServerNews } from "$lib/types";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import { fade } from "svelte/transition";

    type RegisterValTypes = {
        first_name: string[]
        middle_name: string[]
        last_name: string[]
        email_address: string[]
        password: string[]
        confirm_password: string[]
    };

    type RegisterHandlerTypes = {
        msg: string
        session: Session
        errors: RegisterValTypes
    };

    let inputErrors: RegisterValTypes | null = null;
    let registerLoader = false;
    
    const registerHandlerNews: SubmitFunction = () => 
    {
        registerLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, session, errors} } = result as ServerNews<RegisterHandlerTypes>;
                
            switch (status) {
                case 200:
                    $navState.session = session;
                    toast.success("Success", {description: msg});
                    $navState.creator = $navState.studentNav;
                    goto("/status");
                    registerLoader = false;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    registerLoader = false;
                    inputErrors = null;
                    break;
                
                case 401:
                    inputErrors = errors;
                    registerLoader = false;
                    break;
            };
            await update();
        };
    };

</script>

<form method="post" action="?/registerHandler" enctype="multipart/form-data" use:enhance={registerHandlerNews}
class="flex flex-col gap-4 sm:max-w-sm mx-auto p-4 mt-[10dvh]" in:fade>

    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Register your account</h3>
    <small class="text-sm font-medium leading-none text-center opacity-50">Register your account to ICCT Enrollment System</small>

    <div class="flex flex-col w-full gap-1.5 mt-5">
        <Label for="first_name">First Name</Label>
        <Input  name="first_name" type="text" id="first_name" placeholder="Enter your first name." />
        {#each inputErrors?.first_name ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <div class="flex flex-col w-full gap-1.5">
        <Label for="middle_name">Middle Name</Label>
        <Input  name="middle_name" type="text" id="middle_name" placeholder="Enter your middle name." />
        {#each inputErrors?.middle_name ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <div class="flex flex-col w-full gap-1.5">
        <Label for="last_name">Last Name</Label>
        <Input  name="last_name" type="text" id="last_name" placeholder="Enter your last name." />
        {#each inputErrors?.last_name ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <div class="flex flex-col w-full gap-1.5">
        <Label for="email_address">Email</Label>
        <Input  name="email_address" type="email" id="email_address" placeholder="Enter your email address." />
        {#each inputErrors?.email_address ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <div class="flex flex-col w-full gap-1.5">
        <Label for="password">Password</Label>
        <Input name="password" type="password" id="password" placeholder="Enter your password." />
        {#each inputErrors?.password ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <div class="flex flex-col w-full gap-1.5">
        <Label for="password">Confirm Password</Label>
        <Input name="confirm_password" type="password" id="password" placeholder="Confirm your password." />
        {#each inputErrors?.confirm_password ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <Button type="submit">
        <Loader name="Register" loader={registerLoader} loader_name="Registering..." />
    </Button>

    <div class="flex flex-col items-center">
       
    
        <div class="flex items-center">
            <p class="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                Already have an account?
            </p>
    
            <Button variant="link" on:click={() => goto("/login")}>Log in here</Button>
        </div>
    </div>
</form>