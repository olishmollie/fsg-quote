public/fsg-custom.js: src/lib/* src/models/* src/data/* src/components/* src/app.js
	cat $^ > $@

clean:
	rm public/fsg-custom.js