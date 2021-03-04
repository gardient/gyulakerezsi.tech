---
title: xkcd Calendar Fact Generator
date: 2017-12-20T13:12:09+02:00
tags:
  - javascript
  - hugo
categories:
  - hugo
description: How I made a calendar fact generator based on a webcomic and then fell into the rabbit-hole of customizing Hugo
---

So it started with the new [xkcd](https://xkcd.com/1930/) today, I tought "this
is easy, I'll be done in an hour".

Then I went down the rabbit-hole that is customizing Hugo.

# But first the generator

You can check it out [here](/random-stuff/xkcd-calendar-facts/)

The application itself is rather simple, it is carried by two functions, calling
each other.

The first, taking an array, and making a string out of all it's elements

```js
function pickOneOfEach (arr) {
  let result = ''

  for (let el of arr) {
    if (Array.isArray(el)) {
      result += pickRandom(el)
    } else {
      result += String(el) // turn everything to string, because .toString() can be unreliable in what it returns
    }
  }

  return result
}
```

And a second one, getting me a random element from an array

```js
function pickRandom (arr) {
  let rnd = arr[(Math.floor(Math.random() * arr.length))]

  if (Array.isArray(rnd)) return pickOneOfEach(rnd)
  else return rnd
}
```

You might notice that the two functions call each other when they meet an array,
and really, that's where the magic happens. It's these kind of things that make
people love and hate JavaScript.

JavaScript doesn't care about what kind of values you put in your arrays, it
will let you mix and match. On the other hand you have to be careful how you use
these values.

So you can make an array that has both strings and other arrays as elements. You
can't pull this in TypeScript without using the `ANY` type.  
(correction: you can make something like `type recursiveType = Array<string | recursiveType>`. And how awesome is that?)

So for usage you would just

```js
pickOneOfEach([
  'Did you know that ',
  [
    [
      'you can ',
      [
        'mix and match',
        'clobber'
      ],
      ' multiple types into an array in javascript'
    ],
    'javascript just doesn\'t care'
  ]
])
```

And it would give back one of `Did you know that javascript just doesn't care`,
`Did you know that you can mix and match multiple types into an array in javascript`,
`Did you know that you can clobber multiple types into an array in javascript`

If you looked at the comic you can guess how complicated the data for the
generator got, so spare yourself the headache and don't actually look at it.

# Onwards to personalizing the Hugo theme

This is the pain of the day.

So making a special layout for a single page is pretty straight forward, but
then I wanted to add a new menu entry. I admit I completely forgot that those
were just config entries.

So in I go, to the theme templates, and notice that the template actually has
support for sub menus. My thinking was "Ok, sub menu for random stuff it is!"

This is the paragraph in which I admit that I hate data structures where you
have to specify the parent on a different array item. I understand why you do it.
I still don't like it.

```ini
[[menu.main]]
  name = "Random Stuff"
  pre = "<i class='fa fa-random fa-fw'></i>"
  weight = 5
[[menu.main]]
  name = "xkcd Calendar Fact Generator"
  url = "/xkcd-calendar-facts/"
  parent = "Random Stuff"
```

That's nice! Took me like half an hour to find out you have to specify the
`parent`. Was trying to specify children instead, but ok.

It doesn't work out out of the box with
[Blackburn](https://github.com/yoshiharuyamashita/blackburn). Turns out it's not
enough to just specify the css classes in [Pure CSS](https://purecss.io/) you
have to add a javascript file. They provide a really nice
[reference](https://purecss.io/js/menus.js), but that doesn't work with
___Blackburn___, so what do you change? You just add
`document.addEventListener('DOMContentLoaded', initDropdowns)`.

That's it! It works!...

Is what I wanted, CSS needs to be adjusted. At this point it really became clear
that ___Blackburn___ doesn't actually support submenus, which throws me off
because the menu template clearly wants to.

If you want to see the CSS I ended up with you can see it
[here](/css/menu-override.css)

Four hours, and 16 tabs later it finally works
