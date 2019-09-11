import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { MaterialOrder } from '../../../../model/project.model';
import { Helpers } from '../../../../../helpers';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material-order',
  templateUrl: './material-order.component.html',
  styleUrls: ['./material-order.component.css']
})
export class MaterialOrderComponent implements OnInit {
  baseUrl: string;
  constructor(public http: HttpClient, public projectService: ProjectService, public router: Router, public route: ActivatedRoute) {
    this.baseUrl = environment.api_base.apiBase;
  }

  ngOnInit() {
    // alert("On Init called from Material-Order");

    this.projectService.savedRoute = '/project/lifecycle/material-order';
  }

  removeMO(index) {
    this.projectService.selectedProject.materialOrders.splice(index, 1);
  }

  toggle(index, type, event) {
    debugger;
    switch (type) {
      case 'mo':
        if (!event.collapsed) {
          for (let i = 0; i < this.projectService.selectedProject.materialOrders.length; i++) {
            const element = this.projectService.selectedProject.materialOrders[i];
            if (i !== index) {
              this.projectService.selectedProject.materialOrders[i].collaps = true;
            }
          }
        }
        break;
      default:
        break;
    }
  }

  shareMO(index) {
    this.projectService.moDetails = [this.projectService.selectedProject.materialOrders[index]];
  }
  addMaterial(index = 0) {
    this.projectService.selectedProject.materialOrders[index].material.push({ name: '', quantity: 0 });
  }
  addMaterialOrder() {
    this.projectService.selectedProject.materialOrders.push(new MaterialOrder(this.projectService.selectedProject.name));
  }

  onMOUpload(event, id, index: number = 0) {
    this.getMODocs(id, index);
  }

  getMODocs(id, index: number = 0) {
    Helpers.setLoading(true);
    this.http.get(environment.api_base.apiBase + 'api/project/moinvoiceupload/' + this.projectService.selectedProject.quoteId + '/' + id)
      .subscribe(res => {
        this.projectService.selectedProject.materialOrders[index].invoiceFiles = <any>res;
        Helpers.setLoading(false);
      });
  }
  openFile(path) {
    window.open(path);
  }

  removeMOFile(file, id, index: number = 0) {
    Helpers.setLoading(true);
    this.http.post(environment.api_base.apiBase + 'api/project/removeFile', file).subscribe(res => {
      this.getVariationDocs(id, index);
    });
  }

  getVariationDocs(id, index: number = 0) {
    Helpers.setLoading(true);
    this.http.get(environment.api_base.apiBase + 'api/project/variationupload/' + this.projectService.selectedProject.quoteId + '/' + id)
      .subscribe(res => {
        this.projectService.selectedProject.variation[index].variationFiles = <any>res;
        Helpers.setLoading(false);
      });
  }
saveChanges() {
  // alert("Before after submit");

this.projectService.submit();
// alert("Return after submit");
this.projectService.cancel();

}
  markAsComplete() {
    Helpers.setLoading(true);
    this.projectService.selectedProject.status = 'Complete';
    this.projectService.submit();
    this.projectService.cancel();

  }

}
