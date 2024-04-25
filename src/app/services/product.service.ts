import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.api;

  constructor(private readonly httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/bp/products`)
  }

  addProduct(product: Product): Observable<Product[]> {
    return this.httpClient.post<Product[]>(`${this.url}/bp/products`, product);
  }

  findProduct(id: string): Observable<Product | undefined> {
    return this.getProducts().pipe(map((products: Product[]) => {
      return products.find((product: Product) => product.id === id);
    }))
  }

  updateProduct(product: Product): Observable<Product[]> {
    return this.httpClient.put<Product[]>(`${this.url}/bp/products`, product);
  }
}
