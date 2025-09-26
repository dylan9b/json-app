# TechDocs
This document serves as a guideline on how to use the app as well as highlighting assumptions done from my part.
The app can be interacted with on this link --> https://dylan9b.github.io/json-app/#/home

## Available commands execute
- npm run lint
- npm run prettier
- npm run test
- npm run build
- npm run storybook

## Screenshots
### Code
#### nx lint
<img width="529" height="313" alt="image" src="https://github.com/user-attachments/assets/ba1b53cc-c9b7-47c0-ba5e-22fdf0b65e67" />

#### nx prettier
<img width="589" height="434" alt="image" src="https://github.com/user-attachments/assets/617eab96-b24a-4148-9220-dd65fc02b071" />

#### nx test
<img width="622" height="396" alt="image" src="https://github.com/user-attachments/assets/b9495f4b-4934-4661-8272-0ee6890ca9f3" />

#### nx build
<img width="697" height="410" alt="image" src="https://github.com/user-attachments/assets/9a8d88c3-ba14-49b9-a9fe-cf6411f659ab" />

### App
#### Home Page
<img width="1900" height="859" alt="image" src="https://github.com/user-attachments/assets/c8a94778-5383-4bad-a24a-c5e529546d39" />
<img width="542" height="497" alt="image" src="https://github.com/user-attachments/assets/99ac5c96-9da4-469b-8f49-6d9e4a2d8189" />
<img width="522" height="459" alt="image" src="https://github.com/user-attachments/assets/ca92d498-aebb-4bf6-a218-fbde29c46e7e" />
<img width="582" height="737" alt="image" src="https://github.com/user-attachments/assets/2d3db80e-83ae-4887-a0e9-77388a200485" />

### Storybook
<img width="1895" height="610" alt="image" src="https://github.com/user-attachments/assets/6d718c0d-2778-452d-980e-a2683eddadbc" />

#### Files Page
<img width="1915" height="948" alt="image" src="https://github.com/user-attachments/assets/90f77425-eaa9-414b-ba47-3633a58b0f52" />
<img width="1886" height="677" alt="image" src="https://github.com/user-attachments/assets/242610aa-eace-4376-8a1a-2a87671af3bb" />
<img width="632" height="744" alt="image" src="https://github.com/user-attachments/assets/3abd0945-6dca-4401-a9d5-4437cdebd6d8" />

## Assumptions and Considerations
- Since there is no mobile design, I adapted the same layout and also used table for list page but added ellipses to maintain structure.
- The ability to restore a deleted item from user's browser is done by manually manipulating the localStorage and setting 'isDeleted' to true. This simulated what might happen in an actual scenario through an api call where soft-delete is performed.
- Clicking on the logo in navbar, redirects user to home page.
- Invalid pages redirect back to home page as well.
- When inputting name field in select modal, one of the error warnings show the mandatory 42c-xxxx. Added dummy string (42c-test123) an not my actual github.
- Global signal store is used instead of traditional @ngrx/store as it reduces boiler plate code and is reactive by nature (uses signals)
- Even though ng-bootstrap contains also bootstrap utility classes, I am using custom styling in component.scss files so that if another framework is used (ex vue, react, etc), there wouldn't be any impact in re-writing the specific styling classes.
- Standalone components were used even though in task specification it states to use modules. I think that this is not the way that the latest version of Angular is moving. As shown by Angular's best practices guidelines, it is best to move away from modules and use standalone components.
