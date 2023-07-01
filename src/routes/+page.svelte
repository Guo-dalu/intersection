<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { GradientButton, DarkMode, Radio, Spinner, Heading, P, Modal } from 'flowbite-svelte'
	import type { CollectionName } from '../app'
	import SizeInput from '../components/SizeInput.svelte'
	import { RUN_SINGE } from '../constants'

	let size1 = 100
	let size2 = 100
	let iterateCollection: 'A' | 'B' = 'A'
	let loaded = true
	let isModalOpen = false
	let intersectionSize = 0
	let computationTime = 200
	let worker: Worker | undefined

	const loadWorker = async () => {
		const IntersectionWorker = await import('$lib/worker?worker')
		worker = new IntersectionWorker.default()
	}
	onMount(loadWorker)
	onDestroy(() => {
		worker?.terminate()
	})

	const run = async () => {
		loaded = false
		isModalOpen = true
		;(worker as Worker).postMessage({
			message: RUN_SINGE,
			data: {
				size1,
				size2,
				iterateCollection
			}
		})
		;(worker as Worker).onmessage = (e: MessageEvent) => {
			const { time, commonSize } = e.data.data
			computationTime = time
			intersectionSize = commonSize
			loaded = true
		}
	}
	const getOperation = (iterateCollection: CollectionName, collection: CollectionName): string =>
		iterateCollection === collection ? 'iterate' : 'push into the Hash Set'
</script>

<main class="py-3 px-6 md:px-10">
	<DarkMode class="fixed right-6 md:right-10" />
	<Heading tag="h3" class="font-light mt-12"
		>Compute the Intersection of Collection A and Collection B</Heading
	>
	<SizeInput bind:size={size1} label="Size of collection A" style="mt-4" />
	<SizeInput bind:size={size2} label="Size of collection B" style="mt-4" />
	<P class="mt-4 font-light">Choose which collection to iterate</P>
	{#each ['A', 'B'] as collection}
		<Radio name="collections" value={collection} bind:group={iterateCollection}>
			<P class="font-light mt-2">Collection {collection}</P>
		</Radio>
	{/each}
	<P class="mt-4 font-light"
		>Then the Collection <span class="gradientcolor">{iterateCollection === 'A' ? 'B' : 'A'}</span> would
		be put into the Hash Set</P
	>
	<GradientButton
		class="mt-4 font-bold w-20"
		aria-label="run"
		shadow
		color="pinkToOrange"
		on:click={run}>run</GradientButton
	>
	<Modal bind:open={isModalOpen} autoclose class="py-4">
		<Heading tag="h5" class="font-light">
			With a collection A of size <span class="gradientcolor">{size1}</span> to {getOperation(
				iterateCollection,
				'A'
			)} and a collection B of size
			<span class="gradientcolor">{size2}</span> to {getOperation(iterateCollection, 'B')}, the
			result would be...
		</Heading>
		{#if loaded === false}
			<Spinner class="mx-auto block" />
		{:else}
			<P>The size of the intersection is <span class="gradientcolor">{intersectionSize}</span>.</P>
			<P>And the computation takes <span class="gradientcolor">{computationTime} ms</span>.</P>
		{/if}
	</Modal>
</main>

<style>
	.gradientcolor {
		color: transparent;
		background-clip: text;
		@apply from-pink-600 to-orange-500;
		@apply bg-gradient-to-r;
		@apply font-bold;
	}
</style>
