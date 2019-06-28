export class Course
{
    course_id:number;
    course_name:string;
}
export class Trainer
{
    trainerId:number;
    trainerName:string;
    courses:Course[];
    constructor(trainerName:string,courses:Course[])
    {
        this.trainerId=1;
        this.trainerName=trainerName;
        this.courses=courses;
    }
}
