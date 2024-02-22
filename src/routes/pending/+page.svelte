<script lang="ts">
    import * as Table from "$lib/components/ui/table";
	import { fade } from "svelte/transition";
    import * as Pagination from "$lib/components/ui/pagination";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { ApplicationModel, ResultModel } from "$lib/types";
	import { toast } from "svelte-sonner";
	import type { PageServerData } from "./$types";
	import { navState } from "$lib";
	import Button from "$lib/components/ui/button/button.svelte";
	import ShowDetails from "./ShowDetails.svelte";

    export let data: PageServerData;

    $navState.activeItem = "/pending";

    type PaginatingTypes = {
        msg: string
        applications: ApplicationModel[]
    };

    let pendingArray: ApplicationModel[] | null | undefined = data.appData?.data;
    
    const paginatingNews: SubmitFunction = () => 
    {
        return async ({ result, update }) => 
        {
            const {status, data: {msg, applications} } = result as ResultModel<PaginatingTypes>
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg});
                    pendingArray = applications;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    break;
            };
            await update();
        };
    };
    
</script>
<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    {#if data.appData}
        <Pagination.Root count={data.appData.data?.length ?? 1} perPage={10} let:pages let:currentPage>
            <Pagination.Content class="mt-5">
                
                {#each pages as page (page.key)}
                    {#if page.type === "ellipsis"}
                        <Pagination.Item>
                            
                        <Pagination.Ellipsis />
                        </Pagination.Item>
                    {:else}
                        <Pagination.Item >
                            <form method="post" action="?/paginate" enctype="multipart/form-data" use:enhance={paginatingNews}>
                                <Pagination.Link {page} isActive={currentPage == page.value} type="submit" name="pageReq" value={page.value} >
                                    {page.value}
                                </Pagination.Link>
                            </form>
                        </Pagination.Item>
                    {/if}
                {/each}
                
            </Pagination.Content>

        </Pagination.Root>
    {/if}
    
    <Table.Root>
        <Table.Header >
        <Table.Row>
            <Table.Head class="w-[200px] truncate">Application Type</Table.Head>
            <Table.Head class="w-full">Full Name</Table.Head>
            <Table.Head class="w-[200px]">Status</Table.Head>
            
        </Table.Row>
        </Table.Header>

        <Table.Body class="">
            
            {#each pendingArray ?? []  as pendingApp }
                <Table.Row>
                    <Table.Cell class="font-medium">{pendingApp.application_type.toUpperCase()}</Table.Cell>
                    <Table.Cell>
                        <ShowDetails {pendingApp} />
                    </Table.Cell>
                    <Table.Cell class="truncate">{pendingApp.is_accepted ? "Accepted" : "Pending"}</Table.Cell>
                    
                </Table.Row>
            {/each}

        </Table.Body>
        
    </Table.Root>
    


</div>
