import Handlebars from "handlebars";
import type { PropVal } from "./curl";

interface TemplateCacheDS {
	path: string,
	template: Function
}

const TemplateCache: TemplateCacheDS[] = [];

export async function getTemplate(path: string): Promise<Function> {
	const cacheFound = TemplateCache.find(t => t.path === path);
	if (cacheFound) {
		return cacheFound.template;
	}

	const res = await fetch(`/templates/handlebars/${path}.hbs`);
	const templateContent = await res.text();

	const template = Handlebars.compile(templateContent);
	const cache: TemplateCacheDS = { path, template };
	TemplateCache.push(cache);
	return template;
}

const escape = (s: string) =>
	s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

export const formatDict = (items: PropVal[]): string => {
	if (!items.length) return '{}';

	const lines = items.map(({ prop, value }) => {
		const escapedProp = escape(prop);
		const escapedValue = escape(value);
		return `\t"${escapedProp}": "${escapedValue}"`;
	});

	return `{\n${lines.join(',\n')}\n}`;
};
