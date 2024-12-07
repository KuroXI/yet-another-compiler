import { dataTypes } from "@/semantic/constant";
import { Syntax } from "@/syntax/syntax";
import type { VariableDeclaration } from "@/syntax/types";

export class Semantic {
  public analyze(input: string) {
    const syntaxAnalysis = new Syntax();
    
    this._validateVariableDeclarations(syntaxAnalysis.analyze(input));
  }
  
  private _validateVariableDeclarations(declarations: VariableDeclaration[]): void {
    for (const declaration of declarations) {
      const { type, value } = declaration;
      
      if (!this._isValueCompatibleWithType(type, value)) {
        throw new Error(`Incompatible value '${value}' for type '${type}'.`);
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
