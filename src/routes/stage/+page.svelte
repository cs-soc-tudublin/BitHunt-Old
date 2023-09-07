<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<head>
	<title>BitHunt - Stages</title>
</head>

<h1 class="title large">Find the QR code, open your camera and scan the code!</h1>
<h2 class="subtitle medium"><strong>Your current clue is: </strong> {data.clue}</h2>
