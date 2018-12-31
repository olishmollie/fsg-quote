public/fsg-custom.js: src/lib/* src/models/* src/data/* src/components/* src/init.js
	cat $^ > $@

clean:
	rm public/fsg-custom.js