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
		Modal
	} from 'flowbite-svelte'
	let size1 = 20
	let size2 = 20
	let iterateCollection = 'A'
	let loaded = true
	let isModalOpen = false
	let intersectionSize = 0
	let computationTime = 200
	const run = () => {
		isModalOpen = true
	}
</script>

<main class="py-3 px-6 md:px-10">
	<DarkMode class="fixed right-6 md:right-10" />
	<Heading tag="h3" class="font-light mt-12"
		>Compute the Intersection of Collection A and Collection B</Heading
	>
	<div class="md:w-1/2 lg:w-1/3 mt-4 font-light">
		<Label for="size-a" class="block mb-2">Size of collection A</Label>
		<NumberInput
			id="size-a"
			color="green"
			type="number"
			bind:value={size1}
			min="1"
			max="10000000"
			placeholder="please input an interger between 1 to 10000000"
		/>
	</div>
	<div class="md:w-1/2 lg:w-1/3 mt-4 font-light">
		<Label for="size-b" class="block mb-2">Size of collection A</Label>
		<NumberInput
			id="size-b"
			type="number"
			bind:value={size2}
			min="1"
			max="10000000"
			placeholder="please input an interger between 1 to 10000000"
		/>
	</div>
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
			With a collection A of <span class="gradientcolor">size {size1}</span> and a collection B of
			<span class="gradientcolor">size {size2}</span>, the result would be...
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
