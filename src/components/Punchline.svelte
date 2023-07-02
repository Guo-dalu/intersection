<span class="gradientcolor">
	<slot />
</span>

<style>
	.gradientcolor {
		color: transparent;
		background-clip: text;
		@apply from-pink-600 to-orange-500;
		@apply bg-gradient-to-r;
		@apply font-bold;
	}
</style>
