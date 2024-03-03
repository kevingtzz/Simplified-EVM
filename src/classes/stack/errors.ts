import { createError } from "../../utils/errors";

export enum StackErrorCodes {
  InvalidValue = "InvalidValue",
  StackOverflow = "StackOverflow",
  StackUnderflow = "StackUnderflow",
}

export const StackError = createError("StackError");
