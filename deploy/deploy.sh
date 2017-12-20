rsync -r --delete-after --quiet -og --chown=www-data:www-data $TRAVIS_BUILD_DIR/public.tech/* www-deploy@gyulakerezsi.tech:/usr/share/nginx/gyulakerezsi.tech/site/
rsync -r --delete-after --quiet -og --chown=www-data:www-data $TRAVIS_BUILD_DIR/public/* www-deploy@gyulakerezsi.tech:/usr/share/nginx/gyulakerezsi.ro/site/
