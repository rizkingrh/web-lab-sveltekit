<script lang="ts">
	import logo from "$lib/assets/logo-pste.png";
	import type { HTMLAttributes } from "svelte/elements";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { cn, type WithElementRef } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		form,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { form?: any } = $props();

	const id = $props.id();
</script>

<div class={cn("flex flex-col gap-6", className)} bind:this={ref} {...restProps}>
	<form method="POST">
		<div class="flex flex-col gap-6">
			<div class="flex flex-col items-center gap-2">
				<a href="##" class="flex flex-col items-center gap-2 font-medium">
					<div class="flex items-center justify-center rounded-md">
						<img src={logo} alt="Laboratorium PSTE" class="w-32" />
					</div>
				</a>
				<h2 class="text-xl font-bold">Laboratorium PSTE Untirta</h2>
				<div class="text-center text-sm">
					Already have an account?
					<a href="/auth/login" class="underline underline-offset-4"> Login </a>
				</div>
			</div>
			<div class="flex flex-col gap-6">
				<div class="grid gap-3">
					<Label for="nim-{id}">NIM</Label>
					<Input id="nim-{id}" name="nim" type="text" placeholder="3332xxxxxx" value={form?.nim || ''} required />
				</div>
				<div class="grid gap-3">
					<Label for="email-{id}">Email</Label>
					<Input id="email-{id}" name="email" type="email" placeholder="m@example.com" value={form?.email || ''} required />
				</div>
				<div class="grid gap-3">
					<Label for="password-{id}">Password</Label>
					<Input id="password-{id}" name="password" type="password" placeholder="Enter your password" required />
				</div>
				<div class="grid gap-3">
					<Label for="confirmPassword-{id}">Confirmation Password</Label>
					<Input id="confirmPassword-{id}" name="confirmPassword" type="password" placeholder="Confirmation password" required />
				</div>
				<Button type="submit" class="w-full">Sign Up</Button>
			</div>
			<div
				class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
			>
			</div>
		</div>
	</form>
	<div
		class="text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs"
	>
		Copyright &copy; 2025 Lab. PSTE Untirta
	</div>
</div>
