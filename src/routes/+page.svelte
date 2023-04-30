<script lang="ts">
	import { onMount } from 'svelte';

	let answer = '';
	let task: null | {
		sign: string;
		left: number;
		right: number;
		result: number;
	};

	$: answer, check_answer();

	const handle_keydown = (e: KeyboardEvent) => {
		if (e.code === 'Backspace') {
			answer = answer.slice(0, answer.length - 1);
			return;
		}

		if (e.repeat) return;

		const upper_key = e.key.toUpperCase();
		if (!/^[0-9A-F]+$/.test(upper_key) && !(upper_key === '-' && answer.length === 0)) return;

		answer += upper_key;
	};

	const get_number = () => Math.trunc(Math.random() * 0xf);

	const generate_task = () => {
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

		if (answer !== task.result.toString(16).toUpperCase()) return;

		answer = '';
		generate_task();
	};

	onMount(() => generate_task());
</script>

<section>
	<div class="task">
		{#if task}
			{task.left.toString(16).toUpperCase()}
			{task.sign}
			{task.right.toString(16).toUpperCase()}
		{/if}
	</div>

	<input autofocus on:blur={(e) => e.currentTarget.focus()} on:keydown={handle_keydown} />

	<div class="answer">
		{answer}
	</div>
</section>

<style lang="scss">
	section {
		height: 100%;
		text-align: center;

		display: grid;
		row-gap: 24px;
		justify-items: stretch;
		grid-template-rows: 1fr auto 1fr;
	}

	input {
		position: absolute;
		top: 0;
		height: 0;
		opacity: 0;
		border: none;
		outline: none;
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
		height: 1rem;

		color: #4d5156;
		@media (prefers-color-scheme: dark) {
			color: #bdc1c6;
		}
	}
</style>
