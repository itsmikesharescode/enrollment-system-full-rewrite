<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
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

    type LoginValTypes = {
        email_address: string[]
        password: string[]
    };

    type LoginHandlerTypes = {
        msg: string
        session: Session
        errors: LoginValTypes
    };

    let inputErrors: LoginValTypes | null = null;
    let loginLoader = false;

    const loginHandlerNews: SubmitFunction = () => 
    {
        loginLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, session, errors} } = result as ServerNews<LoginHandlerTypes>;
                
            switch (status) {
                case 200:
                    $navState.session = session;
                    toast.success("Success", {description: msg});
                    loginLoader = false;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    inputErrors = null;
                    loginLoader = false;
                    break;

                case 401:
                    inputErrors = errors;
                    loginLoader = false;

                break;
                
            };
            await update();
        };
    };

</script>

<form method="post" action="?/loginHandler" enctype="multipart/form-data" use:enhance={loginHandlerNews}
class="flex flex-col gap-4 sm:max-w-sm mx-auto p-4 mt-[10dvh]" in:fade>

    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Log in your account</h3>
    <small class="text-sm font-medium leading-none text-center opacity-50">Log in your account to ICCT Enrollment System</small>

    <div class="flex flex-col w-full gap-1.5 mt-5">
        <Label for="email_address">Email</Label>
        <Input disabled={loginLoader}  name="email_address" type="email" id="email_address" placeholder="Enter your email address." />
       {#each inputErrors?.email_address ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
       {/each}
    </div>

    <div class="flex flex-col w-full gap-1.5">
        <Label for="password">Password</Label>
        <Input disabled={loginLoader} name="password" type="password" id="password" placeholder="Enter your password." />
        {#each inputErrors?.password ?? [] as errorMsg}
            <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
        {/each}
    </div>

    <Button type="submit" disabled={loginLoader}>
        <Loader name="Log in" loader={loginLoader} loader_name="Logging in..." />
    </Button>

    <div class="flex flex-col items-center">
        <div class="flex items-center">
            <p class="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                Forgot Password?
            </p>
    
            <Button variant="link" on:click={() => goto("/login/?forgot-password=true")}>Recover here</Button>
        </div>
    
        <div class="flex items-center">
            <p class="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                Don't have an account?
            </p>
    
            <Button variant="link" on:click={() => goto("/login/?register=true")}>Register here</Button>
        </div>
    </div>
</form>