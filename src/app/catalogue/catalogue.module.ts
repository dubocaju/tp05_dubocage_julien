import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { SearchComponent } from "./search/search.component";
import { FormsModule } from "@angular/forms";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

const routes: Routes = [
  { path: '', component: CatalogueComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    CatalogueComponent,
    SearchComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class CatalogueModule { }
