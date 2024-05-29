import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modules/product';
import { Root } from '../modules/root';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl:string = 'https://dummyjson.com/products'

  constructor(private http:HttpClient) { }//ricorda di inserire la proprietà http nel constructor per poter effettuare le chiamate

  //una tipizzazione corretta del risultato permette di avere errori che ci avvisano che stiamo sbagliando il return
  getAll(): Observable<Product[]> {
    return this.http.get<Root>(this.apiUrl).pipe(
      map((response: Root) => response.products)
    );
  }

  getById(id:number):Observable<Product>{
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }


  create(newProduct:Partial<Product>):Observable<Product>{
    return this.http.post<Product>(this.apiUrl, newProduct)
  }

  edit(product:Product):Observable<Product>{
    return this.http.put<Product>(this.apiUrl + '/' + product.id, product)
  }

  delete(id:number):Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/${id}`)
  }

}
