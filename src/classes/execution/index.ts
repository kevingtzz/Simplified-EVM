import { isHexString } from "@ethersproject/bytes";

import Stack from "../stack";
import Memory from "../memory";

import { ExecutionError, ExecutionErrorCodes } from "./errors";

class ExecutionContext {
  private readonly code: Uint8Array;
  public stack: Stack = new Stack();
  public memory: Memory = new Memory();
  private pc: number;
  private stopped: boolean;

  constructor(code: string) {
    if (!isHexString(code))
      throw new ExecutionError(
        "Invalid bytecode",
        ExecutionErrorCodes.InvalidBytecode
      );
  }
}
