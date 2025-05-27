// import { Injectable } from "@angular/core";
// import { Apollo, gql } from "apollo-angular";
// import { Observable } from "rxjs";

// const GET_DOCUMENT_BY_ID = gql``;

// @Injectable({
//     providedIn: 'root'
// })

// export class EditDocumentService {
//     constructor(private apollo: Apollo) { }
    
//     getDocumentoById(id: string): Observable<any[]> {
//         return this.apollo.query<any>({
//             query: GET_DOCUMENT_BY_ID,
//         }).pipe(
//             map(result => result.data.findAllClientes)
//         );
//         // return this.http.get<any>(`/api/documentos/${id}`);
//     }

//     updateDocumento(id: string, data: any): Observable<any[]> {
//         // return this.http.put<any>(`/api/documentos/${id}`, data);
//     }
//  }