import Handlebars from "handlebars";

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

	const res = await fetch(`templates/handlebars/${path}.hbs`);
	const templateContent = await res.text();

	const template = Handlebars.compile(templateContent);
	const cache: TemplateCacheDS = { path, template };
	TemplateCache.push(cache);
	return template;
}

export const formatDict = (items: { prop: string; value: string }[]): string =>
	items.length
		? `{\n${items.map(({ prop, value }) => `\t"${prop}": "${value}"`).join(',\n')}\n}`
		: '{}';
