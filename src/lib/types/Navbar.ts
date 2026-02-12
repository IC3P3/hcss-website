import type { ResolvedPathname } from '$app/types';

export type NavbarItem = {
	id: number;
	title: string;
	href: string | ResolvedPathname;
};
