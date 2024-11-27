import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContainerComponent } from './appcontainer.component';

describe('HeaderComponent', () => {
  let component: AppContainerComponent;
  let fixture: ComponentFixture<AppContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
