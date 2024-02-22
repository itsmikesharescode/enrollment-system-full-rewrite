<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import type { ApplicationModel, FormModel } from "$lib/types";
    import Button from "$lib/components/ui/button/button.svelte";

    export let pendingApp: ApplicationModel;

    let appDetails: FormModel = JSON.parse(pendingApp.user_application);

</script>



<AlertDialog.Root>

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
            <AlertDialog.Action>
                {pendingApp.is_accepted ? "Decline" : "Accept"}
            </AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>