import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawDetailsComponent } from './withdraw-details.component';

describe('WithdrawDetailsComponent', () => {
  let component: WithdrawDetailsComponent;
  let fixture: ComponentFixture<WithdrawDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawDetailsComponent]
    });
    fixture = TestBed.createComponent(WithdrawDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
