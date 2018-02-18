rsync -r --delete-after -og --chown=www-data:www-data $TRAVIS_BUILD_DIR/public/* www-deploy@gyulakerezsi.ro:/usr/share/nginx/gyulakerezsi.ro/
ssh www-deploy@gyulakerezsi.ro find /usr/share/nginx/gyulakerezsi.ro -type d -exec chmod 775 {} \;
ssh www-deploy@gyulakerezsi.ro find /usr/share/nginx/gyulakerezsi.ro -type f -exec chmod 664 {} \;
