<script lang="ts">
    import Nav from "$lib/my-components/Nav.svelte";
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";
	import type { LayoutData } from "./$types";
	import { onMount } from "svelte";
	import Footer from "$lib/my-components/Footer.svelte";
    import {navState} from "$lib";

    export let data: LayoutData;

    onMount( async () => {
        $navState.session = data.session;
    })
    
</script>
<Toaster position="bottom-left" />
<ModeWatcher />

<Nav />

<div class="mt-5 min-h-screen">
    <slot/>
</div>

<Footer />


