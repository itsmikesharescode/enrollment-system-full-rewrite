<script lang="ts">
	import { navState } from "$lib";
    import * as Card from "$lib/components/ui/card";
	import { fade } from "svelte/transition";

    $navState.activeItem = "/scholarship";

</script>

<div class="p-2 flex flex-col gap-2 sm:max-w-[80%] mx-auto" in:fade>
    
    <Card.Root class="border-none">

        <Card.Header>
            <Card.Title>ICCT SCHOLARSHIP PROGRAM</Card.Title>
        </Card.Header>

        <Card.Content>
            <p class="font-bold">What standards apply to scholarships?</p>
            <p>At ICCT Colleges, financial aid is offered in the form of scholarships, student employment, and tuition discounts. From a tiny portion of the tuition to full help for tuition and books, financial aid is available.</p>
        </Card.Content>

    </Card.Root>

    <div class="flex flex-col gap-2 md:flex-row">
        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>Student Assistantship</Card.Title>
            </Card.Header>
    
            <Card.Content>
                <p>ICCT Colleges employs a limited number of responsible students who serve as assistants in some departments of the ICCT Colleges requiring their services. Students may apply but selection depends on their academic performance, ability to do the job and sufficiency of time for work. Payment for services is based on the number of hours rendered. A student who qualified for the Student Assistantship program shall enjoy the tuition-fee discount under the WAYS program.</p>
            </Card.Content>
    
        </Card.Root>

        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>Government Employees and Dependents Discounts</Card.Title>
            </Card.Header>
    
            <Card.Content>
                <p>ICCT Colleges recognizes the hardworking government employees, thus grants a 50% percent discount on the tuition fee of qualified government employees and dependents. However, these discounts are subject for the approval of the President upon submission of the requirements through the Office of Student Affairs.</p>
            </Card.Content>
    
        </Card.Root>
    </div>

    <div class="flex flex-col gap-2 md:flex-row">
        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>MR & MS ICCT SCHOLARSHIP Grant</Card.Title>
            </Card.Header>
    
            <Card.Content>
                <p>A scholarship grant given to the winners of the Search for Mr. & Ms. ICCT. The grant ranges from a FULL SCHOLARSHIP to tuition fee discounts to the deserving winners of the pageant.</p>
            </Card.Content>
    
        </Card.Root>

        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>Siblings Discount</Card.Title>
            </Card.Header>
    
            <Card.Content>
                <p>As a form of incentive, ICCT Colleges offers the following discount: when two or more brothers/sisters enroll during the same term, the second brother/sister shall be granted a 10% discount, the third a 20% discount, the fourth 30% discount, and the succeeding brothers/sisters, a 50% discount.</p>
            </Card.Content>
    
        </Card.Root>
    </div>


    <div class="flex flex-col gap-2 md:flex-row">
        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>Work As You Study "WAYS" Program</Card.Title>
            </Card.Header>
    
            <Card.Content>
                <p>A student may apply as working student via the WAYS program. Students qualified for the program shall be made to pay 100 pesos per unit on the tuition fee as oppose to the regular 130 pesos per unit fee. As another assistance, qualified applicants may be given schedule to work in any division of William and Co. Phils, Inc. or in any of its sister companies or establishment partners.</p>
            </Card.Content>
    
        </Card.Root>

        <Card.Root class="w-full border-none">

            <Card.Header>
                <Card.Title>DR. CONSUELO L. CO "DCLC" SCHOLARSHIP Program</Card.Title>
            </Card.Header>
    
            <Card.Content>
                <p>An institutional scholarship program offered to qualified and deserving high school graduates with Valedictorian, Salutatorian and within the Top 5 graduates status in their High School. Students who will qualify for this scholarship program shall enjoy Full Scholarship Grant and a trimester/semester stipend/allowance respectively.</p>
            </Card.Content>
    
        </Card.Root>
    </div>

    <Card.Root class="border-none">

        <Card.Header>
            <Card.Title>President's List Scholarship Award</Card.Title>
        </Card.Header>

        <Card.Content>
            <p class="font-bold">The President's List Scholarship Award is available to students enrolled at ICCT Colleges. Students under this scholarship shall represent 10% of the total enrollment of the previous trimester. This award shall be based on the following:</p>
            
            <ul class="px-6 py-2 list-disc flex flex-col gap-2">
                <li>
                    The candidate must carry at least a total of 15 units offered of the course for the regular trimester in order to qualify for the scholarship.
                </li>

                <li>
                    A residency requirement of at least one trimester is required.
                </li>

                <li>
                    The student candidate must not have a final grade lower than 2.00 in both academic and non-academic subjects.
                </li>

                <li>
                    The student candidate must have a general weighted average of 1.75 or higher.
                </li>

                <li>
                    A student who obtains a general weighted average of 1.25 or higher shall be entitled to a full tuition scholarship for the next trimester.
                </li>

                <li>
                    A student who obtains a general weighted average between 1.75 and 1.26 shall be entitled to a partial tuition scholarship for the next trimester.
                </li>

                <li>
                    Application for President's List Scholarship Award shall be on a trimestral/semestral basis only.
                </li>

                <li>
                    The candidate must be of good moral character certified by the Career Guidance Counselor supported by the recommendation of any faculty member under whom the candidate has the most number of subjects as well as endorsement by the Vice President for Academic Affairs and the Department Head concerned.
                </li>
            </ul>
        </Card.Content>

    </Card.Root>

</div>