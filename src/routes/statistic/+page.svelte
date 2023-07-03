<script lang="ts">
	import { onMount } from 'svelte'
	import { pluck } from 'rambda'
	import { Heading, P, GradientButton, Spinner, Hr } from 'flowbite-svelte'
	import { base } from '$app/paths'
	import type { CollectionName, MultipleIntersectionResult } from '../../app'
	import { IntersectionWorker } from '../../stores'
	import Punchline from '../../components/Punchline.svelte'
	import Alert from '../../components/Alert.svelte'
	import {
		EXPERIMENT_TIMES,
		RUN_MULTIPLE,
		ERROR_FLAG,
		STATISTIC_SMALL_SIZE_RANGE,
		STATISTIC_LARGE_SIZE_RANGE
	} from '../../constants'

	let iterateCollection: CollectionName
	let times = EXPERIMENT_TIMES
	let loaded = true
	let hasAlert = false
	let _worker: null | Worker = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let Plotly: any

	let plotElement2D: undefined | HTMLElement
	let plotElement3D: undefined | HTMLElement

	const messageHandler = (e: MessageEvent) => {
		loaded = true
		if (e.data.message === ERROR_FLAG) {
			hasAlert = true
			return
		}
		if (!plotElement2D || !plotElement3D || !Plotly) {
			return
		}
		const { smallToSetList, largeToSetList } = e.data.data as MultipleIntersectionResult

		Plotly.newPlot(
			plotElement2D,
			[
				{
					x: pluck('sum', smallToSetList),
					y: pluck('time', smallToSetList),
					mode: 'markers',
					type: 'scatter',
					name: 'TimeCost - Sum(Size1+Size2) - with smaller Collection in Set'
				},
				{
					x: pluck('sum', largeToSetList),
					y: pluck('time', largeToSetList),
					mode: 'markers',
					type: 'scatter',
					name: 'TimeCost - Sum(Size1+Size2) - with larger Collection in Set'
				}
			],
			{
				title: 'Scatter Plot of TimeCost = f(size1+size2) ',
				yaxis: { title: 'Time Cost(ms)' },
				legend: { orientation: 'h' }
			}
		)
		Plotly.newPlot(
			plotElement3D,
			[
				{
					x: pluck('size1', smallToSetList),
					y: pluck('size2', smallToSetList),
					z: pluck('time', smallToSetList),
					mode: 'markers',
					marker: {
						size: 10
					},
					type: 'scatter3d',
					name: 'Time Cost with smaller Collection in Set'
				},
				{
					x: pluck('size1', largeToSetList),
					y: pluck('size2', largeToSetList),
					z: pluck('time', largeToSetList),
					mode: 'markers',
					marker: {
						size: 10
					},
					type: 'scatter3d',
					name: 'Time Cost with larger Collection in Set'
				}
			],
			{
				title: '3D Scatter Plot of TimeCost = f(size1, size2)',
				scene: {
					xaxis: { title: 'size1' },
					yaxis: { title: 'size2' },
					zaxis: { title: 'Time Cost(ms)' }
				},
				legend: { orientation: 'h' }
			}
		)
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
<P class="text-center mt-6 text-lg lg:px-20 font-light">
	We will randomly generate two collections. Collection A would have smaller size between <Punchline
		>{STATISTIC_SMALL_SIZE_RANGE[0]} and {STATISTIC_SMALL_SIZE_RANGE[1]}</Punchline
	>, and Collection B would have larger size betwwen <Punchline
		>{STATISTIC_LARGE_SIZE_RANGE[0]} and {STATISTIC_LARGE_SIZE_RANGE[1]}</Punchline
	>. Then we will compute the intersection of these 2 Collections in 2 ways, by iterating over
	Collection A(and B in the Hash Set), and vice versa.
</P><P class="text-center mt-4 text-lg lg:px-20 font-light"
	>We will run each computation method <Punchline>{EXPERIMENT_TIMES}</Punchline>
	times to measure its performance and determine the difference in time cost between the two approaches.
</P>

<GradientButton
	class="mt-4 font-bold block mx-auto"
	aria-label="run"
	shadow
	color="pinkToOrange"
	disabled={!loaded}
	on:click={run}>Run the experiment {times} times!</GradientButton
>

<P class="text-center mt-4 mb-6 font-light text-lg">The result will be...</P>
{#if !loaded}
	<Spinner class="block mx-auto w-16 h-16" />
{/if}

<div bind:this={plotElement2D} class="overflow-hidden" />
<Hr hrClass="my-2" />
<div bind:this={plotElement3D} />
<Alert {hasAlert} />
