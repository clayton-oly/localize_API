import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {
  empresas: any[] = [];
  loading: boolean = true;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.empresaService.listarEmpresas().subscribe({
      next: (data) => {
        this.empresas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar empresas:', err);
        this.loading = false;
      }
    });
  }
}
