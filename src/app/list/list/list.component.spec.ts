import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { PipesModule } from 'src/app/pipes/pipes.module';

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
      imports: [PipesModule],
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
