import { QuaeroType } from "./QuaeroType";

export class QTBool extends QuaeroType {
	constructor() {
		super();
	}

	public isCompatible(tipo: QuaeroType): Boolean {
		if (tipo === this) {
			return true;
		}
		return false;
	}
	public toString(): String {
        return "boolean";
	}
	
	public isCompatibleAs(tipo: QuaeroType): QuaeroType {
		if (tipo === this) {
			return QTBool.Instance;
		}
		return null;
	}
}