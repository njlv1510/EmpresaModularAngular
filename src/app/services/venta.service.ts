import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private http = inject(HttpClient);

  private apiUrl = 'https://empresa-modular-api-git-nicklv1510-dev.apps.rm3.7wse.p1.openshiftapps.com/api/Ventas';

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  getVenta(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  crearVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  actualizarVenta(id: number, venta: Venta): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, venta);
  }

  eliminarVenta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
