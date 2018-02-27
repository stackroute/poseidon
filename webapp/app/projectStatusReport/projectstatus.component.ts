import {Component} from '@angular/core';
import { OnInit, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {ProjectStatusService} from './projectstatus.service';
import {MasterTableService} from '../masterTable/mastertable.service';
import {projectstatus} from './projectstatus';

@Component({
    selector: 'projectStatus',
    styleUrls: ['projectstatus.component.css'],
    templateUrl: 'projectstatus.component.html',
})


export class ProjectStatusComponent implements OnInit, AfterContentInit {
    
    constructor(private projectStatus: ProjectStatusService, private masterService: MasterTableService) { }
    

    
    public reportData = null;
  
   

    ngAfterContentInit(){
        
    }

    ngOnInit(){
        console.log(this.reportData)
        this.masterService.changedResults.subscribe(res =>{
            this.projectStatus.getProjectReport(res).subscribe(response =>{
                console.log("coming res",response);
                // console.log(response)
                this.reportData = response;

            });
        })
        // console.log(this.reportData)
     }
    
}