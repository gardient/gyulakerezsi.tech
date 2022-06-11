---
title: "Global scss in SvelteKit"
date: 2022-06-11T10:19:05+03:00
lastmod: 2022-06-11T10:19:05+03:00
tags: 
  - svelte
  - svelte-kit
  - nodemon
  - node
  - sass
categories: 
  - svelte
description: "Svelte kit global stylesheet with scss"
---

## TL;DR

Run: `npm i -D nodemon concurrently`

Add the following npm scripts

```json
"dev:full": "concurrently --kill-others \"npm run scss:dev\" \"npm run dev:nodemon\"",
"dev:nodemon": "nodemon --exec \"npm run dev\"",
"scss": "sass src/scss/:static/style/",
"scss:dev": "sass -w src/scss/:static/style/"
```

Add `npm run scss &&` before the `build`, `package`, `preview` and
`prepare` scripts

```json
"build": "npm run scss && svelte-kit build",
"package": "npm run scss && svelte-kit package",
"preview": "npm run scss && svelte-kit preview",
"prepare": "npm run scss && svelte-kit sync",
```

## The setup

So I started a little project _(hopefully I will write about it soon)_ and I
tought I would write the frontend in svelte

Then I remembered that SvelteKit was a thing, and I meant to learn it as well,
so I started a new project with it.

I was pleasantly surprised when the new project setup asked about both
Typescript and Sass (scss), I like both, but when I looked into changing the
full body style I was a bit disappointed

No support for directly compiling an scss file for the body, to include in the
`app.html` file

## Well, let's see what options we got

The first thing that jumps out is perhaps the best option

SvelteKit's preprocessor for styles has a special `:global` selector, so you
could have the following block in your main `__layout.svelte`

```html
<style lang="scss">
  :global {
    @import '<path to global scss>';
  }
</style>
```

Which works just fine, but it generates a lot of warnings in other components,
paths, that don't have any element matching some selector in your global file.

__Annoying.__

## let's try something else

If you run `sass -w <path to global>:<path to static>` to have Sass compile your
stylesheet, adding `<link rel="stylesheet" href="%sveltekit.assets%/global.css">`
to your `app.html`

It works fine...

When you start `svelte-kit dev`

If you modify your file afterwards, it won't change even if you reload your page.  
It's _static_ why should it?

## Enter `nodemon`

`nodemon` is a wonderful little node package/application, it watches your files,
if something changes it stops and restarts your process(es)

Which is nice, you can tell it to run the npm cript for svelte-kit and watch
your global file

So let's install nodemon with `npm i -D nodemon`, and to keep the npm script
short let's add a `nodemon.json` file

```json
{
  "delay": 0.25,
  "watch": [
    "<path to static file>"
  ]
}
```

This will tell nodemon to watch the file for changes, and to wait for 250ms to
restart (might not be needed, but it helps with giving sass time to settle files)

Let's add a new npm script:

```json
"dev:nodemon": "nodemon --exec \"npm run dev\""
```

I like leaving the original alone, as hopefully global styles will rarely change.

The only thing missing is a single command that will start both the Sass
compilation. Thankfully someone made `concurrently`

## Adding `concurrently`

`concurrently` is a node package made for running things side by side...
conurrently

It's cross platform, so it will run on pretty much all development environments.
It has the `--kill-others` option which will make sure that everything dies
together

You can install it by running `npm i -D concurrently`

We're almost there, last thing we need to do is add a few more npm scripts

```json
"dev:full": "concurrently --kill-others \"npm run scss:dev\" \"npm run dev:nodemon\"",
"scss": "sass <path to global>:<path to static>",
"scss:dev": "sass -w <path to global>:<path to static>"
```

Now running `npm run dev:full` will start the Sass compiler in watch mode

### One more preventative measure

Just to make sure that you always have the global css compiled when packaging,
we'll modify a few of the default SvelteKit npm scripts

Let's add `npm run scss &&` before the `build`, `package`, `preview` and
`prepare` scripts

```json
"build": "npm run scss && svelte-kit build",
"package": "npm run scss && svelte-kit package",
"preview": "npm run scss && svelte-kit preview",
"prepare": "npm run scss && svelte-kit sync"
```

And that's it, now you can run `npm run dev:full` to get your global css
recompiling. No hot reload I'm afraid, but hitting refresh is not that hard.

## PS.: should I add the generated css to .gitignore

Personally i'm not going to, it's really not that big in the first place, and
it's not likely to change a lot, at least in my setup, where I mostly just set a
few css variables

On the other hand, you are more likely to notice it missing, than seeing that
some change hasn't propagared into it.

This one is up to you
