<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { ArrowLeft, MoveUpRight, Quote } from "lucide-svelte";
	import { fade } from "svelte/transition";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import { goto } from "$app/navigation";
    import { page } from "$app/stores";
	import type { CourseModel, ResultModel } from "$lib/types";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import Loader from "$lib/my-components/Loader.svelte";
	import { toast } from "svelte-sonner";
    import { navState } from "$lib";

    $navState.activeItem = "/admission";

    export let data: CourseModel;

    const backToCurrentUrl = () => 
    {
        const nameRef = $page.url.pathname.replace("/admission/", "").replace("/enrollment", "");
        const newName = nameRef.slice(nameRef.indexOf("/") + 1);
        return newName;
    };

    $: currentParentUrl = $page.url.pathname.replace(`${backToCurrentUrl()}/enrollment`, "")



    type EnrollmentVal = {
        present_address: string[]
        religion: string[]
        date_of_birth: string[]
        fathers_fname: string[]
        mothers_fname: string[]
    };

    type EnrollmentHandlerType = {
        msg: string
        errors: EnrollmentVal
    };

    let inputErrors: EnrollmentVal | null = null;
    let enrollmentLoader = false;

    const enrollmentHandlerNews: SubmitFunction = () => 
    {
        enrollmentLoader = true;
        
        return async ({ result, update }) => {
            const {status, data: {msg, errors} } = result as ResultModel<EnrollmentHandlerType>
                
            switch (status) {

                case 200:
                    toast.success("Success", {description: msg});
                    inputErrors = null;
                    enrollmentLoader = false;
                    goto("/status");
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    inputErrors = null;
                    enrollmentLoader = false;
                    break;
                
                case 401:
                    inputErrors = errors;
                    enrollmentLoader = false;
                    break;
                
            };
            await update();
        };
    };

</script>

<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    <div class="flex flex-col items-start sm:flex-row">
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto(data.url)}>
            <ArrowLeft size="18px" />
            Back to {backToCurrentUrl()}
        </Button>

        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto(`${currentParentUrl === "/admission/college/" ? "/admission/seniorhigh" : "/admission/college/"}`)}>
            Jump to {currentParentUrl === "/admission/college/" ? "College Course" : "Senior High Tracks"}
            <MoveUpRight size="18px" />
        </Button>

        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto("/admission")}>
            Jump to Admission
            <MoveUpRight size="18px" />
        </Button>
    
        <Button variant="link" class="flex items-center gap-1 max-w-fit" on:click={() => goto(`${currentParentUrl === "/admission/college/" ? "/admission/seniorhigh" : "/admission/college/"}`)}>
            Jump to {currentParentUrl === "/admission/college/" ? "Senior High Tracks" : "College Courses"}
            <MoveUpRight size="18px" />
        </Button>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
        
        <Card.Root class="w-full border-none">
            <Card.Header class="flex gap-2">
                <Card.Title>Enrollment Form </Card.Title>
                <p>{data.title}</p>
            </Card.Header>

            <Card.Content>
                <form method="post" action={`${data.url}?/enrollment`} enctype="multipart/form-data" use:enhance={enrollmentHandlerNews}>
                    <input name="selected_course" type="hidden" class="hidden" value={data.title} hidden />

                    <div class="flex flex-col gap-4">
            
                        <div class="flex flex-col gap-4">

                            <div class="flex flex-col w-full gap-1.5">
                                <Label for="present_address">Present Address</Label>
                                <Input 
                                class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.present_address ? "bg-red-800 text-white" : ""} " 
                                disabled={enrollmentLoader} name="present_address" type="text" id="present_address" placeholder="Enter your present address." />
                                {#each inputErrors?.present_address ?? [] as errorMsg}
                                    <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                                {/each}
                            </div>

                            <div class="flex flex-col w-full gap-1.5">
                                <Label for="religion">Religion</Label>
                                <Input 
                                class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.religion ? "bg-red-800 text-white" : ""} " 
                                disabled={enrollmentLoader} name="religion" type="text" id="religion" placeholder="Enter you religion." />
                                {#each inputErrors?.religion ?? [] as errorMsg}
                                    <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                                {/each}
                            </div>

                            <div class="flex flex-col w-full gap-1.5">
                                <Label for="date_of_birth">Date Of Birth</Label> 
                                <Input 
                                class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.date_of_birth ? "bg-red-800 text-white" : ""}" 
                                disabled={enrollmentLoader} name="date_of_birth" type="date" id="date_of_birth" />
                                {#each inputErrors?.date_of_birth ?? [] as errorMsg}
                                    <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                                {/each}
                                
                            </div>

                            <div class="flex flex-col w-full gap-1.5">
                                <Label for="fathers_fname">Father's Full Name</Label>
                                <Input 
                                class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.fathers_fname ? "bg-red-800 text-white" : ""}" 
                                disabled={enrollmentLoader} name="fathers_fname" type="text" id="fathers_name" placeholder="Enter your fathers full name." />
                                {#each inputErrors?.fathers_fname ?? [] as errorMsg}
                                    <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                                {/each}
                            </div>

                            <div class="flex flex-col w-full gap-1.5">
                                <Label for="mothers_fname">Mother's Full Name</Label>
                                <Input 
                                class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.mothers_fname ? "bg-red-800 text-white" : ""}" 
                                disabled={enrollmentLoader} name="mothers_fname" type="text" id="mothers_fname" placeholder="Enter your mothers full name." />
                                {#each inputErrors?.mothers_fname ?? [] as errorMsg}
                                    <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                                {/each}
                            </div>

                            <div class="flex flex-col md:flex-row md:justify-end">
                                <Button disabled={enrollmentLoader} type="submit" class="md:max-w-fit">
                                    <Loader name="Submit" loader={enrollmentLoader} loader_name="Sending..." />
                                </Button>
                            </div>
                        </div>
                        
                        
                    </div>
                </form>
            </Card.Content>
        </Card.Root>

        <Card.Root class="w-full border-none">
            <Card.Content>
                <div class="flex flex-col gap-4">
                    
                    <div class="flex flex-col md:mt-5">
                        <blockquote class="mt-6 border-l-2 pl-6 italic "><Quote size="18px" class="transform -scale-x-100" />{data.experience} <Quote size="18px" /></blockquote>

                        <blockquote class="mt-6 border-l-2 pl-6 italic"><Quote size="18px" class="transform -scale-x-100" />{data.opportunities} <Quote size="18px" /></blockquote>

                    </div>

                    
                </div>
            </Card.Content>
        </Card.Root>
    </div>

</div>


