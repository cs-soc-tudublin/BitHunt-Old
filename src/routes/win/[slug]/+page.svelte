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
                `${window.location.origin}/admin/winners/${data.cookie}`,
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
    <title>BitHunt - Winner!</title>
</head>

{#if data.status == 200}
    <h1 class="title large">Congratulations! You Won!</h1>
    <h2 class="subtitle medium">
        Show this QR Code to a CS++ Committee Member to collect your prize!
    </h2>

    <canvas id="qrcode" />

    <img class="qrimage" src="" alt="A QR Code" />
{:else}
    <h1 class="title large">Whoa!</h1>
    <h2 class="subtitle medium"> You haven't won just yet!</h2>

    <button class="cspp" on:click={() => (window.location.href = '/')}>
        <ChevronLeft color="var(--green)" size="32" />
        Go Back
    </button>
{/if}