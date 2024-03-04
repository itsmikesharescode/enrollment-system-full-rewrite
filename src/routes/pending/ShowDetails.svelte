<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import type { ApplicationModel, FormModel, ResultModel } from "$lib/types";
    import Button from "$lib/components/ui/button/button.svelte";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import { invalidateAll } from "$app/navigation";
	import Loader from "$lib/my-components/Loader.svelte";

    export let pendingApp: ApplicationModel;

    let appDetails: FormModel = JSON.parse(pendingApp.user_application);
    
    let acceptDeclineLoader = false;
    let showDetailsDialog = false;
    const acceptDeclineNews: SubmitFunction = () =>
    {
        acceptDeclineLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg}} = result as ResultModel<{msg: string}>
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg});
                    acceptDeclineLoader = false;
                    invalidateAll();
                    showDetailsDialog = false;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg})
                    acceptDeclineLoader = false;
                    showDetailsDialog = false;
                    break;  
            };
            await update();
        };
    };

</script>



<AlertDialog.Root bind:open={showDetailsDialog}>

    <AlertDialog.Trigger>
        <Button variant="link">{pendingApp.user_fullname}</Button>
    </AlertDialog.Trigger>

    <AlertDialog.Content class="sm:max-w-[700px]">
        <AlertDialog.Header>
            <AlertDialog.Title>{pendingApp.application_type.toUpperCase()}</AlertDialog.Title>

            <AlertDialog.Description class="text-left flex flex-col gap-4">
                <div class="">
                    <p class="font-bold">Selected Course:</p>
                    <p class="text-left">{appDetails.selected_course}</p>
                </div>

                <div class="">
                    <p class="font-bold">Present Address:</p>
                    <p class="text-left">{appDetails.present_address}</p>
                </div>

                <div class="">
                    <p class="font-bold">Religion:</p>
                    <p class="text-left">{appDetails.religion}</p>
                </div>

                <div class="">
                    <p class="font-bold">Date Of Birth:</p>
                    <p class="text-left">{appDetails.date_of_birth}</p>
                </div>

                <div class="">
                    <p class="font-bold">Fathers Name:</p>
                    <p class="text-left">{appDetails.fathers_fname}</p>
                </div>

                <div class="">
                    <p class="font-bold">Mothers Name:</p>
                    <p class="text-left">{appDetails.mothers_fname}</p>
                </div>
            </AlertDialog.Description>

        </AlertDialog.Header>

        <AlertDialog.Footer>
            <AlertDialog.Cancel>Hide</AlertDialog.Cancel>


            <form method="post" action="?/acceptDecline" enctype="multipart/form-data" use:enhance={acceptDeclineNews}>
                <input disabled={acceptDeclineLoader} type="hidden" name="is_accepted" value={JSON.stringify({
                    pendingApp: pendingApp.is_accepted,
                    id: pendingApp.id
                })} />
                <Button type="submit" disabled={acceptDeclineLoader} class="flex items-center gap-1">
                    <Loader loader={acceptDeclineLoader} loader_name="" />
                    {pendingApp.is_accepted ? "Decline" : "Accept"}
                </Button>
            </form>

        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>