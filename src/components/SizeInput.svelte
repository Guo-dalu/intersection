<script lang="ts">
	import { Label, NumberInput, Helper } from 'flowbite-svelte'
	import { MIN_SIZE, MAX_SIZE, TIPS } from '../constants'
	import isSizeValid from '../utils/isSizeValid'
	// for user experience, better not input a really large number
	// validate when submitting
	export let size = 20
	export let label = ''
	export let style = ''
	$: isValid = isSizeValid(size)
</script>

<div class={style + ' md:w-1/2 lg:w-1/3 font-light'}>
	<Label for={label} class="block mb-2">{label}</Label>
	<NumberInput
		aria-label={label}
		id={label}
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
