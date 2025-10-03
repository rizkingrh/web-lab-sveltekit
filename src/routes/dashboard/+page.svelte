<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;

	// Data sekarang lebih terstruktur
	const user = data.user;
	const profile = data.profile;
</script>

<div class="m-5 p-4 border rounded-lg shadow-sm">
	<h1 class="text-2xl font-bold mb-4">Dashboard</h1>
	<div class="space-y-2">
		<p><strong>NIM:</strong> {profile?.nim || 'Tidak tersedia'}</p>
		<p><strong>Email:</strong> {user?.email || 'Tidak tersedia'}</p>
		<p><strong>Role:</strong> {profile?.roles?.name || 'Tidak tersedia'}</p>
	</div>

	<form action="/auth/logout" method="POST">
		<Button type="submit" class="mt-6">Logout</Button>
	</form>
</div>
