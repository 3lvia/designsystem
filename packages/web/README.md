# Web (design.elvia.io)

Design.elvia.io is meant to be the main source of information for all users of Elvia design system.

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7c263fb-8570-458d-8d9e-4fb84fbb2f8e/deploy-status)](https://app.netlify.com/sites/elvis-designsystem/deploys)

## 💻 Development

Everything connected to the documentation page is located in the **packages/web** folder. The website is built
and deployed at [Elvia's Netlify](https://app.netlify.com/sites/elvis-designsystem/overview).

### Technology

- We use **Angular** for the main documentation page and **Netlify** to host the site.
- We use **Contentful** as content management system for a lot of our documentation.

### Running project

- The project can be ran from root with `yarn start`. Read more about
  [running the main project here](https://github.com/3lvia/designsystem#setup).
- The project can also be ran in the `packages/web` folder with `yarn start`.
  > NOTE: Remeber to set your environment variables to be able to access the Contentful data.
  > [Set up is described here](https://github.com/3lvia/designsystem#setup).

### CMS (Contentful)

`packages/web/src/app/`

- The CMS services for retriving and transforming data from contentful is located at `core/services/cms`
- The shell page wrapping all Contentful information pages are located at `doc-pages/cms`
- In the **[design.elvia.io Contentful](https://app.contentful.com/spaces/zez3t3t1iiwd/content_types)**
  content types can be updated and added. These types represent what the users of Contentful (mainly designers
  and content creators) can do in the app.

### CEG (Code Example Generator)

`packages/web/src/app/`

The CEG component is responsible for everything connected to the code examples we show at the top of each
component page, where you can filter on type and many different options to be able to see and retrive the
version of an component you need.

- Find the code for the CEG at `shared/component-documentation/component-example`.
- The CEG uses data from each component located at that components doc-folder. E.g.
  `doc-pages/components/accordion-doc/accordion-data.ts`.
