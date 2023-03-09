import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProovidersComponent } from './providers.component';

describe('ProovidersComponent', () => {
  let component: ProovidersComponent;
  let fixture: ComponentFixture<ProovidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProovidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProovidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
