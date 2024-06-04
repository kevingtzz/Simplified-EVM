import ExecutionContext from "../execution";
import { InstructionError, InstructionErrorCodes } from "./errors";

const defaultExecute = () => {
  throw new InstructionError(
    "Not implemented",
    InstructionErrorCodes.NotImplemented
  );
};

class Instruction {
  public readonly opcode: number;
  public readonly name: string;
  public readonly execute: (context: ExecutionContext) => Promise<void> | void;

  constructor(
    opcode: number,
    name: string,
    execute: (context: ExecutionContext) => void = defaultExecute
  ) {
    this.opcode = opcode;
    this.name = name;
    this.execute = execute;
  }
}
export default Instruction;
