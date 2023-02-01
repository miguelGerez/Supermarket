import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHorariosComponent } from './dashboard-horarios.component';

describe('DashboardHorariosComponent', () => {
  let component: DashboardHorariosComponent;
  let fixture: ComponentFixture<DashboardHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHorariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
