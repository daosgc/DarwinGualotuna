import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Columns } from 'src/app/contants/list.constant';
import { Product } from 'src/app/interfaces/product.interface';
import { Column } from 'src/app/interfaces/table.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  readonly destroy$ = new Subject<void>();
  products: Product[] = [];
  columns: Column[] = Columns;
  searchText = '';
  itemsPerPage = 5;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToNewProduct() {
    this.router.navigate(['/product']);
  }

}
