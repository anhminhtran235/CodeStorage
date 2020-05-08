import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CodingDocument } from '../classes/codingDocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseUrl = environment.apiUrl + 'documents';
  constructor(private http: HttpClient) { }

  getDocuments(): Observable<CodingDocument[]>
  {
    return this.http.get<CodingDocument[]>(this.baseUrl);
  }

  getDocument(documentId: number): Observable<CodingDocument>
  {
    return this.http.get<CodingDocument>(this.baseUrl + '/' + documentId);
  }

  newDocument(): Observable<CodingDocument>
  {
    return this.http.post<CodingDocument>(this.baseUrl + '/new', {});
  }

  updateDocument(document: CodingDocument)
  {
    return this.http.put(this.baseUrl + '/update', document);
  }

  deleteAllEmptyDocuments()
  {
    return this.http.delete(this.baseUrl + '/removeEmpty');
  }
}
