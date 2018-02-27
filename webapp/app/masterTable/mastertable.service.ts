import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient }   from '@angular/common/http';

import { masterList } from './masterList';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject} from  'rxjs/ReplaySubject';

@Injectable()
export class MasterTableService {

  constructor(private http: HttpClient) { }

  public changedResults = new ReplaySubject();

  public getRecordInfo(record) {
    console.log("serviec", record);
    this.changedResults.next(record);
  }

  getMasterList(): Observable<masterList[]> {
    return this.http.get<masterList[]>('http://localhost:4000/getMasterList');
  }

} 