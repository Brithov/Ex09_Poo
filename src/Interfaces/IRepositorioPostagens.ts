import { Postagem } from "../modelos/Postagem";

export interface IRepositorioPostagens {
    excluirPostagem(id: number): void;
    incluirPostagem(postagem: Postagem): void;
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: number): Postagem[] | null;
    listarTodasAsPostagens(): Postagem[];
}

