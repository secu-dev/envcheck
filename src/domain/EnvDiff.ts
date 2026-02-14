export type EnvKey = string;

export interface EnvDiffResult {
    missingInExample: EnvKey[];
    unusedInExample: EnvKey[];
};


function normalizeKey(key: string): string {
    return key.trim();
};

function uniqueSorted(keys: string[]): string[] {
    return Array.from(new Set(keys.map(normalizeKey).filter(Boolean))).sort();
};

export function diffEnvKeys(params: {
    usedKeys: EnvKey[];
    exampleKeys: EnvKey[];
}): EnvDiffResult {
    const used = new Set(uniqueSorted(params.usedKeys));
    const example = new Set(uniqueSorted(params.exampleKeys));

    const missingInExample = uniqueSorted(
        Array.from(used).filter((k) => !example.has(k))
    );

    const unusedInExample = uniqueSorted(
        Array.from(example).filter((k) => !used.has(k))
    );


    return { missingInExample, unusedInExample };
};