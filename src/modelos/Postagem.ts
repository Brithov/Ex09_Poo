
import { Perfil } from "./Perfil";

export class Postagem {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: Date;
    private _perfil: Perfil;

    constructor(
        id: number, texto: string, curtidas: number,
        descurtidas: number, data: Date, perfil: Perfil
    ) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._data = new Date();
        this._perfil = perfil;
    }

    get id() {
        return this._id;
    }

    get texto() {
        return this._texto;
    }

    get curtidas() {
        return this._curtidas
    }

    get descurtidas() {
        return this._descurtidas
    }

    get data() {
        return this._data;
    }

    get perfil() {
        return this._perfil;
    }

    curtir(): void {
        this._curtidas++;
    }

    descurtir(): void {
        this._descurtidas++
    }

    ehPopular(): boolean {
        if (this.curtidas > 1.5 * this.descurtidas) {
            return true;
        } else {
            return false
        }
    }
}
