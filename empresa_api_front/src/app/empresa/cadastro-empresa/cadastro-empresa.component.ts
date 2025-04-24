import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent {
  cnpj: string = '';
  loading: boolean = false;
  error: string = '';
  sucesso: string = '';

  constructor(private empresaService: EmpresaService, private router: Router) {}

  salvarEmpresa() {
    if (!this.cnpj) {
      this.error = 'CNPJ é obrigatório.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.sucesso = '';

    this.empresaService.salvarEmpresa(this.cnpj).subscribe({
      next: () => {
        this.loading = false;
        this.sucesso = 'Empresa cadastrada com sucesso!';
        this.cnpj = '';
        // opcional: this.router.navigate(['/empresas']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Erro ao salvar empresa. Verifique o CNPJ.';
      }
    });
  }
}
