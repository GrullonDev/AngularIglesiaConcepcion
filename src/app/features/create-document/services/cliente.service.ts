import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const CREAR_CLIENTE = gql`
  mutation CrearCliente ($cui: String!, $nombre: String!, $padrinos: String!, $fecha: String!, $sacerdote: String!, $parroquia: String!, $direccion: String!, $firma: String!) {
  createCliente(input: {
    cui: $cui,
    nombreNino: $nombre,
    padrinos: $padrinos,
    fechasPlaticas: $fecha,
    sacerdote: $sacerdote,
    parroquia: $parroquia,
    direccion: $direccion,
    firmaSacerdote: $firma
  }) {
    id
    nombreNino
  }
}
`;

@Injectable({ providedIn: 'root' })

export class ClienteService {
  constructor(private apollo: Apollo) { }

  crearCliente(data: {
    noFolioLibro: string;
    nombre: string;
    fechaNacimiento: string;
    padre: string;
    madre: string;
    padrinos: string;
    sacerdote: string;
    parroquia: string;
    firma: string;
  }) {
    console.log('[GraphQL Payload] Enviando a backend:', data); // 🔍

    return this.apollo.mutate({
      mutation: CREAR_CLIENTE,
      variables: data,
    });
  }
}