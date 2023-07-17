import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRegistrationComponent } from './device-registration.component';

describe('DeviceRegistrationComponent', () => {
  let component: DeviceRegistrationComponent;
  let fixture: ComponentFixture<DeviceRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceRegistrationComponent]
    });
    fixture = TestBed.createComponent(DeviceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
