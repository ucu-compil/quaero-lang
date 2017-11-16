export class State {

  vars: Map<string, any>;
  jsfun: Map<string, Function>;
  files: Set<String>;

  constructor() {
    this.vars = new Map<string, any>();
    this.jsfun = new Map<string,Function>();
    this.files = new Set<String>();
  }

  toString(): string {
    return `{ ${Array.from(this.vars.entries()).map(([key, value]) => (`${key} = ${value}`)).join("; ")}, ${Array.from(this.files)} }`;
  }

  get(id: string): any {
    return this.vars.get(id);
  }

  getFunction(id: string): any{
    return this.jsfun.get(id);
  }
  set(id: string, value: any) {
    this.vars.set(id, value);
  }

  setFile(path: string){
    this.files.add(path);
  }

  clone(): State{
    let clone = new State();
    this.vars.forEach(function(v,k){clone.set(k,v);});
    return clone;
  }
}
