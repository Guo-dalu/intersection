<script lang="ts">
	import { onMount } from 'svelte'
	import { Heading, P, GradientButton, Spinner, Hr } from 'flowbite-svelte'
	import { base } from '$app/paths'
	import type { CollectionName, MultipleIntersectionResult } from '../../app'
	import { IntersectionWorker } from '../../stores'
	import Punchline from '../../components/Punchline.svelte'
	import Alert from '../../components/Alert.svelte'
	import CollectionRadio from '../../components/CollectionRadio.svelte'
	import {
		STATISTIC_MAX_SIZE,
		STATISTIC_MIN_SIZE,
		EXPERIMENT_TIMES,
		RUN_MULTIPLE,
		ERROR_FLAG
	} from '../../constants'

	let iterateCollection: CollectionName
	let times = EXPERIMENT_TIMES
	let loaded = true
	let hasAlert = false
	let intersectionList: MultipleIntersectionResult = []
	let _worker: null | Worker = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let Plotly: any

	let plotElement2D: undefined | HTMLElement
	let plotElement3D: undefined | HTMLElement

	const messageHandler = (e: MessageEvent) => {
		if (e.data.message === ERROR_FLAG) {
			hasAlert = true
			loaded = true
			return
		}
		intersectionList = e.data.data
		const timeList = intersectionList.map((v) => v.time)
		const sizeSumList = intersectionList.map((v) => v.size1 + v.size2)
		const size1List = intersectionList.map((v) => v.size1)
		const size2List = intersectionList.map((v) => v.size2)

		if (plotElement2D && Plotly) {
			Plotly.newPlot(
				plotElement2D,
				[
					{
						x: sizeSumList,
						y: timeList,
						mode: 'markers',
						type: 'scatter',
						name: 'TimeCost - Sum(Size1+Size2)'
					},
					{
						x: size1List,
						y: timeList,
						mode: 'markers',
						type: 'scatter',
						name: 'TimeCost - Size1'
					},
					{
						x: size2List,
						y: timeList,
						mode: 'markers',
						type: 'scatter',
						name: 'TimeCost - Size2'
					}
				],
				{
					title: 'Scatter Plot of TimeCost = f(size1+size2) ',
					yaxis: { title: 'Time Cost(ms)' },
					legend: { orientation: 'h' }
				}
			)
		}
		if (plotElement3D && Plotly) {
			Plotly.newPlot(
				plotElement3D,
				[
					{
						x: size1List,
						y: size2List,
						z: timeList,
						mode: 'markers',
						marker: {
							size: 10
						},
						type: 'scatter3d'
					}
				],
				{
					title: '3D Scatter Plot of TimeCost = f(size1, size2)',
					scene: {
						xaxis: { title: 'size1' },
						yaxis: { title: 'size2' },
						zaxis: { title: 'Time Cost(ms)' }
					}
				}
			)
		}
		loaded = true
	}

	const unsubscribe = IntersectionWorker.subscribe((_Worker) => {
		if (!_Worker) {
			return
		}
		_worker = new _Worker()
		_worker.onmessage = messageHandler
	})

	const loadPlotly = async () => {
		Plotly = await import('plotly.js-dist')
	}

	const clearPlot = () => {
		Plotly?.purge(plotElement2D)
		Plotly?.purge(plotElement3D)
	}

	onMount(() => {
		loadPlotly()
		return () => {
			_worker?.terminate()
			unsubscribe()
			clearPlot()
		}
	})

	const run = () => {
		loaded = false
		intersectionList = []
		clearPlot()
		_worker?.postMessage({
			message: RUN_MULTIPLE,
			data: {
				times,
				iterateCollection
			}
		})
	}
</script>

<GradientButton outline aria-label="go back" color="pinkToOrange" href="{base}/" class="mt-1 w-32"
	>Go back &larr;</GradientButton
>
<Heading tag="h3" class="font-light text-center mt-9">Now let's try some fancy things!</Heading>
<P class="text-center mt-6 text-lg">
	We will randomly assign sizes between <Punchline
		>{STATISTIC_MIN_SIZE} and {STATISTIC_MAX_SIZE}</Punchline
	> to Collection A and Collection B
</P>
<P class="mt-4 text-lg text-center">You would choose which collection to iterate</P>
<CollectionRadio bind:iterateCollection />

<GradientButton
	class="mt-4 font-bold block mx-auto"
	aria-label="run"
	shadow
	color="pinkToOrange"
	disabled={!loaded}
	on:click={run}>And run the experiment {times} times!</GradientButton
>

<P class="text-center mt-4 mb-6 font-light text-lg">The result will be...</P>
{#if !loaded && intersectionList.length === 0}
	<Spinner class="block mx-auto w-16 h-16" />
{/if}

<div bind:this={plotElement2D} class="overflow-hidden" />
<Hr hrClass="my-2" />
<div bind:this={plotElement3D} />
<Alert {hasAlert} />
