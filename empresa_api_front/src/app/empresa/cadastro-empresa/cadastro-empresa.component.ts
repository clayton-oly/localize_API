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
  empresa: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private empresaService: EmpresaService, private router: Router) {}

  buscarEmpresa() {
    if (this.cnpj) {
      this.loading = true;
      this.error = '';
      this.empresaService.consultarEmpresa(this.cnpj).subscribe({
        next: (data) => {
          this.empresa = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao consultar empresa. Tente novamente.';
          this.loading = false;
        }
      });
    }
  }

  salvarEmpresa() {
    if (this.empresa) {
      this.empresaService.salvarEmpresa(this.empresa).subscribe({
        next: () => {
          this.router.navigate(['/empresas']);
        },
        error: (err) => {
          this.error = 'Erro ao salvar empresa. Tente novamente.';
        }
      });
    }
  }
}
