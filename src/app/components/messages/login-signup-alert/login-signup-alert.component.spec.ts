import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupAlertComponent } from './login-signup-alert.component';

describe('LoginSignupAlertComponent', () => {
  let component: LoginSignupAlertComponent;
  let fixture: ComponentFixture<LoginSignupAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSignupAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
