import { createError } from "../../utils/errors";

export enum MemoryErrorCodes {
  InvalidMemoryOffset = "InvalidMemoryOffset",
  InvalidMemoryValue = "InvalidMemoryValue",
}

export const MemoryError = createError("MemoryError");
