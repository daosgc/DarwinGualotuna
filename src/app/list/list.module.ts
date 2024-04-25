import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { DropdownComponent } from './dropdown/dropdown.component';


@NgModule({
  declarations: [
    ListComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListRoutingModule,
    PipesModule,
  ]
})
export class ListModule { }
