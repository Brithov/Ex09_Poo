//Explique o que é necessário para que a compilação da ClasseConcreta ocorra
//sem erros:

console.log(`É necessário que a classe concreta subcreva todos os métodos `);
console.log(`abstratos da classe abstrata`);
console.log(`ex:`);

console.log(`A classe concreta subscreve a abstrata, impementando o método imprima algo `);

abstract class ClasseAbstrata {
    abstract void imprimaAlgo();
}

class ClasseConcreta extends ClasseAbstrata {
    
    void imprimaAlgo() {
        // Implementação do método
        System.out.println("Algo");
    }
}


