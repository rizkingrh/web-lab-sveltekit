<script lang="ts" module>
	import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
	import BriefcaseBusinessIcon from '@lucide/svelte/icons/briefcase-business';
	
	const data = {
		navMain: [
			{
				name: 'Dashboard',
				url: '/dashboard',
				icon: LayoutDashboardIcon
			},
			{
				name: 'Praktikum',
				url: '/dashboard/praktikum',
				icon: BriefcaseBusinessIcon
			},
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import type { ComponentProps } from 'svelte';
	import icon from '$lib/assets/icon-pste.png';

    let { 
		userData,
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: { 
		userData: {
			nim: string | undefined | null;
			email: string | undefined | null;
			role: any;
		}
	} & ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<Sidebar.MenuButton size="lg">
			<div class="flex aspect-square size-8 items-center justify-center rounded-lg">
				<img src={icon} alt="Icon lab pste" />
			</div>
			<div class="grid flex-1 text-left text-sm leading-tight">
				<span class="truncate font-medium"> Lab. PSTE Untirta </span>
				<span class="truncate text-xs">Ganjil 2025/2026</span>
			</div>
		</Sidebar.MenuButton>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain navMain={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={userData} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
