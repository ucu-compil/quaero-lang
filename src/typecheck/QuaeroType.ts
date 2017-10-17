export class QuaeroType {
    private static _instance: QuaeroType;
    public constructor() {
        //...
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public getInstance(): QuaeroType {
        return null;
    }

    public isCompatible(tipo: QuaeroType): Boolean {
        return false;
    }

    public toString(): String {
        return "";
    }

    public coerce(tipo: QuaeroType): QuaeroType {
        return null;
    }
}