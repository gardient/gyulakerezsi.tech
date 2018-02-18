rsync -r --delete-after -og --chown=www-data:www-data $TRAVIS_BUILD_DIR/public/* www-deploy@gyulakerezsi.ro:/usr/share/nginx/gyulakerezsi.ro/
