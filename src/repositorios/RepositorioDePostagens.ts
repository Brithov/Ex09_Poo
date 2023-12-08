
import { IRepositorioPostagens } from "../Interfaces/IRepositorioPostagens";
import { Postagem } from "../modelos/Postagem";
import { PostagemAvancada } from "../modelos/PostagemAvancada";


export class RepositorioDePostagens implements IRepositorioPostagens {
    Postagens: Postagem[] = []; 

    incluirPostagem(postagem: Postagem): void {
        try {
            // Verificar se a postagem já existe usando o método consultar
            const postagensEncontradas = this.consultar(postagem.id, postagem.texto, undefined, postagem.perfil.id);
    
            if (postagensEncontradas && postagensEncontradas.length > 0) {
                console.log("Postagem já existe!\n");
                return;
            }
    
            // Se não existir, incluir a postagem
            this.Postagens.push(postagem);
        } catch (error) {
            console.error(`Erro ao incluir postagem: ${error.message}`);
        }
    }

    consultar(id?: number, texto?: string, hashtag?: string, perfil?: number): Postagem[] | null {
        try {
            let postagensEncontradas: Postagem[] = [];
    
            for (let item of this.Postagens) {
                if (
                    (id === undefined || item.id === id) &&
                    (texto === undefined || item.texto === texto) &&
                    (item instanceof PostagemAvancada
                        ? hashtag === undefined || item.existeHashtag(hashtag)
                        : true) && // Verifica se é uma instância de PostagemAvancada
                    (perfil === undefined || item.perfil.id === perfil)
                ) {
                    postagensEncontradas.push(item);
                }
            }
    
            if (postagensEncontradas.length !== 0) {
                return postagensEncontradas;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Erro ao consultar postagens: ${error.message}`);
            throw error;
        }
    }

    listarTodasAsPostagens(): Postagem[] {
        const todasPostagens: Postagem[] = [];

        for (let item of this.Postagens) {
            todasPostagens.push(item);
        }

        return todasPostagens;
    }

    excluirPostagem(id: number) {
        let postagem = this.consultar(id)

        if (postagem != null) {
            for (let item of postagem) {
                let index = this.Postagens.indexOf(item)
                if (index !== -1) {
                    this.Postagens.splice(index, 1); // Remove o perfil na posição 'index'
                    console.log(`Postagem com ID ${id} excluído com sucesso.`);
                }
            }

        } else {
            console.log(`Postagem com ID ${id} não encontrado.`);
        }
    }

}