import { QuaeroType } from "./QuaeroType";
import { QTInt } from "./QTInt";

export class QTNumeral extends QuaeroType {
	constructor() {
		super();
	}

	public isCompatible(tipo: QuaeroType): Boolean {
		if (tipo === this || tipo === QTInt.Instance) {
			return true;
		}
		return false;
	}

	public coerce(tipo: QuaeroType): QuaeroType {
		return this;
	}

	public toString(): String {
        return "num";
	}

	public getInstance(): QuaeroType {
		return this;
	}
}
