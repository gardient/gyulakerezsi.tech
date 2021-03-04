---
title: Automating the Blog... again
date: 2021-03-04T21:45:22+02:00
lastmod: 2021-03-04T21:45:22+02:00
tags:
  - blog
  - github
  - automation
  - CI
categories:
  - Hugo
  - automation
description: "Down the rabbithole... again"
---

Unsurprisingly, less painful

Github actions are wonderful, love the integration, and you can find pretty much
everything you need on the marketplace.

The workflow is almost the same:
1. Checkout
2. Get Hugo
3. Build with Hugo
4. Rsync

you can check out the yaml [here](https://github.com/gardient/gyulakerezsi.tech/blob/master/.github/workflows/main.yml)

### Differences

I don't need to keep a Hugo executable in the repo, there is an Action that gets
the latest version for me.

I can keep the ssh key in a repository secret instead of the janky encrypted file
that I used before, there probably was a way with Travis, but nothing quite as simple

Then there is the fact that the RSyncer Action doesn't need me to hold it's hand,
it can get it's own server key, again now I realize that I could have done
pretty much everything in it with Travis, but this is much more in your face

### Conclusion

I might be getting wiser, or github might be much more in your face with the
prepared actions.

Either way finding the right action for me is a lot simpler than finding what I
needed in Travis

Only about 10 tabs open for this, I don't think I really needed more than 5 of them

PS: On a side note, I'm really starting to like YAML
