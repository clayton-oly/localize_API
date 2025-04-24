import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'https://localhost:7186/api/empresa'; // ajuste se for ambiente em produção

  constructor(private http: HttpClient) {}

  salvarEmpresa(cnpj: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${cnpj}`, null); // enviando só o CNPJ via POST
  }

  listarEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
