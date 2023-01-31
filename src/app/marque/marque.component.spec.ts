import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueComponent } from './marque.component';

describe('MarqueComponent', () => {
  let component: MarqueComponent;
  let fixture: ComponentFixture<MarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
