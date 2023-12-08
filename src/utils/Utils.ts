import { question } from "readline-sync";
import { Perfil } from "../modelos/Perfil";
import {Postagem  } from "../modelos/Postagem";
import { PostagemAvancada } from "../modelos/PostagemAvancada";

import { RepositorioDePerfis } from "../repositorios/RepositorioDePerfis";

export function obter_numero (label=`Digite um numero: `){
    const numero = Number(question (label))
    if (isNaN(numero)) {
        console.log('Entrada inválida. Por favor, insira um número válido.');
        obter_numero();
      }else {
        console.log(`Número inserido: ${numero}`);
        return numero
    }
    return numero
}

export function MostrarPostagens(postagens: Postagem[] | null): void {
    if (postagens == null) {
        console.log("Nenhuma postagem encontrada!\n");
    } else {
        for (let post of postagens) {
            console.log(`\n ID: ${post.id}`);
            console.log(`Texto: ${post.texto} `);
            console.log(`Curtidas: ${post.curtidas} `);
            console.log(`Descurtidas: ${post.descurtidas} `);
            console.log(`Data: ${post.data.toISOString()} `);
            console.log(`Perfil: ${post.perfil.id} \n`);
            if (post instanceof PostagemAvancada) {
                console.log(`Hashtags: ${post.hashtag}`);
                console.log(`Visualizações: ${post.visualizacoesRestantes}`);


            }
        }
    }
}

export function DadosPerfil(): Perfil {
    const id = parseInt(question("Digite o ID: "));
    const nome = question("Digite o nome: ");
    const email = question("Digite o email: ");

    const novoPerfil = new Perfil(id, nome, email);
    return novoPerfil;
}

export function mostrarPerfil(perfil: Perfil | null): void {

    if (perfil !== null) {
        console.log(`>>Dados do Perfil:`);

        console.log(`\nId: ${perfil.id}`);
        console.log(`Nome ${perfil.nome}`);
        console.log(`e-mail: ${perfil.email} `);
        console.log(`Seguindo: ${perfil.seguindo.length}`);
        console.log(`Seguidores: ${perfil.seguidores.length}\n`);
    } else {
        console.log(`Perfil nao encontrado!\n`);

    }
}

export function DadosPostagem(): Postagem {

    const id = parseInt(question("Digite o ID postagem: "));
    const texto = question("Digite texto: ");
    const curtidas = parseInt(question("Digite o numero de curtidas: "));
    const descurtidas = parseInt(question("Digite o numero de descurtidas: "));
    const data = new Date();
    const idPerfil = parseInt(question("Digite ID do perfil: "));

   
    const repositorioDePerfis = new RepositorioDePerfis();
    const perfil = repositorioDePerfis.consultar(idPerfil);

    if (perfil != null) {
        const avancadaOuN = parseInt(question("Deseja adicionar hashtags e visualizações? 1- SIM 2-NÃO"))

        if (avancadaOuN == 1) {
            const hashtag = [question("Digite a hashtag: ")]; // Correção realizada aqui, agora hashtag é um array de string
            const visualizacoes = parseInt(question("Digite o numero de visualizações: "))

            const novaPostagemAvancada = new PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtag, visualizacoes);
            return novaPostagemAvancada;
        } else {
            const novaPostagem = new Postagem(id, texto, curtidas, descurtidas, data, perfil);
            return novaPostagem;
        }
    } else {
        console.log(`Erro\n`);
        throw new Error(`Perfil não associado!\n`);
    }
}