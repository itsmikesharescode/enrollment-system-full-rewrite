<script lang="ts">
	import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import ForgotPassword from "./ForgotPassword.svelte";
    import { page } from "$app/stores";
	import { navState } from "$lib";
	import { fade } from "svelte/transition";

    $navState.activeItem = "";

</script>

<div class="" in:fade>
    {#if $page.url.search === "?register=true" }
        <Register />
    {:else if $page.url.search === "?forgot-password=true"}
        <ForgotPassword />
    {:else}
        <Login />
    {/if}
</div>

