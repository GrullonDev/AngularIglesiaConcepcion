import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { map } from "rxjs";

const GET_DOCUMENTS = gql`
    query FindAllDocumentos($tipo: String) {
        findAllDocumentos(tipo: $tipo) {
            id
            tipo
            fechaEmision
            observaciones
            creadoEn
            cliente {
            id
            noFolioLibro
            fechaNacimiento
            fechaBautismo
            observaciones
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

export class getDocumentsService {
    constructor(private apollo: Apollo) { }

    getDocuments(tipo: string = '') {
        return this.apollo.watchQuery<any>({
            query: GET_DOCUMENTS,
            variables: { tipo: tipo || null }
        }).valueChanges.pipe(
            map(result => result.data.findAllDocumentos)
        );
    }
}