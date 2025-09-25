# JsonApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# json-app

# Assumptions
- Since there is no mobile design, I adapted the same layout and also used table for list page but added ellipses to maintain structure.
- The ability to restore a deleted item from user's browser is done by manually manipulating the localStorage and setting 'isDeleted' to true. This simulated what might happen in an actual scneario through an api call where soft-delete is performed.
- Clicking on the logo in navbar, redirects user to home page.
- Invalid pages redirect back to home page as well.
- Global signal store is used instead of traditional @ngrx/store as it reduces boiler plate code and is reactive by nature (uses signals)
- 
