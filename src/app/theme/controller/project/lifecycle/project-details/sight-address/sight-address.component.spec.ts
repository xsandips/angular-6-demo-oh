import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightAddressComponent } from './sight-address.component';

describe('SightAddressComponent', () => {
  let component: SightAddressComponent;
  let fixture: ComponentFixture<SightAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
