import {BasicOpcode, Value} from './constants'

let memory : Int16Array = new Int16Array(0x10000);

let i :number = 0;
memory[i++] = 0x7c01;
memory[i++] = 0x0030 ;

memory[i++] = 0x7fc1;
memory[i++] = 0x0020 ;
memory[i++] = 0x1000 ;

memory[i++] = 0x7803 ;
memory[i++] = 0x1000 ;


class Registers {
	A : number = 0;
	B : number = 0;
	C : number = 0;
	X : number = 0;
	Y : number = 0;
	Z : number = 0;
	I : number = 0;
	J : number = 0;
}

let PC :number = 0;
let SP :number = 0;
let EX :number = 0;
let IA :number = 0;

let Cycles : number = 0;
let registers : Registers = new Registers();

interface Instruction{
	op:number;
	a: number;
	b:number;

}

export function decode(word : number) : Instruction{
	let op = 0b11111 & word;
	let b = (0b1111100000 & word) >> 5;
	let a = (0b1111110000000000 & word) >> 10;
	return {op,a,b};
}

function set(b:number,a:number){
	switch (b){
		case 0:
			registers.A = value(a);
	}
}

function value(ab:number){
	switch (ab){
		case Value.NEXT_WORD:
			return memory[++PC];
	}
}

function execute(instruction:Instruction){
	switch (instruction.op){
		case  BasicOpcode.SET:
			set(instruction.b,instruction.a);
	}
}

execute(decode(memory[PC++]))
console.log('A',registers.A);
console.log('PC',PC);

execute(decode(memory[PC++]))
console.log('[0x1000]',memory[0x1000]);
console.log('PC',PC);