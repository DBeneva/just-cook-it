import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingRecipesComponent } from './loading-recipes.component';

describe('LoadingRecipesComponent', () => {
  let component: LoadingRecipesComponent;
  let fixture: ComponentFixture<LoadingRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
