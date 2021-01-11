# A hybrid (SSG + SSR) example application (Marketplace) to demonstrate the Next.js with React 17 features support (new JSX transform / getStaticProps and getServerSideProps Fast Refresh). And to demonstrate my React.js skills :)


## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example cms-strapi cms-strapi-app
# or
yarn create next-app --example cms-strapi cms-strapi-app
```

## Configuration

### Step 1. Set up Strapi locally

[Follow the instructions on this page](https://strapi.io/documentation/v3.x/installation/cli.html) to create a Strapi project locally.

```bash
npx create-strapi-app my-project --quickstart
npm run develop # or: yarn develop
```

This will open http://localhost:1337/ and prompt you to create an admin user.

### Step 2. Install GraphQL for Strapi

Inside the Strapi directory, stop the server, [install GraphQL](https://strapi.io/documentation/v3.x/plugins/graphql.html), and restart the server:

```bash
# If using Yarn: yarn strapi install graphql
npm run strapi install graphql

npm run develop # or: yarn develop
```

### Step 3. Create a `Vendor` collection (In next release the Vendor entity will moved to a separate micro-service with self DB)

From **Content-Types Builder**, **create new collection type**.

- The display name should be `Vendor`.

Next, add these fields (you don't have to modify the settings unless specified):

- **Text** field called **`title`** (**Short text**)
- **Rich Text** field called **`description`** (**Multiple-paragraph Text**)
- **Enumeration** field `rate` (the values should be **simple** and **extra**)

Then click **Save**.


### Step 4. Create a `Product` collection (In next release we will use the PIM system like the `Pimcore` for improve manage of product variations and will moved to a separate micro-service with self DB)

From **Content-Types Builder**, **create new collection type**.

- The display name should be `Product`.

Next, add these fields (you don't have to modify the settings unless specified):

- **Text** field called **`title`** (**Short text**)
- **Rich Text** field called **`description`** (**Multiple-paragraph Text**)
- **Media** field called **`image`** (**Single media**)
- **UID** field called **`slug`** (attached field should be **title**)
- **Relation** field called **`vendor`** (Product **has one** Vendor)
- **Enumeration** field `status` (the values should be **enabled** and **disabled**)

Then click **Finish** and **Save**.

### Step 5. Set permissions

From **Settings, Users & Permissions, Roles**, edit the **Public** role.

Then select: `count`, `find`, and `findone` permissions for both **Vendor** and **Product**. Click **Save**.

### Step 6. Populate Content

Next, select **Products** and click **Add New Product**.

- We recommend creating at least **8 Product records**.
- Use dummy data for the text.
- You can write markdown for the **content** field.
- For the images, you can download ones from [Unsplash](https://unsplash.com/).
- Pick the **Vendors** you created earlier.
- Set the **status** field to be **enabled**.

### Step 7. Set up environment variables

While the Strapi server is running, open a new terminal and `cd` into the Next.js app directory you created earlier.

```
cd cms-strapi-app
```

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `STRAPI_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).
- `NEXT_PUBLIC_STRAPI_API_URL` should be set as `http://localhost:1337` (no trailing slash).

### Step 8. Run Next.js in development mode

Make sure that the local Strapi server is still running at http://localhost:1337. Inside the Next.js app directory, run:

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! You should see the two posts you’ve created. If it doesn't work, make sure that:

- You’ve installed GraphQL to Strapi on Step 2.
- You’ve set the Roles & Permissions in Step 5.
- You’ve set the `status` of each post to be `published` in Step 6.

The best place to debug is inside the `fetchAPI` function in `lib/api.js`. If you still need help, you can post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

### Step 9. Try preview mode

To try preview mode, create another post like before, but:

- Set the **title** as `Draft Post Test`
- Set the **status** as `draft`.

Now, if you go to the post page on localhost, you won't see this post because it’s not published. However, if you use the **Preview Mode**, you'll be able to see the change ([Documentation](https://nextjs.org/docs/advanced-features/preview-mode)).

To enable the Preview Mode, go to this URL:

```
http://localhost:3000/api/preview?secret=<secret>&slug=draft-post-test
```

- `<secret>` should be the string you entered for `STRAPI_PREVIEW_SECRET`.
- `<slug>` should be the post's `slug` attribute.

You should now be able to see the draft post. To exit the preview mode, you can click **Click here to exit preview mode** at the top.


