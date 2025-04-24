import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'https://seu-backend-na-render.com/api/empresas'; // substitua pela URL real do seu backend

  constructor(private http: HttpClient) {}

  consultarEmpresa(cnpj: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/consultar/${cnpj}`);
  }

  salvarEmpresa(empresa: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salvar`, empresa);
  }

  listarEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }
  
}
