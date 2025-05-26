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

                const http = httpLink.create({ uri: 'https://f35f-2803-d100-9980-ff4-2466-9515-478a-c066.ngrok-free.app/graphql' });

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