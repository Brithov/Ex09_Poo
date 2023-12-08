/*
    Imagine que você deve modelar várias figuras geométricas em TypeScript e que
    cada uma tem sua forma específica de calcular área e perímetro. Proponha e
    implemente uma hierarquia de classes usando uma classe abstrata chamada
    FiguraGeometrica e outras concretas: Quadrado, Triangulo, etc.
*/
console.log(`Se uma classe herda de uma classe abstrata e não implementa todos os seus`);
console.log(`métodos então ela também deve ser considerada uma classe abstrata.`);
console.log(`caso contrario ocorrerá um erro de compilação pois uma classe concreta deve `);
console.log(`possuir todos os seus metodos implementados para todos os seus métodos asbtratos herdados`);

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


