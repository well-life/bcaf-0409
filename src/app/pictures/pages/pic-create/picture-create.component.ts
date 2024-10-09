import { Component } from '@angular/core';
import { IPicture } from '../../../core/interfaces/i-picture';
import { PictureService } from '../../../core/services/picture.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-picture-create',
  templateUrl: './picture-create.component.html',
  styleUrls: ['./picture-create.component.css'] // fix typo here (should be styleUrls, not styleUrl)
})
export class PictureCreateComponent {
  picture?: IPicture;
  file: any;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private pictureService: PictureService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.pictureService
        .uploadPicture(this.file)
        .pipe(catchError(this.pictureService.baseHttp.handleError))
        .subscribe((resp: IPicture) => {
          Swal.fire({
            title: 'Sukses',
            text: 'Berhasil mengupload gambar',
            icon: 'success',
          });
          this.picture = resp;
          this.imagePreview = null; 
          this.file = null;
          form.reset();
          this.router.navigate(['/picture']);
        });
    }
  }


  upload(event: any) {
    this.file = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']; 
    if (this.file && !validImageTypes.includes(this.file.type)) {
      Swal.fire({
        title: 'Error',
        text: 'File yang diupload bukan gambar yang valid. Harap upload file .jpg, .jpeg, atau .png.',
        icon: 'error',
      });
      this.file = null;
      this.imagePreview = null;
    } else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; 
      };
      reader.readAsDataURL(this.file);
    }
  }
}
