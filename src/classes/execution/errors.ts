import { createError } from "../../utils/errors";

export enum ExecutionErrorCodes {
  InvalidBytecode = "InvalidBytecode",
  InvalidProgramCounterIndex = "InvalidProgramCounterIndex",
  UnknownOpcode = "UnknownOpcode",
  InvalidJumpDestination = "InvalidJumpDestination",
}

export const ExecutionError = createError("ExecutionError");
