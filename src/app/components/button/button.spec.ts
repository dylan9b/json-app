import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Button', () => {
  let fixture: ComponentFixture<Button>;
  let buttonEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Button],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    fixture.componentRef.setInput('label', 'Click Me');
    buttonEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render with default variant = primary', () => {
    expect(buttonEl.classList.contains('primary')).toBe(true);
  });

  it('should switch to secondary when input changes', () => {
    fixture.componentRef.setInput('variant', 'secondary'); // ✅ official way
    fixture.detectChanges();

    expect(buttonEl.classList.contains('secondary')).toBe(true);
    expect(buttonEl.classList.contains('primary')).toBe(false);
  });

  it('should render label', () => {
    fixture.componentRef.setInput('label', 'Click Me');
    fixture.detectChanges();

    expect(buttonEl.textContent).toContain('Click Me');
  });
});
