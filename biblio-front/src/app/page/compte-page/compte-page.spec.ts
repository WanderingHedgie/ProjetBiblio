import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComptePage } from './compte-page';

describe('ComptePage', () => {
  let component: ComptePage;
  let fixture: ComponentFixture<ComptePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComptePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ComptePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
