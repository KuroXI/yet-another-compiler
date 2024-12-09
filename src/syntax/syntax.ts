import { Lexical } from "@/lexical/lexical";
import type { IToken } from "@/lexical/types";
import type { VariableDeclaration } from "@/syntax/types";

export class Syntax {
  private _lexicalAnalysis: Lexical;
  private _validTypes = ["int", "boolean", "char", "double", "String"];
  
  constructor(lexicalAnalysis: Lexical = new Lexical()) {
    this._lexicalAnalysis = lexicalAnalysis;
  }
  
  public analyze(input: string): VariableDeclaration[] {
    return this._parse(this._lexicalAnalysis.tokenize(input));
  }
  
  private _parse(tokens: IToken[]): VariableDeclaration[] {
    const declarations: VariableDeclaration[] = [];
    let i = 0;
    
    while (i < tokens.length) {
      const type = this._validateType(tokens[i], i);
      i++;
      
      const name = this._validateIdentifier(tokens[i], i);
      i++;
      
      
      this._validateOperator(tokens[i], i);
      i++;
      
      const value = this._validateValue(tokens[i], i);
      i++;
      
      this._validateDelimiter(tokens[i], i);
      i++;
      
      declarations.push({ type, name, value });
    }
    
    return declarations;
  }
  
  private _validateType(token: IToken | undefined, position: number): string {
    if (!token || token.type !== "KEYWORD" || !this._validTypes.includes(token.value)) {
      throw new Error(`Syntax Error: Expected a type keyword at position ${position}.`);
    }
    
    return token.value
  }
  
  private _validateIdentifier(token: IToken | undefined, position: number): string {
    if (!token || token.type !== "IDENTIFIER") {
      throw new Error(`Syntax Error: Expected an identifier at position ${position}.`);
    }
    
    return token.value
  }
  
  private _validateOperator(token: IToken | undefined, position: number): void {
    if (!token || token.type !== "OPERATOR" || token.value !== "=") {
      throw new Error(`Syntax Error: Expected '=' at position ${position}.`);
    }
  }
  
  private _validateValue(token: IToken | undefined, position: number): string {
    if (!token || token.type !== "VALUE") {
      throw new Error(`Syntax Error: Expected a value at position ${position}.`);
    }
    
    return token.value;
  }
  
  private _validateDelimiter(token: IToken | undefined, position: number): void {
    if (!token || token.type !== "SEMICOLON") {
      throw new Error(`Syntax Error: Expected ';' at position ${position}.`);
    }
  }
}
