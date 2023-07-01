<script lang="ts">
	import { Label, NumberInput, Helper } from 'flowbite-svelte'
	import { MIN_SIZE, MAX_SIZE } from '../constants'
	// for user experience, better not input a really large number
	// unless you insist... so it's not validated when submitting
	const TIPS = 'better input an interger between 1 to 10000000'
	export let size = 20
	export let label = ''
	export let style = ''
	$: isValid = Number.isInteger(size) && size >= MIN_SIZE && size <= MAX_SIZE
</script>

<div class={style + 'md:w-1/2 lg:w-1/3 font-light'}>
	<Label for="size-b" class="block mb-2">{label}</Label>
	<NumberInput
		id="size-b"
		type="number"
		bind:value={size}
		min={MIN_SIZE}
		max={MAX_SIZE}
		color={isValid ? 'green' : 'red'}
		placeholder={TIPS}
	/>
	{#if !isValid}
		<Helper class="mt-2" color="red">{TIPS}</Helper>
	{/if}
</div>
