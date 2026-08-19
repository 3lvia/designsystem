- [App Bridge (`<elvia-app-bridge>`)](#app-bridge-elvia-app-bridge)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Attributes](#attributes)
    - [targetId](#targetid)
    - [activeApps](#activeapps)
  - [Guidelines](#guidelines)
    - [Only for internal use](#only-for-internal-use)
    - [Only for metering points](#only-for-metering-points)
    - [Do not use for routing within an app](#do-not-use-for-routing-within-an-app)
    - [Environments are handled automatically](#environments-are-handled-automatically)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# App Bridge (`<elvia-app-bridge>`)

## Reference

https://design.elvia.io/components/app-bridge

`<elvia-app-bridge>` is a web element.

## Installation

This web component requires the `@elvia/elvis-app-bridge` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Attributes

### targetId

`targetId` is required. It must be a metering point ID (string).

Example:

```ts
const meteringPointId = '707057500012345678';
```

```html
<elvia-app-bridge [targetId]="meteringPointId"></elvia-app-bridge>
```

### activeApps

`activeApps` is optional. It must be an array of lowercase strings, each string being an internal Elvia app
name. Omitting shows all available apps. The current app is not shown in the list.

Example:

```ts
activeApps = ['convey', 'drops', 'elflow', 'jordfeil'];
```

## Guidelines

### Only for internal use

- App Bridge must only be used in internal Elvia apps. It is NOT for customer-facing apps or third-party apps.

### Only for metering points

- App Bridge must only be used in contexts where a metering point ID is available. It is NOT for other
  entities such as customers via customerId, contracts via contractId, or alike.

### Do not use for routing within an app

- App Bridge is NOT for routing within an app. Use proper routing for the framework you are using.

### Environments are handled automatically

- App Bridge automatically detects the environment (development, test, or production) and opens the app in the
  current environment. Do NOT add your own environment detection logic. Note that not all apps are available
  in all environments. For example, "IFS" is not available in development, only test and prod.

## Accessibility

- App Bridge already has `aria-haspopup` and `aria-expanded` attributes set on the button that opens the app
  list. The button has a label and is focusable and can be activated via the keyboard. Do NOT add this
  yourself.

## Examples

**Input:** "Add a way to open this meteringpoint in DROPS from the detail page in Louvre."

**Output:**

```html
<elvia-app-bridge [targetId]="meteringPointId" />
```

**Input:** "On this page, only let people jump to Convey and Jordfeil."

**Output:**

```html
<elvia-app-bridge [targetId]="meteringPointId()" [activeApps]="['convey', 'jordfeil']" />
```

**Input:** "Add a link from the meteringpoint overview to its detail page"

**Output:** No. That's in-app routing, use proper routing for the framework you are using. App Bridge is not
for routing within an app.

**Input:** "Should "Min side" (the customer-facing portal) get App Bridge?"

**Output:** No. App Bridge is for internal use only. Customers DO NOT switch to internal apps such as
DROPS/Convey/etc.
