<script lang="ts">
	import { fade } from "svelte/transition";
	import type { PageServerData } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowLeft, MoveUpRight, ArrowRight  } from 'lucide-svelte';
	import { goto } from "$app/navigation";
    import sample_image from "$lib/images/sample_enhance.jpg";
    import * as Card from "$lib/components/ui/card";
	import Loader from "$lib/my-components/Loader.svelte";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { ResultModel } from "$lib/types";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { toast } from "svelte-sonner";

    export let data: PageServerData;

    let authCheckLoader = false;
    let showLoginDialog = false;

    const authCheckNews: SubmitFunction = () => 
    {
        authCheckLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg} } = result as ResultModel<{msg: string}>
                
            switch (status) {

                case 200:
                    toast.success("Success", {description: msg});
                    goto(`${data.url}/enrollment`);
                    authCheckLoader = false;
                    break;
                
                case 401:
                    showLoginDialog = true;
                    authCheckLoader = false;
                    break;

            };
            await update();
        };
    };

</script>

<AlertDialog.Root bind:open={showLoginDialog}>
    <AlertDialog.Content>
        <AlertDialog.Header>

            <AlertDialog.Title>Log in detection failed.</AlertDialog.Title>
            <AlertDialog.Description>
                You have to log in first in order to enroll in this course.
            </AlertDialog.Description>

        </AlertDialog.Header>

        <AlertDialog.Footer class="flex flex-col gap-2 md:flex-row md:gap-0">
            <Button variant="secondary" on:click={() => showLoginDialog = false}>No, thanks</Button>
            <Button on:click={() => goto("/login")}>Sign In now</Button>
            <Button on:click={() => goto("/login?register=true")}>Sign Up Free</Button>
        </AlertDialog.Footer>

    </AlertDialog.Content>
</AlertDialog.Root>


<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    <div class="flex flex-col items-start sm:flex-row">
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission/seniorhigh")}>
            <ArrowLeft size="18px" />
            Back to Senior High Tracks
        </Button>

        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission")}>
            Jump to Admission
            <MoveUpRight size="18px" />
        </Button>
    
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission/college")}>
            Jump to College Courses
            <MoveUpRight size="18px" />
        </Button>
    </div>
    <!-- <enhanced:img src="$lib/images/sample_enhance.jpg" alt="loadddinng" /> -->

    <div class="flex flex-col md:flex-row gap-2">
        <Card.Root class="w-full border-none">
            <Card.Header class="flex gap-2">
                <Card.Title>{data.title}</Card.Title>
                <p class="leading-7 [&:not(:first-child)]:mt-6">{data.intro}</p>
            </Card.Header>

            <Card.Content>
                <div class="flex flex-col gap-4">
                    <img src={data.img} class="w-full" alt="" />

                    <div class="flex flex-col">
                        <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-4 border-b-2 border-orange-500 max-w-fit">About this course</h4>
                        <p class="leading-7 [&:not(:first-child)]:mt-6">{data.compInro}</p>

                        <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-4 border-b-2 border-orange-500 max-w-fit">Specialization</h4>
                        <p class="leading-7 [&:not(:first-child)]:mt-6">{data.specialization}</p>

                        <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-4 border-b-2 border-orange-500 max-w-fit">Curriculum</h4>
                        <p class="leading-7 [&:not(:first-child)]:mt-6">{data.curriculum}</p>
                    </div>

                    
                </div>
            </Card.Content>
        </Card.Root>

        <Card.Root class="w-full border-none">
        
            <Card.Content>
                <div class="flex flex-col">
                  

                    <div class="flex flex-col gap-2">
                        <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-4 border-b-2 border-orange-500 max-w-fit">Experience</h4>
                        <p class="leading-7 [&:not(:first-child)]:mt-6">{data.experience}</p>

                        <h4 class="scroll-m-20 text-lg font-semibold tracking-tight mt-4 border-b-2 border-orange-500 max-w-fit">Opportunities</h4>
                        <p class="leading-7 [&:not(:first-child)]:mt-6">{data.opportunities}</p>

                       
                    </div>

                    <form method="post" action="?/authCheck" enctype="multipart/form-data" use:enhance={authCheckNews} class="flex justify-center">
                        <Button disabled={authCheckLoader} class="mt-5 max-w-fit flex items-center gap-1" type="submit">
                            {#if authCheckLoader}
                                <Loader loader={authCheckLoader} loader_name="Please wait..." />
                            {:else}
                                Enroll Now
                                <ArrowRight size="18px" />
                            {/if}
                        </Button>
                    </form>
                </div>
            </Card.Content>

            
        </Card.Root>
    </div>
</div>