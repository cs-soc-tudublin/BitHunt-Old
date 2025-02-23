<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="dark flex min-h-screen w-screen flex-col items-center justify-center bg-black text-white"
>
	{@render children()}
</div>
