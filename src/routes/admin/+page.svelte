<script lang="ts">
    import type { PageData, ActionData } from './$types';

    import Toasts from "$lib/toasts/Toasts.svelte";
    import { addToast } from "$lib/toasts/store.js";

    export let form: ActionData;
    export let data: PageData;
    export let LoggedIn = false;
    
    if(form == null){
        if(data.status == 200){
            addToast({
                message: data.message,
                type: "success",
                dismissible: true,
                timeout: 5000
            });

            LoggedIn = true;
        }
        else if(data.status == 500){
            addToast({
                message: data.message,
                type: "error",
                dismissible: true,
                timeout: 5000
            });

            LoggedIn = false;
        }
        else{
            LoggedIn = false;
        }
    }
    else{
        if(form?.status == 200){
            addToast({
                message: form?.message,
                type: "success",
                dismissible: true,
                timeout: 5000
            });

            LoggedIn = true;
        }
        else if(form?.status == 500){
            addToast({
                message: form?.message,
                type: "error",
                dismissible: true,
                timeout: 5000
            });

            LoggedIn = false;
        }
    }
</script>

<head>
    <title>BitHunt [🛡️] - Admin Portal</title>
</head>

<Toasts />

{#if LoggedIn == false}
    <h2 class="subtitle medium">Please enter the Administrator Password:</h2>
    <form method="POST" action="?/login">
        <input type="password" name="password" class="form-medium" placeholder="Password" />
        <button class="cspp form-element" type="submit">
            <i class="fa fa-sign-in"></i>
            Log in
        </button>
        <button class="cspp" type="button" on:click={() => window.location.href = '/'}>
            <i class="fa fa-arrow-left"></i>
            Go Home
        </button>
    </form>
{:else}
    <h2 class="subtitle medium">Chose an option:</h2>

    <div class="buttons">
        <button class="cspp"  on:click={() => window.location.href = "/admin/events"}>
            <i class="fa fa-calendar"></i>
            Events
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/stages"}>
            <i class="fa fa-code-fork"></i>
            Stages
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/puzzles"}>
            <i class="fa fa-puzzle-piece"></i>
            Puzzles
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/leaderboard"}>
            <i class="fa fa-trophy"></i>
            Leaderboard
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/leaderboard"}>
            <i class="fa fa-book"></i>
            Overall
        </button>
    </div>

    <form method="post" class="nocss" action="?/logout">
        <button class="cspp" formaction="?/logout">
            <i class="fa fa-sign-out"></i>
            Log Out
        </button>
    </form>
{/if}