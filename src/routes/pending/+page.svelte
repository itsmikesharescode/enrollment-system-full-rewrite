<script lang="ts">
    import * as Table from "$lib/components/ui/table";
	import { fade } from "svelte/transition";
    import * as Pagination from "$lib/components/ui/pagination";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { ApplicationModel, ResultModel } from "$lib/types";
	import { toast } from "svelte-sonner";

    
    let sample = [1, 2, 3, 4, 5, 6,7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,];

    type PaginatingTypes = {
        msg: string
        applications: ApplicationModel[]
    };
    
    const paginatingNews: SubmitFunction = () => 
    {
        return async ({ result, update }) => 
        {
            const {status, data: {msg, applications} } = result as ResultModel<PaginatingTypes>
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg});
                    console.log(applications);
                    break;
                
                case 400:
                    console.log(msg)
                    toast.error("Failed", {description: msg});
                    break;
            };
            await update();
        };
    };
    

</script>
<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    <Pagination.Root count={100} perPage={10} let:pages let:currentPage>
        <Pagination.Content>
           
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

    <Table.Root>
        <Table.Caption>A list of your recent invoices.</Table.Caption>
        <Table.Header >
        <Table.Row>
            <Table.Head class="w-[100px]">Invoice</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Method</Table.Head>
            <Table.Head class="text-right">Amount</Table.Head>
        </Table.Row>
        </Table.Header>

        <Table.Body class="">
           
            {#each sample  as sample }
                <Table.Row>
                    <Table.Cell class="font-medium">INV001</Table.Cell>
                    <Table.Cell>Paid</Table.Cell>
                    <Table.Cell>Credit Card</Table.Cell>
                    <Table.Cell class="text-right">$250.00</Table.Cell>
                </Table.Row>
            {/each}

        </Table.Body>
        
    </Table.Root>

   
</div>
