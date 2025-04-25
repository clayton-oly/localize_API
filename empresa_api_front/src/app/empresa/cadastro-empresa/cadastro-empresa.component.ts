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
  
  private cnpjRegex: RegExp = /^\d{14}$/;

  constructor(private empresaService: EmpresaService, private router: Router) {}

  onCnpjInput(event: any) {
    this.cnpj = event.target.value.replace(/\D/g, ''); 

    if (this.cnpj.length > 14) {
      this.cnpj = this.cnpj.substring(0, 14);
    }
  }

  validarCnpj(): boolean {
    return this.cnpjRegex.test(this.cnpj);
  }

  salvarEmpresa() {
    if (this.cnpj && this.validarCnpj()) {
      this.loading = true;
      this.error = '';
      this.empresaService.salvarEmpresa(this.cnpj).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/empresas']);
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            this.error = err.error;
          } else {
            this.error = 'Erro ao salvar empresa. Tente novamente.';
          }
          this.loading = false;
        }
      });
    } else {
      this.error = 'CNPJ inválido. Por favor, insira um CNPJ válido com 14 dígitos.';
    }
  }
}
