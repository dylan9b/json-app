import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavBar } from "./nav-bar";
import { RoutesConstants } from "@shared/routes.constants";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

class TestNavBar extends NavBar {
  getNavItems() {
    return this.navItems;
  }
}

describe("NavBar", () => {
  let fixture: ComponentFixture<TestNavBar>;
  let component: TestNavBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNavBar],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TestNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the NavBar component", () => {
    expect(component).toBeTruthy();
  });

  it("should have two navItems", () => {
    expect(component.getNavItems().length).toBe(2);
  });

  it("should contain Home nav item", () => {
    const navItems = component.getNavItems();
    expect(navItems).toContainEqual({
      route: `/${RoutesConstants.HOME}`,
      label: "Home",
    });
  });

  it("should contain Files nav item", () => {
    const navItems = component.getNavItems();
    expect(navItems).toContainEqual({
      route: `/${RoutesConstants.FILES}`,
      label: "Files",
    });
  });
});
