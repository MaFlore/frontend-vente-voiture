import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleComponent } from './modele.component';

describe('ModeleComponent', () => {
  let component: ModeleComponent;
  let fixture: ComponentFixture<ModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
