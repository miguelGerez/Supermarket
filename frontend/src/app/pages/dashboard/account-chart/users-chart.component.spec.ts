import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAccountsComponent } from './grafico-accounts.component';

describe('GraficoAccountsComponent', () => {
  let component: GraficoAccountsComponent;
  let fixture: ComponentFixture<GraficoAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
