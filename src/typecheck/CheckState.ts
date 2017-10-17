import { QuaeroType } from './QuaeroType';

export class CheckState {

  vars: Map<string, QuaeroType>;
  errors: string[];

  constructor() {
    this.vars = new Map<string, QuaeroType>();
  }

  toString(): string {
    return `{ ${Array.from(this.vars.entries()).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
  }

  get(id: string): QuaeroType {
    return this.vars.get(id);
  }

  set(id: string, type: QuaeroType) {
    this.vars.set(id, type);
  }

  error(message: string) {
    console.log(message);
    this.errors.push(message);
  }

  getErrors(): string[] {
    return this.errors;
  }

}
