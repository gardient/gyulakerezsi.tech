---
title: Making My Own Theme
date: 2018-02-18T19:11:24+02:00
tags:
  - hugo
  - bootstrap
  - blog
categories:
  - hugo
description: ...saying that is a bit of a stretch
---

So the theme i used until now was
[Blackburn][1], it was nice, but
the background was just too white for me.

[1]: https://github.com/yoshiharuyamashita/blackburn

Now you might say that i should just override the theme's CSS and be done with
it, but I don't have that kind of aesthetic sense.

I really should have.

But here I am, with a new template, that I built, almost from scratch, so let's
see what I learned in the past few days.

## Not much hand-holding

Hugo's `new theme` command is nice, but if you don't know how what's the
difference between a list and a single content page, you are gonna be confused.

The default scaffold it gives you looks like this:

```txt
your-theme
|- archetypes
|  `- default.md
|- layouts
|  |- _default
|  |  |- list.html
|  |  `- single.html
|  |- partials
|  |  |- footer.html
|  |  `- header.html
|  |- 404.html
|  `- index.html
|- static
|  |- css // empty folder
|  `- js  // empty folder
|- LICENSE.md // preloaded with the MIT license
`- theme.toml
```

Looks fine right? It gives me the wrong impression tough.

My biggest gripe is with the partials folder, it gives you the impression that
everything before your content and everything after your content has to be in
`header.html` and `footer.html` respectively.

While this was right a few versions ago, it's not the case anymore. __We have
base templates and blocks__

I would really recommend just adding `your-theme/layouts/_default/baseof.html`
right off the bat, if you want a starting point here's the `baseof.html` I ended
up with:

```xml
<!DOCTYPE html>
<html lang="en">
  <head>
    {{ partial "head" . }}
    {{ partial "title" . }}
  </head>
  <body>
    {{ block "header" . }}
      {{ partial "nav" . }}
    {{ end }}
    <main role="main">
      {{ block "main" . }}
      {{ end }}
    </main>
    <footer>
      {{ block "footer" . }}
        {{ partial "footer" . }}
      {{ end }}
    </footer>

    {{ partial "javascript" . }}
    {{ template "_internal/google_analytics_async.html" . }}
  </body>
</html>
```

## Hugo's templating engine is awesome

___If you know how it works___

Honestly this is the thing that took away most of my time. I would recommend
going trough Hugo's Docs, that being said the [Create a theme][2]
([wayback link][3]) doesn't seem that helpful.

[2]: https://gohugo.io/themes/creating/
[3]: https://web.archive.org/web/20171116152248/https://gohugo.io/themes/creating/

___Becsuse it isn't.___ It's not even recommending that you read about
[templating][4], [template lookup order][5], [base template and blocks][6]

[4]: https://gohugo.io/templates/
[5]: https://gohugo.io/templates/lookup-order/
[6]: https://gohugo.io/templates/base/

You need to read the entire doc end to end at least once, so that when you are
creating your theme you can start looking up stuff as you go, at least now you
know they exist.

Here is my list of must understands:

- [content management](https://gohugo.io/content-management/), you will need to understand this
- [Variables](https://gohugo.io/variables/), yes, all of them, these are your bread and butter
- [templating][4], or you can get by with these:
  - [basics](https://gohugo.io/templates/introduction/)
  - [lookup order](https://gohugo.io/templates/lookup-order/)
  - [base templates and blocks](https://gohugo.io/templates/base/), this is the first thing you should make (aside from a plan)
  - [list.html](https://gohugo.io/templates/lists/), the page that deals with all your content
  - [single.html](https://gohugo.io/templates/single-page-templates/), the page that deals with only one of your content
  - [section page templates](https://gohugo.io/templates/section-templates/), are a specialized kind of `list.html`
  - [taxonomy](https://gohugo.io/templates/taxonomy-templates/)
  - [partials](https://gohugo.io/templates/partials/)

## Bootstrap 4 is still awesome

For some reason i tought that more would have changed between v3 and v4 of
bootstrap, the biggest change I noticed were the spacing utilities, they're nice
to have.

Maybe I'm not enough of a power user

## Conclusion

Just because it looks easy it doesn't mean it is easy. You'd think 4 years of
professional software development would've taught me that

I closed the tabs already, but there were only about 25.
