import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CartState } from "./shared/states/cart-state";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ApiHttpInterceptor } from "./shared/api-http-interceptor";
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { LoginService } from './shared/services/login.service';
import { Router } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    NgxsModule.forRoot([
      CartState
    ]),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true,
      deps: [Router]
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
