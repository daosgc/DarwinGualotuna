import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupPipe } from './lookup.pipe';

@NgModule({
  declarations: [
    LookupPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LookupPipe
  ]
})
export class PipesModule { }
