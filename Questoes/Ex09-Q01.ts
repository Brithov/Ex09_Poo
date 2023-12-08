//Podemos instanciar classes abstratas? Justifique.
console.log(`Não, uma vez que as classes abstratas servem como modelos`);
console.log(`para outras classes que as estendem`);
console.log(`ex:`);

console.log(`A classe Veiculo é abstrata e possui um método abstrato acelerar(). `);

public abstract class Veiculo {
    private String marca;

    public Veiculo(String marca) {
        this.marca = marca;
    }

    public String getMarca() {
        return marca;
    }

    // Método abstrato sem corpo
    public abstract void acelerar();
}

console.log(`Não podemos criar uma instância de Veiculo diretamente, `);
console.log(`pois ela não é completa; o método acelerar() não tem corpo. `);
console.log(`Para usar essa classe, precisamos criar uma subclasse que forneça uma implementação para o método abstrato:`);

