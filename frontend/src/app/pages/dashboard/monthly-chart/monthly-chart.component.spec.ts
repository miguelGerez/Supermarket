import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMensualComponent } from './dashboard-mensual.component';

describe('DashboardMensualComponent', () => {
  let component: DashboardMensualComponent;
  let fixture: ComponentFixture<DashboardMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
