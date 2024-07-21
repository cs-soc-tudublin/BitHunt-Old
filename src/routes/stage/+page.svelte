<script lang="ts">
	import type { PageData } from './$types';
	import { ChevronLeft } from 'lucide-svelte';

	export let data: PageData;
</script>

<head>
	<title>BitHunt - Stages</title>
</head>

<button class="cspp" on:click={() => window.location.href = '/'}>
	<ChevronLeft color="var(--green)" size="32" />
	Go Back
</button>
<h1 class="title large">Find the QR code, open your camera and scan the code!</h1>
<h2 class="subtitle medium"><strong>Your current clue is: </strong> {data.clue}</h2>
