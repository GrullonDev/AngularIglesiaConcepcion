import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const GET_COUNT_DOCUMENTS = gql`
    query ObtenerDocumentosPorTipo {
        countDocumentosByTipo {
            matrimonios
            confirmaciones
            comuniones
            bautizos
        }
    }
`;

@Injectable({ providedIn: 'root' })

export class DashboardService {
    constructor(private apollo: Apollo) { }

    getCountDocuments() {
        return this.apollo
            .watchQuery<any>({ query: GET_COUNT_DOCUMENTS })
            .valueChanges.pipe(map((result) => result.data.countTotalDocumentos));
    }
}