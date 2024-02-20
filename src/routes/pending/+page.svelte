<script lang="ts">
    import * as Table from "$lib/components/ui/table";
	import { fade } from "svelte/transition";

    import * as Pagination from "$lib/components/ui/pagination";
    
    let sample = ["", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", "",]
   

</script>
<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    <Pagination.Root count={100} perPage={10} let:pages let:currentPage>
        <Pagination.Content>
            <Pagination.Item>
            <Pagination.PrevButton />
            </Pagination.Item>
                {#each pages as page (page.key)}
                    {#if page.type === "ellipsis"}
                        <Pagination.Item>
                            
                        <Pagination.Ellipsis />
                        </Pagination.Item>
                    {:else}
                        <Pagination.Item >
                            <Pagination.Link {page} isActive={currentPage == page.value}>
                                {page.value}
                            </Pagination.Link>
                        </Pagination.Item>
                    {/if}
                {/each}
            <Pagination.Item>
            <Pagination.NextButton />
            </Pagination.Item>

            
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
