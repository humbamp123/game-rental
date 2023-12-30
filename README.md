## Intro

Giant Bomb "Rentals" is a web application to search and "rent" games. This app is powered by [Nextjs](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This project showcases the integration of the [Giant Bomb Games API](https://www.giantbomb.com/api/documentation/#toc-0-17) to enable game searching and cart management with both Server Side and Client Side Rendering. I also used [Zustand]((https://github.com/pmndrs/zustand)) for state management and [Zustand Forms](https://github.com/Conduct/zustand-forms) for form handling.

https://github.com/humbamp123/game_rental/assets/20910111/cb5c6226-834f-4872-9fda-c0efb44099b5

## Getting Started

Go to the [Giant Bomb API](https://www.giantbomb.com/api/) for an API key.


After receiving your API key, set it in the `.env.local` file as follows:

```
GIANT_BOMB_API_KEY=<YOUR_API_KEY>
```


Next, install all the required dependencies by running:

```
npm i
```

### Running the Project

For development purposes, execute the following command:

```
npm run dev
```

Then open your browser and navigate to the following address:

```
http://localhost:3000

```
Alternatively, build and start the server for a faster app experience by following the subsequent steps:

Create a production build:

```
npm run build
```

Initiate the production build:

```
npm run start
```

Open your browser and navigate to the following address:

```
http://localhost:3000
```

## Tech Used

- [Nextjs](https://nextjs.org/) - Client and Server side rendering, API creation framework
- [Reactjs](https://react.dev/) - Frontend DOM manipulation library (Nextjs dependency)
- [ReactDom](https://react.dev/reference/react-dom/server) - Server Side Rendering API (Nextjs dependency)
- [zustand](https://github.com/pmndrs/zustand) - Frontend state management library
- [zustand-forms](https://github.com/Conduct/zustand-forms) - Frontend state management for forms library built on top of zustand (Renamed to `zustand-dev-form` and updated to the latest React)
- [clsx](https://github.com/lukeed/clsx) - Conditional css styling library
- [tailwind](https://github.com/tailwindlabs/tailwindcss) - CSS Framework
- [sharp](https://github.com/lovell/sharp) - Fast image optimization (Used when building for prod with Nextjs)
- [use-debounce](https://github.com/xnimorz/use-debounce) - React debouncing library
- [query-string](https://github.com/sindresorhus/query-string) - URL parsing and stringifying library

## Task

The primary task was to create a `search` and `checkout` page using the Giant Bomb Games API. As an additional goal to learn something new, I decided to use an unfamiliar tech stack (Nextjs) to get both server-side and client-side rendering.

## Observations & Lessons Learned

There were challenges in learning to use Next.js due to needing more documentation. However, it worked great in allowing me to server-side render most of the site and client-side render the rest without too much extra work to split them up.

Other benefits to using Nextjs were that my Giant Bomb API key was safely hidden on the server, routing was file directory-based, and there were other misc optimizations I didn't have to think about (Ex. optimization of images, prefetching).

I tried Zustand for its global state management, and it worked well. I also tried the form library zustand-forms, but it used an older version of React, and I needed to bring it up to the latest. I used zustand-forms for validation and made it work, but it needed to be a more mature product.

## Possible Next steps

Although the take-home tasks were completed, the following steps could be taken to make more of a fully-fledged project:

- Games could have individual pages with more information. This would allow a user to get more insight into what they consider to "rent". In this instance, routing should be as simple as making a component with brackets (ex. /games/[id].js).

- Currently, order information is in the client state. The Order state would be saved on the backend in a production setting. Ideally, the checkout form submission and the adding/removing an item to the cart would use Nextjs server action to automatically create an endpoint that would then add the info into the DB.

- Accounts could be added to save customer information and have form items pre-populated. Next-Auth (soon to be Auth js) could be added to allow social accounts to be connected and used as a login.

- Instead of fetching the search results every time, games could be polled periodically into the db for faster retrieval.

- With games in the DB, they could be put into a data structure like a trie that could allow autocomplete functionality.

- I'm ignoring types since I'm not very familiar with them. Future versions of this project could use typescript to its fullest by adding types appropriately.

- Filtering could be added to the search. Since the Fetch request to the Giant Bomb games API uses the query params in the browser, a new URL path with the filter query params could be pushed. It would need some UI components that are added to the query parameters.

- More logging could be added. Nextjs supports logging whenever data is fetched using the `fetch` API. Ideally, there would be more logging for any other possible errors.

## Conclusion

Overall, this was a fun project I'm considering continuing. There are many benefits of using Nextjs, including server-side rendering, client-side rendering, simple routing, image optimization, and prefetching. I got data across the frontend and backend boundaries to get what I needed. Nextjs has a lot of potential to build projects quickly. There's some nuance to understanding how to use it properly, but I look forward to trying it again.
