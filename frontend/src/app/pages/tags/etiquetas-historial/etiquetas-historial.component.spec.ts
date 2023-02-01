import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsHistorialComponent } from './etiquetas-historial.component';

describe('TagsHistorialComponent', () => {
  let component: TagsHistorialComponent;
  let fixture: ComponentFixture<TagsHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
