import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                const authLink = setContext(() => {
                    const token = localStorage.getItem('token');
                    return {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                        },
                    };
                });

                const http = httpLink.create({ uri: 'http://172.20.10.8:3000/graphql' });

                return {
                    cache: new InMemoryCache(),
                    link: authLink.concat(http),
                };
            },
            deps: [HttpLink],
        },
    ],
})

export class GraphQLModule { }