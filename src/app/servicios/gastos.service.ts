import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  constructor(private http: HttpClient, private srvG: GeneralService) {}

  

}
