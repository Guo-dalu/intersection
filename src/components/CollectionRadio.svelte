<script lang="ts">
	import { Radio, P } from 'flowbite-svelte'
	import Punchline from './Punchline.svelte'
	export let iterateCollection = 'A'
</script>

{#each ['A', 'B'] as collection}
	<div class="w-max mx-auto mt-3">
		<Radio name="collections" value={collection} bind:group={iterateCollection}>
			<P class="font-light">Collection {collection}</P>
		</Radio>
	</div>
{/each}
<P class="mt-4 font-light text-center"
	>Then the Collection <Punchline>{iterateCollection === 'A' ? 'B' : 'A'}</Punchline> would be put into
	the Hash Set
</P>
