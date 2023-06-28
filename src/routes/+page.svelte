<script lang="ts">
	let interateCollection = ''
	let m: number
	let n: number
	let iterateCollection: string = 'A'
	let loadStatus: number = 0
	let intersectionSize: number = 0
	let computationTime: number = 0
	const run = () => {
		console.log(m, n, iterateCollection, loadStatus, intersectionSize, computationTime)
	}
</script>

<h1>Compute the Intersection of Collection A and Collection B</h1>
<div class="operation">
	<input type="number" bind:value={m} min="1" max="10000000" />
	<input type="number" bind:value={n} min="1" max="10000000" />
	<p>Choose which collection to iterate</p>
	{#each ['A', 'B'] as collection}
		<label>
			<input type="radio" name="collections" value={collection} bind:group={iterateCollection} />

			Collection {collection}
		</label>
	{/each}
	<p>Then the Collection {iterateCollection === 'A' ? 'B' : 'A'} would be put into the Hash Set</p>
	<button aria-label="run" on:click={run}>run</button>
</div>
<div class="output">
	<h1>The output would be seen here</h1>
	{#if loadStatus === 0}
		<p>still waiting for the operation...</p>
	{:else if loadStatus === 1}
		<p>loading...</p>
	{:else}
		<p>The size of the intersection is: ${intersectionSize}</p>
		<p>And the computation takes ${computationTime} ms</p>
	{/if}
</div>

<style>
	h1 {
		color: greenyellow;
	}
</style>
