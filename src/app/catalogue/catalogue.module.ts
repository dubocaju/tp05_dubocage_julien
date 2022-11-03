import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { SearchComponent } from "./search/search.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  { path: '', component: CatalogueComponent }
];

@NgModule({
  declarations: [
    CatalogueComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class CatalogueModule { }
