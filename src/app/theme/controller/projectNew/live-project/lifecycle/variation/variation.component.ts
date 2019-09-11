import { Component, OnInit } from '@angular/core';
import { LiveProjectService } from '../../live-project.service';
import { Helpers } from '../../../../../../helpers';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { Variation } from '../../../../../model/project.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.css']
})
export class VariationComponent implements OnInit {
  baseUl: string;
  variationSaved = true;
  constructor(public http: HttpClient, public projectService: LiveProjectService) {
    this.baseUl = environment.api_base.apiBase;
   }

  ngOnInit() {
    this.projectService.savedRoute = '/project/lifecycle/variation';
    this.projectService.selectedProject.variation.forEach(item => {
      item.collaps = true;
    });
  }

  trackByFn(index, item) {
    return index;
  }

  variationToggle(id, index: number = 0) {
    this.getVariationDocs(id, index);
  }

  addVariation() {
    if (this.variationSaved) {
    this.projectService.selectedProject.variation.forEach(item => {
      item.collaps = true;
      this.variationSaved = false;
    });
    this.projectService.selectedProject.variation.push(new Variation(this.projectService.selectedProject.name));
  } else {
      swal({
        type: 'warning',
        title: 'Unsaved Details',
        text: 'Please Save current variation details before adding new variation.',
        allowOutsideClick: true,
        allowEscapeKey: false,
        showConfirmButton: true,
        timer: 7000
      });
  }
  }

  getVariationDocs(id, index: number = 0) {
    Helpers.setLoading(true);
    this.http.get(environment.api_base.apiBase + 'api/project/variationupload/' + this.projectService.selectedProject.quoteId + '/' + id)
    .subscribe(res => {
      this.projectService.selectedProject.variation[index].variationFiles = <any>res;
      Helpers.setLoading(false);
    });
  }

  removeVariation(index) {
    this.projectService.selectedProject.variation.splice(index, 1);
  }

  saveVariation() {
    this.variationSaved = true;
  }

  editVariation() {
    this.variationSaved = false;
  }

  onvariationUpload(event, id, index: number = 0) {
    this.getVariationDocs(id, index);
  }

  openFile(path) {
    window.open(path);
  }

  removeVariationFile(file, id, index: number = 0) {
    Helpers.setLoading(true);
    this.http.post(environment.api_base.apiBase + 'api/project/removeFile', file).subscribe(res => {
      this.getVariationDocs(id, index);
    });
  }

}
