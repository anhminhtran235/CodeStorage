import {Injectable} from '@angular/core';
import { CodingDocument } from '../classes/codingDocument';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DocumentService } from '../_services/document.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DocumentDisplayResolver implements Resolve<CodingDocument>
{
    constructor(private documentService: DocumentService, private alertify: AlertifyService,
                private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<CodingDocument>
    {
        const documentId = route.params.documentId;
        return this.documentService.getDocument(documentId).pipe(
            catchError(error =>
                {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['documents']);
                    return of(null);
                })
        );
    }

}
