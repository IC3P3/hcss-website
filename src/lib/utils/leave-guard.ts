import { beforeNavigate } from '$app/navigation';

export const UNSAVED_MESSAGE = 'Es gibt ungespeicherte Änderungen. Trotzdem fortfahren?';

/**
 * Call during component init. While `isDirty()` is true, in-app navigation asks
 * for confirmation and tab close/reload triggers the browser's native prompt.
 */
export function guardUnsavedChanges(isDirty: () => boolean) {
	beforeNavigate((nav) => {
		if (!isDirty()) return;
		if (nav.type === 'leave') {
			nav.cancel();
			return;
		}
		if (!confirm(UNSAVED_MESSAGE)) nav.cancel();
	});
}
