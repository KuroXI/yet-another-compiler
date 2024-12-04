  import { patterns } from "@/lexical/constant";
  import { Lexical } from "../lexical/Lexical";

  export interface ISyntaxAnalyzer {
    analyze(input: string): void;
  }

  export class SyntaxAnalyzer implements ISyntaxAnalyzer {
    private lexicalAnalyzer: Lexical;

    constructor() {
      this.lexicalAnalyzer = new Lexical();
    }

    public analyze(input: string) {
      const tokens = this.lexicalAnalyzer.tokenize(input);
      this._validateDeclaration(tokens);
      
    }

    private _validateDeclaration(tokens: { type: string; value: string }[]) {
      
      if (tokens.length !== 5) {
        throw new Error("Invalid declaration format");
      }

      const [KEYWORD, IDENTIFIER, OPERATOR, VALUE, SEMICOLON] = tokens;

      if (!patterns.KEYWORD.test(KEYWORD.value)) {
        throw new Error(`Invalid type: "${KEYWORD.value}"`);
      }


      if (!patterns.IDENTIFIER.test(IDENTIFIER.value)) {
        throw new Error(`Invalid identifier: "${IDENTIFIER.value}". Identifiers must start with a letter or underscore.`);
      }

      if (OPERATOR.value !== "=") {
        throw new Error(`Expected "=" but found "${OPERATOR.value}".`);
      }

      
      if (!patterns.VALUE.test(VALUE.value)) {
        throw new Error(`Invalid value: "${VALUE.value}"`);
      }

      if (!SEMICOLON || SEMICOLON.value !== ";") {
        throw new Error("Missing semicolon at the end of the declaration.");
      }
      console.log("Syntax Analysis Passed!");
    }
  }
