import { QuaeroType } from "./QuaeroType";
<<<<<<< HEAD
import { QTNumeral } from "./QTNumeral";
=======
>>>>>>> 7aa1cf55f54a6c253269e16dad863da2649accba

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
