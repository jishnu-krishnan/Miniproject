import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookmarkComponent } from './admin-bookmark.component';

describe('AdminBookmarkComponent', () => {
  let component: AdminBookmarkComponent;
  let fixture: ComponentFixture<AdminBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
