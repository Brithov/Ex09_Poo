import { IRepositorioPerfis } from '../interfaces/IRepositorioPerfis';
import { Perfil } from '../modelos/Perfil';

export class RepositorioDePerfisSQL implements IRepositorioPerfis {
    // Implementação dos métodos usando SQL
    incluir(perfil: Perfil): void {
        try {
          // Lógica para incluir no banco de dados
        } catch (error) {
          console.error(`Erro ao incluir perfil no banco de dados: ${error.message}`);
          throw error; // rethrow para propagar o erro
        }
      }
    consultar(id?: number, nome?: string, email?: string): Perfil | null {
        // Código para consultar um perfil no banco de dados
        return null; // Substitua pelo código correto
    }
    
}