import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { Course, Trainer } from '../cmanage/interfaces_req';

@Component({
  selector: 'app-tmanage',
  templateUrl: './tmanage.component.html',
  styleUrls: ['./tmanage.component.css']
})
export class TmanageComponent implements OnInit {

//  trainers:Trainer[];
  trainers:Trainer[];
    // {"trainer_id":"1","trainer_name":"Anand","courses":[{"course_id":"1","course_name":"java"},{"course_id":"1","course_name":"java"}]}

  courses:Course[]=[];
  mainkeys:any = [];
  coursekeys:any=[];
  courseNewArray:Course[]=[];
  i:number=0;
  j:number=0;
  trainer:Trainer;
  
  constructor(private fb: FormBuilder, private service: SharedService) { }
  ngOnInit() {

    this.service.getCourses().subscribe(data=>this.courses=data); 

    this.service.getTrainers().subscribe(data => {
    this.trainers= data;  
  }); 
 
}

  submit(arr:any,trainerName:string){
    arr.forEach(element => {
      this.courseNewArray.push(this.courses[element]);
    });    
    this.trainer=new Trainer(trainerName,this.courseNewArray);
    this.service.sendTrainers(this.trainer).subscribe(data => console.log(data));
    this.ngOnInit();
    alert("Submitted successfully");
  }
}
