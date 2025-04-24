import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'https://localhost:7186/api/empresa'; // URL do backend local

  constructor(private http: HttpClient) {}

  salvarEmpresa(cnpj: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${cnpj}`, null);
  }

  listarEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
