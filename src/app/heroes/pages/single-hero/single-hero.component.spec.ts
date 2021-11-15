import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHeroComponent } from './single-hero.component';

describe('SingleHeroComponent', () => {
  let component: SingleHeroComponent;
  let fixture: ComponentFixture<SingleHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
