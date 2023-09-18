<script lang="ts">
    import type { PageData } from './$types';
    import { Trophy } from 'lucide-svelte';
    
    export let data: PageData;
</script>

<head>
	<title>BitHunt [🛡️] - Winner!</title>
</head>

<div class="container-flex">
    {#if data.status == 200}
        <h1 class="title large">{data.name}</h1>

        {#if data.winner == 1}
            <h2 class="subtitle medium">Has won the treasure hunt!</h2>
            <p>
                Please give them their prize and mark them off the system.
            </p>

            <form method="post">
                <input type="hidden" name="studentid" value="{data.studentid}" />
                <button class="cspp">
                    <Trophy color="var(--green)" size="32" />
                    They recieved their prize
                </button>
            </form>

        {:else if data.winner == 0}
            <h2 class="subtitle medium">Has not won the treasure hunt!</h2>
            <p>
                They still have some challenges to complete.
            </p>
        {:else if data.winner == 2}
            <h2 class="subtitle medium">Has already been given their prize.</h2>
            <p>
                They are not able to recieve another prize.
            </p>
        {/if}
    {:else}
            <h1 class="title large">{data.status}</h1>
            <h2 class="subtitle medium">{data.message}</h2>
    {/if}
</div>