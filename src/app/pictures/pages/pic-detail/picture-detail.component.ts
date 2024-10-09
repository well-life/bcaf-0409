import { Component, OnInit } from '@angular/core';
import { IPicture } from '../../../core/interfaces/i-picture';
import { PictureService } from '../../../core/services/picture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrl: './picture-detail.component.css'
})
export class PictureDetailComponent implements OnInit{
  picture! : IPicture
  file: any
  id: number = 0

  constructor(
    private pictureService: PictureService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0', 10);

    if (this.id) {
      this.pictureService
        .getPicture(this.id)
        .pipe(
          catchError((error) => {
            this.handleError(error);
            return [];
          })
        )
        .subscribe(
          (resp: IPicture) => {
            this.picture = resp;
          },
          (error) => {
            this.handleError(error);
          }
        );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'ID gambar tidak valid!',
        icon: 'error',
      });
    }
  }

  handleError(error: any) {
    console.error('Terjadi kesalahan saat memuat gambar:', error);
    Swal.fire({
      title: 'Terjadi kesalahan',
      text: 'Gagal memuat data gambar. Coba lagi nanti.',
      icon: 'error',
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.pictureService
        .updatePic(this.id, this.file)
        .pipe(catchError(this.pictureService.baseHttp.handleError))
        .subscribe((resp: IPicture) => {
          Swal.fire({
            title: 'Success',
            text: 'Berhasil mengedit gambar!',
            icon: 'success',
          });
          this.picture = resp;
          this.router.navigate(['/picture']);
        });
    }
  }
  onRemove() {
    Swal.fire({
      title: 'Apakah Anda yakin menghapus gambar ini?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Setuju
        this.pictureService
          .removePic(this.id)
          .pipe(catchError(this.pictureService.baseHttp.handleError))
          .subscribe((resp: null) => {
            Swal.fire({
              title: 'Success',
              text: 'Berhasil menghapus gambar',
            });
            this.router.navigate(['/picture']);
          });
      } else if (result.isDenied) {
      }
    });
  }
  uploadPicture(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/'))
    {
      this.file = file;
    }
    else
    {
      Swal.fire({
        title: 'Error',
        text: 'Harap unggah file gambar yang valid!',
        icon: 'error',
      });
      event.target.value = null;
    }
  }
  
}
