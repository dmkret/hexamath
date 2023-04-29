<script>
	import '@fontsource/share-tech-mono/400.css';
</script>

<svelte:head>
	<title>Hexamath</title>
	<meta name="description" content="Hexadecimal math trainer" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="color-scheme" content="light dark" />
</svelte:head>

<main>
	<slot />
</main>

<style lang="scss">
	:global(*) {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		font-family: 'Share Tech Mono', monospace;
	}

	:global(html, body) {
		height: 100%;
		margin: 0;
		padding: 0;

		font-size: 38px;
		background: #fff;

		@media (prefers-color-scheme: dark) {
			background: #202124;
		}
	}

	main {
		height: 100%;
		display: grid;
	}
</style>
