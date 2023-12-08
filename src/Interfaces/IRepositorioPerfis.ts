
import { Perfil } from "../modelos/Perfil";

export interface IRepositorioPerfis {
    incluir(perfil: Perfil): void;
    consultar(id?: number, nome?: string, email?: string): Perfil | null;
    obterPerfis(): Perfil[];
    excluirPerfil(id: number): void;
}