import { hexlify } from "@ethersproject/bytes";
import { MAX_UINT256 } from "../../constants";
import { MemoryError, MemoryErrorCodes } from "./errors";

class Memory {
  private memory: bigint[];

  constructor() {
    this.memory = [];
  }

  public store(offset: bigint, value: bigint): void {
    if (offset < 0 || offset > MAX_UINT256)
      throw new MemoryError(
        "Invalid memory offset",
        MemoryErrorCodes.InvalidMemoryOffset,
        offset
      );

    if (value < 0 || value > MAX_UINT256)
      throw new MemoryError(
        "Invalid memory value",
        MemoryErrorCodes.InvalidMemoryValue,
        value
      );

    this.memory[Number(offset)] = value;
  }

  public load(offset: bigint): bigint {
    if (offset < 0 || offset > MAX_UINT256)
      throw new MemoryError(
        "Invalid memory offset",
        MemoryErrorCodes.InvalidMemoryOffset,
        offset
      );

    if (offset >= this.memory.length) return BigInt(0);

    return this.memory[Number(offset)];
  }

  public print(): void {
    console.info(
      `Memory:\t`,
      this.memory.map((value) => hexlify(value))
    );
  }
}

export default Memory;
