<script lang="ts">
    import Nav from "$lib/my-components/Nav.svelte";
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";
	import type { LayoutData } from "./$types";
	import Footer from "$lib/my-components/Footer.svelte";
    import {navState, studentState} from "$lib";
	import { onMount } from "svelte";

    export let data: LayoutData;

    onMount( () => {

        if(data.session){
            const {user: {user_metadata: {full_name, role}}} = data.session;
            $navState.session = data.session;
            $studentState.student_form = data.get_application.data;
            if(role === "student") $navState.creator = $navState.studentNav;
            else if(role === "admin") $navState.creator = $navState.adminNav;
        }else{
            $navState.creator = $navState.defaultNav;
        }
    });


    
    
</script>
<Toaster position="bottom-left" />
<ModeWatcher />

<Nav />

<div class="mt-5 min-h-screen">
    <slot/>
</div>

<Footer />


