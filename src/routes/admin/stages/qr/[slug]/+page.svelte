<script lang="ts">
	import type { PageData } from './$types';
	import QRCode from 'qrcode';
	import { ChevronLeft } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	let QRCodeImage;

	if (data.status == 200) {
		onMount(() => {
			QRCode.toCanvas(
				document.getElementById('qrcode'),
				`${window.location.origin}/stage/${data.UUID}`,
				{ width: 500, errorCorrectionLevel: 'M', margin: 3 },
				(err) => {
					if (err) console.error(err);
				}
			);

			QRCodeImage = document.getElementById('qrcode').toDataURL('image/png');

			document.querySelector('.qrimage').src = QRCodeImage;
			document.getElementById('qrcode').style.display = 'none';
		});
	}
</script>

<head>
	<title>BitHunt [🛡️] - QR for {data.name}</title>
</head>

<button class="cspp" on:click={() => (window.location.href = '/admin/stages')}>
	<ChevronLeft color="var(--green)" />
	Go Back
</button>

{#if data.status == 200}
	<h1 class="title large">QR Code for {data.name}</h1>
	<h2 class="subtitle medium">
		This QR code will link to the <strong>[URL]/stage/UUID</strong> of {data.name}.
		<br />
		Don't forget to save the image!
	</h2>

	<canvas id="qrcode" />

	<img class="qrimage" src="" alt="A QR Code" />
{:else}
	<h1 class="title large">Error</h1>
	<h2 class="subtitle medium">
		{data.status} - {data.message}
	</h2>
{/if}
