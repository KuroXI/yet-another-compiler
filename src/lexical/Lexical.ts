import { patterns } from "@/lexical/constant";
import type { IToken } from "@/lexical/types";

export interface ILexical {
	tokenize(input: string): IToken[];
}

export class Lexical implements ILexical {
	public tokenize(input: string) {
		const tokens: IToken[] = [];

		const words = this._splitInput(input);
		for (const word of words) {
			if (patterns.KEYWORD.test(word)) {
				tokens.push({ type: "KEYWORD", value: word });
			} else if (patterns.VALUE.test(word)) {
				tokens.push({ type: "VALUE", value: this._normalizeDoubleQuoteStringValue(word) });
			} else if (patterns.IDENTIFIER.test(word)) {
				tokens.push({ type: "IDENTIFIER", value: word });
			} else if (patterns.OPERATOR.test(word)) {
				tokens.push({ type: "OPERATOR", value: word });
			} else if (patterns.SEMICOLON.test(word)) {
				tokens.push({ type: "SEMICOLON", value: word });
			} else {
				throw new Error(`Unexpected token: "${word}"`);
			}
		}

		return tokens;
	}

	private _splitInput(input: string): string[] {
		const singleQuotedMatches: string[] = [];
		const doubleQuotedMatches: string[] = [];

		const temporaryInput = input
			// This will handle char with whitespace value (e.q char x = ' ')
			.replace(/'[^']*'/g, (match) => {
				singleQuotedMatches.push(match);
				return `__SINGLE_QUOTED_${singleQuotedMatches.length - 1}__`;
			})
			// This will handle string, including escaped quotes (e.q String x = "Hello, \"World!\"")
			.replace(/"([^"\\]|\\.)*"/g, (match) => {
				doubleQuotedMatches.push(match);
				return `__DOUBLE_QUOTED_${doubleQuotedMatches.length - 1}__`;
			});

		return temporaryInput
			.replace(/;/g, " ; ")
			.replace(/=/g, " = ")
			.split(/\s+/)
			.filter((word) => word.length > 0)
			.map((word) => {
				if (word.startsWith("__SINGLE_QUOTED_")) {
					const index = Number.parseInt(word.replace("__SINGLE_QUOTED_", ""));
					return singleQuotedMatches[index];
				}
				if (word.startsWith("__DOUBLE_QUOTED_")) {
					const index = Number.parseInt(word.replace("__DOUBLE_QUOTED_", ""));
					return doubleQuotedMatches[index];
				}
				return word;
			});
	}

	private _normalizeDoubleQuoteStringValue(value: string): string {
		if (value.startsWith('"') && value.endsWith('"')) {
			return value.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
		}
		return value;
	}
}
