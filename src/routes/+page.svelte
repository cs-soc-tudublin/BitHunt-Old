<script lang="ts">
    import type { PageData } from './$types';
    import Thumb from "$lib/assets/bitthumb.svelte";

    export let data: PageData;

    console.log(data);

    export let register = () =>{
        window.location.href = "/register";
    },
    login = () =>{
        window.location.href = "/login";
    }
</script>

<head>
    <title>BitHunt</title>
</head>

<Thumb />

<h1 class="title verylarge nogap">BitHunt</h1>

{#if data.status == 200}
    <h2 class="subtitle medium nogap"><strong>Today's Event:</strong> {data.event.name}</h2>

    <div class="buttons">
        <button class="cspp" on:click={() => register()}>
            <i class="fa fa-user-plus"></i>
            Register
        </button>

        <button class="cspp" on:click={() => login()}>
            <i class="fa fa-user"></i>
            Login
        </button>
    </div>
{:else}
    <h2 class="subtitle large nogap"><strong>No Event Today</strong></h2>
    <p class="subtitle medium nogap">Please check back later.</p>
{/if}