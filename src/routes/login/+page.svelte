<script lang="ts">
	import type { ActionData } from './$types';

	import { ChevronLeft, LogIn } from 'lucide-svelte';

	export let form: ActionData;

	import Toasts from '$lib/toasts/Toasts.svelte';
	import { addToast } from '$lib/toasts/store.js';

	if (form?.status == 500) {
		addToast({
			message: form.message,
			type: 'error',
			dismissible: true,
			timeout: 5000
		});
	}
</script>

<Toasts />

<head>
	<title>BitHunt - Log in</title>
</head>

<h1 class="title large">Log Back In</h1>

<button class="cspp" on:click={() => (window.location.href = '/')}>
	<ChevronLeft color="var(--green)" size="32" />
	Go Back
</button>

<form method="post">
	<label for="studentid">
		Student ID
		<span class="required">*</span>
	</label>
	<input type="text" name="studentid" id="studentid" placeholder="C12345678" required />

	<button class="cspp form-element">
		<LogIn color="var(--green)" size="32" />
		Log In
	</button>
</form>
