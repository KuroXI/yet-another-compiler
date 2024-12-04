import { SyntaxAnalyzer } from "@/syntax/SyntaxAnalysis";


describe("SyntaxAnalyzer", () => {
	let syntaxAnalyzer: SyntaxAnalyzer;

	beforeEach(() => {
		syntaxAnalyzer = new SyntaxAnalyzer();
	});
	test("should pass for a valid variable declaration (int x = 10;)", () => {
		const input = "int x = 10;";
		expect(() => syntaxAnalyzer.analyze(input)).not.toThrow();
	});
	test("should pass for a valid variable declaration (boolean isValid = true;)", () => {
		const input = "boolean isValid = true;";
		expect(() => syntaxAnalyzer.analyze(input)).not.toThrow();
	});

	test("should pass for a valid variable declaration (double x = 1.5;)", () => {
		const input = "double x = 1.5;";
		expect(() => syntaxAnalyzer.analyze(input)).not.toThrow();
	});

	test("should pass for a valid variable declaration (char x = 'a';)", () => {
		const input = "char x = 'a';";
		expect(() => syntaxAnalyzer.analyze(input)).not.toThrow();
	});

	test('should pass for a valid string assignment (String name = "John";)', () => {
		const input = 'String name = "John";';
		expect(() => syntaxAnalyzer.analyze(input)).not.toThrow();
	});

	test("should throw error for missing semicolon", () => {
		const input = "int z = 10";
		expect(() => syntaxAnalyzer.analyze(input)).toThrow();
	});

	test("should throw error for invalid type", () => {
		const input = "str x = 5;";
		expect(() => syntaxAnalyzer.analyze(input)).toThrow();
	});

	test("should throw error for invalid identifier", () => {
		const input = "int 1x = 5;";
		expect(() => syntaxAnalyzer.analyze(input)).toThrow();
	});

	test("should throw error for invalid operator", () => {
		const input = "int x == 5;";
		expect(() => syntaxAnalyzer.analyze(input)).toThrow();
	});
	test("should throw error for invalid value(boolean isValid = omsim;)", () => {
		const input = "boolean isValid = omsim;";
		expect(() => syntaxAnalyzer.analyze(input)).toThrow();
	});

	test("should throw error for invalid value(int x = abc;)", () => {
		const input = "int x = abc;";
		expect(() => syntaxAnalyzer.analyze(input)).toThrow();
	});
	test("should throw error for invalid variable declaration (char x = a;)", () => {
		const input = "char x = a;";
		expect(() => syntaxAnalyzer.analyze(input)).toThrow();
	});
});
