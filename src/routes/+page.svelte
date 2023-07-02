<script lang="ts">
	import { onMount } from 'svelte'
	import { GradientButton, Spinner, Heading, P, Modal } from 'flowbite-svelte'
	import type { CollectionName, Page } from '../app'
	import SizeInput from '../components/SizeInput.svelte'
	import Alert from '../components/Alert.svelte'
	import Punchline from '../components/Punchline.svelte'
	import CollectionRadio from '../components/CollectionRadio.svelte'
	import { ERROR_FLAG, RUN_SINGE } from '../constants'

	let size1 = 100
	let size2 = 100
	let iterateCollection: 'A' | 'B' = 'A'
	let loaded = true
	let hasAlert = false
	let isModalOpen = false
	let intersectionSize = 0
	let computationTime = 200
	let page: Page = { worker: undefined }

	const loadWorker = async () => {
		const IntersectionWorker = await import('$lib/worker?worker')
		console.log('load worker')
		page.worker = new IntersectionWorker.default()
		page.worker.onmessage = (e: MessageEvent) => {
			if (e.data.message === ERROR_FLAG) {
				hasAlert = true
				isModalOpen = false
				loaded = true
				return
			}
			const { time, commonSize } = e.data.data
			computationTime = time
			intersectionSize = commonSize
			loaded = true
		}
	}

	onMount(() => {
		loadWorker()
		return () => {
			page.worker?.terminate()
		}
	})

	const run = () => {
		loaded = false
		isModalOpen = true
		;(page.worker as Worker).postMessage({
			message: RUN_SINGE,
			data: {
				size1,
				size2,
				iterateCollection
			}
		})
	}
	const getOperation = (iterateCollection: CollectionName, collection: CollectionName): string =>
		iterateCollection === collection ? 'iterate' : 'push into the Hash Set'
</script>

<Heading tag="h3" class="font-light mt-12 mb-4"
	>Compute the Intersection of Collection A and Collection B</Heading
>
<SizeInput bind:size={size1} label="Size of collection A" style="mt-4" />
<SizeInput bind:size={size2} label="Size of collection B" style="mt-4" />
<P class="mt-4 font-light">Choose which collection to iterate</P>
<CollectionRadio bind:iterateCollection />
<GradientButton
	class="mt-4 font-bold w-20"
	aria-label="run"
	shadow
	disabled={isModalOpen || !loaded}
	color="pinkToOrange"
	on:click={run}>run</GradientButton
>
<GradientButton
	outline
	aria-label="deep into"
	color="pinkToOrange"
	href="/statistic"
	class="mt-5 w-32">Deep into &rarr;</GradientButton
>
<Alert bind:hasAlert />
<Modal bind:open={isModalOpen} autoclose class="py-4">
	<Heading tag="h5" class="font-light">
		With a collection A of size <Punchline>{size1}</Punchline> to {getOperation(
			iterateCollection,
			'A'
		)} and a collection B of size
		<Punchline>{size2}</Punchline> to {getOperation(iterateCollection, 'B')}, the result would be...
	</Heading>
	{#if loaded === false}
		<Spinner class="mx-auto block" />
	{:else}
		<P>The size of the intersection is <Punchline>{intersectionSize}</Punchline>.</P>
		<P>And the computation takes <Punchline>{computationTime} ms</Punchline>.</P>
	{/if}
</Modal>
