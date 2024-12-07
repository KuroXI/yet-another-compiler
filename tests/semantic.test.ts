import { Semantic } from "@/semantic/semantic";

describe("Semantic Analysis", () => {
  let semantic: Semantic;
  
  beforeAll(() => {
    semantic = new Semantic();
  });
  
  it("should validate variable declarations for compatible types", () => {
    const input = "int x = 42;";
    
    expect(() => semantic.analyze(input)).not.toThrow();
  });
  
  it("should throw an error when given string for type int", () => {
    const input = "int x = \"Hello\";";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '\"Hello\"' for type 'int'.");
    }
  });
  
  it("should throw an error when given decimal for type int", () => {
    const input = "int x = 52.10;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '52.10' for type 'int'.");
    }
  });
  
  it("should throw an error when given integer for type boolean", () => {
    const input = "boolean flag = 42;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '42' for type 'boolean'.");
    }
  });
  
  it("should throw an error when given string for type boolean", () => {
    const input = "boolean flag = \"true\";";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '\"true\"' for type 'boolean'.");
    }
  });
  
  it("should throw an error when given char for type boolean", () => {
    const input = "boolean isTrue = 'a';";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '\'a\'' for type 'boolean'.");
    }
  });
  
  it("should throw an error when given integer for type string", () => {
    const input = "String name = 42;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '42' for type 'String'.");
    }
  });
  
  it("should throw an error when given boolean for type string", () => {
    const input = "String greeting = true;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value 'true' for type 'String'.");
    }
  });
  
  it("should throw an error when given decimal for type string", () => {
    const input = "String name = 52.10;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '52.10' for type 'String'.");
    }
  });
  
  it("should throw an error when given character for type string", () => {
    const input = "String greeting = 'H';";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '\'H\'' for type 'String'.");
    }
  });
  
  it("should throw an error when given string for type char", () => {
    const input = "char letter = \"Hello\";";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '\"Hello\"' for type 'char'.");
    }
  });
  
  it("should throw an error when given boolean for type char", () => {
    const input = "char letter = true;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value 'true' for type 'char'.");
    }
  });
  
  it("should throw an error when given decimal for type char", () => {
    const input = "char letter = 3.14;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '3.14' for type 'char'.");
    }
  });
  
  it("should throw an error when given integer for type char", () => {
    const input = "char letter = 42;";
    
    try {
      semantic.analyze(input);
    } catch (error) {
      expect((error as Error).message).toBe("Incompatible value '42' for type 'char'.");
    }
  });
});
