# Simplified Ethereum Virtual Machine

Virtualized stack-based architecture machine. Its word size (and size of stack items) is 256-bit with a memory model that is a simple word-addressed byte array. The stack has a maximum size of 1024 and it uses an independent storage model based on a modified Merkle Particia Tree. All locations in both storage and memory are well defined initially as zero

## Usage

First, install the dependencies with:

```
yarn
```

Then, use the CLI to manually test a bytecode input

```sh
yarn pvm --code 0x6080 --gasLimit 100
PUSH1   @ pc=0   gas=100         cost=3
Stack:   [ '0x80' ]
Memory:  []
STOP    @ pc=2   gas=97  cost=0
Stack:   [ '0x80' ]
Memory:  []
Output:  0x00
Root:    0x29adae8041417fab44a067497a0daedde9e76b8e2f7a1b8ea07dbc5dc2e14588
```

## Reference

| OPCODE | MNEMONIC |
| ------ | -------- |
| 0x00   | STOP     |
| 0x01   | ADD      |
| 0x02   | MUL      |
| 0x03   | SUB      |
| 0x04   | DIV      |
| 0x06   | MOD      |
| 0x0a   | EXP      |
| 0x10   | LT       |
| 0x11   | GT       |
| 0x14   | EQ       |
| 0x16   | AND      |
| 0x17   | OR       |
| 0x18   | XOR      |
| 0x19   | NOT      |
| 0x50   | POP      |
| 0x51   | MLOAD    |
| 0x52   | MSTORE   |
| 0x54   | SLOAD    |
| 0x55   | SSTORE   |
| 0x56   | JUMP     |
| 0x57   | JUMPI    |
| 0x5b   | JUMPDEST |
| 0x60   | PUSH1    |
| 0x61   | PUSH2    |
| 0x62   | PUSH3    |
| 0x63   | PUSH4    |
| 0x64   | PUSH5    |
| 0x65   | PUSH6    |
| 0x66   | PUSH7    |
| 0x67   | PUSH8    |
| 0x68   | PUSH9    |
| 0x69   | PUSH10   |
| 0x6a   | PUSH11   |
| 0x6b   | PUSH12   |
| 0x6c   | PUSH13   |
| 0x6d   | PUSH14   |
| 0x6e   | PUSH15   |
| 0x6f   | PUSH16   |
| 0x70   | PUSH17   |
| 0x71   | PUSH18   |
| 0x72   | PUSH19   |
| 0x73   | PUSH20   |
| 0x74   | PUSH21   |
| 0x75   | PUSH22   |
| 0x76   | PUSH23   |
| 0x77   | PUSH24   |
| 0x78   | PUSH25   |
| 0x79   | PUSH26   |
| 0x7a   | PUSH27   |
| 0x7b   | PUSH28   |
| 0x7c   | PUSH29   |
| 0x7d   | PUSH30   |
| 0x7e   | PUSH31   |
| 0x7f   | PUSH32   |
| 0x80   | DUP1     |
| 0x81   | DUP2     |
| 0x82   | DUP3     |
| 0x83   | DUP4     |
| 0x84   | DUP5     |
| 0x85   | DUP6     |
| 0x86   | DUP7     |
| 0x87   | DUP8     |
| 0x88   | DUP9     |
| 0x89   | DUP10    |
| 0x8a   | DUP11    |
| 0x8b   | DUP12    |
| 0x8c   | DUP13    |
| 0x8d   | DUP14    |
| 0x8e   | DUP15    |
| 0x8f   | DUP16    |
| 0x90   | SWAP1    |
| 0x91   | SWAP2    |
| 0x92   | SWAP3    |
| 0x93   | SWAP4    |
| 0x94   | SWAP5    |
| 0x95   | SWAP6    |
| 0x96   | SWAP7    |
| 0x97   | SWAP8    |
| 0x98   | SWAP9    |
| 0x99   | SWAP10   |
| 0x9a   | SWAP11   |
| 0x9b   | SWAP12   |
| 0x9c   | SWAP13   |
| 0x9d   | SWAP14   |
| 0x9e   | SWAP15   |
| 0x9f   | SWAP16   |
| 0xf3   | RETURN   |

## LICENSE

[MIT](https://choosealicense.com/licenses/mit/)