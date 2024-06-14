import ExecutionContext from "../execution";
import { InstructionError, InstructionErrorCodes } from "./errors";

class Instruction {
  public readonly opcode: number;
  public readonly name: string;
  public readonly execute: (context: ExecutionContext) => Promise<void> | void;

  constructor(
    opcode: number,
    name: string,
    execute: (context: ExecutionContext) => void
  ) {
    this.opcode = opcode;
    this.name = name;
    this.execute = execute;
  }
}
export default Instruction;
