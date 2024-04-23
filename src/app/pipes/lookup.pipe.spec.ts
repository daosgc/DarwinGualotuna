import { mockProducts } from '../contants/product.constant';
import { Product } from '../interfaces/product.interface';
import { LookupPipe } from './lookup.pipe';

describe('LookupPipe', () => {
  it('create an instance', () => {
    const pipe = new LookupPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter products by name', () => {
    const products = mockProducts;
    const pipe = new LookupPipe();
    expect(pipe.transform(products, 'prest', 'name')).toEqual([{
      id: '1002',
      name: 'Prestamo',
      description: 'Prestamo Credito',
      logo: 'https://kapitalizateya.com/wp-content/uploads/2023/06/prestamo.jpeg',
      date_release: '2024-04-20T00:00:00.000+00:00',
      date_revision: '2025-05-01T00:00:00.000+00:00'
    }]);
  });
});
