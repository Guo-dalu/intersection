<script>
	import { onMount } from 'svelte'
	import { DarkMode } from 'flowbite-svelte'
	import { IntersectionWorker } from '../stores'
	import '../app.postcss'

	const loadWorker = async () => {
		const WorkerModule = await import('$lib/worker?worker')
		console.log('load worker')
		IntersectionWorker.update(() => WorkerModule.default)
	}
	onMount(loadWorker)
</script>

<main class="py-3 px-6 md:px-10">
	<DarkMode class="absolute right-6 md:right-10" />
	<slot />
</main>
