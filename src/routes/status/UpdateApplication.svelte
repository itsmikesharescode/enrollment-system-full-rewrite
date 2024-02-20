<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Loader from "$lib/my-components/Loader.svelte";
	import { Button } from "$lib/components/ui/button";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { FormModel, ResultModel } from "$lib/types";
	import { toast } from "svelte-sonner";
	import { invalidateAll } from "$app/navigation";
    import { studentState } from "$lib";

    export let student_form: FormModel;

    type UpdateValTypes = {
        selected_course: string[]
        present_address: string[]
        religion: string[]
        date_of_birth: string[]
        fathers_fname: string[]
        mothers_fname: string[]
    };

    let updateLoader = false;
    let inputErrors: UpdateValTypes | null = null;
    let updateDialog = false;

    const updateApplicationNews: SubmitFunction = () => 
    {
        updateLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, errors} } = result as ResultModel<{msg: string, errors: UpdateValTypes}>;
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg});
                    invalidateAll();
                    inputErrors = null;
                    updateLoader = false;
                    updateDialog = false;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    inputErrors = null;
                    updateLoader = false;
                    break;
                
                case 401:
                    inputErrors = errors;
                    updateLoader = false;
                    break;
            };
            await update();
        };
    };

</script>
<AlertDialog.Root bind:open={updateDialog} >
    <AlertDialog.Trigger class="w-full md:w-fit">
        <Button class="w-full md:w-fit">Update Information</Button>
    </AlertDialog.Trigger>
    
    
        <AlertDialog.Content class="" >
            <AlertDialog.Header>
                <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                
                <AlertDialog.Description >You are about to update your application form.</AlertDialog.Description>
            </AlertDialog.Header>

            <form method="post" action="?/update_application" enctype="multipart/form-data" use:enhance={updateApplicationNews} 
            class="flex flex-col gap-4"
            >
                <input name="selected_course" type="hidden" class="hidden" value={student_form.selected_course} hidden />
                <div class="flex flex-col gap-4">
        
                    <div class="flex flex-col gap-4">

                        <div class="flex flex-col w-full gap-1.5">
                            <Label for="present_address">Present Address</Label>
                            <Input 
                            class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.present_address ? "bg-red-800 text-white" : ""} " 
                            disabled={updateLoader} name="present_address" type="text" id="present_address" placeholder="Enter your present address." />
                            {#each inputErrors?.present_address ?? [] as errorMsg}
                                <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                            {/each}
                        </div>

                        <div class="flex flex-col w-full gap-1.5">
                            <Label for="religion">Religion</Label>
                            <Input 
                            class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.religion ? "bg-red-800 text-white" : ""} " 
                            disabled={updateLoader} name="religion" type="text" id="religion" placeholder="Enter you religion." />
                            {#each inputErrors?.religion ?? [] as errorMsg}
                                <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                            {/each}
                        </div>

                        <div class="flex flex-col w-full gap-1.5">
                            <Label for="date_of_birth">Date Of Birth</Label> 
                            <Input 
                            class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.date_of_birth ? "bg-red-800 text-white" : ""}" 
                            disabled={updateLoader} name="date_of_birth" type="date" id="date_of_birth" />
                            {#each inputErrors?.date_of_birth ?? [] as errorMsg}
                                <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                            {/each}
                            
                        </div>

                        <div class="flex flex-col w-full gap-1.5">
                            <Label for="fathers_fname">Father's Full Name</Label>
                            <Input 
                            class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.fathers_fname ? "bg-red-800 text-white" : ""}" 
                            disabled={updateLoader} name="fathers_fname" type="text" id="fathers_name" placeholder="Enter your fathers full name." />
                            {#each inputErrors?.fathers_fname ?? [] as errorMsg}
                                <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                            {/each}
                        </div>

                        <div class="flex flex-col w-full gap-1.5">
                            <Label for="mothers_fname">Mother's Full Name</Label>
                            <Input 
                            class="border-slate-600 transition-all hover:border-red-500 {inputErrors?.mothers_fname ? "bg-red-800 text-white" : ""}" 
                            disabled={updateLoader} name="mothers_fname" type="text" id="mothers_fname" placeholder="Enter your mothers full name." />
                            {#each inputErrors?.mothers_fname ?? [] as errorMsg}
                                <p class="text-sm text-red-600 dark:opacity-70">{errorMsg}</p>
                            {/each}
                        </div>
                    </div>
                </div>
                
                <AlertDialog.Footer class="flex flex-col gap-2 sm:gap-0">
                    <Button on:click={() => updateDialog = false}>Cancel</Button>
                    <Button variant="destructive" type="submit">
                        <Loader name="Continue" loader={updateLoader} loader_name="Updating..." />
                    </Button>
                </AlertDialog.Footer>

            </form>

        </AlertDialog.Content>
    
</AlertDialog.Root>