import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup} from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {SharedService} from '../../shared.service';
import {Course} from './interfaces_req';


@Component({
  selector: 'app-cmanage',
  templateUrl: './cmanage.component.html',
  styleUrls: ['./cmanage.component.css']
})
export class CmanageComponent implements OnInit {

  list: any=[];
  keys:any=[];
  public myForm: FormGroup;
  constructor(private fb: FormBuilder, private service: SharedService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
       Course: this.fb.array([this.fb.group({course_id:1,course_name:''})])
    })
    if(this.keys.length!=0)
    this.keys =[];
    this.service.getDetails().subscribe(data => {
      this.list= data;  
      console.log(data);
      const product1 :any = data[0];
      for (const key in product1)
      {
        if(key == 'course_name')
        this.keys.push(key);
      }
    });

}
get courseNames() {
  return this.myForm.get('Course') as FormArray;
}
addCourse() {
    this.courseNames.push(this.fb.group({course_id:1,course_name:''}));
}

deleteCourse(index) {
  if(this.courseNames.length!=1)
  this.courseNames.removeAt(index);
  else
  this.courseNames.setControl(0,this.fb.group({course_name:''}));
}
submit(){
  this.service.sendDetails(this.myForm.value.Course).subscribe(data=>this.ngOnInit()); 
  alert("Submitted successfully");
  
}

}