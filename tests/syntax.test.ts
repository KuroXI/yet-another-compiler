import { Syntax } from "@/syntax/syntax";
import type { VariableDeclaration } from "@/syntax/types";

describe('Syntax Class', () => {
  let syntax: Syntax;
  
  beforeAll(() => {
    syntax = new Syntax();
  });
  
  it('should correctly analyze a valid variable declaration', () => {
    const input = 'int x = 10;';
    const result: VariableDeclaration[] = syntax.analyze(input);

    expect(result).toEqual([{ type: 'int', name: 'x', value: '10' }]);
  });

  it('should analyze multiple valid declarations', () => {
    const input = 'int x = 10; \nboolean y = true;';
    const result: VariableDeclaration[] = syntax.analyze(input);

    expect(result).toEqual([
      { type: 'int', name: 'x', value: '10' },
      { type: 'boolean', name: 'y', value: 'true' }
    ]);
  });
  
  it('should correctly handle a string value with escaped characters', () => {
    const input = 'String message = "Hello, World!";';
    const result: VariableDeclaration[] = syntax.analyze(input);
    
    expect(result).toEqual([{ type: 'String', name: 'message', value: '"Hello, World!"' }]);
  });
  
  it('should handle single quotes inside character values', () => {
    const input = "char letter = 'a';";
    const result: VariableDeclaration[] = syntax.analyze(input);
    
    expect(result).toEqual([{ type: 'char', name: 'letter', value: "'a'" }]);
  });

  it('should throw an error when an invalid type is used', () => {
    const input = 'invalidType x = 10;';

    try {
      syntax.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Syntax Error: Expected a type keyword at position 0.");
    }
  });

  it('should throw an error when an identifier is missing', () => {
    const input = 'int = 10;';

    try {
      syntax.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Syntax Error: Expected an identifier at position 1.");
    }
  });

  it('should throw an error when the operator is missing', () => {
    const input = 'int x 10;';

    try {
      syntax.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Syntax Error: Expected '=' at position 2.");
    }
  });
  
  it('should throw an error when a semicolon is missing', () => {
    const input = 'int x = 10';
    
    try {
      syntax.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Syntax Error: Expected ';' at position 4.");
    }
  });
  
  it('should throw an error when a value is missing', () => {
    const input = 'int x =;';

    try {
      syntax.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Syntax Error: Expected a value at position 3.");
    }
  });
});
