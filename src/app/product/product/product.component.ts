import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  currentDate: moment.Moment = moment();
  minDate: string = this.currentDate.format('YYYY-MM-DD');
  editMode = false;
  readonly destroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
  ) {
    this.productForm =  this.initForm();
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap?.get('id');
    if (productId) {
      this.editMode = true;
      this.fillForm(productId);
    }
    this.productForm.controls['date_release'].valueChanges.subscribe((change: string) => {
      this.productForm.controls['date_revision'].setValue(moment(change).add(1, 'years').format('YYYY-MM-DD'));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetForm(event: Event) {
    event.preventDefault();
    this.productForm.reset();
  }

  onSubmit() {
    const newProduct: Product = {
      ...this.productForm.value,
      date_revision: moment(this.productForm.value.date_release).add(1, 'years').format('YYYY-MM-DD')
    };
    if (this.editMode) {
      this.productService.updateProduct(newProduct).pipe(takeUntil(this.destroy$)).subscribe({next: () => {
        this.router.navigate(['/']);
      }, error: (error) => {
        console.log(error.error);
      }});
    } else {
      this.productService.addProduct(newProduct).pipe(takeUntil(this.destroy$)).subscribe({next: () => {
        this.router.navigate(['/']);
      }, error: (error) => {
        console.log(error.error);
      }});
    }
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: [this.currentDate.format('YYYY-MM-DD'), [Validators.required]],
      date_revision: [{value: this.currentDate.add(1, 'years').format('YYYY-MM-DD'), disabled: true}, [Validators.required]],
    });
  }

  private fillForm(productId: string) {
    this.productService.findProduct(productId).subscribe((product: Product | undefined) => {
      this.productForm.controls['id'].setValue(product?.id)
      this.productForm.controls['id'].disable();
      this.productForm.controls['name'].setValue(product?.name)
      this.productForm.controls['description'].setValue(product?.description)
      this.productForm.controls['logo'].setValue(product?.logo)
      this.productForm.controls['date_release'].setValue(moment(product?.date_release).format('YYYY-MM-DD'));
      this.productForm.controls['date_revision'].setValue(moment(product?.date_revision).format('YYYY-MM-DD'));
    });
  }
}
