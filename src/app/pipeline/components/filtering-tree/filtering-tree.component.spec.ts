import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringTreeComponent } from './filtering-tree.component';

describe('FilteringTreeComponent', () => {
  let component: FilteringTreeComponent;
  let fixture: ComponentFixture<FilteringTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteringTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteringTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
