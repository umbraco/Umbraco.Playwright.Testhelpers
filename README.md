# Umbraco.Playwright.Testhelpers
This package contains the Test-helpers for the Umbraco Playwright tests!

## Prerequisites
This project was made with Node V16, so the minimum requirement is node `16.17.1`
Having playwright installed, you can install playwright by running `npx playwright install`

## Getting started
You can import a helper into your code like so

```
import {  ConstantHelper } from "@umbraco/playwright-testhelpers";
```

You can then use it in your code like so:
```
let settingsSection = ConstantHelper.sections.settings;
```

## Contributing to Umbraco.Playwright.Testhelpers

### Adding new helpers
When adding new helpers, it is important to add them as properties in the `ApiHelpers.ts` class 
Lets say we have just created a `MacroApiHelper`, first we would need to import it at the top in the `ApiHelpers.ts` file like so:
```
import {MacroApiHelper} from "./MacroApiHelper";
```
Then, add it as a property
```
export class ApiHelpers {
  macros: MacroApiHelper;
  ...
 }
```

Then, use the constructor to populate the property

```
constructor(page: Page) {
    this.macros = new MacroApiHelper(this);
    ...
}
```

### Testing your changes locally
When you have changes you want to test, you can run `npm run build` & `npm link` in the root of this folder,
then run `npm link @umbraco/playwright-testhelpers` in the project where you are using this package.
If you have new changes, you can run `npm run build` again.
