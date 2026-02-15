import type {
    EnvExampleParser,
    EnvExampleParseResult
} from '../../application/ports/EnvExampleParser.js';
import { uniqueSorted } from '../../domain/EnvDiff.js';

export class DotenvExampleParser implements EnvExampleParser {
    parse(content: string): EnvExampleParseResult {
        const keys: string[] = [];

        for (const rawLine of content.split(/\r?\n/)) {
            const line = rawLine.trim();
            if (!line) continue;
            if (line.startsWith('#')) continue;

            // allow: export KEY=VALUE
            const noExport = line.startsWith("export ")
            ? line.slice("export ".length).trim()
            : line;

            // match: KEY = VALUE
            // KEY must start with letter/_ and then letters/numbers/_
            const m = noExport.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
            if (!m) continue;

            const key = m[1];
            keys.push(key!);
        }

        return {keys: uniqueSorted(keys)};
    }
};