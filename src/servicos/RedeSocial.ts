
import { IRepositorioPostagens,} from '../Interfaces/IRepositorioPostagens';
import { IRepositorioPerfis } from '../interfaces/IRepositorioPerfis';
import { Perfil } from "../modelos/Perfil";
import { Postagem } from "../modelos/Postagem";
import { PostagemAvancada } from "../modelos/PostagemAvancada";

import * as fs from 'fs';


export class RedeSocial {

    private ArquivoPerfil: string = "./ListaPerfil.csv"
    private ArquivoPostagem: string = "./ListaPostagens.csv"
    private ArquivoPostagemAvancada: string = "./ListaPostagenAvancada.csv"


    constructor(
        private _RepositorioDePerfis: IRepositorioPerfis,
        private _RepositorioDePostagens: IRepositorioPostagens
    ) { }
    //i
    incluirPerfil(perfil: Perfil): void {
        this._RepositorioDePerfis.incluir(perfil);
    }
    //ii
    consultarPerfil(id?: number, nome?: string, email?: string): Perfil | null {
        return this._RepositorioDePerfis.consultar(id, nome, email)
    }
    //iii
    incluirPostagem(postagem: Postagem): void {
        return this._RepositorioDePostagens.incluirPostagem(postagem)
    }
    //iv–ok
    consultarPostagens(id?: number, texto?: string, hashtag?: string, perfil?: number): Postagem[] | null {
        return this._RepositorioDePostagens.consultar(id, texto, hashtag, perfil)
    }
    //v----------- ok-----------------------------
    curtir(idPostagem: number): void {
        const postagem = this._RepositorioDePostagens.consultar(idPostagem);

        if (postagem) {
            for (let item of postagem) {
                item.curtir();
                console.log(`Você curtiu a postagem com ID ${idPostagem}\n`);
            }
        } else {
            console.log(`Postagem com ID ${idPostagem} não encontrada\n`);
        }
    }

    //vi-ok
    descurtir(idPostagem: number): void {
        const postagem = this._RepositorioDePostagens.consultar(idPostagem);

        if (postagem) {
            for (let item of postagem) {
                item.descurtir();
                console.log(`Você descurtiu a postagem com ID ${idPostagem}\n`);
            }
        } else {
            console.log(`Postagem com ID ${idPostagem} não encontrada\n`);
        }
    }

