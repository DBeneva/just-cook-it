import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingRecipeComponent } from './loading-recipe.component';

describe('LoadingRecipeComponent', () => {
  let component: LoadingRecipeComponent;
  let fixture: ComponentFixture<LoadingRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
