<script lang="ts">
	import type { ActionData } from './$types';

	import { ChevronLeft, UserPlus } from 'lucide-svelte';
</script>

<head>
	<title>BitHunt - Create Account</title>
</head>

<h1 class="title large">Create an Account</h1>

<button class="cspp" on:click={() => (window.location.href = '/')}>
	<ChevronLeft color="var(--green)" size="32" />
	Go Back
</button>

<form method="post">
	<label for="name">
		Given Name
		<span class="required">*</span>
	</label>
	<input type="text" name="name" id="name" placeholder="Given Name" required />

	<label for="studentid">
		Student ID
		<span class="required">*</span>
	</label>
	<input type="text" name="studentid" id="studentid" placeholder="C12345678" required />

	<label for="privacy">
		Do you wish to have your name and Student ID
		<br />
		displayed on the leaderboard?
		<span class="required">*</span>
	</label>
	<select name="privacy" id="privacy">
		<option value="1">Yes</option>
		<option value="0">No</option>
	</select>

	<label for="policy">
		<input type="checkbox" name="policy" id="policy" required />
		I have read and agree to the <a href="/policy">Privacy Policy</a><span class="required">*</span>
	</label>

	<button class="cspp form-element">
		<UserPlus color="var(--green)" size="32" />
		Register
	</button>
</form>
