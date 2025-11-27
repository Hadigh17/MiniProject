import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Customer, CustomerCreate } from '../types/customer';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private base = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.base);
  }

  create(dto: CustomerCreate): Observable<void> {
    return this.http.post<void>(this.base, dto);
  }

  update(id: number, dto: CustomerCreate): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
