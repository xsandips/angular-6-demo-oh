import { TestBed, inject } from '@angular/core/testing';
import { FileOperationService } from './file-operation.service';


describe('FileOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileOperationService]
    });
  });

  it('should be created', inject([FileOperationService], (service: FileOperationService) => {
    expect(service).toBeTruthy();
  }));
});
