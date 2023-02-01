import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnualComponent } from './dashboard-anual.component';

describe('DashboardAnualComponent', () => {
  let component: DashboardAnualComponent;
  let fixture: ComponentFixture<DashboardAnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAnualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
