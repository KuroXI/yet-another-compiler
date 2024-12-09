import { dataTypes } from "@/semantic/constant";
import { Syntax } from "@/syntax/syntax";
import type { VariableDeclaration } from "@/syntax/types";

export class Semantic {
  private _syntaxAnalysis: Syntax;
  
  constructor(syntaxAnalysis: Syntax = new Syntax()) {
    this._syntaxAnalysis = syntaxAnalysis;
  }
  
  public analyze(input: string) {
    this._validateVariableDeclarations(this._syntaxAnalysis.analyze(input));
  }
  
  private _validateVariableDeclarations(declarations: VariableDeclaration[]): void {
    const existingNames: Set<string> = new Set();
    
    for (const declaration of declarations) {0
      const { type, value, name } = declaration;
      
      if (existingNames.has(name)) {
        throw new Error(`Semantic Error: Variable "${name}" already exists.`);
      }
      existingNames.add(name);
      
      if (!this._isValueCompatibleWithType(type, value)) {
        throw new Error(`Semantic Error: Incompatible value '${value}' is not assignable to type '${type}'.`);
      }
    }
  }
  
  private _isValueCompatibleWithType(type: string, value: string): boolean {
    switch (type) {
      case "int":
        return dataTypes.INT.test(value);
      case "String":
        return dataTypes.STRING.test(value);
      case "boolean":
        return dataTypes.BOOLEAN.test(value);
      case "char":
        return dataTypes.CHAR.test(value);
      case "double":
        return dataTypes.DOUBLE.test(value);
      default:
        return false;
    }
  }
}
