
import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";

export class PostagemAvancada extends Postagem {
    private _hashtags: string[];
    private _visualizacoesRestantes: number

    constructor(
        id: number, texto: string, curtidas: number,
        descurtidas: number, data: Date, perfil: Perfil,
        hashtag: string[], visualizacoesRestantes: number
    ) {

        super(id, texto, curtidas, descurtidas, data, perfil)
        this._hashtags = hashtag;
        this._visualizacoesRestantes = visualizacoesRestantes;

    }

    get hashtag() {
        return this._hashtags
    }

    get visualizacoesRestantes() {
        return this._visualizacoesRestantes
    }

    adicionarHashtag(hashtag: string): void {
        this._hashtags.push(hashtag);
    }

    existeHashtag(hashtag: string): boolean {

        if (this._hashtags.includes(hashtag)) {
            return true;
        }
        return false
    }

    decrementarVisualizacoes(): void {
        this._visualizacoesRestantes--;

        if (this._visualizacoesRestantes <= 0) {
            this._visualizacoesRestantes = 0;
        }
    }

}