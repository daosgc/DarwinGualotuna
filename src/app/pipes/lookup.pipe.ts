import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'lookup'
})
export class LookupPipe implements PipeTransform {

  transform(value: Product[], searchText: string, idPropertyName: string): Product[] {
    return value
      .filter((product: Product) => product[idPropertyName as keyof Product].toLowerCase().includes(searchText.toLowerCase()));
  }

}
