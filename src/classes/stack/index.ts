import { MAX_UINT256 } from "../../constants";
import { StackError, StackErrorCodes } from "./errors";

class Stack {
  private readonly maxDepth: number;
  private stack: bigint[];

  constructor(maxDepth = 1024) {
    this.maxDepth = maxDepth;
    this.stack = [];
  }

  public push(value: bigint): void {
    if (value < 0 || value > MAX_UINT256)
      throw new StackError(
        "Invalid value",
        StackErrorCodes.InvalidValue,
        value
      );

    if (this.stack.length >= this.maxDepth)
      throw new StackError("Stack overflow", StackErrorCodes.StackOverflow);

    this.stack.push(value);
  }

  public pop(): bigint {
    const value = this.stack.pop();

    if (value === undefined)
      throw new StackError("Stack underflow", StackErrorCodes.StackUnderflow);

    return value;
  }
}

export default Stack;
