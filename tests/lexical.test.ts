import { type ILexical, Lexical } from "@/lexical/lexical";

describe("Lexical Analysis Test", () => {
	let lexical: ILexical;

	beforeAll(() => {
		lexical = new Lexical();
	});

	test("Tokenize simple valid input", () => {
		const input = String.raw`int x = 10;`;

		// We use "toStrictEqual" in order to make sure that the order of tokens are the same
		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "int" },
			{ type: "IDENTIFIER", value: "x" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "10" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize multi-line input", () => {
		const input = String.raw`
			int x = 10;
			String name = "John";
			boolean isValid = false;
  	`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "int" },
			{ type: "IDENTIFIER", value: "x" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "10" },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "String" },
			{ type: "IDENTIFIER", value: "name" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: '"John"' },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "boolean" },
			{ type: "IDENTIFIER", value: "isValid" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "false" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize complex mixed input", () => {
		const input = String.raw`
			int x = 42;
			String y = "Test \"String\"";
			char z = 'A';
			boolean flag = true;
		`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "int" },
			{ type: "IDENTIFIER", value: "x" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "42" },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "String" },
			{ type: "IDENTIFIER", value: "y" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: `"Test \"String\""` },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "char" },
			{ type: "IDENTIFIER", value: "z" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "'A'" },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "boolean" },
			{ type: "IDENTIFIER", value: "flag" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "true" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize with multiple variable declarations", () => {
		const input = String.raw`String name = "John"; double pi = 3.14;`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "String" },
			{ type: "IDENTIFIER", value: "name" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: '"John"' },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "double" },
			{ type: "IDENTIFIER", value: "pi" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "3.14" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize input with boolean and char values", () => {
		const input = String.raw`boolean isPassed = true; char grade = 'A';`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "boolean" },
			{ type: "IDENTIFIER", value: "isPassed" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "true" },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "char" },
			{ type: "IDENTIFIER", value: "grade" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "'A'" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize char with special characters", () => {
		const input = String.raw`char a = ' ';`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "char" },
			{ type: "IDENTIFIER", value: "a" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "' '" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize double with small values", () => {
		const input = String.raw`double tinyValue = 0.0000000001;`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "double" },
			{ type: "IDENTIFIER", value: "tinyValue" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "0.0000000001" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize input with large integer values", () => {
		const input = String.raw`int bigNumber = 9223372036854775807;`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "int" },
			{ type: "IDENTIFIER", value: "bigNumber" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "9223372036854775807" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize input with negative integer values", () => {
		const input = String.raw`int negativeNumber = -1;`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "int" },
			{ type: "IDENTIFIER", value: "negativeNumber" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "-1" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize input with negative double values", () => {
		const input = String.raw`double negativeDouble = -1.10;`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "double" },
			{ type: "IDENTIFIER", value: "negativeDouble" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "-1.10" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize string with special characters", () => {
		const input = String.raw`String greeting = "Hello, \"World!\"";`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "String" },
			{ type: "IDENTIFIER", value: "greeting" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: '"Hello, "World!""' },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize empty string", () => {
		const input = String.raw`String empty = "";`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "String" },
			{ type: "IDENTIFIER", value: "empty" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: '""' },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize empty input", () => {
		const input = "";

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([]);
	});

	test("Handle whitespace and extra spaces", () => {
		const input = String.raw`
      int   y   =   100   ;
      String    z="hello";
    `;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "KEYWORD", value: "int" },
			{ type: "IDENTIFIER", value: "y" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: "100" },
			{ type: "SEMICOLON", value: ";" },
			{ type: "KEYWORD", value: "String" },
			{ type: "IDENTIFIER", value: "z" },
			{ type: "OPERATOR", value: "=" },
			{ type: "VALUE", value: '"hello"' },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Tokenize valid tokens even in an unexpected order", () => {
		const input = String.raw`= x 10 int;`;

		const tokens = lexical.tokenize(input);
		expect(tokens).toStrictEqual([
			{ type: "OPERATOR", value: "=" },
			{ type: "IDENTIFIER", value: "x" },
			{ type: "VALUE", value: "10" },
			{ type: "KEYWORD", value: "int" },
			{ type: "SEMICOLON", value: ";" },
		]);
	});

	test("Throw an error when tokenizing input with invalid characters", () => {
		const input = String.raw`int x = @;`;
		expect(() => lexical.tokenize(input)).toThrow(`Unexpected token: "@"`);
	});
});
