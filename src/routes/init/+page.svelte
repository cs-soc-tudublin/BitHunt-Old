<script lang="ts">
    import Thumb from "$lib/assets/bitthumb.svelte";
    import type { PageData, FormData } from './$types';
    
    export let data: PageData;
    export let form: FormData;

</script>

<head>
    <title>BitHunt - Initialise Database</title>
</head>

<Thumb />

<h1 class="title large">Backend Initialisation.</h1>

{#if data.code == 400}
    <form method="post">

        <label for="password">
            Admin Password
            <span class="required">*</span>
        </label>
        <input type="password" name="password" id="password" placeholder="Password" required>
        
            <button class="cspp">
                <i class="fa fa-check"></i>
                Initialise!
            </button>
    </form>
{/if}