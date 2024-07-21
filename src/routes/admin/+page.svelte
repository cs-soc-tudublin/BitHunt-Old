<script lang="ts">
	import type { PageData, ActionData } from './$types';

	import { Calendar, Split, Puzzle, Crown, BookMarked, LogOut, LogIn, Home } from 'lucide-svelte';

	import Toasts from '$lib/toasts/Toasts.svelte';
	import { addToast } from '$lib/toasts/store.js';

	export let form: ActionData;
	export let data: PageData;
	export let LoggedIn = false;

	if (form == null) {
		if (data.status == 200) {
			addToast({
				message: data.message,
				type: 'success',
				dismissible: true,
				timeout: 5000
			});

			LoggedIn = true;
		} else if (data.status == 500) {
			addToast({
				message: data.message,
				type: 'error',
				dismissible: true,
				timeout: 5000
			});

			LoggedIn = false;
		} else {
			LoggedIn = false;
		}
	} else {
		if (form?.status == 200) {
			addToast({
				message: form?.message,
				type: 'success',
				dismissible: true,
				timeout: 5000
			});

			LoggedIn = true;
		} else if (form?.status == 500) {
			addToast({
				message: form?.message,
				type: 'error',
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
			<LogIn color="var(--green)" size="32" />
			Log in
		</button>
		<button class="cspp" type="button" on:click={() => (window.location.href = '/')}>
			<Home color="var(--green)" size="32" />
			Go Home
		</button>
	</form>
{:else}
	<h2 class="subtitle medium">Chose an option:</h2>

	<div class="container">
		<div class="row">
			<div class="col-lg-4">
				<button class="cspp" on:click={() => (window.location.href = '/admin/events')}>
					<Calendar color="var(--green)" size="32" />
					Events
				</button>
			</div>

			<div class="col-lg-4">
				<button class="cspp" on:click={() => (window.location.href = '/admin/stages')}>
					<Split color="var(--green)" size="32" />
					Stages
				</button>
			</div>

			<div class="col-lg-4">
				<button class="cspp" on:click={() => alert('Puzzles are not complete.')}>
					<Puzzle color="var(--green)" size="32" />
					Puzzles (WIP)
				</button>
			</div>

			<div class="col-lg-6">
				<button class="cspp" on:click={() => alert('Leaderboards are not complete.')}>
					<Crown color="var(--green)" size="32" />
					Leaderboard (WIP)
				</button>
			</div>

			<div class="col-lg-6">
				<button class="cspp" on:click={() => alert('Overall is not complete!')}>
					<BookMarked color="var(--green)" size="32" />
					Overall (WIP)
				</button>
			</div>
		</div>
	</div>

	<form method="post" class="nocss" action="?/logout">
		<button class="cspp" >
			<LogOut color="var(--green)" size="32" />
			Log Out
		</button>
	</form>
{/if}
