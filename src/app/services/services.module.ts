import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { GlobalErrorHandler, GlobalHttpInterceptorService } from "./global.error.service";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { ErrorDialogService } from "./error-dialog/error-dialog.service";
import { DataModelService } from "./datamodel.service";

@NgModule({
    declarations: [ErrorDialogComponent],
    imports: [CommonModule],
    exports: [ErrorDialogComponent],
    providers: [
        {
            provide: ErrorHandler, 
            useClass: GlobalErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: GlobalHttpInterceptorService, 
            multi: true
        },
        ErrorDialogService,
        DataModelService
    ]
})

export class ServiceModule{};