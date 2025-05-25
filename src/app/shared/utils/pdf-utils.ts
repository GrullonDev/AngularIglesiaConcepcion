// src/app/shared/utils/pdf-utils.ts
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// 🛠️ Solución correcta: asignar vfs desde default
(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs;

export function generarConstanciaPDF(data: any) {
    const docDefinition = {
        content: [
            {
                text: 'Parroquia INMACULADA CONCEPCIÓN',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10],
            },
            {
                text: 'CERTIFICA: Que el libro de BAUTISMOS No. ' + data.noFolioLibro,
                style: 'subheader',
            },
            {
                text: '\nSe encuentra la partida que literalmente dice:\n\n',
            },
            {
                text: [
                    `En la parroquia Inmaculada Concepción el ${data.fechaBautismo}\n`,
                    `Bauticé solemnemente a: ${data.nombreNino}\n`,
                    `Que nació: ${data.fechaNacimiento}\n`,
                    `Hijo(a) legítimo(a) de: ${data.padre}\n`,
                    `Y de: ${data.madre}\n`,
                    `Padrinos: ${data.padrinos}\n`,
                    `Al margen se lee: ${data.observaciones || '-'}\n`,
                    `A petición de la parte interesada y para: USO CORRESPONDIENTE\n`,
                    `Se extiende la presente en el despacho parroquial: ${data.createdAt}`,
                ],
                margin: [0, 0, 0, 10],
            },
            {
                text: '\n\n\nPbro. Víctor Miguel Pamal Rosas.\nPárroco.',
                alignment: 'right',
                margin: [0, 40, 0, 0],
            },
            {
                text: '\n\nParroquia Inmaculada Concepción\nVilla Nueva, Guatemala\n6a. Avenida 4-64, Zona 1 de Villa Nueva',
                style: 'footer',
                alignment: 'center',
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 10],
            },
            footer: {
                fontSize: 10,
                italics: true,
            },
        },
    };

    pdfMake.createPdf(docDefinition).download(`constancia_${data.nombreNino}.pdf`);
}