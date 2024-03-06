import { createError } from "../../utils/errors";

export enum ExecutionErrorCodes {
  InvalidBytecode = "InvalidBytecode",
  InvalidProgramCounterIndex = "InvalidProgramCounterIndex",
  UnknownOpcode = "UnknownOpcode",
}

export const ExecutionError = createError("ExecutionError");
