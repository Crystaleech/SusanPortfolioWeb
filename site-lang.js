(function (w) {
    function getStore(key) {
        try {
            return w.localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function setStore(key, value) {
        try {
            w.localStorage.setItem(key, value);
        } catch (e) {}
    }

    function resolveLang() {
        try {
            var q = new URLSearchParams(w.location.search).get("lang");
            if (q === "en" || q === "zh") {
                setStore("siteLang", q);
                return q;
            }
        } catch (e) {}
        var saved = getStore("siteLang");
        if (saved === "en" || saved === "zh") return saved;
        return "en";
    }

    function persist(code) {
        if (code !== "en" && code !== "zh") code = "en";
        setStore("siteLang", code);
        try {
            var url = new URL(w.location.href);
            url.searchParams.set("lang", code);
            w.history.replaceState(null, "", url.pathname + url.search + url.hash);
        } catch (e) {}
        return code;
    }

    w.SiteLang = {
        resolve: resolveLang,
        persist: persist
    };
})(window);
