<script lang="ts">
	import Enrollment from "../../../Enrollment.svelte";
	import type { PageServerData } from "./$types";

    export let data: PageServerData;

</script>

<Enrollment {data} />