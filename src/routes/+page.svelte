<script lang="ts">
	import type { PageData } from './$types';
	import { DoorOpen, Crown, LogOut, LogIn, UserPlus } from 'lucide-svelte';
	import Thumb from '$lib/BitThumb.svelte';

	export let data: PageData;

	let prize = '';

	if (data.status == 200) {
		if (data.event && data.event?.PrizeCount > 1) {
			// Check if last letter is 's'
			if (data.event?.Prize.slice(-1) == 's') {
				prize = data.event?.Prize + 'es';
			} else {
				prize = data.event?.Prize + 's';
			}
		}
	}

	export let register = () => {
			window.location.href = '/register';
		},
		login = () => {
			window.location.href = '/login';
		};
</script>

<head>
	<title>BitHunt</title>
</head>

<div class="container">
	<Thumb />

	<h1 class="title verylarge nogap">BitHunt</h1>

	{#if data.status == 200}
		<div class="row justify-content-center">
			<div class="col">
				<h2 class="subtitle medium nogap"><strong>Today's Event:</strong> {data.event?.Name}</h2>

				<h2 class="subtitle medium nogap">
					<strong>Today's Prize:</strong> One of {data.event?.PrizeCount}
					{prize}!
				</h2>
			</div>
		</div>

		{#if data.validCookie == false}
			<div class="row justify-content-center">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-6">
							<button class="cspp" on:click={() => register()}>
								<UserPlus color="var(--green)" size="32"/>
								Register
							</button>
						</div>
						<div class="col-md-6">
							<button class="cspp" on:click={() => login()}>
								<LogIn color="var(--green)" size="32"/>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="row justify-content-center">
				<div class="container-fluid">
					<div class="row justify-content-center">
						<div class="col-lg-6">
							<button class="cspp" on:click={() => (window.location.href = '/stage')}>
								<DoorOpen color="var(--green)" size="32"/>
								Enter Event
							</button>
						</div>

						<div class="col-lg-6">
							<button class="cspp" on:click={() => (window.location.href = '/logout')}>
								<LogOut color="var(--green)" size="32"/>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<h2 class="subtitle large nogap"><strong>No Event Today</strong></h2>
		<p class="subtitle medium nogap">Please check back later.</p>
	{/if}
</div>
