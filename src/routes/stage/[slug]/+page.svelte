<script lang="ts">
    import type { PageData } from './$types';
    import { ChevronLeft, Check } from 'lucide-svelte';
    
    export let data: PageData;

    let lostMessages = [
        "You're lost, go back?",
        "Where'd you come from? Go back!",
        "You're not supposed to be here, go back!",
        "How'd you get here? Go back!",
        "I'm sorry, " + data.player.name + ", I'm afraid I can't do that.",
        "I'm not a teapot, go back!",
        "The secrets of the universe are not here, go back!",
        "This stage is not the stage you're looking for, go back!"
    ]

    let forbiddenMessages = [
        "You jumped the gun a little, go back?",
        "Whoa! Whoa! Whoa! Slow down there! Go back?",
        "You're not supposed to be here yet, go back!",
        "You're not ready for this stage, go back!",
        "This stage is still cooking in the oven, go back!",
        "This stage is not ready yet, go back!",
        "This stage is not the stage you're looking for, go back!",
        "No, I think you missed a turn somewhere, go back!",
        "Check the clue again, go back!"
    ]

    let lostMessage = lostMessages[Math.floor(Math.random() * lostMessages.length)];
    let forbiddenMessage = forbiddenMessages[Math.floor(Math.random() * forbiddenMessages.length)];
</script>

{#if data.status == 404}
    <h1 class="title large">404 - Stage not found!</h1>
    <h2 class="subtitle medium">{lostMessage}</h2>

    <button class="cspp" on:click={() => (window.location.href = '/stage')}>
		<ChevronLeft color="var(--green)" size="32" />
		Back
	</button>
{:else if data.status == 403}
    <h1 class="title large">403 - Forbidden!</h1>
    <h2 class="subtitle medium">{forbiddenMessage}</h2>
    <h3 class="subtitle large"><strong>Your Clue Is:</strong> {data.clue}</h3>

    <button class="cspp" on:click={() => (window.location.href = '/stage')}>
        <ChevronLeft color="var(--green)" size="32" />
        Back
    </button>
{:else}
    <h1 class="title large">Congratulations! You found {data.stage.name}</h1>
    <h2 class="subtitle medium">Press the button below to progress.</h2>

    <form method="POST">
        <input type="hidden" name="stage" value={data.stage.uuid} />
        <button class="cspp" type="submit">
            <Check color="var(--green)" size="32" />
            Submit!
        </button>
    </form>
{/if}