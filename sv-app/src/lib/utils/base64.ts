
export function threeBytesToBase64(bytes: number[]): string[] {
	const b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	let byte1 = bytes[0] || 0;
	let byte2 = bytes[1] || 0;
	let byte3 = bytes[2] || 0;

	const combined = (byte1 << 16) | (byte2 << 8) | byte3;

	const char1 = b64chars[(combined >> 18) & 0x3F];
	const char2 = b64chars[(combined >> 12) & 0x3F];
	const char3 = bytes.length > 1 ? b64chars[(combined >> 6) & 0x3F] : '=';
	const char4 = bytes.length > 2 ? b64chars[combined & 0x3F] : '=';

	return [char1, char2, char3, char4];
}
