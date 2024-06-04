import { arrayify, hexlify } from "@ethersproject/bytes";
import ExecutionContext from "../classes/execution";
import Instruction from "../classes/instruction";

const Opcodes: {
  0: Instruction;
  [key: number]: Instruction | undefined;
} = {
  0x00: new Instruction(0x00, "STOP", (context: ExecutionContext) =>
    context.stop()
  ),
  0x01: new Instruction(0x01, "ADD", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = a + b;
    context.stack.push(result);
  }),
  0x02: new Instruction(0x02, "MUL", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = a * b;
    context.stack.push(result);
  }),
  0x03: new Instruction(0x03, "SUB", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = a - b;
    context.stack.push(result);
  }),
  0x04: new Instruction(0x04, "DIV", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = a / b;
    context.stack.push(result);
  }),
  0x06: new Instruction(0x06, "MOD", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = a % b;
    context.stack.push(result);
  }),
  0x0a: new Instruction(0x0a, "EXP", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = a ** b;
    context.stack.push(result);
  }),
  0x10: new Instruction(0x10, "LT", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = BigInt(a < b);
    context.stack.push(result);
  }),
  0x11: new Instruction(0x11, "GT", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = BigInt(a > b);
    context.stack.push(result);
  }),
  0x14: new Instruction(0x14, "EQ", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = BigInt(a == b);
    context.stack.push(result);
  }),
  0x16: new Instruction(0x16, "AND", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = BigInt(a & b);
    context.stack.push(result);
  }),
  0x17: new Instruction(0x17, "OR", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = BigInt(a | b);
    context.stack.push(result);
  }),
  0x18: new Instruction(0x18, "XOR", (context: ExecutionContext) => {
    const [a, b] = [context.stack.pop(), context.stack.pop()];
    const result = BigInt(a ^ b);
    context.stack.push(result);
  }),
  0x19: new Instruction(0x19, "NOT", (context: ExecutionContext) => {
    const a = context.stack.pop();
    const result = BigInt(~a);
    context.stack.push(result);
  }),
  0x50: new Instruction(0x50, "POP", (context: ExecutionContext) => {
    context.stack.pop();
  }),
  0x51: new Instruction(0x51, "MLOAD", (context: ExecutionContext) => {
    const offset = context.stack.pop();
    const value = context.memory.load(offset);
    context.stack.push(value);
  }),
  0x52: new Instruction(0x52, "MSTORE", (context: ExecutionContext) => {
    const [offset, value] = [context.stack.pop(), context.stack.pop()];
    context.memory.store(offset, value);
  }),
  0x54: new Instruction(0x54, "SLOAD", async (context: ExecutionContext) => {
    // const key = context.stack.pop();
    // const value = context.storage.get(key);
    // context.stack.push(value ? value : BigInt(0));
  }),
  0x55: new Instruction(0x55, "SSTORE", async (context: ExecutionContext) => {
    // const [key, value] = [context.stack.pop(), context.stack.pop()];
    // await context.storage.put(key, value);
  }),
  0x56: new Instruction(0x56, "JUMP"),
  0x57: new Instruction(0x57, "JUMPI"),
  0x5b: new Instruction(0x5b, "JUMPDEST"),
  0x60: new Instruction(0x60, "PUSH1", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(1));
  }),
  0x61: new Instruction(0x61, "PUSH2", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(2));
  }),
  0x62: new Instruction(0x62, "PUSH3", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(3));
  }),
  0x63: new Instruction(0x63, "PUSH4", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(2));
  }),
  0x64: new Instruction(0x64, "PUSH5", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(5));
  }),
  0x65: new Instruction(0x65, "PUSH6", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(6));
  }),
  0x66: new Instruction(0x66, "PUSH7", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(7));
  }),
  0x67: new Instruction(0x67, "PUSH8", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(8));
  }),
  0x68: new Instruction(0x68, "PUSH9", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(9));
  }),
  0x69: new Instruction(0x69, "PUSH10", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(10));
  }),
  0x6a: new Instruction(0x6a, "PUSH11", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(11));
  }),
  0x6b: new Instruction(0x6b, "PUSH12", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(12));
  }),
  0x6c: new Instruction(0x6c, "PUSH13", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(13));
  }),
  0x6d: new Instruction(0x6d, "PUSH14", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(14));
  }),
  0x6e: new Instruction(0x6e, "PUSH15", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(15));
  }),
  0x6f: new Instruction(0x6f, "PUSH16", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(16));
  }),
  0x70: new Instruction(0x70, "PUSH17", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(17));
  }),
  0x71: new Instruction(0x71, "PUSH18", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(18));
  }),
  0x72: new Instruction(0x72, "PUSH19", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(19));
  }),
  0x73: new Instruction(0x73, "PUSH20", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(20));
  }),
  0x74: new Instruction(0x74, "PUSH21", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(21));
  }),
  0x75: new Instruction(0x75, "PUSH22", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(22));
  }),
  0x76: new Instruction(0x76, "PUSH23", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(23));
  }),
  0x77: new Instruction(0x77, "PUSH24", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(24));
  }),
  0x78: new Instruction(0x78, "PUSH25", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(25));
  }),
  0x79: new Instruction(0x79, "PUSH26", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(26));
  }),
  0x7a: new Instruction(0x7a, "PUSH27", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(27));
  }),
  0x7b: new Instruction(0x7b, "PUSH28", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(28));
  }),
  0x7c: new Instruction(0x7c, "PUSH29", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(29));
  }),
  0x7d: new Instruction(0x7d, "PUSH30", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(30));
  }),
  0x7e: new Instruction(0x7e, "PUSH31", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(31));
  }),
  0x7f: new Instruction(0x7f, "PUSH32", (context: ExecutionContext) => {
    context.stack.push(context.readBytesFromCode(32));
  }),
  0x80: new Instruction(0x80, "DUP1", (context: ExecutionContext) => {
    context.stack.duplicate(1);
  }),
  0x81: new Instruction(0x81, "DUP2", (context: ExecutionContext) => {
    context.stack.duplicate(2);
  }),
  0x82: new Instruction(0x82, "DUP3", (context: ExecutionContext) => {
    context.stack.duplicate(3);
  }),
  0x83: new Instruction(0x83, "DUP4", (context: ExecutionContext) => {
    context.stack.duplicate(4);
  }),
  0x84: new Instruction(0x84, "DUP5", (context: ExecutionContext) => {
    context.stack.duplicate(5);
  }),
  0x85: new Instruction(0x85, "DUP6", (context: ExecutionContext) => {
    context.stack.duplicate(6);
  }),
  0x86: new Instruction(0x86, "DUP7", (context: ExecutionContext) => {
    context.stack.duplicate(7);
  }),
  0x87: new Instruction(0x87, "DUP8", (context: ExecutionContext) => {
    context.stack.duplicate(8);
  }),
  0x88: new Instruction(0x88, "DUP9", (context: ExecutionContext) => {
    context.stack.duplicate(9);
  }),
  0x89: new Instruction(0x89, "DUP10", (context: ExecutionContext) => {
    context.stack.duplicate(10);
  }),
  0x8a: new Instruction(0x8a, "DUP11", (context: ExecutionContext) => {
    context.stack.duplicate(11);
  }),
  0x8b: new Instruction(0x8b, "DUP12", (context: ExecutionContext) => {
    context.stack.duplicate(12);
  }),
  0x8c: new Instruction(0x8c, "DUP13", (context: ExecutionContext) => {
    context.stack.duplicate(13);
  }),
  0x8d: new Instruction(0x8d, "DUP14", (context: ExecutionContext) => {
    context.stack.duplicate(14);
  }),
  0x8e: new Instruction(0x8e, "DUP15", (context: ExecutionContext) => {
    context.stack.duplicate(15);
  }),
  0x8f: new Instruction(0x8f, "DUP16", (context: ExecutionContext) => {
    context.stack.duplicate(16);
  }),
  0x90: new Instruction(0x90, "SWAP1", (context: ExecutionContext) => {
    context.stack.swap(1);
  }),
  0x91: new Instruction(0x91, "SWAP2", (context: ExecutionContext) => {
    context.stack.swap(2);
  }),
  0x92: new Instruction(0x92, "SWAP3", (context: ExecutionContext) => {
    context.stack.swap(3);
  }),
  0x93: new Instruction(0x93, "SWAP4", (context: ExecutionContext) => {
    context.stack.swap(4);
  }),
  0x94: new Instruction(0x94, "SWAP5", (context: ExecutionContext) => {
    context.stack.swap(5);
  }),
  0x95: new Instruction(0x95, "SWAP6", (context: ExecutionContext) => {
    context.stack.swap(6);
  }),
  0x96: new Instruction(0x96, "SWAP7", (context: ExecutionContext) => {
    context.stack.swap(7);
  }),
  0x97: new Instruction(0x97, "SWAP8", (context: ExecutionContext) => {
    context.stack.swap(8);
  }),
  0x98: new Instruction(0x98, "SWAP9", (context: ExecutionContext) => {
    context.stack.swap(9);
  }),
  0x99: new Instruction(0x99, "SWAP10", (context: ExecutionContext) => {
    context.stack.swap(10);
  }),
  0x9a: new Instruction(0x9a, "SWAP11", (context: ExecutionContext) => {
    context.stack.swap(11);
  }),
  0x9b: new Instruction(0x9b, "SWAP12", (context: ExecutionContext) => {
    context.stack.swap(12);
  }),
  0x9c: new Instruction(0x9c, "SWAP13", (context: ExecutionContext) => {
    context.stack.swap(13);
  }),
  0x9d: new Instruction(0x9d, "SWAP14", (context: ExecutionContext) => {
    context.stack.swap(14);
  }),
  0x9e: new Instruction(0x9e, "SWAP15", (context: ExecutionContext) => {
    context.stack.swap(15);
  }),
  0x9f: new Instruction(0x9f, "SWAP16", (context: ExecutionContext) => {
    context.stack.swap(16);
  }),
  0xf3: new Instruction(0xf3, "RETURN", (context: ExecutionContext) => {
    const [offset, size] = [context.stack.pop(), context.stack.pop()];
    const output = context.memory.load(offset);
    const outputHex = arrayify(output.toString(16)).slice(0, Number(size));
    context.output = BigInt(hexlify(outputHex));
  }),
};

export default Opcodes;
