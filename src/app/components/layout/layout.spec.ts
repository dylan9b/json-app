import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Layout } from "./layout";
import { NavBar } from "@components/nav-bar/nav-bar";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

describe("Layout", () => {
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout, NavBar],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    fixture.detectChanges();
  });

  it("should create the Layout component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render the NavBar component", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("app-nav-bar")).toBeTruthy();
  });

  it("should render a router-outlet", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("router-outlet")).toBeTruthy();
  });
});
