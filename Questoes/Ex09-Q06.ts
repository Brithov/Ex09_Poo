/*
    6. Implemente as classes Funcionario, Gerente e Diretor conforme o diagrama
    exposto em sala:
    a. A classe funcionário deve ser abstrata e o método getBonificacao()
    abstrato;
    b. Na classe gerente o método bonificação deve retornar 40% do salário;

    c. Em Diretor a bonificação deve ser 60% do salário.
    d. Por fim, na classe presidente o método deve retornar 100% do salário + R$
    1.000,00.

*/
// Classe abstrata Funcionario
abstract class Funcionario {
    protected salario: number;

    constructor(salario: number) {
        this.salario = salario;
    }

    abstract getBonificacao(): number;
}

// Classe Gerente que estende Funcionario
class Gerente extends Funcionario {
    getBonificacao(): number {
        return this.salario * 0.4; // 40% do salário
    }
}

// Classe Diretor que estende Funcionario
class Diretor extends Funcionario {
    getBonificacao(): number {
        return this.salario * 0.6; // 60% do salário
    }
}

// Classe Presidente que estende Funcionario
class Presidente extends Funcionario {
    getBonificacao(): number {
        return this.salario + 1000; // 100% do salário + R$ 1.000,00
    }
}
