<script lang="ts">
	import type { PageData } from './$types';

	import { ChevronLeft, PlusCircle, Eye, Trash2 } from 'lucide-svelte';

	import Toasts from '$lib/toasts/Toasts.svelte';
	import { addToast } from '$lib/toasts/store.js';

	export let data: PageData;

	if (data.message == 'Event not found') {
		addToast({
			message: data.message,
			type: 'error',
			dismissible: true,
			timeout: 5000
		});
	} else if (data.message == 'Event deleted') {
		addToast({
			message: data.message,
			type: 'success',
			dismissible: true,
			timeout: 5000
		});
	}

	export let eventView = (id: string) => {
			window.location.href = '/admin/events/view/' + id;
		},
		eventRemove = (id: string) => {
			let confirmation = confirm('Are you sure you want to delete this event?');

			if (confirmation) {
				window.location.href = '/admin/events/remove/' + id;
			}
		};
</script>

<head>
	<title>BitHunt [🛡️] - Events</title>
</head>

<Toasts />

<h1 class="title large nogap">Events</h1>

<h2 class="subtitle medium nogap">
	In BitHunt, each competition you want to run is an event. <br>
	You can create as many events as you want, but only one can be active at a time. <br>
	Players, Stages and Puzzles are all linked to an event. So if a Player registered for Event A, they'd have to register for Event B as well.
</h2>

<div class="buttons">
	<button class="cspp" on:click={() => (window.location.href = '/admin')}>
		<ChevronLeft color="var(--green)" />
		Go Back
	</button>
	<button class="cspp" on:click={() => (window.location.href = '/admin/events/create')}>
		<PlusCircle color="var(--green)" />
		Add New
	</button>
</div>

<table class="table">
	<thead>
		<tr>
			<th>Name</th>
			<th>Date</th>
			<th>Location</th>
			<th>Description</th>
			<th>Prize</th>
			<th>Prize Count</th>
			<th>Status</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each data.events as event}
			<tr>
				<td>{event.name}</td>
				<td>{event.date}</td>
				<td>{event.location}</td>
				<td>{event.description}</td>
				<td>{event.prize}</td>
				<td>{event.prizecount}</td>
				<td>{event.active == true ? 'Active' : 'Inactive'}</td>
				<td>
					<div class="actions">
						<button class="action" on:click={() => eventView(event.id)}>
							<Eye color="var(--green)" />
						</button>
						<button class="action" on:click={() => eventRemove(event.id)}>
							<Trash2 color="var(--green)" />
						</button>
					</div>
				</td>
			</tr>
		{/each}

		{#if data.events.length == 0}
			<tr>
				<td colspan="8">No events found.</td>
			</tr>
		{/if}
	</tbody>
</table>
