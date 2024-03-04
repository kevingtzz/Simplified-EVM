import { createError } from "../../utils/errors";

export enum ExecutionErrorCodes {
  InvalidBytecode = "InvalidBytecode",
}

export const ExecutionError = createError("ExecutionError");
