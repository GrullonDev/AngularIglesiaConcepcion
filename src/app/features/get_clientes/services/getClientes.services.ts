import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const GET_CLIENTES = gql`
  query FindAllClientes {
    findAllClientes {
      id
      noFolioLibro
      nombreNino
      fechaNacimiento
      padre
      madre
      padrino {
        nombre
        id
        cantidad
      }
      sacerdote {
        nombreCompleto
        id
        cantidad
      }
      parroquia
      firmaSacerdote
      createdAt
      fechaBautismo
      partida
      celebrante
      observaciones
      campo34
      campo35
      campo36
      documentos {
        id
        tipo
        fechaEmision
        observaciones
        sacerdote {
          id
          nombreCompleto
          cantidad
        }
        creadoEn
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})

export class getClientesService {
  constructor(private apollo: Apollo) { }

  getClientes(tipo: string = ''): Observable<any[]> {
    return this.apollo.watchQuery<any>({
      query: GET_CLIENTES,
      variables: { tipo: tipo || null }
    }).valueChanges.pipe(
      map(result => result.data.findAllClientes)
    );
  }
}