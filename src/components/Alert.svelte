<script lang="ts">
	import { Alert } from 'flowbite-svelte'
	export let hasAlert = false
</script>

{#if hasAlert}
	<Alert dismissable class="absolute top-3 left-1/2 -translate-x-1/2">Error Happened!</Alert>
{/if}
