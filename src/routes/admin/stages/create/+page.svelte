<script lang="ts">
	import type { PageData, ActionData } from './$types';

	import Toasts from '$lib/toasts/Toasts.svelte';
	import { addToast } from '$lib/toasts/store.js';

	import { ChevronLeft, PlusCircle } from 'lucide-svelte';

	export let form: ActionData;
	export let data: PageData;

	let date = new Date().toISOString().slice(0, 10);

	// Create toast
	if (form?.status == 200) {
		addToast({
			type: 'success',
			message: form?.message,
			dismissible: true,
			timeout: 5000
		});
	}
</script>

<head>
	<title>BitHunt [🛡️] - Create Stage</title>
</head>

<Toasts />

<h1 class="title large">Create a Stage</h1>

<button class="cspp form-element" on:click={() => (window.location.href = '/admin/stages')}>
	<ChevronLeft color="var(--green)" />
	Back
</button>

<form method="post">
	<label for="name">
		Name
		<span class="required">*</span>
	</label>
	<input type="text" name="name" id="name" placeholder="Stage Name" required />

	<label for="clue">
		Clue
		<span class="required">*</span>
	</label>
	<input type="text" name="clue" id="clue" placeholder="Clue" required />

	<label for="event">
		Event
		<span class="required">*</span>
	</label>
	<select name="event" id="event" required>
		{#each data.events as event}
			<option value={event.id}>{event.name}</option>
		{/each}
	</select>

	<button type="submit" class="cspp form-element primary">
		<PlusCircle color="var(--green)" />
		Create Event
	</button>
</form>
