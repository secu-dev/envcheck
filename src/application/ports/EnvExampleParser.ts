export interface EnvExampleParseResult {
    keys: string[];
};

export interface EnvExampleParser {
    parse(content: string): EnvExampleParseResult;
};