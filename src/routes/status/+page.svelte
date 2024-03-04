<script lang="ts">  
    import { navState, studentState } from "$lib";
	import { fade } from "svelte/transition";
	import type { PageServerData } from "./$types";
	import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowLeft, MoveUpRight, Quote } from "lucide-svelte";
	import { goto } from "$app/navigation";
    import { admissionState } from "../admission/resources";
	import type { CourseModel, FormModel } from "$lib/types";
    import * as Card from "$lib/components/ui/card";
	import DeleteApplication from "./DeleteApplication.svelte";
	import UpdateApplication from "./UpdateApplication.svelte";

    export let data: PageServerData;

    $navState.activeItem = "/status";

    let courseModel: CourseModel | null = null;
    let student_form: FormModel | null = null;

    const getCourseModel = (application_type: "college" | "senior high", course_title: string ) => 
    {
        if(application_type === "college"){
            $admissionState.college.forEach(outerItem => {
                outerItem.courses.forEach(innerItem => {
                    innerItem.title === course_title ? courseModel = innerItem : "";
                });
            });
        }else if(application_type === "senior high"){
            $admissionState.seniorHigh.forEach(outerItem => {
                outerItem.courses.forEach(innerItem => {
                    innerItem.title === course_title ? courseModel = innerItem : "";
                });
            });
        }
    };

    $: {
        if(data.get_application.data) {
            $studentState.student_form = data.get_application.data;
            
            if($studentState.student_form){
                student_form = JSON.parse($studentState.student_form.user_application);
                getCourseModel($studentState.student_form.application_type, student_form?.selected_course as string);
            };
        }else $studentState.student_form = null;
    }
  
</script>

<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    

    {#if $studentState.student_form}
        
        <div class="flex flex-col gap-4 md:flex-row">
            <div class="w-full">
                <Card.Root class="border-none">
                    <Card.Header>
                        <Card.Title>Status: {$studentState.student_form.is_accepted ? "Accepted" : "Pending"}</Card.Title>
                        <Card.Description>Your application are still in process.</Card.Description>
                    </Card.Header>
                   
                    <Card.Content class="flex flex-col gap-4">
                        <div class="">
                            <p>Selected Course:</p>
                            <p class="text-sm text-muted-foreground">{student_form?.selected_course}</p>
                        </div>

                        <div class="">
                            <p>Present Address:</p>
                            <p class="text-sm text-muted-foreground">{student_form?.present_address}</p>
                        </div>

                        <div class="">
                            <p>Religion:</p>
                            <p class="text-sm text-muted-foreground">{student_form?.religion}</p>
                        </div>

                        <div class="">
                            <p>Date Of Birth:</p>
                            <p class="text-sm text-muted-foreground">{student_form?.date_of_birth}</p>
                        </div>

                        <div class="">
                            <p>Father's Name:</p>
                            <p class="text-sm text-muted-foreground">{student_form?.fathers_fname}</p>
                        </div>

                        <div class="">
                            <p>Mother's Name:</p>
                            <p class="text-sm text-muted-foreground">{student_form?.mothers_fname}</p>
                        </div>

                        
                    </Card.Content>
    
                    <Card.Footer class="flex flex-col md:flex-row items-center gap-2 md:justify-end">
                        
                        <DeleteApplication />
                     
                        {#if student_form}
                            <UpdateApplication {student_form} />
                        {/if}
                    </Card.Footer>
                </Card.Root>
            </div>
    
            <div class="w-full">
                <Card.Root class="border-none">
                    
    
                    <Card.Content>
                        <div class="flex flex-col gap-4">
                    
                            <div class="flex flex-col md:mt-5">
                                <blockquote class="mt-6 border-l-2 pl-6 italic "><Quote size="18px" class="transform -scale-x-100" />{courseModel?.experience} <Quote size="18px" /></blockquote>
        
                                <blockquote class="mt-6 border-l-2 pl-6 italic"><Quote size="18px" class="transform -scale-x-100" />{courseModel?.opportunities} <Quote size="18px" /></blockquote>
        
                            </div>
                        </div>
                    </Card.Content>
                    
                    
                </Card.Root>
            </div>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center mt-[20dvh]">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">There is no application form.</h3>
            <Button variant="link" class="flex items-center gap-1" on:click={() => goto("/admission")}>
                Submit form now
                <MoveUpRight size="18px" />
            </Button>
        </div>
    {/if}
</div>