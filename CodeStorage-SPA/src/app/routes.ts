import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocumentListComponent } from './document-components/document-list/document-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { DocumentDisplayComponent } from './document-components/document-display/document-display.component';
import { DocumentListResolver } from './_resolvers/document-list.resolver';
import { DocumentDisplayResolver } from './_resolvers/document-display.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes =
[
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'documents', component: DocumentListComponent, resolve:
                {documents: DocumentListResolver}},
            {path: 'documents/:documentId', component: DocumentDisplayComponent, resolve:
                {document: DocumentDisplayResolver}, canDeactivate: [PreventUnsavedChanges]}
        ]
    },

    {path: '**', redirectTo: '', pathMatch: 'full'}
];
