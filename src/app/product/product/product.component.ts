import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  currentDate: moment.Moment = moment();
  minDate: string = this.currentDate.format('YYYY-MM-DD');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly productService: ProductService,
  ) {
    this.productForm =  this.initForm();
  }

  ngOnInit(): void {
    this.productForm.controls['date_release'].valueChanges.subscribe((change: string) => {
      this.productForm.controls['date_revision'].setValue(moment(change).add(1, 'years').format('YYYY-MM-DD'));
    });
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
    this.productService.addProduct(newProduct).subscribe({next: () => {
      this.router.navigate(['/']);
    }, error: (error) => {
      console.log(error.error);
    }});
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
}
