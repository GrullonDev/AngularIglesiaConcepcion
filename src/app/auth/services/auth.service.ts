// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) { }

  login(email: string, password: string) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation Login($correo: String!, $password: String!) {
            login(correo: $correo, password: $password)
          }
        `,
        variables: { correo: email, password },
      })
      .pipe(
        map((result: any) => {
          console.log('[LOGIN RESULT]', result);  // 👈 verifica esto
          return result?.data?.login ?? null;
        })
      )
  }

  register(nombre: string, correo: string, password: string): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation Register($nombre: String!, $correo: String!, $password: String!) {
            createUser(
              input: {
                nombre: $nombre
                correo: $correo
                password: $password
                rol: PARROCO
              }
            ) {
              id
              nombre
              correo
              rol
            }
          }
        `,
        variables: { nombre, correo, password },
      })
      .pipe(map((result) => result.data.createUser));
  }
}