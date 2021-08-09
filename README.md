# Elvia design system (Elvis)

![Decorative image of the designsystem](https://design.elvia.io/assets/HomeIllustration.png)

</br> </br>

## 📚 [How to use](https://design.elvia.io/)</br></br>

## 💻 Working on the designsystem

- [Confluence: Development / Architecture](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/309562041/Utvikling+og+arkitektur)
- We use Yarn, NPM will probably not work as expected
- We use a monorepo structure with Yarn workspaces
- We use Percy for visual regression testing

### Set up development environment

1. Copy `contentful/.env.template` -> `contentful/.env`
2. Follow instructions inside of .env file
3. Run `yarn` at `/` </br> </br>
4. Run `yarn contentful` at 'packages/web`

### Elvis (CSS library)

**/packages/elvis**

[![npm version](https://badge.fury.io/js/%40elvia%2Felvis.svg)](https://badge.fury.io/js/%40elvia%2Felvis)

Build Elvis: `yarn run build`

> [!NOTE] Remember to update the documentation and the Percy tests when developing components </br> </br>

### Components (React & Web Components)

**/packages/components**

Develop & Build `yarn build` or `yarn watch` (to build every time changes are saved)

Test how components would work for our users by running `yarn start` at `/packages/web` and/or `yarn start` at
`/packages/components/frameworks/react-ssr` </br> </br>

### Web (Design.elvia.io)

**/packages/web**

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7c263fb-8570-458d-8d9e-4fb84fbb2f8e/deploy-status)](https://app.netlify.com/sites/elvis-designsystem/deploys)

Angular app hosted on Netlify. This is the main documentation for the design system.
