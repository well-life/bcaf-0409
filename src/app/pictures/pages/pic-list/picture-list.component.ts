import { Component, OnInit } from '@angular/core';
import { PictureService } from '../../../core/services/picture.service';
import { IPicture } from '../../../core/interfaces/i-picture';
import { IPagination } from '../../../core/interfaces/i-pagination';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';  // Pastikan Swal sudah diinstal

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css'] 
})
export class PictureListComponent implements OnInit {

  pictures!: IPagination<IPicture>;
  isLoading: boolean = true; 
  errorMessage: string = ''; 

  constructor(private picturesService: PictureService) { }

  ngOnInit(): void {
    this.loadPictures();
  }

  loadPictures(): void {
    this.isLoading = true; 
    this.picturesService
      .getAllPictures()
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Gagal memuat gambar. Coba lagi nanti.';
          Swal.fire({
            title: 'Error',
            text: this.errorMessage,
            icon: 'error',
          });
          return []; 
        })
      )
      .subscribe(
        (resp: IPagination<IPicture>) => { 
          this.pictures = resp;
        },
        () => {} 
      )
      .add(() => {
        this.isLoading = false;
      });
  }
  
}
