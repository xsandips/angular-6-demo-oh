export class Payroll {
    projectName = '';
    PayG_Employees: PayG_Employee[] = [];
    ABN_Employees: ABN_Employee[] = [];
    ACN_Employees: ACN_Employee[] = [];
}

export class PayG_Employee {
    employeeName: string = '';
    rate = 100;
    employeeType = '';
    totalHrs: number = 8;
    taxableEarning: number = 0;
    tax: number = 0
    super: number = (9.5 / 100) * this.totalHrs * 1000;
    travelDays: number = 10;
    travelAllowance: number = 0;
    totalCosttoCompany: number = 0;
    leaves: number = 0;
}

export class ABN_Employee {
    employeeName = '';
    employeeType = '';
    rate = 150;
    locationCode = '';
    totalHrs =  0;
    note = '';
    super = 0;
    invoiceNumber = 0;
    invoiceDate: number = Date.now();
    invoiceAmount = 0;
    totalCosttoCompany = 0;
}

export class ACN_Employee {
    employeeName = '';
    locationCode = '';
    note: string = '';
    claimByContractor: string = '';
    contractValue: number = 0;
    approvedAmount: number = 0;
    payableAmount: number = 0;
    outstandingContractValue = 0;
}
