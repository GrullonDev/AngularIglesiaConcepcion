import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const GET_COUNT_DOCUMENTS = gql`
    query CountTotalDocumentosPorTipo {
        countTotalDocumentosPorTipo {
            bautizos
            comuniones
            confirmaciones
            matrimonios
        }
    }
`;

@Injectable({ providedIn: 'root' })

export class DashboardService {
    constructor(private apollo: Apollo) { }

    getCountDocumentsByType() {
        return this.apollo
            .watchQuery<any>({ query: GET_COUNT_DOCUMENTS })
            .valueChanges.pipe(map((result) => result.data.countTotalDocumentosPorTipo));
    }
}