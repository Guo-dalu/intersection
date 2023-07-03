<script lang="ts">
	import { onDestroy } from 'svelte'
	import { GradientButton, Spinner, Heading, P, Modal } from 'flowbite-svelte'
	import { base } from '$app/paths'
	import type { CollectionName } from '../app'
	import { IntersectionWorker } from '../stores'
	import isSizeValid from '../utils/isSizeValid'
	import SizeInput from '../components/SizeInput.svelte'
	import Alert from '../components/Alert.svelte'
	import Punchline from '../components/Punchline.svelte'
	import CollectionRadio from '../components/CollectionRadio.svelte'
	import { ERROR_FLAG, RUN_SINGE, TIPS } from '../constants'

	let size1 = 100
	let size2 = 100
	let iterateCollection: 'A' | 'B' = 'A'
	let loaded = true
	let hasAlert = false
	let isModalOpen = false
	let intersectionSize = 0
	let computationTime = 200
	let tips = ''
	let _worker: null | Worker

	const unsubscribe = IntersectionWorker.subscribe((_Worker) => {
		if (!_Worker) {
			return
		}
		_worker = new _Worker()
		_worker.onmessage = (e: MessageEvent) => {
			if (e.data.message === ERROR_FLAG) {
				hasAlert = true
				tips = 'Error Happened from the Web Worker!'
				isModalOpen = false
				loaded = true
				return
			}
			const { time, commonSize } = e.data.data
			computationTime = time
			intersectionSize = commonSize
			loaded = true
		}
	})

	onDestroy(() => {
		_worker?.terminate()
		unsubscribe()
	})

	const run = () => {
		if ([size1, size2].some((v) => !isSizeValid(v))) {
			hasAlert = true
			tips = TIPS
			return
		}
		loaded = false
		isModalOpen = true
		_worker?.postMessage({
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

<GradientButton
	outline
	aria-label="deep into"
	color="pinkToOrange"
	href="{base}/statistic"
	class="mt-1 w-32">Deep into &rarr;</GradientButton
>
<Heading tag="h3" class="font-light mt-12 mb-4 text-center"
	>Compute the Intersection of Collection A and Collection B</Heading
>
<SizeInput bind:size={size1} label="Size of collection A" style="mt-4 mx-auto" />
<SizeInput bind:size={size2} label="Size of collection B" style="mt-4 mx-auto" />
<P class="mt-4 font-light text-center">Choose which collection to iterate</P>
<CollectionRadio bind:iterateCollection />
<GradientButton
	class="mt-4 font-bold w-20 block mx-auto"
	aria-label="run"
	shadow
	disabled={isModalOpen}
	color="pinkToOrange"
	on:click={run}>run</GradientButton
>
<Alert
	{hasAlert}
	{tips}
	on:close={() => {
		hasAlert = false
	}}
/>
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
