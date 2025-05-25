import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const GET_DOCUMENTOS = gql`
  query ObtenerClientes {
    findAllClientes {
      id
      nombreNino
      parroquia
      firmaSacerdote
      fechaNacimiento
      fechaBautismo
      noFolioLibro
      partida
      celebrante
      observaciones
      campo34
      campo35
      campo36
      createdAt
      padrino {
        id
        nombre
        cantidad
      }
      sacerdote {
        id
        nombreCompleto
        cantidad
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  constructor(private apollo: Apollo) { }

  getDocumentos(): Observable<any[]> {
    return this.apollo.watchQuery<any>({
      query: GET_DOCUMENTOS
    }).valueChanges.pipe(
      map(result => result.data.findAllClientes)
    );
  }
}