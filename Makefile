public/fsg-custom.js: src/**/*.js src/*.js
	cat $^ > $@

clean:
	rm public/fsg-custom.js