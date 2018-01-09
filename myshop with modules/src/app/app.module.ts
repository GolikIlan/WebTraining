import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertModule } from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { SaveDialogComponent } from '../shared/save-dialog/save-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MainLayoutModule } from '../layout/main-layout.module';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ProductsModule } from '../products/products.module';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(), 
    AngularFontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    MainLayoutModule,
    ProductsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
