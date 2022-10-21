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
When you have changes you want to test, you can run `npm run build` & `npm pack` in the root of this folder, You will need to copy the absolute path of the file you just created with `npm pack`.
then run `npm i absolute path to your file` in the project where you are using this package. An example could be `npm i C:\Users\ABC\Desktop\Umbraco.Playwright.Testhelpers\umbraco-playwright-testhelpers-1.0.0.tgz`.
If you have new changes, you can follow the same steps as before.
