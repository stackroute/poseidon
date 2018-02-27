import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient }   from '@angular/common/http';
import {projectstatus} from './projectstatus';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjectStatusService {

  constructor(private http: HttpClient) { }

  getProjectReport(projId): Observable<projectstatus[]>{
    return this.http.get<projectstatus[]>('http://localhost:4000/getProjectReport/'+projId);
  }

}