<script lang="ts">
	import {
		NumberInput,
		Label,
		GradientButton,
		DarkMode,
		Radio,
		Spinner,
		Heading,
		P,
		Span
	} from 'flowbite-svelte'
	let m: number = 20
	let n: number = 20
	let iterateCollection: string = 'A'
	let loadStatus: number = 2
	let intersectionSize: number = 0
	let computationTime: number = 200
	const run = () => {
		console.log(m, n, iterateCollection, loadStatus, intersectionSize, computationTime)
	}
</script>

<DarkMode />
<Heading tag="h2">Compute the Intersection of Collection A and Collection B</Heading>
<div class="operation mb-6 p-6 text-base">
	<Label for="size-a" class="block mb-2">Size of collection A</Label>
	<NumberInput id="size-a" color="green" type="number" bind:value={m} min="1" max="10000000" />
	<Label for="size-b" class="block mb-2">Size of collection A</Label>
	<NumberInput id="size-b" type="number" bind:value={n} min="1" max="10000000" />
	<P>Choose which collection to iterate</P>
	{#each ['A', 'B'] as collection}
		<Radio name="collections" value={collection} bind:group={iterateCollection}>
			Collection {collection}
		</Radio>
	{/each}
	<P>Then the Collection {iterateCollection === 'A' ? 'B' : 'A'} would be put into the Hash Set</P>
	<GradientButton aria-label="run" shadow color="pinkToOrange" on:click={run}>run</GradientButton>
</div>
<div class="output">
	<Heading tag="h2">The output would be seen here</Heading>
	{#if loadStatus === 0}
		<P>still waiting for the operation...</P>
	{:else if loadStatus === 1}
		<Spinner />
	{:else}
		<P>The size of the intersection is: <Span gradient>{intersectionSize}</Span></P>
		<P>And the computation takes <Span gradient>{computationTime} ms</Span></P>
	{/if}
</div>
<div class="p-8" />

<style>
</style>
