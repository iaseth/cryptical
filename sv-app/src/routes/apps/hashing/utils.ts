import * as hashwasm from "hash-wasm";



type HashDefinition = {
	group: string;
	algo: string;
	fn: (text: string) => Promise<string>;
};

export type HashDS = {
	group: string;
	algo: string;
	hash: string;
};

export const GROUPS = [
	'SHA-1/2',
	'SHA-3',
	'Keccak',
	'BLAKE',
	'Legacy',
	'Non-Crypto'
];

export const hashAlgorithms: HashDefinition[] = [
	// SHA-1/2
	{ group: 'SHA-1/2', algo: 'SHA-1', fn: hashwasm.sha1 },
	{ group: 'SHA-1/2', algo: 'SHA-224', fn: hashwasm.sha224 },
	{ group: 'SHA-1/2', algo: 'SHA-256', fn: hashwasm.sha256 },
	{ group: 'SHA-1/2', algo: 'SHA-384', fn: hashwasm.sha384 },
	{ group: 'SHA-1/2', algo: 'SHA-512', fn: hashwasm.sha512 },

	// SHA-3
	{ group: 'SHA-3', algo: 'SHA-3-224', fn: (text: string) => hashwasm.sha3(text, 224) },
	{ group: 'SHA-3', algo: 'SHA-3-256', fn: (text: string) => hashwasm.sha3(text, 256) },
	{ group: 'SHA-3', algo: 'SHA-3-384', fn: (text: string) => hashwasm.sha3(text, 384) },
	{ group: 'SHA-3', algo: 'SHA-3-512', fn: (text: string) => hashwasm.sha3(text, 512) },

	// Keccak
	{ group: 'Keccak', algo: 'Keccak-224', fn: (text: string) => hashwasm.keccak(text, 224) },
	{ group: 'Keccak', algo: 'Keccak-256', fn: (text: string) => hashwasm.keccak(text, 256) },
	{ group: 'Keccak', algo: 'Keccak-384', fn: (text: string) => hashwasm.keccak(text, 384) },
	{ group: 'Keccak', algo: 'Keccak-512', fn: (text: string) => hashwasm.keccak(text, 512) },

	// BLAKE
	{ group: 'BLAKE', algo: 'BLAKE2b', fn: (text) => hashwasm.blake2b(text, 64) },
	{ group: 'BLAKE', algo: 'BLAKE2s', fn: (text) => hashwasm.blake2s(text, 32) },
	{ group: 'BLAKE', algo: 'BLAKE3', fn: hashwasm.blake3 },

	// Legacy
	{ group: 'Legacy', algo: 'MD4', fn: hashwasm.md4 },
	{ group: 'Legacy', algo: 'MD5', fn: hashwasm.md5 },
	{ group: 'Legacy', algo: 'RIPEMD-160', fn: hashwasm.ripemd160 },
	{ group: 'Legacy', algo: 'Whirlpool', fn: hashwasm.whirlpool },

	// Non-Crypto
	{ group: 'Non-Crypto', algo: 'CRC32', fn: hashwasm.crc32 },
	{ group: 'Non-Crypto', algo: 'CRC64', fn: hashwasm.crc64 },
	{ group: 'Non-Crypto', algo: 'xxHash32', fn: hashwasm.xxhash32 },
	{ group: 'Non-Crypto', algo: 'xxHash64', fn: hashwasm.xxhash64 }
];

export async function getHashes(text: string) {
	const hashes: HashDS[] = [];
	for (const algo of hashAlgorithms) {
		hashes.push({
			group: algo.group,
			algo: algo.algo,
			hash: await algo.fn(text)
		});
	}
	return hashes;
}
