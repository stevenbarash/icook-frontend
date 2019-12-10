import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSquareComponent } from './recipe-square.component';

describe('RecipeSquareComponent', () => {
  let component: RecipeSquareComponent;
  let fixture: ComponentFixture<RecipeSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
