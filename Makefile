wasm.js: example.c Makefile
	emcc -o $@ -s WASM=1 -s EXPORTED_FUNCTIONS=["_free","_malloc","_add_two_strings"] -s EXPORTED_RUNTIME_METHODS=["UTF8ToString","stringToUTF8","lengthBytesUTF8"] $<

.PHONY: clean
clean:
	rm -f wasm.js wasm.wasm