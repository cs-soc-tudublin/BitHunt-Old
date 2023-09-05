<script lang="ts">
    import type { ActionData } from './$types';
    
    export let form: ActionData;
</script>

<head>
    <title>BitHunt - Start</title>
</head>

    {#if form == null}
        <h1 class="title medium">Start your hunt</h1>
        
        <form method="post">
            <label for="name">
                Name
                <span class="required">*</span>
            </label>
            <input type="text" name="name" id="name" placeholder="Your Name" required>

            <label for="studentid">
                Student ID
                <span class="required">*</span>
            </label>
            <input type="text" name="studentid" id="studentid" placeholder="Your Student ID" required>

            <button class="cspp">
                <i class="fa fa-check"></i>
                Start!
            </button>
        </form>
    {:else}
        <h1 class="title large">A user with that Student ID exists! Please try again</h1>
        <button class="cspp" on:click={() => window.location.href = "/start"}>
            <i class="fa fa-arrow-left"></i>
            Go Back
        </button>
    {/if}
