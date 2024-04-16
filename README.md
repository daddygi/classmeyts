This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Frontend

## Nested Routes

| Syntax        | Description          |
| ------------- | -------------------- |
| folder        | Route segment        |
| folder/folder | Nested route segment |

## Dynamic Routes

| Syntax        | Description                      |
| ------------- | -------------------------------- |
| [folder]      | Dynamic route segment            |
| [...folder]   | Catch-all route segment          |
| [[...folder]] | Optional catch-all route segment |

## Route Groups

| Syntax   | Description                                      |
| -------- | ------------------------------------------------ |
| (folder) | Group routes without affecting routing           |
| \_folder | Opt folder and all child segments out of routing |

## Parallel and Intercepted Routes

| Syntax         | Description               |
| -------------- | ------------------------- |
| @folder        | Named slot                |
| (.)folder      | Intercept one level above |
| (..)folder     | Intercept one level above |
| (..)(..)folder | Intercept two level above |
| (...)folder    | Intercept from root       |

## Styling

Tailwind Merge: Optimizes your CSS by merging classes that can be combined. It removes unnecessary styles, reduces file size,
To style your components you can use CSS.

```ts
import { twMerge } from "tailwind-merge";

twMerge("px-2 py-1 bg-red hover:bg-dark-red", "p-3 bg-[#B91C1C]");
// magiging ganto → 'hover:bg-dark-red p-3 bg-[#B91C1C]'
```

clsx: This allows you to conditionally add classes based on props. It is a small utility that helps you avoid having
You can also import the `css` function to include raw css in your component.

```ts
import clsx from "clsx";
// or
import { clsx } from "clsx";

// Strings (variadic)
clsx("foo", true && "bar", "baz");
//=> 'foo bar baz'

// Objects
clsx({ foo: true, bar: false, baz: isTrue() });
//=> 'foo baz'

// Objects (variadic)
clsx({ foo: true }, { bar: false }, null, { "--foobar": "hello" });
//=> 'foo --foobar'

// Arrays
clsx(["foo", 0, false, "bar"]);
//=> 'foo bar'

// Arrays (variadic)
clsx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx(
  "foo",
  [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]],
  "cya"
);
//=> 'foo bar hello world cya'
```

## Utils

I already did time format and tailwind merge function in utls.

```ts
utils.js;

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}
```

## Notes

- I already grouped `auth` for sign-in and sign-up.
- I already created components folder. Do not compress all components under ui folder

```
/components
    /comments
        - PostComment.tsx
    /homepage
        - CustomFeed.tsx
        - GeneralFeed.tsx
    /ui
        - Button.tsx
        - Card.tsx
- Icons.tsx
- Post.tsx
```

- Make sure to use global css variables in global css for consistency and cleanliness.

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}
```

# Backend

## Tech Stack

- Prisma
- Auth.js
- MongoDB
- Zod (For Validation)

## Auth.js

- Strategy: Database
- Provider: Credentials
- Adapter: MongoDB

### Take Note of NextAuth.js v5

#### Main Changes

- App Router-first (pages/ still supported)
- OAuth support on preview deployments
- Simplified setup (shared config, inferred env variables)
- New account() callback on providers
- Edge-compatible

#### Universal auth() !important

- A single method to authenticate anywhere
- Use auth() instead of getServerSession, getSession, withAuth, getToken, and useSession

## Zod

Already did validation in libs

```ts
zod.ts;

import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
```

## Notes

- I initialized DB pero I haven't tested it yet

## End

If nabasa mo to, nice. Kaya natin to. Send me a pm sa messenger to show na nabasa mo lahat. hehe ty
