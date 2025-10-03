<script lang="ts">
	import LoginForm from '$lib/components/login-form.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
	<div class="w-full max-w-sm">
		{#if form?.error}
			<div class="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
				{form.error}
			</div>
		{/if}
		<LoginForm />
	</div>
</div>
