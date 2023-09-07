<script lang="ts">
	import type { PageData } from './$types';

	import { ChevronLeft, PlusCircle, Eye, Trash2, QrCode } from 'lucide-svelte';

	export let data: PageData;

	export let stageView = (id: string) => {
			window.location.href = '/admin/stages/view/' + id;
		},
		stageRemove = (id: string) => {
			let confirmation = confirm('Are you sure you want to delete this event?');

			if (confirmation) {
				window.location.href = '/admin/stages/remove/' + id;
			}
		},
		stageQR = (id: string) => {
			window.location.href = '/admin/stages/qr/' + id;
		};
</script>

<head>
	<title>BitHunt [🛡️] - Stages</title>
</head>

<h1 class="title large nogap">Stages</h1>

<h2 class="subtitle medium nogap">
	In BitHunt, a 'Stage' is a challenge. <br />
	Players will recieve a Clue, and must solve it to find the next Stage.<br />
	Players must solve all Stages to complete the Event.
</h2>

<div class="buttons">
	<button class="cspp" on:click={() => (window.location.href = '/admin')}>
		<ChevronLeft color="var(--green)" />
		Go Back
	</button>
	<button class="cspp" on:click={() => (window.location.href = '/admin/stages/create')}>
		<PlusCircle color="var(--green)" />
		Add New
	</button>
</div>

<table class="table">
	<thead>
		<tr>
			<th>Name</th>
			<th>Event</th>
			<th>Clue</th>
			<th>UUID</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each data.stages as stage}
			<tr>
				<td>{stage.name}</td>
				<td>{stage.event}</td>
				<td>{stage.clue}</td>
				<td>{stage.uuid}</td>
				<td>
					<div class="actions">
						<button class="action" on:click={() => stageView(stage.id)}>
							<Eye color="var(--green)" />
						</button>
						<button class="action" on:click={() => stageRemove(stage.id)}>
							<Trash2 color="var(--green)" />
						</button>
						<button class="action" on:click={() => stageQR(stage.id)}>
							<QrCode color="var(--green)" />
						</button>
					</div>
				</td>
			</tr>
		{/each}

		{#if data.stages.length == 0}
			<tr>
				<td colspan="8">No events found.</td>
			</tr>
		{/if}
	</tbody>
</table>
