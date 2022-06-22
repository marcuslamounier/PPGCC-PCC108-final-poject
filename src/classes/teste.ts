export class TesteClass {
    protected _a: number
    protected _b: number
    protected _c: number

    constructor(a?: number, b?: number, c?: number) {
        this._a = a || 0
        this._b = b || 0
        this._c = c || 0
    }

    public get a () { return this._a }
    public get b () { return this._b }
    public get c () { return this._c }

    public set a (val: number) { this._a = val } 
    public set b (val: number) { this._b = val } 
    public set c (val: number) { this._c = val }

    testar() {
        console.log('a: ', this.a)
        console.log('b: ', this.b)
        console.log('c: ', this.c)
    }
}