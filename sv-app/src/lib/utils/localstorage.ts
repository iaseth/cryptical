import { browser } from "$app/environment";



const LOCAL_STORAGE_PREFIX = 'cryptical';

function getFullKey (key: string): string {
	return `${LOCAL_STORAGE_PREFIX}-${key}`;
}

export function getLocalStorage (key: string): string {
	if (browser) {
		return localStorage.getItem(getFullKey(key)) || "";
	}
	return "";
}

export function setLocalStorage (key: string, value: string) {
	if (browser) localStorage.setItem(getFullKey(key), value);
}
