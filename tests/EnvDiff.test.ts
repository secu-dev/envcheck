import {describe, it, expect} from 'vitest';
import { diffEnvKeys } from '../src/domain/EnvDiff.js';

describe('diffEnvKeys', () => {
    it('returns missing keys that are used but not in example', () => {
        const r = diffEnvKeys({
            usedKeys: ["JWT_SECERT", "DB_URL"],
            exampleKeys: ["DB_URL"],
        });
        expect(r.missingInExample).toEqual(["JWT_SECERT"]);
        expect(r.unusedInExample).toEqual([]);
    });

    it("returns unused keys that are in example but not used", () => {
        const r = diffEnvKeys({
            usedKeys: ["JWT_SECERT"],
            exampleKeys: ["DB_URL", "JWT_SECERT"],
        });

        expect(r.missingInExample).toEqual([]);
        expect(r.unusedInExample).toEqual(["DB_URL"]);
    });

    it("deduplicates, trims, and sorts keys", () => {
        const r = diffEnvKeys({
            usedKeys: ["  B  ", "A", "A"],
            exampleKeys: ["B", "C", " C "],
        });
        expect(r.missingInExample).toEqual(["A"]);
        expect(r.unusedInExample).toEqual(["C"]);
    });

    it("ingnores empty keys", () => {
        const r = diffEnvKeys({
            usedKeys: ["", "  ", "X"],
            exampleKeys: ["X", ""],
        });
        expect(r.missingInExample).toEqual([]);
        expect(r.unusedInExample).toEqual([]);
    });
})
