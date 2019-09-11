export class AllLocationtimesheet {
    projectName: string = '';
    projectId: string;
    location: string = '';
    locationCode = '';
    totalEmployee = 0;
    totalhrs = 0;
    employees = [];
}

export class DetailLocationtimesheet {
    projectName: string = '';
    location: string = '';
    totalEmployee = 0;
    date = Date.now();
    inTime = Date.now();
    outTime = Date.now();
    totalhrs = 0;
    EmployeeName: '';
}

export class TimesheetDetails {
    locationCode: "";
    employeeId: "";
    ProjectId: "";
    inTime = Date.now();
    outTime = Date.now();
}