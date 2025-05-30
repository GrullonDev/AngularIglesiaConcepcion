import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const GET_DOCUMENTOS = gql`
  query ObtenerDocumentos($tipo: String,) {
    findAllDocumentos(tipo: $tipo) {
      tipo
      creadoEn
      observaciones
      fechaEmision
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  constructor(private apollo: Apollo) { }

  getDocumentos(tipo: string = ''): Observable<any[]> {
    return this.apollo.watchQuery<any>({
      query: GET_DOCUMENTOS,
      variables: { tipo: tipo || null }
    }).valueChanges.pipe(
      map(result => result.data.findAllDocumentos)
    );
  }
}