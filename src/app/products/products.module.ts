import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAlertComponent } from '../product-alert/product-alert.component';
import { AppComponent } from '../app.component';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductAlertComponent,
    ToolBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    ProductsComponent
  ],
  bootstrap: [AppComponent]
})
export class ProductsModule { }
