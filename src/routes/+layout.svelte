<script>
	import '../app.postcss'
	import { DarkMode } from 'flowbite-svelte'
</script>

<main class="py-3 px-6 md:px-10">
	<DarkMode class="fixed right-6 md:right-10" />
	<slot />
</main>
