export interface Account {
    id:number;
    name:string;
    father_name:string;
    mother_name:string;
    phoneNo:string;
    email:string;
    dob:string;
    age:number;
    address:string;
    genderId:number;
    educationId:number;
    accountTypeId:number;
    accountNo:number;
    genderModel:{
        name:""
    }; 

    educationModel:{
        degree:""
    };

    accountTypeModel:{
        accountType:""
    };
    intialAmount:number;
}
