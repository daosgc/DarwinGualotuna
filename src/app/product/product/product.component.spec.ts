import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productApiSpy: jasmine.SpyObj<ProductService>
  let routerSpy: jasmine.SpyObj<Router>
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>
  beforeEach(async () => {
    productApiSpy = jasmine.createSpyObj<ProductService>('ProductService', {
      addProduct: of([]),
      updateProduct: of()
    });
    routerSpy = jasmine.createSpyObj<Router>('Router', {
      navigate: undefined
    });
    activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', {
      snapshot: {
        paramMap: {
          get: undefined
        }
      }
    });
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ProductService, useValue: productApiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form', () => {
    const mockEvent = new Event('');
    spyOn(component.productForm, 'reset');
    component.resetForm(mockEvent);
    expect(component.productForm.reset).toHaveBeenCalled();
  });

  it('should save a product', () => {
    component.onSubmit();
    expect(productApiSpy.addProduct).toHaveBeenCalled();
  });

  it('should update a product', () => {
    component.editMode = true;
    component.onSubmit();
    expect(productApiSpy.updateProduct).toHaveBeenCalled();
  });
});
