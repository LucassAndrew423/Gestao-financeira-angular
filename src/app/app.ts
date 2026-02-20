import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Despesa } from './despesa';
import { Chart, registerables } from 'chart.js';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

// Registra os módulos do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, AfterViewInit {

private firestore: Firestore = inject(Firestore); // Injeta o banco

  async enviarParaOFirebase() {
  try {
    const colRef = collection(this.firestore, 'testes'); // Nome da "pasta" no banco
    await addDoc(colRef, {
      mensagem: "FUNCIONOU TWIN!",
      dataEnvio: new Date(),
      status: "Online e Roteando"
    });
    alert('Dado salvo no Firebase com sucesso! ☁️🔥');
  } catch (e) {
    console.error("Erro ao salvar: ", e);
  }
}

  @ViewChild('meuGrafico', { static: true }) canvas!: ElementRef;
  chart: any;

  salario: number = 1100;
  listaDespesas: Despesa[] = [];
  isDarkMode: boolean = true;

  ngOnInit() {
    this.carregarDados();
    console.log("Sistema carregado! ✅");
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.renderizarGrafico();
    }, 50);
    this.renderizarGrafico();
  }

  get dadosCategorias() {
    const categorias = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];
    return categorias.map(cat => {
      return this.listaDespesas
        .filter(d => d.categoria === cat)
        .reduce((sum, item) => sum + item.valor, 0);
    });
  }

  renderizarGrafico() {

    if (!this.canvas || !this.canvas.nativeElement || this.listaDespesas.length === 0) {
    return;
  }

  if (this.chart) {
    this.chart.destroy();
  }

    const ctx = this.canvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Alimentação', 'Transporte', 'Lazer', 'Contas'],
        datasets: [{
          data: this.dadosCategorias,
          backgroundColor: ['#6366f1', '#f87171', '#fbbf24', '#34d399'],
          borderWidth: 0,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { size: 12, family: 'sans-serif' },
              padding: 20
            }
          }
        },
        cutout: '75%'
      }
    });
  }

  get totalGasto(): number {
    return this.listaDespesas.reduce((total, item) => total + item.valor, 0);
  }

  get saldoRestante(): number {
    return this.salario - this.totalGasto;
  }

  salvarDados() {
    localStorage.setItem('minhas_contas', JSON.stringify(this.listaDespesas));
  }

  carregarDados() {
    const textoDaGaveta = localStorage.getItem('minhas_contas');
    if (textoDaGaveta) {
      const listaGenerica = JSON.parse(textoDaGaveta);
      this.listaDespesas = listaGenerica.map((item: any) => {
        return Object.assign(new Despesa('', '', 0), item);
      });

      const salarioSalvo = localStorage.getItem('meu_salario');
      if (salarioSalvo) {
        this.salario = parseFloat(salarioSalvo);
      }

    }

  }

  atualizarSalario(novoValor: string) {
    const valor = parseFloat(novoValor);
    if (!isNaN(valor)) {
      this.salario = valor;
      localStorage.setItem('meu_salario', valor.toString());
    }
  }

  adicionar(desc: string, cat: string, val: string) {
    const valorNum = parseFloat(val);
    if (desc && cat && !isNaN(valorNum)) {
      const nova = new Despesa(desc, cat, valorNum);
      this.listaDespesas.push(nova);
      this.salvarDados();

      setTimeout(() => this.renderizarGrafico(), 0);
    }
  }

  excluir(id: string) {
    this.listaDespesas = this.listaDespesas.filter(d => d.id !== id);
    this.salvarDados();
    this.renderizarGrafico();
  }
}