<script lang="ts">
    import type { PageData, ActionData } from './$types';

    import { Calendar, Split, Puzzle, Crown, BookMarked, LogOut, LogIn, Home } from 'lucide-svelte';

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
            <LogIn color="var(--green)" />
            Log in
        </button>
        <button class="cspp" type="button" on:click={() => window.location.href = '/'}>
            <Home color="var(--green)" />
            Go Home
        </button>
    </form>
{:else}
    <h2 class="subtitle medium">Chose an option:</h2>

    <div class="buttons">
        <button class="cspp"  on:click={() => window.location.href = "/admin/events"}>
            <Calendar color="var(--green)" />
            Events
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/stages"}>
            <Split color="var(--green)" />
            Stages
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/puzzles"}>
            <Puzzle color="var(--green)" />
            Puzzles
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/leaderboard"}>
            <Crown color="var(--green)" />
            Leaderboard
        </button>

        <button class="cspp" on:click={() => window.location.href = "/admin/leaderboard"}>
            <BookMarked color="var(--green)" />
            Overall
        </button>
    </div>

    <form method="post" class="nocss" action="?/logout">
        <button class="cspp" formaction="?/logout">
            <LogOut color="var(--green)" />
            Log Out
        </button>
    </form>
{/if}