# TechDocs
This document serves as a guideline on how to use the app as well as highlighting assumptions done from my part.
The app can be interacted with on this link --> https://dylan9b.github.io/json-app/#/home

## Available commands execute
- nx lint
- nx prettier
- nx test
- nx build

## Screenshots
### Code
<img width="529" height="313" alt="image" src="https://github.com/user-attachments/assets/ba1b53cc-c9b7-47c0-ba5e-22fdf0b65e67" />
<img width="589" height="434" alt="image" src="https://github.com/user-attachments/assets/617eab96-b24a-4148-9220-dd65fc02b071" />
<img width="622" height="396" alt="image" src="https://github.com/user-attachments/assets/b9495f4b-4934-4661-8272-0ee6890ca9f3" />
<img width="697" height="410" alt="image" src="https://github.com/user-attachments/assets/9a8d88c3-ba14-49b9-a9fe-cf6411f659ab" />

## Assumptions and Considerations
- Since there is no mobile design, I adapted the same layout and also used table for list page but added ellipses to maintain structure.
- The ability to restore a deleted item from user's browser is done by manually manipulating the localStorage and setting 'isDeleted' to true. This simulated what might happen in an actual scneario through an api call where soft-delete is performed.
- Clicking on the logo in navbar, redirects user to home page.
- Invalid pages redirect back to home page as well.
- Global signal store is used instead of traditional @ngrx/store as it reduces boiler plate code and is reactive by nature (uses signals)
- Even though ng-bootstrap contains also bootstrap utility classes, I am using custom styling in component.scss files so that if another framework is used (ex vue, react, etc), there wouldn't be any impact in re-writing the specific styling classes.
- Standalone components were used even though in task specification it states to use modules. I think that this is not the way that the latest version of Angular is moving. As shown by Angular's best practices guidelines, it is best to move away from modules and use standalone components.
