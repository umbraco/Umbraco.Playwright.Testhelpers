# CLAUDE.md

This is the Umbraco Playwright Test Helpers package - a library of test helpers for writing Playwright E2E tests for Umbraco CMS.

## Project Overview

This is an **NPM package** (not a test suite). It provides reusable helpers that consumers install via `npm install @umbraco/playwright-testhelpers`.

## Key Files

- `lib/index.ts` - Main entry point, re-exports from `lib/helpers`
- `lib/helpers/index.ts` - Exports: `ApiHelpers`, `UiHelpers`, `AliasHelper`, `test`, `ConstantHelper`, `NotificationConstantHelper`
- `lib/helpers/ApiHelpers.ts` - Aggregates all API helpers, handles HTTP requests and authentication
- `lib/helpers/UiHelpers.ts` - Aggregates all UI helpers
- `lib/helpers/UiBaseLocators.ts` - Base class with common Playwright locators (all UI helpers extend this)
- `lib/helpers/testExtension.ts` - Custom Playwright test fixture providing `umbracoApi` and `umbracoUi`
- `umbraco.config.ts` - Environment configuration (baseUrl, credentials)

## Helper Pattern

### API Helpers
1. Create `[Name]ApiHelper.ts` in `lib/helpers/`
2. Constructor takes `ApiHelpers` instance for HTTP methods
3. Add as property in `ApiHelpers.ts` and initialize in constructor

### UI Helpers
1. Create `[Name]UiHelper.ts` extending `UiBaseLocators`
2. Constructor takes `Page` instance
3. Add as property in `UiHelpers.ts` and initialize in constructor

## Build Commands

```bash
npm run build    # Compile TypeScript to dist/
npm pack         # Create .tgz package for local testing
```

## Structure

```
lib/helpers/
├── *ApiHelper.ts              # Domain-specific API helpers
├── *UiHelper.ts               # Domain-specific UI helpers
├── ApiHelpers.ts              # API aggregator + HTTP client
├── UiHelpers.ts               # UI aggregator
├── UiBaseLocators.ts          # Base locators for UI helpers
└── differentAppSettingsHelpers/  # Helpers for different app configurations
```

## JSON Models Builders

This project uses `@umbraco/json-models-builders` to construct Umbraco API request payloads using the Builder pattern.

- **Repository:** https://github.com/umbraco/Umbraco.JsonModels.Builders
- **NPM:** https://www.npmjs.com/package/@umbraco/json-models-builders

Example usage in API helpers:
```typescript
import { DocumentTypeBuilder } from "@umbraco/json-models-builders";

const documentType = new DocumentTypeBuilder()
  .withName(name)
  .withAlias(AliasHelper.toAlias(name))
  .withAllowedAsRoot(true)
  .build();
```

Builders fill properties with defaults - use `.withX()` methods to customize, then call `.build()`.

## API Helper HTTP Methods

`ApiHelpers` provides these methods for making requests:
- `get(url, params?, extraHeaders?)` - GET request
- `post(url, data?)` - POST request
- `put(url, data?)` - PUT request
- `delete(url, data?)` - DELETE request
- `postMultiPartForm(url, id, name, mimeType, filePath)` - File uploads

All methods automatically include auth headers and ignore HTTPS errors for local testing.

## Authentication

- `testExtension.ts` calls `isLoginStateValid()` before each test
- Tokens refresh automatically 45+ seconds before expiration
- Storage state persisted in `state.json`

## Common Patterns

### Ensure methods
Most API helpers have `ensureNameNotExists(name)` for cleanup:
```typescript
await umbracoApi.documentType.ensureNameNotExists('TestDocType');
```

### UI Locators
`UiBaseLocators` contains 100+ common locators (buttons, inputs, modals). UI helpers inherit these and add domain-specific ones.

## Exports

From `lib/helpers/index.ts`:
- `ApiHelpers` - API helper aggregator class
- `UiHelpers` - UI helper aggregator class
- `AliasHelper` - String utilities (toAlias, toSafeAlias, capitalize)
- `test` - Playwright test fixture with umbracoApi/umbracoUi
- `ConstantHelper` - UI sections, validation messages, data type settings
- `NotificationConstantHelper` - Success/error notification messages

## Important Notes

- No tests directory - this is a library consumed by other projects
- Version tracks Umbraco version (currently v17)
- All UI helpers must extend `UiBaseLocators`
- API helpers receive the `ApiHelpers` instance (for HTTP methods)
- Base URL defaults to `https://localhost:44339` (configurable via `URL` env var)
