import { QuaeroType } from "./QuaeroType";
<<<<<<< HEAD
import { QTNumeral } from "./QTNumeral";

export class QTString extends QuaeroType {
	constructor() {
		super();
	}

	public isCompatible(tipo: QuaeroType): Boolean {
		if (tipo === this) {
			return true;
		}
		return false;
	}

	public getInstance(): QuaeroType {
		return this;
	}

	public coerce(tipo: QuaeroType): QuaeroType {
		return tipo; 
	}

	public toString(): String {
		return "string";
	}

}
=======
>>>>>>> cd58e20aa8f5e14ac62ce2e788776d6f93ed7133
