<script lang="ts">
	import type { ActionData } from './$types';

	import Toasts from '$lib/toasts/Toasts.svelte';
	import { addToast } from '$lib/toasts/store.js';

	import { ChevronLeft, PlusCircle } from 'lucide-svelte';

	export let form: ActionData;

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
	<title>BitHunt [🛡️] - Create Event</title>
</head>

<Toasts />

<h1 class="title large">Create an Event</h1>

<button class="cspp form-element" on:click={() => (window.location.href = '/admin/events')}>
	<ChevronLeft color="var(--green)" size="32" />
	Back
</button>

<form method="post">
	<label for="name">
		Name
		<span class="required">*</span>
	</label>
	<input type="text" name="name" id="name" placeholder="Event Name" required />

	<label for="date">
		Date
		<span class="required">*</span>
	</label>
	<input type="date" name="date" id="date" bind:value={date} required />

	<label for="location">
		Location
		<span class="required">*</span>
	</label>
	<input type="text" name="location" id="location" placeholder="Event Location" required />

	<label for="description">
		Description
		<span class="required">*</span>
	</label>
	<textarea name="description" id="description" placeholder="Event Description" required />

	<label for="prize">
		Prize
		<span class="required">*</span>
	</label>
	<input type="text" name="prize" id="prize" placeholder="Event Prize" required />

	<label for="prizeCount">
		Prize Count
		<span class="required">*</span>
	</label>
	<input type="number" name="prizeCount" id="prizeCount" placeholder="Event Prize Count" required />

	<label for="status">
		Status
		<span class="required">*</span>
	</label>
	<select name="status" id="status" required>
		<option value="false">Inactive</option>
		<option value="true">Active</option>
	</select>

	<button type="submit" class="cspp form-element primary">
		<PlusCircle color="var(--green)" size="32" />
		Create Event
	</button>
</form>
