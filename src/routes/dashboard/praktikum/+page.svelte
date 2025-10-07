<script lang="ts">
	import AppSidebar from '$lib/components/sidebar/app-sidebar.svelte';
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns";
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    // Data is now coming from layout server load - cached and optimized
    const userData = data.userData;
</script>

<Sidebar.Provider>
	<AppSidebar {userData} />
	<Sidebar.Inset>
		<header
			class="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="/dashboard">Dashboard</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Praktikum</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div class="flex flex-col gap-1">
                <h2 class="text-2xl font-semibold tracking-tight">Daftar Praktikum</h2>
                <p class="text-muted-foreground">
                    Daftar Keseluruhan Praktikum Laboratorium Program Studi Teknik Elektro
                </p>
			</div>
			<div class="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                <DataTable data={data.praktikum} {columns} />
            </div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
