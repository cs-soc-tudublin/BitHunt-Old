<script lang="ts">
    import Thumb from "$lib/assets/bitthumb.svelte";
    import type { PageData, ActionData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;
</script>

<head>
    <title>BitHunt - Clue {data.number}</title>
</head>

<Thumb />

{#if form == null}
    <h1 class="title large">{data.clue.name}</h1>
    <form method="post">
        <label for="answer">
            Answer
            <span class="required">*</span>
        </label>
        <input type="text" name="answer" id="answer" placeholder="Your Answer" required>

        <button class="cspp">
            <i class="fa fa-check"></i>
            Submit!
        </button>
    </form>
{:else if form.status == 200}
    <h1 class="title large">Success!</h1>
    <h2 class="subtitle medium">Your next clue is:
        <br>
        "{form.message}"
    </h2>
{:else if form.status == 400}
    <h1 class="title large">Incorrect!</h1>
    <h2 class="subtitle medium">Try again!</h2>

    <button class="cspp" on:click={() => window.location.href = "/clue/" + data.slug}>
        <i class="fa fa-arrow-left"></i>
        Incorrect password.
    </button>
{/if}