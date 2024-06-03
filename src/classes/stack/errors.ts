import { createError } from "../../utils/errors";

export enum StackErrorCodes {
  InvalidValue = "InvalidValue",
  StackOverflow = "StackOverflow",
  StackUnderflow = "StackUnderflow",
  IndexOutOfBounds = "IndexOutOfBounds",
}

export const StackError = createError("StackError");
