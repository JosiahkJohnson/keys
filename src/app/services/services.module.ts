import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GlobalErrorHandler, GlobalHttpInterceptorService } from "./global.error.service";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { ErrorDialogService } from "./error-dialog/error-dialog.service";
import { DataModelService } from "./datamodel.service";
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomValidatorsDirective } from '../custom-validators.directive';

@NgModule({
    declarations: [ErrorDialogComponent, ModalComponent, CustomValidatorsDirective],
    imports: [CommonModule],
    exports: [ErrorDialogComponent, ModalComponent],
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
        DataModelService,
        ModalComponent,
        BrowserAnimationsModule,
        CustomValidatorsDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ServiceModule{};