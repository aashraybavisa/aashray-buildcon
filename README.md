# Welcome to your Expo app 👋

## PR Status analytics

The standalone `/pr-status` page uses Umami Cloud with website ID
`10832e37-7cb8-4886-baa7-f83f5706da8f`. View reports in your account at
<https://cloud.umami.is>. The website ID is public configuration, not a secret.

Tracking only runs on the deployed `aashraybavisa.github.io/aashray-buildcon/pr-status`
page (including its `.html` and trailing-slash variants). Local development and other
Buildcon pages are excluded. Automatic pageviews are disabled; the page sends one
pageview per mount, with Umami's standard referral, browser, device, language, and
approximate location information. Browser performance collection is enabled.

Custom events:

- `linkedin_click`: a click on the LinkedIn link.
- `scroll_depth`: 25, 50, 75, and 100 percent of the scroll content viewed, once per
  milestone per visit. Content already visible on arrival counts as viewed.
- `engaged_visit`: 15, 30, 60, 120, and 300 seconds of focused, visible reading time.
- `page_preferences`: the page's appearance and content language, on initial load
  and changes.

No distinct visitor ID, account identity, or form contents are sent. URL hashes and
non-campaign query parameters are removed. Only standard `utm_*` campaign parameters
are retained; avoid putting personal information in campaign tags. Referrer query
parameters are removed. Browser Do Not Track and Umami's visit-exclusion setting
are respected. Blocked analytics does not prevent the page or LinkedIn link working.

In Umami, filter to this page or the `pr-status` tag and use the Events view to see
the custom metrics. The free plan counts pageviews, custom events, and stored event
properties toward its event allowance. Tracking is not retroactive.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
