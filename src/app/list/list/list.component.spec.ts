import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let productApiSpy: jasmine.SpyObj<ProductService>
  beforeEach(async () => {
    productApiSpy = jasmine.createSpyObj<ProductService>('ProductService', {
      getProducts: of([])
    });
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        { provide: ProductService, useValue: productApiSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
