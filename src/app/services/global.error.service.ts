import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from './error-dialog/error-dialog.service';
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
      private errorDialog: ErrorDialogService,
      private zone: NgZone ) { }

    handleError(error: any) {
       if (!(error instanceof HttpErrorResponse)) {
        error = error.rejection;
       }
       this.zone.run(() =>
       this.errorDialog.openDialog(
         { message: error?.message || 'Undefined client error', status: error?.status })
       );
    console.error('Error from global error handler', error)
    }
}

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
    
  constructor(private httpErrorDialog: ErrorDialogService, zone: NgZone) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpErrorDialog.openDialog();
    return next.handle(req).pipe(
      finalize(() => {
        this.httpErrorDialog.hideDialog();
      })
    ) as Observable<HttpEvent<any>>;
  }
}