import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor
{

  jwtToken : String = "";

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtToken != "") {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.jwtToken}`}
      });
    }

    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let tab: Array<String>;
          let enteteAuthorization = event.headers.get("authorization");
          if (enteteAuthorization != null) {
            tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
            if (tab.length > 1) {
              this.jwtToken = tab[1];
            }
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    ));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.log(this.router);
      this.router.navigate(['/login'], { queryParams: { jwtError: true } });
    }
  }

}
