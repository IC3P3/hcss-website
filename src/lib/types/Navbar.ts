import type { ResolvedPathname } from '$app/types';

export type NavbarItems = {
	title: string;
	href: string | ResolvedPathname;
};
