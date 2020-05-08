import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { DocumentDisplayComponent } from '../document-components/document-display/document-display.component';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<DocumentDisplayComponent>
{
    constructor(private authService: AuthService){}

    canDeactivate(component: DocumentDisplayComponent)
    {
        if (component.dataHasChanged() && this.authService.loggedIn())
        {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
