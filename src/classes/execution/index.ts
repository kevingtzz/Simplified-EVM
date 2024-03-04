import { isHexString, arrayify, hexlify } from "@ethersproject/bytes";

import Stack from "../stack";
import Memory from "../memory";

import { ExecutionError, ExecutionErrorCodes } from "./errors";

class ExecutionContext {
  private readonly code: Uint8Array;
  private pc: number;
  private stopped: boolean;

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
      const opcode = this.readBytesFromCode(1);
      console.log(
        `Execution state:\nPC: ${this.pc}\nCurrent opcode: ${opcode}`
      );
      console.log("--------------------");
    }
  }

  public readBytesFromCode(bytes: number = 1): bigint {
    const hexValues = this.code.slice(this.pc, this.pc + bytes);
    const values = BigInt(hexlify(hexValues));

    this.pc += bytes;

    return values;
  }
}

export default ExecutionContext;
