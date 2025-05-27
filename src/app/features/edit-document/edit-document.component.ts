// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { DocumentsService } from '../documents/services/documents.services';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';

// @Component({
//   selector: 'app-edit-document',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
//   templateUrl: './edit-document.component.html',
// })
// export class EditDocumentComponent implements OnInit {
//   form = this.fb.group({
//     nombreNino: ['', Validators.required],
//     fechaNacimiento: ['', Validators.required],
//     fechaBautismo: ['', Validators.required],
//     padre: ['', Validators.required],
//     madre: ['', Validators.required],
//     padrinos: [''],
//     observaciones: [''],
//     noFolioLibro: ['', Validators.required],
//   });

//   id!: string;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private documentsService: DocumentsService
//   ) { }

//   ngOnInit(): void {
//     this.id = this.route.snapshot.paramMap.get('id')!;
//     this.documentsService.getDocumentoById(this.id).subscribe(doc => {
//       this.form.patchValue(doc);
//     });
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       this.documentsService.updateDocumento(this.id, this.form.value).subscribe(() => {
//         this.router.navigate(['/documentos']);
//       });
//     }
//   }
// }