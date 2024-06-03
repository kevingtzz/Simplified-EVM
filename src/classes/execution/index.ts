import { isHexString, arrayify, hexlify } from "@ethersproject/bytes";

import Stack from "../stack";
import Memory from "../memory";
import Instruction from "../instruction";

import { ExecutionError, ExecutionErrorCodes } from "./errors";
import Opcodes from "../../opcodes";

class ExecutionContext {
  private readonly code: Uint8Array;
  private pc: number;
  private stopped: boolean;
  public output: bigint = BigInt(0);

  public stack: Stack;
  public memory: Memory;

  constructor(code: string) {
    if (!isHexString(code) || code.length % 2 !== 0) {
      throw new ExecutionError(
        "Invalid bytecode",
        ExecutionErrorCodes.InvalidBytecode
      );
    }

    this.code = arrayify(code);
    this.stack = new Stack();
    this.memory = new Memory();
    this.pc = 0;
    this.stopped = false;
  }

  public stop(): void {
    this.stopped = true;
    console.info("Execution context stopped");
  }

  public run(): void {
    console.info("Running execution context...");
    while (!this.stopped) {
      const currentPc = this.pc;
      const instruction = this.fetchInstruction();

      instruction.execute(this);

      console.info(`${instruction.name}:\t @pc=${currentPc}`);

      this.memory.print();
      this.stack.print();
      console.log("--------------------");
    }

    console.log("Output:\t", hexlify(this.output));
  }

  private fetchInstruction(): Instruction {
    if (this.pc >= this.code.length) return Opcodes[0];

    if (this.pc < 0) {
      throw new ExecutionError(
        "Invalid PC index",
        ExecutionErrorCodes.InvalidProgramCounterIndex
      );
    }

    const opcode = this.readBytesFromCode(1);
    const instruction = Opcodes[Number(opcode)];

    if (!instruction) {
      throw new ExecutionError(
        "Unknown opcode",
        ExecutionErrorCodes.UnknownOpcode
      );
    }

    return instruction;
  }

  public readBytesFromCode(bytes: number = 1): bigint {
    const hexValues = this.code.slice(this.pc, this.pc + bytes);
    const values = BigInt(hexlify(hexValues));

    this.pc += bytes;

    return values;
  }
}

export default ExecutionContext;
