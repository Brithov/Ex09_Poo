/*
    Crie uma interface chamada IComparavel com um método chamado comparar que
receba uma forma geométrica como parâmetro e retorna um inteiro como
resultado. Implemente em cada uma das classes do exemplo anterior a interface
retornando -1, 0 e 1 caso a área da forma seja menor, igual ou maior que a
passada via parâmetro.

*/
// Classe abstrata base para figuras geométricas
rie uma interface chamada IComparavel com um método chamado comparar que
receba uma forma geométrica como parâmetro e retorna um inteiro como
resultado. Implemente em cada uma das classes do exemplo anterior a interface
retornando -1, 0 e 1 caso a área da forma seja menor, igual ou maior que a
passada via parâmetro.

*/
// Classe abstrata base para figuras geométricas
abstract class FiguraGeometrica {
    // Método abstrato para calcular a área
    abstract calcularArea(): number;

    // Método abstrato para calcular o perímetro
    abstract calcularPerimetro(): number;
}

class Quadrado extends FiguraGeometrica {
    constructor(private lado: number) {
        super();
    }

    calcularArea(): number {
        return this.lado * this.lado;
    }

    calcularPerimetro(): number {
        return this.lado * 4;
    }
}

// Classe concreta para o Triangulo
class Triangulo extends FiguraGeometrica {
    constructor(private base: number, private altura: number, private lado1: number, private lado2: number, private lado3: number) {
        super();
    }

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }

    calcularPerimetro(): number {
        return this.lado1 + this.lado2 + this.lado3;
    }
}