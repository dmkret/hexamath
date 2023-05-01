<script lang="ts">
	import { onMount } from 'svelte';

	let input: HTMLInputElement;
	let task: null | {
		sign: string;
		left: number;
		right: number;
		result: number;
	};

	const handle_input = (e: any) => {
		if (!e.currentTarget) return;
		if (!(e instanceof InputEvent)) return;
		if (!(e.target instanceof HTMLInputElement)) return;

		const value = e.target.value
			.split('')
			.filter((ch, index) => {
				if (ch === '-' && index === 0) return true;
				if (/[0-9A-F]/i.test(ch)) return true;
				return false;
			})
			.join('');

		e.target.value = value;

		check_answer();
	};

	const get_number = () => Math.trunc(Math.random() * 0xf);

	const generate_task = () => {
		input.value = '';

		const signs = ['-', '+', '*', '/'];
		const sign = signs[Math.trunc(Math.random() * signs.length)];

		let left = 0;
		let right = 0;
		let result = 0;

		if (sign === '/') {
			result = get_number();
			right = Math.max(1, get_number());
			left = result * right;
		} else {
			left = get_number();
			right = get_number();
			result = eval(left + sign + right);
		}

		task = { sign, left, right, result };
	};

	const check_answer = () => {
		if (!task) return;

		const user_answer = input.value.toLowerCase();
		const right_answer = task.result.toString(16).toLowerCase();

		if (user_answer == right_answer) generate_task();
	};

	onMount(() => generate_task());
</script>

<section>
	<div class="task">
		{#if task}
			{task.left.toString(16)}
			{task.sign}
			{task.right.toString(16)}
		{/if}
	</div>

	<div style="height: 1rem" />

	<input bind:this={input} class="answer" on:input={handle_input} />
</section>

<style lang="scss">
	section {
		height: 100%;
		text-align: center;

		display: grid;
		row-gap: 24px;
		justify-items: stretch;
		grid-template-rows: 1fr auto 1fr;

		text-transform: uppercase;
	}

	input {
		position: absolute;

		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		background: transparent;

		text-align: inherit;
		font-size: inherit;

		caret-color: transparent;
		text-transform: inherit;
	}

	.task {
		pointer-events: none;
		margin-bottom: 1rem;
		align-self: flex-end;

		color: #000;
		@media (prefers-color-scheme: dark) {
			color: #fff;
		}
	}

	.answer {
		color: #4d5156;
		@media (prefers-color-scheme: dark) {
			color: #bdc1c6;
		}
	}
</style>
