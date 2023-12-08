import {obter_numero} from "../utils/Utils"

export class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _seguindo: number[];  
    private _seguidores: number[];

    constructor(id: number, nome: string, email: string) {
        if (this.validaId(id)) {
            this._id = id;
        } else {
            obter_numero();
            console.log("ID deve ser do tipo numero!\n");
        }
        if (this.validaNome(nome)) {
            this._nome = nome;
        } else {
            throw new Error(" Nome nao pode conter numeros e carecteres\n")
        }

        this._email = email;
        this._seguidores = [];
        this._seguindo = [];
    }

    get seguidores() {
        return this._seguidores
    }
    get seguindo() {
        return this._seguindo
    }

    get id() {
        return this._id
    }

    get nome() {
        return this._nome
    }

    get email() {
        return this._email
    }

    private validaId(id: number): boolean {
        return typeof id === 'number';
    }
    private validaNome(nome: string) {
        return typeof nome === 'string'
    }
}

