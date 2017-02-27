development: pages static-files scss js dev-links
	@echo "All done!"
production: pages-min static-files-min scss-min js-min
	@echo "All done!"

browserify=./node_modules/.bin/browserify
handlebars=./node_modules/.bin/handlebars
htmlmin=./node_modules/.bin/html-minifier
scss=./node_modules/.bin/node-sass
postcss=./node_modules/.bin/postcss

browserifyArgs=-t strictify --outfile dist/index.js -e js/main.js
scssArgs=--output dist style/index.scss --quiet
scssMinArgs=--output-style compressed
scssMaxArgs=--source-map-embed --output-style expanded --indent-type tab
handlebarsArgs=-e "hbs" ./pages >> dist/templates.js
htmlminArgs=--html5 --collapse-boolean-attributes --remove-tag-whitespace \
	--collapse-inline-tag-whitespace --remove-attribute-quotes \
	--remove-comments --remove-empty-attributes --remove-redundant-attributes
postcssArgs=--use autoprefixer --autoprefixer.browsers "> 0.25%"

dist-dir:
	@mkdir -p dist

dev-links: dist-dir
	@echo "Linking source files to dist for in-browser debugging"
	@rm -f dist/style dist/js dist/node_modules
	@ln -s ../style dist/
	@ln -s ../js dist/
	@ln -s ../node_modules dist/

static-files: dist-dir
	@echo "Copying static files"
	@cp index.html dist/
	@cp res/favicon.png dist/favicon.png
	@cp -r res/ dist/

static-files-min: static-files
	@echo "Minifying static HTML files"
	@cat dist/index.html | $(htmlmin) $(htmlminArgs) > dist/index.min.html
	@mv -f dist/index.min.html dist/index.html

handlebars-runtime: dist-dir
	@cat node_modules/handlebars/dist/handlebars.runtime.js > dist/templates.js

pages: handlebars-runtime
	@echo "Compiling Handlebars templates"
	@$(handlebars) $(handlebarsArgs)

pages-min: handlebars-runtime
	@echo "Compiling Handlebars templates with minify flag"
	@$(handlebars) -m $(handlebarsArgs)

scss: dist-dir
	@echo "Compiling SCSS"
	@$(scss) $(scssMaxArgs) $(scssArgs)

scss-min: dist-dir
	@echo "Compiling SCSS with minify flag"
	@$(scss) $(scssMinArgs) $(scssArgs)
	@echo "Adding prefixes to compiled and minified SCSS"
	@$(postcss) $(postcssArgs) -o dist/index.css dist/index.css

js: dist-dir
	@echo "Browserifying JavaScript files"
	@$(browserify) --debug $(browserifyArgs)

js-min: dist-dir
	@echo "Browserifying, babelifying and minifying JavaScript files"
	@$(browserify) -t babelify -t uglifyify $(browserifyArgs)

clean:
	@echo "Cleaning working directory"
	@rm -rf dist ranssi.tar.xz

package: production
	@echo "Packaging for production"
	@cp package.json LICENSE dist
	@cd dist
	@tar cfJ shitler-web.tar.xz *
	@rm -f package.json LICENSE
	@mv shitler-web.tar.xz ..
	@cd ..
	@echo "Extract shitler-web.tar.xz anywhere"

lint-scss=./node_modules/.bin/sass-lint -c .sass-lint.yml -s scss
lint-html=./node_modules/.bin/htmlhint -c .htmlhintrc
lint-js=./node_modules/.bin/eslint -c .eslintrc.json

setup:
	@echo "Installing npm packages"
	@npm install
	@echo "Compiling..."
	make -j4 default
