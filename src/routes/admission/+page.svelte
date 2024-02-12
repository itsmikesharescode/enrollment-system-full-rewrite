<script lang="ts">
	import { goto } from "$app/navigation";
	import { navState } from "$lib";
	import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import { ArrowRight } from 'lucide-svelte';
	import { fade } from "svelte/transition";

    $navState.activeItem = "/admission";

</script>
<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>

    <div class="flex flex-col gap-2">
        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>College Courses</Card.Title>
            </Card.Header>

            <Card.Content>
                <ul class="flex flex-col gap-2 list-disc px-6">
                    <li>
                        Improve your knowledge and skills. College courses can help you gain new knowledge and skills that can be valuable in your personal and professional life.
                    </li> 
                    
                    <li>
                        Prepare for a career. Many college courses are designed to prepare students for specific careers.
                    </li>

                    <li>
                        Become a more well-rounded person. College courses can help you develop critical thinking, communication, and problem-solving skills.
                    </li>

                    <li>
                        Meet new people. College courses can be a great way to meet new people and make friends.
                    </li>
                </ul>

                <div class="flex justify-center mt-5">
                    <Button class="flex items-center gap-2" on:click={() => goto("/admission/college")}>
                        Explore
                        <ArrowRight size="20px" />
                    </Button>
                </div>
            </Card.Content>

        </Card.Root>

        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>Senior High Tracks</Card.Title>
                <Card.Description>Senior high school, or SHS, is the last two years of secondary education in the Philippines. It is part of the K to 12 Basic Education Program implemented in 2012.</Card.Description>
            </Card.Header>

            <Card.Content>
                <p class="font-bold">Senior high offers three tracks:</p>
                <ul class="flex flex-col gap-2 list-disc px-6">
                    <li>
                        Accountancy, Business and Management (ABM)
                    </li>

                    <li>
                        Humanities and Social Sciences (HUMSS)
                    </li>

                    <li>
                        Science, Technology, Engineering, and Mathematics (STEM)
                    </li>

                    <li>
                        General Academic Strand (GAS)
                    </li>
                </ul>

                <div class="flex justify-center mt-5">
                    <Button class="flex items-center gap-2" on:click={() => goto("/admission/seniorhigh")}>
                        Explore
                        <ArrowRight size="20px" />
                    </Button>
                </div>
            </Card.Content>

        </Card.Root>
    </div>

</div>