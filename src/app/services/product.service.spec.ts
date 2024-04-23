import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    httpClientSpy.get.and.returnValue(of([]));
    service.getProducts();
    expect(httpClientSpy.get).toHaveBeenCalledWith('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
  })
});
