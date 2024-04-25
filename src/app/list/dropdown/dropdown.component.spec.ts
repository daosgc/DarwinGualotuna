import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the dropdown', () => {
    component.toggleDropdown();
    expect(component.isOpen).toBeTruthy();
  });

  it('should toggle the dropdown', () => {
    spyOn(component.edit, 'emit');
    component.goToEdit('id');
    expect(component.edit.emit).toHaveBeenCalledWith('id');
  });
});
