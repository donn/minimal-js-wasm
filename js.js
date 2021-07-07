const lib = require("./wasm.js");

function Helper(lib) {
    this.lib = lib;

    this.to_cstr = (str) => {
        let bytes = lib.lengthBytesUTF8(str);
        let c_str = lib._malloc(bytes + 1);
        lib.stringToUTF8(str, c_str, bytes + 1);
        return {c_str, free: ()=> lib._free(c_str)};
    }

    this.from_cstr = (c_str, free=false) => {
        let str = lib.UTF8ToString(c_str);
        if (free) {
            lib._free(c_str);
        }
        return str;
    }

    return this;
}
async function main() {
    await new Promise(r=> lib.onRuntimeInitialized = r);

    let helper = Helper(lib);

    // While loop exists to help detect memory leaks.
    //while (true) {
        let a = "1", b = "2";
        let ca = helper.to_cstr(a), cb = helper.to_cstr(b);
        let rawString = lib._add_two_strings(ca.c_str, cb.c_str);
        ca.free(); cb.free();
    
        let jsString = helper.from_cstr(rawString, true);
        console.log(jsString);
    //}
}

main()