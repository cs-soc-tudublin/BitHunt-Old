<script lang="ts">
	import type { PageData } from './$types';

	import { ChevronLeft, Pencil, Save } from 'lucide-svelte';

	export let data: PageData;

	let disabled = true;
	let isActive = false;

	if (data.stage.active == true) {
		isActive = true;
	}

	export let toggleEdit = () => {
		disabled = !disabled;
	};
</script>

<head>
	<title>BitHunt [🛡️] - View {data.stage.name}</title>
</head>

<h1 class="title large">{data.stage.name}</h1>

<div class="buttons">
	<button class="cspp" on:click={() => (window.location.href = '/admin/stages')}>
		<ChevronLeft color="var(--green)" size="32" />
		Back
	</button>

	<button class="cspp" on:click={() => toggleEdit()}>
		<Pencil color="var(--green)" size="32" />
		Edit {data.stage.name}
	</button>
</div>

<form method="post">
	<input type="hidden" name="id" value={data.stage.id} />

	<label for="name">
		Name
		<span class="required">*</span>
	</label>
	<input type="text" name="name" id="name" value={data.stage.name} {disabled} required />

	<label for="clue">
		Clue
		<span class="required">*</span>
	</label>
	<input type="text" name="clue" id="clue" value={data.stage.clue} {disabled} required />

	<label for="Event">
		Event
		<span class="required">*</span>
	</label>
	<select name="event" id="event" {disabled} required>
		{#each data.events as event}
			<option value={event.id} selected={event.id == data.stage.event_id}>{event.name}</option>
		{/each}
	</select>

	<button class="cspp" {disabled}>
		<Save color="var(--green)" size="32" />
		Save
	</button>
</form>
