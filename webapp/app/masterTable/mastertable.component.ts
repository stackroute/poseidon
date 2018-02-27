import {Component} from '@angular/core';
import {masterList} from './masterList';
import {MasterTableService} from './mastertable.service'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';



@Component({
  selector: 'mastertable',
  styleUrls: ['mastertable.component.css'],
  templateUrl: 'mastertable.component.html',
})

export class MasterTableComponent implements OnInit{
    // displayedColumns = ['GroupName','ProjectName','UserName','ProjectId'];
    displayedColumns = ['groupName', 'projectName',  'userName'];
 
    projectDetail;
    dataSource = new MasterListSource(this.masterService);

    constructor(private masterService: MasterTableService, private router: Router) { }

    getRecord(record){
      // console.log(this.router)
      this.projectDetail = record;
      // console.log(this.projectDetail);
      this.masterService.getRecordInfo(this.projectDetail)
      this.router.navigateByUrl('/projectstatus')

    }

    ngOnInit() { }
  
  }

  export class MasterListSource extends DataSource<any>{
    constructor(private masterService: MasterTableService){
      super();
    }
    connect(): Observable<masterList[]>{
      return this.masterService.getMasterList();
    }
    disconnect(){}
  }