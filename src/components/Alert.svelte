<script lang="ts">
	import { Alert } from 'flowbite-svelte'
	import { fly } from 'svelte/transition'
	export let hasAlert = false
	export let tips = 'Error Happened!'
</script>

{#if hasAlert}
	<Alert dismissable transition={fly} class="absolute top-3 left-1/2 -translate-x-1/2" on:close
		>{tips}</Alert
	>
{/if}
