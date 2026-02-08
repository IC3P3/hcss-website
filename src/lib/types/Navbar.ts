import type { ResolvedPathname } from '$app/types';

export type NavbarItem = {
	title: string;
	href: string | ResolvedPathname;
};
