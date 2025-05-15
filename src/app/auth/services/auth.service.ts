// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const LOGIN_MUTATION = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password)
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($nombre: String!, $correo: String!, $password: String!) {
    createUser(input: { nombre: $nombre, correo: $correo, password: $password }) {
      id
      nombre
      correo
      rol
    }
  }
`;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private apollo: Apollo) { }

    login(correo: string, password: string): Observable<string> {
        return this.apollo
            .mutate<any>({
                mutation: LOGIN_MUTATION,
                variables: { correo, password }
            })
            .pipe(map(result => result.data.login));
    }

    register(nombre: string, correo: string, password: string): Observable<any> {
        return this.apollo
            .mutate<any>({
                mutation: REGISTER_MUTATION,
                variables: { nombre, correo, password }
            })
            .pipe(map(result => result.data.createUser));
    }
}