    //vii
    decrementarVisualizacoes(idPostagem: number): void {
        const postagens = this._RepositorioDePostagens.consultar(idPostagem);

        if (postagens) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada) {
                    item.decrementarVisualizacoes();
                    console.log('Vizualização decrementada!\n');
                }
            }
        } else {
            console.log("Postagem não econtrada!");
        }
    }

    exibirPostagensPorPerfil(id: number): Postagem[] | null {
        // ok -funcionando
        const postagens = this._RepositorioDePostagens.consultar(undefined, undefined, undefined, id);

        if (postagens) {

            const postagensFiltradas: Postagem[] = [];

            
            for (let item of postagens) {
                if (item instanceof PostagemAvancada) {
                    item.decrementarVisualizacoes();
                    postagensFiltradas.push(item);
                }
            }

            const filtroPostagens = postagensFiltradas.filter((item) => {
                if (item instanceof PostagemAvancada) {
                    return item.visualizacoesRestantes > 0;
                }
                return true;
            });

            return filtroPostagens.length > 0 ? filtroPostagens : null;
        } else {
            return null;
        }
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] | null {
        const postagens = this._RepositorioDePostagens.consultar(undefined, undefined, hashtag);

        if (postagens != null) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada) {
                    item.decrementarVisualizacoes();
                }
            }
        }

        const filtroPostagens: PostagemAvancada[] = [];
        if (postagens != null) {
            for (let item of postagens) {
                if (item instanceof PostagemAvancada && item.visualizacoesRestantes > 0) {
                    filtroPostagens.push(item);
                }
            }
            return filtroPostagens;
        } else {

            return null;
        }

    }

    carregarDeArquivo() {
        //Importando os arquivos
        let contadorDadosLidos = 0;

        const dadosPerfis: string = fs.readFileSync(this.ArquivoPerfil, 'utf-8');
        const dadosPostagens: string = fs.readFileSync(this.ArquivoPostagem, 'utf-8');
        const dadosPostagensAvancadas: string = fs.readFileSync(this.ArquivoPostagemAvancada, 'utf-8');

        const linhasPerfis: string[] = dadosPerfis.split('\n');
        const linhasPostagens: string[] = dadosPostagens.split('\n');
        const linhasPostagensAvancadas: string[] = dadosPostagensAvancadas.split('\n');
        
        contadorDadosLidos += linhasPerfis.length + linhasPostagens.length + linhasPostagensAvancadas.length;
        
        for (let linha of linhasPerfis) {
            const perfilData: string[] = linha.split(';');
            if (perfilData.length > 0) {
                const id = parseInt(perfilData[0]);
                const nome = perfilData[1];
                const email = perfilData[2];
                const perfil = new Perfil(id, nome, email);
                this._RepositorioDePerfis.incluir(perfil);
            }
        }

        for (let linha of linhasPostagens) {
            const DadosPostagens: string[] = linha.split(';');
            if (DadosPostagens.length > 0) {
                const id = parseInt(DadosPostagens[0]);
                const texto = DadosPostagens[1];
                const curtidas = parseInt(DadosPostagens[2]);
                const descurtidas = parseInt(DadosPostagens[3]);
                const data = new Date(DadosPostagens[4]);
                const perfilId = parseInt(DadosPostagens[5]);

                const perfil = this._RepositorioDePerfis.consultar(perfilId);

                if (perfil) {
                    const postagem = new Postagem(id, texto, curtidas, descurtidas, data, perfil);
                    this._RepositorioDePostagens.incluirPostagem(postagem);
                } else {
                    console.log(`Perfil inexistente para a postagem com ID ${id}!`);
                }
            }
        }
        for (let linha of linhasPostagensAvancadas) {
            const DadosPostagenAvancada: string[] = linha.split(';');
            if (DadosPostagenAvancada.length > 0) {

                const id = parseInt(DadosPostagenAvancada[0]);
                const texto = DadosPostagenAvancada[1];
                const curtidas = parseInt(DadosPostagenAvancada[2]);
                const descurtidas = parseInt(DadosPostagenAvancada[3]);
                const data = new Date(DadosPostagenAvancada[4]);
                const perfilId = parseInt(DadosPostagenAvancada[5]);

                const perfil = this._RepositorioDePerfis.consultar(perfilId);

                if (perfil) {
                    const hashtags = DadosPostagenAvancada[6].split(',');
                    const visualizacoesRestantes = parseInt(DadosPostagenAvancada[7]);

                    const postagemAvancada = new PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtags, visualizacoesRestantes);
                    this.incluirPostagem(postagemAvancada);
                } else {
                    console.log(`Perfil inexistente para a postagem com ID ${id}!`);
                }
            }
        } 
        console.log(`${contadorDadosLidos} dados foram lidos.`);
    }

    salvarEmArquivo(): void {
        try {
            // Salvando os perfis em um arquivo
            const dadosPerfis = this._RepositorioDePerfis.obterPerfis().map(perfil => `${perfil.id};${perfil.nome};${perfil.email}`).join('\n');
            fs.writeFileSync(this.ArquivoPerfil, dadosPerfis, 'utf-8');

            const postagensSalvas: number[] = []
            // Salvando as postagens em um arquivo
            const dadosPostagens = this._RepositorioDePostagens.Postagens.filter(postagem => !postagensSalvas.includes(postagem.id)).map(postagem => {
                const perfilId = postagem.perfil.id;
                const dataString = postagem.data.toISOString();
                postagensSalvas.push(postagem.id);
                return `${postagem.id};${postagem.texto};${postagem.curtidas};${postagem.descurtidas};${dataString};${perfilId}`;
            }).join('\n');
           
            fs.writeFileSync(this.ArquivoPostagem, dadosPostagens, 'utf-8');
            console.log('Dados salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar os dados no arquivo:', error);
        }

            // Salvando as postagens avançadas em um arquivo
            const dadosPostagensAvancadas = this._RepositorioDePostagens.Postagens.filter(postagem => postagem instanceof PostagemAvancada).map(postagemAvancada => {
                const perfilId = postagemAvancada.perfil.id;
                const dataString = postagemAvancada.data.toISOString();
                const hashtags = (postagemAvancada as PostagemAvancada).hashtag.join(',');
                const visualizacoesRestantes = (postagemAvancada as PostagemAvancada).visualizacoesRestantes;
                return `${postagemAvancada.id};${postagemAvancada.texto};${postagemAvancada.curtidas};${postagemAvancada.descurtidas};${dataString};${perfilId};${hashtags};${visualizacoesRestantes}`;
            }).join('\n');

            fs.writeFileSync(this.ArquivoPostagemAvancada, dadosPostagensAvancadas, 'utf-8');
            console.log('Dados salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar os dados no arquivo:', error);
    }
    

    //postagens populares:
    exibirPostagensPopulares(): Postagem[] | null {
        const todasPostagens = this._RepositorioDePostagens.listarTodasAsPostagens();
        const postagensPopulares: Postagem[] = []

        for (let item of todasPostagens) {
            if (item.ehPopular()) {
                postagensPopulares.push(item)
            }
        }

        return postagensPopulares;
    }

    //FEED
    exibirTodasAsPostagens(): Postagem[] | null {
        return this.RepositorioDePostagens.listarTodasAsPostagens();
    }

    excluirPerfil(id: number) {
        return this._RepositorioDePerfis.excluirPerfil(id);
    }

    //excluir postagem
    excluirPostagem(id: number) {
        return this._RepositorioDePostagens.excluirPostagem(id);
    }

    //seguir perfil
    seguirPerfil(idPerfilSeguidor: number, idPerfilSeguido: number): void {
        const perfilSeguidor = this._RepositorioDePerfis.consultar(idPerfilSeguidor);
        const perfilSeguido = this._RepositorioDePerfis.consultar(idPerfilSeguido);

        if (perfilSeguidor && perfilSeguido) {
            if (perfilSeguidor.seguindo.includes(idPerfilSeguido)) {
                console.log(`Você já está seguindo o perfil com ID ${idPerfilSeguido}.`);
            } else {
                perfilSeguidor.seguindo.push(idPerfilSeguido);

                perfilSeguido.seguidores.push(idPerfilSeguidor);


                console.log(`Você seguiu o perfil com ID ${idPerfilSeguido}.`);
            }
        } else {
            console.log("Perfis não encontrados. Certifique-se de que ambos os perfis existam.");
        }
    }

}