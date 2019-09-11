import { SelectItem } from "primeng/components/common/selectitem";

export interface employee {
    name: string,
    code: string
}
export class ProjectModel {
    constructor(name) {
        this.name = name;
        this.variation = [new Variation(name)];
        this.materialOrders = [new MaterialOrder(this.name)];
    }
    _id?: string;
    quoteId: string;
    name: string;
    quote_date: Date = new Date();
    scopeDetail: string;
    projectInfo: string;
    address: Address = new Address();
    locations: location[] = [];
    sightType: string;
    subcontractor: string;
    contractor: string;
    employeeType: string;
    cost: number = 0;
    profite: number = 0;
    startDate: Date = new Date();
    status: String;
    variation: Variation[];
    materialOrders: MaterialOrder[];
    projectBudget: Budget[] = [new Budget()];
    actualProjectLevel: ActualProjectLevel;
}

export class Budget {
    locationCode: string = '';
    location: string = '';
    sqmperhr = 0;
    rate = 0;
    materialRate = 0;
    totalPrice = 0;
    totalBudget = 0;
}

export class ActualProjectLevel {
    projectPrice = 0;
    projectCTC = 0;
    projectNetProfit = 0;
}

export class ActualLocationLevel {
  price = 0;
  location = '';
  projectPrice = 0;
  locationCTC = 0;
  netProfit = 0;
}

export class location {
    address1: string = '';
    address2: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    country: string = '';
    location: string = '';
    locationCode: string = '';
    employeeType: string = '';
    projectStartDate: Date = new Date();
    projectEndDate: Date = new Date();
    employees: SelectItem[] = [];
    manager: SelectItem[] = [];
    collaps = false;
}

export class Address {
    address1: string = '';
    address2: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    country: string = '';
    location: string = '';
    locationCode: string = '';
}





export class Variation {
    constructor(name) {
        this.id = name + '_Defect' + Math.floor(Math.random() * (999 - 100 + 1) + 100);
    }
    id: string;
    date = Date.now();
    contractorName: string;
    estimate: number;
    approval = true;
    approvalName: string;
    location: string;
    collaps = false;
    description = '';
    variationFiles = [];
}

export class Material {
    name: string;
    quantity: number = 0;
}

export class MaterialOrder {
    constructor(name) {
        this.id = name + '_MO' + Math.floor(Math.random() * (999 - 100 + 1) + 100);
    }
    id: string;
    date = Date.now();
    supplier: string;
    deliveryDate = Date.now();
    orderRequester: string;
    deliveryAddress: string = '';
    location: string;
    email: string;
    supplierCost: number = 0;
    collaps = false;
    material: Material[] = [new Material()];
    invoiceFiles = [];
}

export class LocationCTC {
  _id: string;
  locationCTC: number;
}
