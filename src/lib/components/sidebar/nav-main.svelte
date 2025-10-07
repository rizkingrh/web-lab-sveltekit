<script lang="ts">
	import { useSidebar } from '$lib/components/ui/sidebar';
	import * as Sidebar from '$lib/components/ui/sidebar';
	let {
		navMain
	}: {
		navMain: {
			name: string;
			url: string;
			// This should be `Component` after @lucide/svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon: any;
		}[];
	} = $props();
	const sidebar = useSidebar();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Navigasi</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each navMain as item (item.name)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href={item.url} {...props}>
							<item.icon />
							<span>{item.name}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
