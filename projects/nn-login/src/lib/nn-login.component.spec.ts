import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnLoginComponent } from './nn-login.component';

describe('NnLoginComponent', () => {
  let component: NnLoginComponent;
  let fixture: ComponentFixture<NnLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NnLoginComponent]
    });
    fixture = TestBed.createComponent(NnLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
