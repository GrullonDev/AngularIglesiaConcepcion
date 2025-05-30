import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { GraphQLModule } from './graphql/graphql.module';
import { setContext } from '@apollo/client/link/context';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(GraphQLModule),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = setContext(() => {
        const token = localStorage.getItem('access_token');
        console.log('TOKEN ENVIADO →', token); // 👈 Verifica esto en la consola
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      return {
        link: authLink.concat(httpLink.create({
          uri: 'https://able-prawn-singularly.ngrok-free.app/graphql', // 👈 Asegúrate que este URL esté disponible desde tu navegador
        })),
        cache: new InMemoryCache(),
      };
    }),
  ],
};