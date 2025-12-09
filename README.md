# Umbraco Playwright Test Helpers

Test helpers for writing Playwright end-to-end tests for Umbraco CMS.

**Repository:** https://github.com/umbraco/umbraco-playwright-testhelpers

## Prerequisites

- **Node.js:** Minimum version `16.17.1`
- **Playwright:** Install via `npx playwright install`

## Installation

```bash
npm install @umbraco/playwright-testhelpers
```

## Usage

### Basic Test Setup

Import the `test` fixture from the package to get access to `umbracoApi` and `umbracoUi` helpers:

```typescript
import { test } from "@umbraco/playwright-testhelpers";

test('my test', async ({ umbracoApi, umbracoUi }) => {
  // Your test code here
});
```

### API Helpers

Use API helpers for test setup, teardown, and backend verification:

```typescript
import { test } from "@umbraco/playwright-testhelpers";

test('create document type via API', async ({ umbracoApi }) => {
  const name = 'TestDocType';

  // Cleanup before test
  await umbracoApi.documentType.ensureNameNotExists(name);

  // Create via API
  await umbracoApi.documentType.createDefaultDocumentType(name);

  // Cleanup after test
  await umbracoApi.documentType.ensureNameNotExists(name);
});
```

### UI Helpers

Use UI helpers for browser-based interactions:

```typescript
import { test } from "@umbraco/playwright-testhelpers";

test('create content via UI', async ({ umbracoUi }) => {
  await umbracoUi.goToBackOffice();
  await umbracoUi.content.clickActionsMenuAtRoot();
  await umbracoUi.content.clickCreateButton();
});
```

### Combined API and UI Testing

A common pattern is using API helpers for setup/teardown and UI helpers for the actual test:

```typescript
import { test } from "@umbraco/playwright-testhelpers";

test('edit document type', async ({ umbracoApi, umbracoUi }) => {
  const name = 'TestDocType';

  // Setup via API
  await umbracoApi.documentType.ensureNameNotExists(name);
  await umbracoApi.documentType.createDefaultDocumentType(name);

  // Test via UI
  await umbracoUi.goToBackOffice();
  await umbracoUi.documentType.goToDocumentType(name);

  // Cleanup via API
  await umbracoApi.documentType.ensureNameNotExists(name);
});
```

### Constants and Utilities

```typescript
import { ConstantHelper, AliasHelper, NotificationConstantHelper } from "@umbraco/playwright-testhelpers";

// Access UI sections
const settingsSection = ConstantHelper.sections.settings;

// Convert strings to aliases
const alias = AliasHelper.toAlias('My Document Type'); // 'myDocumentType'

// Access notification messages
const successMsg = NotificationConstantHelper.success.created;
```

## Available Helpers

### API Helpers (`umbracoApi.*`)

`dataType`, `dictionary`, `document`, `documentBlueprint`, `documentType`, `healthCheck`, `indexer`, `language`, `login`, `logViewer`, `media`, `mediaType`, `member`, `memberGroup`, `memberType`, `modelsBuilder`, `objectTypes`, `package`, `partialView`, `publishedCache`, `redirectManagement`, `relationType`, `script`, `smtp`, `stylesheet`, `telemetry`, `template`, `temporaryFile`, `user`, `userGroup`, `webhook`

### UI Helpers (`umbracoUi.*`)

`content`, `contentRender`, `currentUserProfile`, `dataType`, `dictionary`, `documentBlueprint`, `documentType`, `examineManagement`, `externalLogin`, `form`, `healthCheck`, `install`, `language`, `login`, `logViewer`, `media`, `mediaType`, `member`, `memberGroup`, `memberType`, `modelsBuilder`, `package`, `partialView`, `profiling`, `publishedStatus`, `redirectManagement`, `relationType`, `script`, `stylesheet`, `telemetryData`, `template`, `user`, `userGroup`, `webhook`, `welcomeDashboard`

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `URL` | Umbraco base URL | `https://localhost:44339` |
| `UMBRACO_USER_LOGIN` | Admin user email | `nge@umbraco.dk` |
| `UMBRACO_USER_PASSWORD` | Admin user password | `1234567890` |
| `UMBRACO_MEMBER_LOGIN` | Test member email | `member@example.com` |
| `UMBRACO_MEMBER_PASSWORD` | Test member password | `Umbraco9Rocks!` |

## Contributing

### Adding New Helpers

1. Create your helper file (e.g., `MacroApiHelper.ts`)

2. Import and add as a property in `ApiHelpers.ts`:
```typescript
import { MacroApiHelper } from "./MacroApiHelper";

export class ApiHelpers {
  macro: MacroApiHelper;

  constructor(page: Page) {
    this.macro = new MacroApiHelper(this);
  }
}
```

3. For UI helpers, extend `UiBaseLocators` and add to `UiHelpers.ts`

### Testing Changes Locally

```bash
npm run build
npm pack
npm i /path/to/umbraco-playwright-testhelpers-x.x.x.tgz
```

## License

MIT