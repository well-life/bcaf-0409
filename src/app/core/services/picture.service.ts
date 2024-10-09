import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { IPagination } from '../interfaces/i-pagination';
import { IPicture } from '../interfaces/i-picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService,
    private authService: AuthenticationService
  ) { }

  get baseHttp() {
    return this.baseHttpService;
  }

  getAllPictures(): Observable<IPagination<IPicture>>{
    const headers = {
      Authorization: this.authService.token,
    };
    return this.http.get<IPagination<IPicture>>('/api/pictures/', { headers });
  }

  getPicture(id:number): Observable<IPicture> {
    const headers = {
      Authorization: this.authService.token,
    };
    return this.http.get<IPicture>(`/api/pictures/${id}/`, { headers });
  }

  updatePic(id: number, file: any): Observable<IPicture> {
    const headers = {
      Authorization: this.authService.token,
    };
    const formData: FormData = new FormData();
    formData.append('src', file);
    return this.http.put<IPicture>(`/api/pictures/${id}/`, formData, {
      headers,
    });
  }

  removePic(id: number): Observable<null> {
    const headers = {
      Authorization: this.authService.token,
    };
    return this.http.delete<null>(`/api/pictures/${id}/`, {
      headers,
    });
  }

  uploadPicture(file: any): Observable<IPicture> {
    const headers = {
      Authorization: this.authService.token,
    };
    const formData: FormData = new FormData();
    formData.append('src', file);
    return this.http.post<IPicture>(`/api/pictures/`, formData, {
      headers,
    });
  }
}
