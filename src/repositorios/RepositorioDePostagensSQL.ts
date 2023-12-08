// RepositorioDePostagensSQL.ts
import { IRepositorioPostagens } from '../Interfaces/IRepositorioPostagens';
import { Postagem } from '../modelos/Postagem';
import { SQLLibrary } from 'sua-biblioteca-sql';

export class RepositorioDePostagensSQL implements IRepositorioPostagens {
    private databaseConnection: SQLLibrary.DatabaseConnection;

    constructor(databaseConnection: SQLLibrary.DatabaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    incluirPostagem(postagem: Postagem): void {
        try {
            // A query SQL para inserir uma nova postagem na tabela 'Postagens'
            const query = `INSERT INTO Postagens (id, texto, curtidas, descurtidas, data, perfilId) VALUES (?, ?, ?, ?, ?, ?)`;
            // Executa a query com os valores da postagem
            this.databaseConnection.run(query, [postagem.id, postagem.texto, postagem.curtidas, postagem.descurtidas, postagem.data.toISOString(), postagem.perfil.id]);
            console.log(`Postagem com ID ${postagem.id} inserida com sucesso.`);
        } catch (error) {
            console.error(`Erro ao inserir postagem no banco de dados SQL: ${error.message}`);
            throw error; // Propaga o erro para o chamador
        }
    }
    
    consultar(id?: number): Postagem | null {
        try {
            // A query SQL para consultar uma postagem pelo ID
            const query = `SELECT * FROM Postagens WHERE id = ?`;
            // Executa a query e obtém o resultado
            const result = this.databaseConnection.get(query, [id]);
    
            if (result) {
                // Cria uma instância de Postagem com os dados obtidos
                const postagem = new Postagem(result.id, result.texto, result.curtidas, result.descurtidas, new Date(result.data), result.perfilId);
                return postagem;
            } else {
                return null; // Retorna null se a postagem não for encontrada
            }
        } catch (error) {
            console.error(`Erro ao consultar postagem no banco de dados SQL: ${error.message}`);
            throw error; // Propaga o erro para o chamador
        }
    }

    excluirPostagem(id: number): void {
        try {
            // Substitua as linhas abaixo com a lógica real da sua biblioteca SQL para excluir uma postagem
            const query = `DELETE FROM Postagens WHERE id = ?`;
            this.databaseConnection.run(query, [id]);
            console.log(`Postagem com ID ${id} excluída com sucesso.`);
        } catch (error) {
            console.error(`Erro ao excluir postagem no banco de dados SQL: ${error.message}`);
            throw error; // Propaga o erro para o chamador
        }
    }

    listarTodasAsPostagens(): Postagem[] {
        try {
            // Substitua as linhas abaixo com a lógica real da sua biblioteca SQL para obter todas as postagens
            const query = `SELECT * FROM Postagens`;
            const results = this.databaseConnection.all(query);

            const postagens = results.map(result => {
                return new Postagem(result.id, result.texto, result.curtidas, result.descurtidas, new Date(result.data), result.perfilId);
            });

            return postagens;
        } catch (error) {
            console.error(`Erro ao obter todas as postagens do banco de dados SQL: ${error.message}`);
            throw error; // Propaga o erro para o chamador
        }
    }
}
