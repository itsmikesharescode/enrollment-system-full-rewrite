<script lang="ts">
	import { enhance } from "$app/forms";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { FormModel, ResultModel } from "$lib/types";
    import { studentState } from "$lib";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import Loader from "$lib/my-components/Loader.svelte";
	import { invalidateAll } from "$app/navigation";
 
    let delete_dialog = false;
    let delete_application_loader = false;
    const deleteApplicationNews: SubmitFunction = () => 
    {
        delete_application_loader = true;
        return async ({ result, update }) => 
        {
            const {status, data:{msg} } = result as ResultModel<{msg: string}>
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg});
                    $studentState.student_form = null;
                    delete_application_loader = false;
                    delete_dialog = false;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    delete_application_loader = false;
                    break;    
            };
            await update();
        };
    };

</script>


<AlertDialog.Root bind:open={delete_dialog}>
    <AlertDialog.Trigger class="w-full md:max-w-fit">
        <Button variant="destructive" class="w-full">Delete Application</Button>
    </AlertDialog.Trigger>

    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>

            <AlertDialog.Description>
                This action cannot be undone. This will permanently delete your application.
            </AlertDialog.Description>

        </AlertDialog.Header>

        <AlertDialog.Footer class="flex flex-col gap-2 md:gap-0">
            <Button on:click={() => delete_dialog = false}>Cancel</Button>

            <form method="post" action="?/delete_application" enctype="multipart/form-data" use:enhance={deleteApplicationNews}>
                <input name="student_form_id" type="hidden" class="hidden" value={$studentState.student_form?.id} hidden />
                <Button disabled={delete_application_loader} type="submit" variant="destructive" class="w-full">
                    <Loader name="Proceed" loader={delete_application_loader} loader_name="Deleting..." />
                </Button>
            </form>
            
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
