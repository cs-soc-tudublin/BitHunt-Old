<script>
    import Thumb from "$lib/assets/bitthumb.svelte";
    export let start = () =>{
        window.location.href = "/start";
    }
</script>

<head>
    <title>BitHunt</title>
</head>

<Thumb />
<h1 class="Title Large nogap">BitHunt</h1>
<h2 class="subtitle medium nogap">A CS++ Freshers Treasure hunt.</h2>

<button class="cspp" on:click={() => start()}>
    Get Started!
</button>