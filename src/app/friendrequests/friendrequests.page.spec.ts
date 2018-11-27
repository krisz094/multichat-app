import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendrequestsPage } from './friendrequests.page';

describe('FriendrequestsPage', () => {
  let component: FriendrequestsPage;
  let fixture: ComponentFixture<FriendrequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendrequestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendrequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
