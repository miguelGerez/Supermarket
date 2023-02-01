import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailComponent } from './table-detail.component';

describe('TableDetailComponent', () => {
  let component: TableDetailComponent;
  let fixture: ComponentFixture<TableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
