export interface IItem{
    Id:number;
    Description:string;
    PriorityId: number;
    PriorityLevel:string;
    Class:string;
    DueBy:Date;
    Status:number;
    CompletedOn:Date; 
    SubItems:ISubItem[];
}

export interface ISubItem{
    Id:number;
    Description:string;
    ItemId: number;
}

export interface IUser{
    Id:number;
    Name:string;
    EmailId:string;
}

export interface IPriority {
    Id: number;
    PriorityLevel:string;
}