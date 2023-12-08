/*
    Não podemos aplicar o operador new em FiguraGeometrica, mas porque então
    podemos realizar o seguinte código de instanciação:
    abstract class FiguraGeometrica {
    //...
    }
    let figuras: FiguraGeometrica[] = new Array();
*/
console.log(`De fato não podemos instanciar umaclasse abstrata pois elas não podem ser  `);
console.log(`instanciadas, mas podemos criar uma array de referecia do tipo da classe.`);
console.log(`Isso é possivel por que o array é em suma uma referencia para objetos de qualque classe `);

let figuras: FiguraGeometrica[] = new Array();

console.log(`Quando criamos "figuras" estamos criando um array que esta preparado `);
console.log(`para receber os objetos do tipo FigurGeometrica.`);
console.log(`Isso não cria objetos da classe abstrata, mas permite que o array armazene `);
console.log(`objetos de qualquer subclasse concreta que implemente FiguraGeometrica`);
