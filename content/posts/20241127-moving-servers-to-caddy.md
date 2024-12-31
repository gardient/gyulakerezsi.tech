---
title: Moving servers, to caddy
date: 2024-11-27T22:45:22+02:00
lastmod: 2024-11-29T23:37:00+02:00
tags:
  - blog
  - caddy
categories:
  - hosting
description: "here be dragons?"
---

Bit of a work in progress still

I'm moving hosting providers slowly and want to set up a BlueSky PDS,
they use caddy, and I'm interested in the fact that has an api for configuration

I'll update this as I go

for now the only thing I can say: check your paths people

### EDIT 2024-11-28

Got ntfy running on the server, nice and painless

I'm starting to like caddy

### EDIT 2024-11-29

Portainer and docker are running. Now to move Gitea.

### EDIT 2024-11-30

Moving gitea was a bit more painful than expected,mostly caused by the difference
between direct hosting and hosting in docker.

Getting the dump from the old server into the container was not as straight
forward as expected, especially as I had moved a few files around.

Probably shouldn't have bothered with moving my config file, just check default
paths and dump things there

All told about 3 hours spent on this
