import { describe, expect, it } from "vitest";
import { DotenvExampleParser } from "../src/infrastructure/parsers/DotenvExampleParser.js";

describe("DotenvExampleParser", () => {
     const parser = new DotenvExampleParser();
    it("extract keys from simple KEY=VALUE lines", () => {
        const r = parser.parse("A=1\nB=hello\n");
        expect(r.keys).toEqual(["A", "B"]);
    });

    it("ignores comments and black lines", () => {
        const r = parser.parse("\n# comment\n A=1\n\n");
        expect(r.keys).toEqual(['A']);
    });

    it("handles 'export KEY=VALUE' format", () => {
        const r = parser.parse("B=1\n\A=1\nA=2\n");
        expect(r.keys).toEqual(["A", "B"]);
    });
    
});

