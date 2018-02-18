---
title: "My Experience With Tracking by $index"
date: 2017-12-20T14:16:48+02:00
tags: ["javascript", "angular"]
categories: ["angular"]
description: "Why I hate 'track by $index'"
---

If you found this post while trying to optimize your angular templates, I have a
cautionary tale for you. This might be just me, but this one hurt.

At work we have an AngularJS application. This application has one particular
list really long, really complex, really grinds the tablets to a halt. How do
you solve that?

My first tought was, there is too many `watch`es in there. One-time bind all the
things. for those of you that dont know one-time binding is done by adding two
colons at the beginnig of the variable name `{{::variable}}`. It gets evaluated
once, the first time it has a value, and then angular just forgets about it.

Which is fine, solves a part of the problem, but the list is long, you have to
add a search.

You add a search, and the search is slow, so what do you do?

You add `track by`, is what you do. Actually you `track by $index`, because you
saw the example and `$index` is always there for you.

And then you have a list that only changes it's length.

If you read the warning on [ngRepeat's page](https://docs.angularjs.org/api/ng/directive/ngRepeat#tracking-and-duplicates)
you might remove your one time bindings.

>Avoid using track by $index when the repeated template contains one-time
>bindings. In such cases, the nth DOM element will always be matched with the
>nth item of the array, so the bindings on that element will not be updated even
>when the corresponding item changes, essentially causing the view to get
>out-of-sync with the underlying data.

But I didn't, and then spent an hour trying to figgure it out.

In the end I just changed to `track by item.id`, and that worked fine.

# The catch 22 of optimizing ngRepeat

## Or: why you can't win

If you have a really complex template for ___ngRepeat___'s items you will either
have to deal with a lot of `watch`es or ___ngRepeat___ constantly rebuilding
your DOM. So pick your poison.

# PS

I agree with Doctor Strange, they really should put the warnings before the
~~spells~~ examples
