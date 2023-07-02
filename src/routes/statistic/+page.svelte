<script lang="ts">
	import { onMount } from 'svelte'
	import { Heading, P, GradientButton, Spinner, Hr } from 'flowbite-svelte'
	import type { CollectionName, MultipleIntersectionResult, Page } from '../../app'
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
	let page: Page = {}

	let plotElement2D: undefined | HTMLElement
	let plotElement3D: undefined | HTMLElement

	const messageHander = (e: MessageEvent) => {
		if (e.data.message === ERROR_FLAG) {
			hasAlert = true
			loaded = true
			return
		}
		intersectionList = e.data.data
		console.log(intersectionList)
		const timeList = intersectionList.map((v) => v.time)
		const sizeSumList = intersectionList.map((v) => v.size1 + v.size2)
		const size1List = intersectionList.map((v) => v.size1)
		const size2List = intersectionList.map((v) => v.size2)
		if (plotElement2D && page.Plotly) {
			page.Plotly.newPlot(
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
		if (plotElement3D && page.Plotly) {
			page.Plotly.newPlot(
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

	const loadWorker = async () => {
		const IntersectionWorker = await import('$lib/worker?worker')
		console.log('load worker')
		page.worker = new IntersectionWorker.default()
		page.worker.onmessage = messageHander
	}

	const loadPlotly = async () => {
		page.Plotly = await import('plotly.js-dist')
		console.log('plot loaded')
	}

	const clearPlot = () => {
		page.Plotly.purge(plotElement2D)
		page.Plotly.purge(plotElement3D)
	}

	onMount(() => {
		loadWorker()
		loadPlotly()
		return () => {
			page.worker?.terminate()
			clearPlot()
		}
	})

	const run = () => {
		loaded = false
		intersectionList = []
		clearPlot()
		;(page.worker as Worker).postMessage({
			message: RUN_MULTIPLE,
			data: {
				times,
				iterateCollection
			}
		})
	}
</script>

<GradientButton outline aria-label="go back" color="pinkToOrange" href="/" class="mt-1 w-32"
	>Go back &larr;</GradientButton
>
<Heading tag="h3" class="font-light text-center mt-9">Now let's try some fancy things!</Heading>
<P class="text-center mt-6 text-lg">
	We will randomly assign sizes between <Punchline
		>{STATISTIC_MIN_SIZE} and {STATISTIC_MAX_SIZE}</Punchline
	> to Collection A and Collection B
</P>
<div class="mx-auto w-64 sm:w-1/2">
	<P class="mt-4 text-lg">You would choose which collection to iterate</P>
	<CollectionRadio bind:iterateCollection />
</div>

<GradientButton
	class="mt-4 font-bold block mx-auto"
	aria-label="run"
	shadow
	color="pinkToOrange"
	disable={!loaded}
	on:click={run}>And run the experiment {times} times!</GradientButton
>

<P class="text-center mt-4 font-light text-lg">The result will be...</P>
{#if !loaded && intersectionList.length === 0}
	<Spinner class="block mx-auto mt-6 w-16 h-16" />
{/if}

<div bind:this={plotElement2D} />
<Hr hrClass="my-8" />
<div bind:this={plotElement3D} />
<Alert {hasAlert} />
