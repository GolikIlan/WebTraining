import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
  ],
  exports:[MainLayoutComponent],
  declarations: [MainLayoutComponent]
})
export class MainLayoutModule { }
