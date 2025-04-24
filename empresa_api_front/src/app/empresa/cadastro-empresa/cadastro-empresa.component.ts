import { Component } from '@angular/core';
import { EmpresaService } from '../empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent {
  cnpj: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private empresaService: EmpresaService, private router: Router) {}

  salvarEmpresa() {
    if (this.cnpj) {
      this.loading = true;
      this.error = '';
      this.empresaService.salvarEmpresa(this.cnpj).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/empresas']);
        },
        error: (err) => {
          this.error = 'Erro ao salvar empresa. Tente novamente.';
          this.loading = false;
        }
      });
    }
  }
}
