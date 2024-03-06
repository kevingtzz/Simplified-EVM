import { createError } from "../../utils/errors";

export enum InstructionErrorCodes {
  NotImplemented = "NotImplemented",
}

export const InstructionError = createError("InstructionError");
