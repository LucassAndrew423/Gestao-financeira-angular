
export class Despesa {
    id: string;
    descricao: string;
    categoria: string;
    valor: number;
    data: Date;

    constructor(descricao: string, categoria: string, valor: number) {
        this.id = Math.random().toString(36).substring(2); // Gera um ID aleatório
        this.descricao = descricao;
        this.categoria = categoria;
        this.valor = valor;
        this.data = new Date(); // Salva o momento da compra
    }
}