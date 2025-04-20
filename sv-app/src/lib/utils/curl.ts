
export type PropVal = { prop: string; value: string };

export type CurlParsed = {
	normalized: string;
	args: string[];
	url: string;
	params: PropVal[];
	headers: PropVal[];
	cookies: PropVal[];
	data?: string;
};

export function parseCurl(curl: string): CurlParsed {
	const normalized = curl
		.split('\n')
		.map(line => line.trim())
		.filter(line => line !== '')
		.join(' ')
		.replace(/\\\s*/g, ' ') // remove backslash-newline escapes
		.replace(/\s{2,}/g, ' ') // collapse multiple spaces
		.trim();

	// Tokenize like shell
	const args: string[] = [];
	const regex = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'|[^\s"']+/g;
	let match: RegExpExecArray | null;
	while ((match = regex.exec(normalized)) !== null) {
		if (match[1]) {
			args.push(match[1].replace(/\\"/g, '"'));
		} else if (match[3]) {
			args.push(match[3].replace(/\\'/g, "'"));
		} else {
			args.push(match[0]);
		}
	}

	const headers: PropVal[] = [];
	const cookies: PropVal[] = [];
	const params: PropVal[] = [];
	let data: string | undefined;
	let url: string = '';

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		if ((arg === '-H' || arg === '--header') && args[i + 1]) {
			const header = args[++i];
			const [key, ...valParts] = header.split(/:\s*/);
			if (key && valParts.length) {
				headers.push({ prop: key, value: valParts.join(': ') });
			}
		} else if ((arg === '-b' || arg === '--cookie') && args[i + 1]) {
			const cookieString = args[++i];
			cookieString.split(/;\s*/).forEach(pair => {
				const [key, value] = pair.split('=');
				if (key && value) {
					cookies.push({ prop: key, value });
				}
			});
		} else if (
			['--data', '--data-raw', '--data-binary', '-d'].includes(arg) &&
			args[i + 1]
		) {
			data = args[++i];
		} else if (!arg.startsWith('-') && url === '' && arg !== 'curl') {
			url = arg;
		}
	}

	if (url) {
		try {
			const parsedUrl = new URL(url);
			parsedUrl.searchParams.forEach((value, key) => {
				params.push({ prop: key, value });
			});
		} catch (e) {
			throw new Error(`Invalid URL: ${url}`);
		}
	}

	return { normalized, args, url, params, headers, cookies, data };
}
