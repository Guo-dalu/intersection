<script lang="ts">
	import { Radio, P } from 'flowbite-svelte'
	import Punchline from './Punchline.svelte'
	export let iterateCollection = 'A'
</script>

{#each ['A', 'B'] as collection}
	<Radio name="collections" value={collection} bind:group={iterateCollection}>
		<P class="font-light mt-2">Collection {collection}</P>
	</Radio>
{/each}
<P class="mt-4 font-light"
	>Then the Collection <Punchline>{iterateCollection === 'A' ? 'B' : 'A'}</Punchline> would be put into
	the Hash Set
</P>
