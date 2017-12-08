---
title: "Automating the Blog"
date: 2017-12-08T21:32:41+02:00
tags: ["Hugo", "Travis CI", "Automation"]
topics: ["Hugo", "CI", "Automation"]
description: "Automating Hugo with Travis CI"
---

So today after a long while I finally got around to automating the deploy of
the blog.  
Tough not the way I initially thought.

The first idea was to install Hugo on the server and have it periodically pull
and rebuild the [repository](https://github.com/gardient/gyulakerezsi.tech)

Then I remembered Travis CI.

I quickly looked it up, and saw that I was not the first to think up the idea
(no big surprise there), so let's see what we can find.

# First on the list is [Chris Hager](https://www.metachris.com/2017/04/continuous-deployment-hugo---travis-ci--github-pages/)

This is an awesome tutorial to geting Hugo building your site on Travis CI.

In the end the parts I needed from this were:

\1. add the Hugo executable to your repo

\2. add the following snippet to your `.travis.yml` file

``` yaml
install:
  - rm -rf public || exit 0

script:
  - chmod u+x ./bin/hugo
  - ./bin/hugo
```

The `install` part is to make sure you get the freshest files, and nothing you
deleted remains.

If you are not from windows you might be able to skip `chmod u+x ./bin/hugo`,
this was needed for me to make sure I could actually run Hugo.

Finally `./bin/hugo` generates the site. Note that Travis CI puts you in the
root of your repository.

I'm not pushing it back to github, so the rest of this tutorial doesn't really
apply to me.

Still, I want these updates to be as real time as possible. And I'm not creating
a webhook for github.

Perhaps there is an Nginx module for that, but that's deep magic, the kind I
don't want to mess with right now.

So onwards to find out if I can get Travis to push with SSH/SCP.

# What do you know? Someone already tought about it!

[This](https://oncletom.io/2016/travis-ssh-deploy/) tutorial by Thomas Parisot
is, again, really helpful! Altough my workflow deviated from it... again.

First step is setting up a user. On my Ubuntu server this looked like this:

``` bash
sudo adduser www-deploy
sudo usermod -a -G www-data
```

With this we have a user that has access to our website's content. Now to set it
up for SSH!

``` bash
# let's impersonate!
sudo su www-deploy
cd ~
mkdir .ssh

# generate a new key, you shouldn't specify a password
ssh-keygen -b 4096 -C "" -o -t rsa

#authorize the key we just generated to ssh!
cp id_rsa.pub authorized_keys

# because ssh is picky about permissions
chmod 700 .
chmod 600 ./*
```

The more experienced among you might notice that, usually, you generate the key
on the macine you want to access the server from. To you I say, I'm on windows!

Anyway the next step is getting that key on the repository. Again, I can
practically hear you say "You shouldn't have private keys on a git repo,
especially a public one.". You are right! let's encrypt them!

> You should choose a strong password

``` bash
PASS=<Your password here>
openssl aes-256-cbc -in id_rsa -out id_rsa.enc -k $PASS
```

If your password is strong enough, it should be fairly safe to add `id_rsa.enc` to your
repository.

Now to configure the rest of your Travis CI build.

``` yaml
addons:
  ssh_known_hosts: <the hostname of your server>

install:
  - rm -rf public || exit 0

script:
  - chmod u+x ./bin/hugo
  - ./bin/hugo

before_deploy:
  - openssl aes-256-cbc -in deploy/id_rsa.enc -out /tmp/deploy_rsa -d -k $PASS_<random string here>
  - eval "$(ssh-agent -s)"
  - chmod 600 /tmp/deploy_rsa
  - ssh-add /tmp/deploy_rsa

deploy:
  provider: script
  skip_cleanup: true
  script: rsync -r --delete-after --quiet -og --chown=www-data:www-data $TRAVIS_BUILD_DIR/public/* www-deploy@<the hostname of your server>:/path/to/www/root/
  on:
    branch: master
```

The `ssh_known_hosts` addon makes sure that the deploy won't hang, waiting for
user input.

The before deploy parts are there to decrypt and load our key into memory. The
`$PASS_<random string here>` should be an environment variable that has your
password in it.

> Make sure to escape ' ' and '$' characters if you configure this in the web
> interface

The deploy part is just an `rsync` script to push your changes to ssh. Tweak to
your heart's content.

# Conclusion

In this day and age I feel that it's more important to be able to mash together
two tutorials than to perfectly follow one.

And that's how this is done.

I 33 tabs open, and have automated the deployment of this blog.
