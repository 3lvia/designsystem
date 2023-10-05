true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity)
            fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy)
            fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (link.crossOrigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
    // @ts-expect-error true will be replaced with boolean later
    if (!true || !deps || deps.length === 0) {
        return baseModule();
    }
    const links = document.getElementsByTagName('link');
    return Promise.all(deps.map((dep) => {
        // @ts-expect-error assetsURL is declared before preload.toString()
        dep = assetsURL(dep, importerUrl);
        if (dep in seen)
            return;
        seen[dep] = true;
        const isCss = dep.endsWith('.css');
        const cssSelector = isCss ? '[rel="stylesheet"]' : '';
        const isBaseRelative = !!importerUrl;
        // check if the file is already preloaded by SSR markup
        if (isBaseRelative) {
            // When isBaseRelative is true then we have `importerUrl` and `dep` is
            // already converted to an absolute URL by the `assetsURL` function
            for (let i = links.length - 1; i >= 0; i--) {
                const link = links[i];
                // The `links[i].href` is an absolute URL thanks to browser doing the work
                // for us. See https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5
                if (link.href === dep && (!isCss || link.rel === 'stylesheet')) {
                    return;
                }
            }
        }
        else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
        }
        const link = document.createElement('link');
        link.rel = isCss ? 'stylesheet' : scriptRel;
        if (!isCss) {
            link.as = 'script';
            link.crossOrigin = '';
        }
        link.href = dep;
        document.head.appendChild(link);
        if (isCss) {
            return new Promise((res, rej) => {
                link.addEventListener('load', res);
                link.addEventListener('error', () => rej(new Error(`Unable to preload CSS for ${dep}`)));
            });
        }
    }))
        .then(() => baseModule())
        .catch((err) => {
        const e = new Event('vite:preloadError', { cancelable: true });
        // @ts-expect-error custom payload
        e.payload = err;
        window.dispatchEvent(e);
        if (!e.defaultPrevented) {
            throw err;
        }
    });
};

const elvis_min = '';

document.addEventListener("DOMContentLoaded", function() {
  let e = { "e-icon--access_control": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 1.5A2.25 2.25 0 0 0 1.5 3.75V12h11.25a.75.75 0 0 1 0 1.5H1.629A2.25 2.25 0 0 0 3.75 15h7.5a.75.75 0 0 1 0 1.5H9.635l-.5 3h2.115a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5h1.615l.5-3H3.75A3.75 3.75 0 0 1 0 12.75v-9A3.75 3.75 0 0 1 3.75 0h16.5A3.75 3.75 0 0 1 24 3.75v6a.75.75 0 0 1-1.5 0v-6a2.25 2.25 0 0 0-2.25-2.25H3.75ZM18.034 19.92a.75.75 0 0 0 1.5 0V19a.75.75 0 0 0-1.5 0v.92Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 14.25v.878A2.251 2.251 0 0 1 24 17.25v4.5A2.25 2.25 0 0 1 21.75 24h-6a2.25 2.25 0 0 1-2.25-2.25v-4.5c0-.98.626-1.813 1.5-2.122v-.878a3.75 3.75 0 0 1 7.5 0Zm-7.5 3a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-4.5Zm6-3V15h-4.5v-.75a2.25 2.25 0 0 1 4.5 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--access_control-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 16.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-6Zm-2.25.75A2.25 2.25 0 0 1 15.75 15h6A2.25 2.25 0 0 1 24 17.25v4.5A2.25 2.25 0 0 1 21.75 24h-6a2.25 2.25 0 0 1-2.25-2.25v-4.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.098 11.598A3.75 3.75 0 0 1 22.5 14.25v1.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-1.5a3.75 3.75 0 0 1 1.098-2.652ZM18.75 12a2.25 2.25 0 0 0-2.25 2.25V15H21v-.75A2.25 2.25 0 0 0 18.75 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M2.159 2.159A2.25 2.25 0 0 1 3.75 1.5h16.5a2.25 2.25 0 0 1 2.25 2.25v6a.75.75 0 0 0 1.5 0v-6A3.75 3.75 0 0 0 20.25 0H3.75A3.75 3.75 0 0 0 0 3.75v9a3.75 3.75 0 0 0 3.75 3.75h4.365l-.5 3H6A.75.75 0 0 0 6 21h5.25a.75.75 0 0 0 0-1.5H9.135l.5-3h1.615a.75.75 0 0 0 0-1.5h-7.5a2.25 2.25 0 0 1-2.121-1.5H12.75a.75.75 0 0 0 0-1.5H1.5V3.75c0-.597.237-1.169.659-1.591ZM18.784 20.67a.75.75 0 0 1-.75-.75V19a.75.75 0 0 1 1.5 0v.92a.75.75 0 0 1-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--add_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 16.5a.75.75 0 0 0 1.5 0v-3.75h3.75a.75.75 0 0 0 0-1.5h-3.75V7.5a.75.75 0 0 0-1.5 0v3.75H7.5a.75.75 0 0 0 0 1.5h3.75v3.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--add_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.25a.75.75 0 0 1-.75-.75v-3.75H7.5a.75.75 0 0 1 0-1.5h3.75V7.5a.75.75 0 0 1 1.5 0v3.75h3.75a.75.75 0 0 1 0 1.5h-3.75v3.75a.75.75 0 0 1-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--add_circle-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/><path d="M12 17.25a.75.75 0 0 1-.75-.75v-3.75H7.5a.75.75 0 0 1 0-1.5h3.75V7.5a.75.75 0 0 1 1.5 0v3.75h3.75a.75.75 0 0 1 0 1.5h-3.75v3.75a.75.75 0 0 1-.75.75Z" fill="var(--e-color-icon-filled-foreground-1, var(--e-color-icon-filled-foreground-1, #FFFFFF))"/></svg>', "e-icon--add_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M12 17.25a.75.75 0 0 1-.75-.75v-3.75H7.5a.75.75 0 0 1 0-1.5h3.75V7.5a.75.75 0 0 1 1.5 0v3.75h3.75a.75.75 0 0 1 0 1.5h-3.75v3.75a.75.75 0 0 1-.75.75Z" fill="#000"/></svg>', "e-icon--add_powermeter": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.009 18.753a2.252 2.252 0 0 0 2.25 2.25H8.75a.75.75 0 0 0 0-1.5H2.259a.75.75 0 0 1-.75-.75V6.003h19.5V9.25a.75.75 0 0 0 1.5 0V2.253a2.252 2.252 0 0 0-2.25-2.25h-18a2.252 2.252 0 0 0-2.25 2.25v16.5Zm21-16.5v2.25h-19.5v-2.25a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 .75.75Zm-10.5 15a6.758 6.758 0 0 0 6.75 6.75 6.758 6.758 0 0 0 6.75-6.75 6.758 6.758 0 0 0-6.75-6.75 6.758 6.758 0 0 0-6.75 6.75Zm1.5 0a5.256 5.256 0 0 1 5.25-5.25 5.256 5.256 0 0 1 5.25 5.25 5.256 5.256 0 0 1-5.25 5.25 5.256 5.256 0 0 1-5.25-5.25Zm5.25 3.75a.75.75 0 0 1-.75-.75v-2.25h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-.75.75Zm-11.39-8.35H8.14v.973H4.896v-3.244h2.27V9.3h-2.27v-.973H8.14v3.028H5.87v1.298Zm3.787-4.326h3.245v1.801a8.035 8.035 0 0 0-1.57 1.227H9.656v-.973h2.272V9.3H9.656v-.973Zm.627 4.326h-.627v.973h.088c.157-.337.338-.663.539-.973ZM17 9a7.99 7.99 0 0 0-2.582.426v-1.1h3.028v.686A8.125 8.125 0 0 0 17 9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--add_powermeter-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.259 21.003a2.252 2.252 0 0 1-2.25-2.25v-16.5a2.252 2.252 0 0 1 2.25-2.25h18a2.252 2.252 0 0 1 2.25 2.25V9.25a.75.75 0 0 1-1.5 0V6.003h-19.5v12.75c0 .414.336.75.75.75H8.75a.75.75 0 0 1 0 1.5H2.259Zm18.75-16.5v-2.25a.75.75 0 0 0-.75-.75h-18a.75.75 0 0 0-.75.75v2.25h19.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M17.259 24.003a6.758 6.758 0 0 1-6.75-6.75 6.758 6.758 0 0 1 6.75-6.75 6.758 6.758 0 0 1 6.75 6.75 6.758 6.758 0 0 1-6.75 6.75Zm0-12a5.256 5.256 0 0 0-5.25 5.25 5.256 5.256 0 0 0 5.25 5.25 5.256 5.256 0 0 0 5.25-5.25 5.256 5.256 0 0 0-5.25-5.25Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M17.259 21.003a.75.75 0 0 1-.75-.75v-2.25h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-.75.75ZM8.14 12.653H5.87v-1.298H8.14V8.327H4.896V9.3h2.27v1.082h-2.27v3.245H8.14v-.974Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.656 8.327h3.245v1.801a8.035 8.035 0 0 0-1.57 1.227H9.656v-.973h2.272V9.3H9.656v-.973Zm.627 4.326h-.627v.973h.088c.157-.337.338-.663.539-.973ZM14.418 9.426a7.99 7.99 0 0 1 3.028-.414v-.685h-3.029v1.099Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--adjust": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.002 11.998a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H.752a.75.75 0 0 1-.75-.75ZM14.252 11.998a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5h-8.25a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.032 7.718a.75.75 0 0 1 0 1.06l-3.22 3.22 3.22 3.22a.75.75 0 0 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0ZM18.972 7.718a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l3.22-3.22-3.22-3.22a.75.75 0 0 1 0-1.06ZM12.002 6.748a.75.75 0 0 1 .75.75v9a.75.75 0 1 1-1.5 0v-9a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--agreements-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 18.75C0 19.991 1.01 21 2.253 21h7.256a.75.75 0 1 0 0-1.5H2.253a.75.75 0 0 1-.751-.75V2.25a.75.75 0 0 1 .75-.75h10.642c.2 0 .388.078.53.219L16.3 4.591c.139.14.219.333.219.53V8.25a.75.75 0 0 0 1.502 0V5.12c0-.6-.235-1.165-.66-1.59L14.486.658A2.24 2.24 0 0 0 12.894 0H2.253A2.254 2.254 0 0 0 0 2.25v16.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M4.844 9.5c-.466 0-.844.336-.844.75s.378.75.844.75h7.312c.466 0 .844-.336.844-.75s-.378-.75-.844-.75H4.844ZM4 6.75c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 7.5 4 7.164 4 6.75ZM4.75 13a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.502 14.803h-1.107a.795.795 0 0 0-.795.795 4.598 4.598 0 0 0 3.679 4.506l.124.025v3.076a.795.795 0 0 0 1.59 0v-3.076l.125-.025a4.598 4.598 0 0 0 3.679-4.506.795.795 0 0 0-.795-.795h-1.107v-3.008a.795.795 0 1 0-1.59 0v3.008h-2.213v-3.008a.795.795 0 1 0-1.59 0v3.008Zm2.7 3.804h-.004a3.008 3.008 0 0 1-2.836-2.006l-.073-.208H20.108l-.073.208a3.006 3.006 0 0 1-2.833 2.006Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--analytics_bars": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 17.5a.75.75 0 0 1-.75-.75V11.5a.75.75 0 0 1 1.5 0v5.25a.75.75 0 0 1-.75.75ZM7.75 17.5a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 1.5 0v7a.75.75 0 0 1-.75.75ZM13.75 17.5a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM16.75 17.5a.75.75 0 0 1-.75-.75v-10a.75.75 0 0 1 1.5 0v10a.75.75 0 0 1-.75.75ZM4.5 17.5a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM19.75 17.5a.75.75 0 0 1-.75-.75v-5a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M.25 5.5A2.75 2.75 0 0 1 3 2.75h18a2.75 2.75 0 0 1 2.75 2.75v13A2.75 2.75 0 0 1 21 21.25H3A2.75 2.75 0 0 1 .25 18.5v-13ZM3 4.25c-.69 0-1.25.56-1.25 1.25v13c0 .69.56 1.25 1.25 1.25h18c.69 0 1.25-.56 1.25-1.25v-13c0-.69-.56-1.25-1.25-1.25H3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996A.81.81 0 0 0 17.6 12a.798.798 0 0 0-.238-.57l-3.996-3.996Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.4c5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4ZM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--arrow_right_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996A.81.81 0 0 0 17.6 12a.798.798 0 0 0-.238-.57l-3.996-3.996Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.4c5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4ZM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--arrow_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996a.77.77 0 0 0 .166-.237.799.799 0 0 0-.166-.902l-3.996-3.997Z" fill="#000"/></svg>', "e-icon--arrow_right_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996a.77.77 0 0 0 .166-.237.799.799 0 0 0-.166-.902l-3.996-3.997Z" fill="#000"/></svg>', "e-icon--arrow_right_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.234 7.434a.8.8 0 0 1 1.132 0l4 4a.798.798 0 0 1 0 1.132l-4 4a.8.8 0 0 1-1.132-1.132L14.87 12.8H7.2a.8.8 0 0 1 0-1.6h7.669l-2.635-2.634a.8.8 0 0 1 0-1.132Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM1.6 12C1.6 6.256 6.256 1.6 12 1.6c5.744 0 10.4 4.656 10.4 10.4 0 5.744-4.656 10.4-10.4 10.4-5.744 0-10.4-4.656-10.4-10.4Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_left_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.6C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4 5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M11.766 8.566a.8.8 0 0 0-1.132-1.132l-3.99 3.991a.797.797 0 0 0-.01 1.14l4 4a.8.8 0 0 0 1.132-1.13L9.13 12.798h7.67a.8.8 0 1 0 0-1.599H9.131l2.635-2.634Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_left_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.766 8.566a.8.8 0 0 0-1.132-1.132l-3.99 3.991a.797.797 0 0 0-.01 1.14l4 4a.8.8 0 0 0 1.132-1.13L9.13 12.798h7.67a.8.8 0 1 0 0-1.599H9.131l2.635-2.634Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.6C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4 5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--arrow_left_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M11.766 8.566a.8.8 0 0 0-1.132-1.132l-3.99 3.991a.797.797 0 0 0-.01 1.14l4 4a.8.8 0 0 0 1.132-1.13L9.13 12.798h7.67a.8.8 0 1 0 0-1.599H9.131l2.635-2.634Z" fill="#000"/></svg>', "e-icon--arrow_down": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.476 5.994a.75.75 0 0 1 1.06.012L12 16.707 22.464 6.006a.75.75 0 0 1 1.072 1.048l-10.481 10.72A1.483 1.483 0 0 1 12 18.22a1.469 1.469 0 0 1-1.055-.445L.464 7.054a.75.75 0 0 1 .012-1.061Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_down-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.389 5.869a1.328 1.328 0 0 1 1.878 0L12 15.6l9.733-9.732a1.328 1.328 0 0 1 1.878 1.878L13.443 17.915h-.001a2.04 2.04 0 0 1-2.885 0L.39 7.747a1.328 1.328 0 0 1 0-1.878Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_external": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m20.142 2.26-7.811 7.811a1.13 1.13 0 0 0 1.597 1.598l7.813-7.812v6.138a1.13 1.13 0 1 0 2.259 0V1.13a1.125 1.125 0 0 0-.412-.872A1.123 1.123 0 0 0 22.87 0h-8.865a1.13 1.13 0 0 0 0 2.26h6.137ZM.05 6.209c0-2.296 1.899-4.159 4.243-4.159H8.26c.62 0 1.12.492 1.12 1.098 0 .605-.5 1.098-1.12 1.098H4.293c-1.105 0-2.002.878-2.002 1.963V19.79c0 1.085.897 1.963 2.002 1.963h13.414c1.105 0 2.002-.878 2.002-1.963v-4.033c0-.605.5-1.098 1.12-1.098.62 0 1.121.493 1.121 1.098v4.033c0 2.296-1.899 4.159-4.243 4.159H4.293C1.949 23.95.05 22.087.05 19.791V6.21Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_external-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m20.142 2.26-7.811 7.811a1.13 1.13 0 0 0 1.597 1.598l7.813-7.812v6.138a1.13 1.13 0 1 0 2.259 0V1.13a1.125 1.125 0 0 0-.412-.872A1.123 1.123 0 0 0 22.87 0h-8.865a1.13 1.13 0 0 0 0 2.26h6.137ZM.05 6.209c0-2.296 1.899-4.159 4.243-4.159H8.26c.62 0 1.12.492 1.12 1.098 0 .605-.5 1.098-1.12 1.098H4.293c-1.105 0-2.002.878-2.002 1.963V19.79c0 1.085.897 1.963 2.002 1.963h13.414c1.105 0 2.002-.878 2.002-1.963v-4.033c0-.605.5-1.098 1.12-1.098.62 0 1.121.493 1.121 1.098v4.033c0 2.296-1.899 4.159-4.243 4.159H4.293C1.949 23.95.05 22.087.05 19.791V6.21Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_left": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.486.23a.766.766 0 0 1-.012 1.084L6.544 12l10.93 10.686a.766.766 0 0 1-1.071 1.096L5.455 13.077A1.513 1.513 0 0 1 5 12a1.5 1.5 0 0 1 .455-1.077L16.403.218a.766.766 0 0 1 1.083.012Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_left-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.715.389c.518.519.518 1.36 0 1.878L7.982 12l9.733 9.733a1.328 1.328 0 0 1-1.878 1.878L5.668 13.443v-.001a2.038 2.038 0 0 1 0-2.884L15.837.388a1.328 1.328 0 0 1 1.878 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long_left": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12a.75.75 0 0 1 .75-.75h22.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.78 1.215a.722.722 0 0 1 0 1.037L1.81 12l9.97 9.748a.722.722 0 0 1 0 1.037.762.762 0 0 1-1.06 0L.22 12.518a.722.722 0 0 1 0-1.037l10.5-10.266a.762.762 0 0 1 1.06 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long_left-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0-.69.557-1.25 1.243-1.25h21.514c.686 0 1.243.56 1.243 1.25s-.556 1.25-1.243 1.25H1.243C.557 13.25 0 12.69 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.162 1.355a1.19 1.19 0 0 1 0 1.714L3 12l9.16 8.931a1.19 1.19 0 0 1 0 1.714 1.266 1.266 0 0 1-1.757 0L.364 12.857a1.19 1.19 0 0 1 0-1.714l10.04-9.788a1.266 1.266 0 0 1 1.758 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long_right": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.5 12a.75.75 0 0 1-.75.75h-22a.75.75 0 0 1 0-1.5h22a.75.75 0 0 1 .75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.776 11.482c.299.286.299.75 0 1.037L13.052 22.785a.79.79 0 0 1-1.083 0 .712.712 0 0 1 0-1.037L22.151 12 11.969 2.252a.711.711 0 0 1 0-1.037.79.79 0 0 1 1.083 0l10.724 10.267Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.5 12a.75.75 0 0 1-.75.75h-22a.75.75 0 0 1 0-1.5h22a.75.75 0 0 1 .75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.776 11.482c.299.286.299.75 0 1.037L13.052 22.785a.79.79 0 0 1-1.083 0 .712.712 0 0 1 0-1.037L22.151 12 11.969 2.252a.711.711 0 0 1 0-1.037.79.79 0 0 1 1.083 0l10.724 10.267Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long_right-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.999c0-.69.545-1.25 1.217-1.25h21.066c.672 0 1.217.56 1.217 1.25s-.545 1.25-1.217 1.25H1.217c-.672 0-1.217-.56-1.217-1.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.191 1.355a1.204 1.204 0 0 1 1.707 0l9.748 9.788c.472.473.472 1.24 0 1.714l-9.748 9.788a1.204 1.204 0 0 1-1.707 0 1.216 1.216 0 0 1 0-1.714L21.086 12l-8.895-8.931a1.215 1.215 0 0 1 0-1.714Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.999c0-.69.545-1.25 1.217-1.25h21.066c.672 0 1.217.56 1.217 1.25s-.545 1.25-1.217 1.25H1.217c-.672 0-1.217-.56-1.217-1.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.191 1.355a1.204 1.204 0 0 1 1.707 0l9.748 9.788c.472.473.472 1.24 0 1.714l-9.748 9.788a1.204 1.204 0 0 1-1.707 0 1.216 1.216 0 0 1 0-1.714L21.086 12l-8.895-8.931a1.215 1.215 0 0 1 0-1.714Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long_down": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 1.219a.75.75 0 0 0-1.5 0V20.97l-8.782-8.783a.75.75 0 1 0-1.06 1.061L11.47 23.312a.748.748 0 0 0 1.06 0l10.063-10.063a.75.75 0 0 0-1.06-1.06L12.75 20.97V1.219Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_long_up": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 .469a.75.75 0 0 1 .75.75V22.78a.75.75 0 1 1-1.5 0V1.22a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.47.688a.75.75 0 0 1 1.06 0l10.063 10.063a.75.75 0 0 1-1.06 1.06L12 2.28l-9.532 9.533a.75.75 0 1 1-1.06-1.061L11.47.688Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_right": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.218 23.77a.766.766 0 0 1 .012-1.084L17.16 12 6.23 1.314A.766.766 0 1 1 7.301.218L18.25 10.923A1.514 1.514 0 0 1 18.704 12a1.5 1.5 0 0 1-.454 1.077L7.3 23.782a.766.766 0 0 1-1.083-.012Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_right-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.289.389a1.328 1.328 0 0 1 1.878 0l10.169 10.168a2.038 2.038 0 0 1 0 2.886L8.167 23.61a1.328 1.328 0 1 1-1.878-1.878L16.022 12 6.289 2.267a1.328 1.328 0 0 1 0-1.878Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_up": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.524 18.006a.75.75 0 0 1-1.06-.012L12 7.293 1.536 17.994a.75.75 0 1 1-1.072-1.049l10.481-10.72A1.482 1.482 0 0 1 12 5.78a1.468 1.468 0 0 1 1.055.446l10.481 10.72a.75.75 0 0 1-.012 1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--arrow_up-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m12 8.392-9.733 9.732A1.328 1.328 0 0 1 .39 16.246L10.557 6.078h.001a2.039 2.039 0 0 1 2.884 0l10.169 10.168a1.328 1.328 0 0 1-1.878 1.878L12 8.392Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--attendance": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 12a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm-6.75 5.25a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.374 14.905a.75.75 0 0 1 .15 1.05l-2.905 3.874a1.504 1.504 0 0 1-1.725.505 1.5 1.5 0 0 1-.536-.345l-1.5-1.5a.75.75 0 0 1 1.06-1.06l1.5 1.5h.001l2.905-3.874a.75.75 0 0 1 1.05-.15ZM6 1.5A2.25 2.25 0 1 0 6 6a2.25 2.25 0 0 0 0-4.5ZM2.25 3.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.456 7.703a6.001 6.001 0 0 1 6.75 2.812.75.75 0 1 1-1.301.746A4.5 4.5 0 0 0 1.5 13.5V15H3a.75.75 0 0 1 .746.675L4.43 22.5H7.57l.256-2.558a.75.75 0 0 1 1.492.15l-.323 3.233A.75.75 0 0 1 8.25 24h-4.5a.75.75 0 0 1-.746-.675L2.32 16.5H.75a.75.75 0 0 1-.75-.75V13.5a6.002 6.002 0 0 1 4.456-5.797Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--attachment": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 24a5.256 5.256 0 0 1-5.25-5.25V7.5C4.5 3.365 7.865 0 12 0s7.5 3.365 7.5 7.5v8.249a.75.75 0 0 1-1.5 0V7.5c0-3.308-2.692-6-6-6s-6 2.692-6 6v11.25a3.754 3.754 0 0 0 3.75 3.75 3.754 3.754 0 0 0 3.75-3.75V7.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v9.75a.75.75 0 0 1-1.5 0V7.5c0-1.654 1.346-3 3-3s3 1.346 3 3v11.25A5.256 5.256 0 0 1 9.75 24Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--attachment-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="11.25" y="11.737" width="4.994" height="1.5" rx=".75" transform="rotate(-90 11.25 11.737)" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M9.75 24a5.256 5.256 0 0 1-5.25-5.25V7.5C4.5 3.365 7.865 0 12 0s7.5 3.365 7.5 7.5v8.249a.75.75 0 0 1-1.5 0V7.5c0-3.308-2.692-6-6-6s-6 2.692-6 6v11.25a3.754 3.754 0 0 0 3.75 3.75 3.754 3.754 0 0 0 3.75-3.75V7.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v9.75a.75.75 0 0 1-1.5 0V7.5c0-1.654 1.346-3 3-3s3 1.346 3 3v11.25A5.256 5.256 0 0 1 9.75 24Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--bin": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.571 17.136v-6.857a.857.857 0 0 1 1.715 0v6.857a.857.857 0 0 1-1.715 0ZM15.429 17.136v-6.857a.857.857 0 1 0-1.715 0v6.857a.857.857 0 0 0 1.715 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.428.85a2.571 2.571 0 0 0-2.57 2.571v.858h-6a.857.857 0 1 0 0 1.714h2.57v14.571A2.571 2.571 0 0 0 6 23.136h12a2.57 2.57 0 0 0 2.572-2.572V5.993h2.57a.857.857 0 0 0 0-1.714h-6V3.42A2.571 2.571 0 0 0 14.573.85H9.427Zm9.43 5.143v14.571a.857.857 0 0 1-.858.857H6a.857.857 0 0 1-.857-.857V5.993h13.714Zm-3.43-1.714V3.42a.857.857 0 0 0-.857-.857H9.428a.857.857 0 0 0-.857.857v.858h6.857Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--bookmark": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.6 1.6a2 2 0 0 0-2 2v17.669l4.234-4.235a.8.8 0 0 1 1.132 0L17.2 21.27V3.6a2 2 0 0 0-2-2H9.6Zm-2.546-.546A3.6 3.6 0 0 1 9.6 0h5.6a3.6 3.6 0 0 1 3.6 3.6v19.6a.8.8 0 0 1-1.366.566L12.4 18.73l-5.034 5.035A.8.8 0 0 1 6 23.2V3.6a3.6 3.6 0 0 1 1.054-2.546Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--bookmark-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.054 1.054A3.6 3.6 0 0 1 9.6 0h5.6a3.6 3.6 0 0 1 3.6 3.6v19.6a.8.8 0 0 1-1.366.566L12.4 18.73l-5.034 5.035A.8.8 0 0 1 6 23.2V3.6a3.6 3.6 0 0 1 1.054-2.546Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/></svg>', "e-icon--bookshelf": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 3 0ZM21 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 21 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M.75 20.25a.75.75 0 0 1 .75-.75h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75ZM.75 9.75A.75.75 0 0 1 1.5 9h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 3A.75.75 0 0 1 6 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5ZM6 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H9v-5.25H7.5ZM12 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H15v-5.25h-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 3A.75.75 0 0 1 9 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.598 2.05a.75.75 0 0 1 .996-.365l2.721 1.263a.75.75 0 0 1 .364.996l-2.842 6.122a.75.75 0 0 1-.996.365l-2.72-1.263a.75.75 0 0 1-.365-.996l2.842-6.123Zm1.045 1.311-2.211 4.762 1.36.632 2.211-4.762-1.36-.632Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--box": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.775 23.963a.72.72 0 0 0 .503-.016l11.25-4.5A.747.747 0 0 0 24 18.75V5.25a.767.767 0 0 0-.15-.446l-.006-.008a.722.722 0 0 0-.094-.102l-.017-.014a.732.732 0 0 0-.062-.051.641.641 0 0 0-.091-.05.489.489 0 0 0-.052-.025L12.279.054a.74.74 0 0 0-.558 0L.47 4.554a.662.662 0 0 0-.053.026.571.571 0 0 0-.132.084.685.685 0 0 0-.172.194A.803.803 0 0 0 0 5.25v13.5c0 .309.185.582.471.696l11.25 4.5a.426.426 0 0 0 .054.017ZM22.5 18.242l-9.75 3.9V10.258l9.75-3.9v11.884Zm-11.25-7.984v11.884L1.5 18.243V6.358l9.75 3.9Zm4.918-2.983L12 8.942 2.77 5.25l4.168-1.667 9.23 3.692ZM21.23 5.25l-3.043 1.217-9.23-3.692L12 1.558l9.23 3.692Zm-3.176 12.278a.744.744 0 0 0 .974.418l1.875-.75a.747.747 0 0 0 .418-.975.744.744 0 0 0-.974-.418l-1.875.75a.747.747 0 0 0-.418.975Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--business-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.746 9.484a.706.706 0 0 1 .704-.645h2.357c.362 0 .666.275.702.636L7.82 22.588h12.798v-8.91L8.942 15.054a.706.706 0 1 1-.165-1.402l12.464-1.47a.706.706 0 0 1 .788.702v10.41c0 .39-.316.706-.705.706H2.272a.706.706 0 0 1-.704-.766l1.178-13.75Zm3.656 13.104L5.168 10.251h-1.07L3.04 22.588h3.362ZM15.694.05a.706.706 0 0 1 .393.918c-.546 1.365-1.847 1.758-3.058 1.934-.486.071-1.014.114-1.536.157l-.42.035c-.67.058-1.333.129-1.976.266-1.496.321-2.383.935-2.944 1.6-.57.676-.85 1.46-1.036 2.203a.706.706 0 1 1-1.37-.343c.207-.829.554-1.855 1.327-2.771.784-.929 1.96-1.69 3.728-2.069.732-.157 1.469-.234 2.15-.292.154-.014.305-.026.452-.038.515-.042.984-.081 1.421-.145 1.146-.167 1.711-.462 1.951-1.061a.706.706 0 0 1 .918-.393Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.306 16.773c0-.39.317-.705.706-.705h1.731a.706.706 0 0 1 0 1.411h-1.73a.706.706 0 0 1-.707-.706Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.02 16.773c0-.39.316-.705.706-.705h1.731a.706.706 0 0 1 0 1.411h-1.731a.706.706 0 0 1-.706-.706ZM11.306 19.523c0-.39.317-.706.706-.706h1.731a.706.706 0 0 1 0 1.412h-1.73a.706.706 0 0 1-.707-.706Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.02 19.523c0-.39.316-.706.706-.706h1.731a.706.706 0 0 1 0 1.412h-1.731a.706.706 0 0 1-.706-.706Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--cabin": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.751 23.999a.75.75 0 0 1 0-1.5h.75v-5.625l-.3.225a.753.753 0 0 1-1.05-.15.75.75 0 0 1 .15-1.05l6-4.5a.745.745 0 0 1 .9 0l6 4.5a.75.75 0 0 1-.899 1.2l-.301-.225v5.625h6v-1.577a3.743 3.743 0 0 1-3-3.673c0-4.618 2.953-10.584 3.079-10.835a.746.746 0 0 1 .671-.415c.286 0 .543.159.671.415.126.252 3.079 6.217 3.079 10.835a3.743 3.743 0 0 1-3 3.673v1.577h3.75a.75.75 0 0 1 0 1.5h-22.5Zm9.75-1.5v-6.75l-3.75-2.812-3.75 2.812v6.75h1.5v-2.25a2.252 2.252 0 0 1 2.25-2.25 2.252 2.252 0 0 1 2.25 2.25v2.25h1.5Zm-3 0v-2.25a.75.75 0 0 0-1.5 0v2.25h1.5Zm11.25-13.936c-.869 2.037-2.25 5.737-2.25 8.686a2.252 2.252 0 0 0 2.25 2.25 2.252 2.252 0 0 0 2.25-2.25c0-2.951-1.381-6.65-2.25-8.686ZM4.743 7.5A3.756 3.756 0 0 1 1.137 4.76 3.75 3.75 0 0 1 4.75.008c.638 0 1.272.167 1.834.484.565.32 1.03.768 1.36 1.312.409-.2.858-.305 1.317-.305a3.007 3.007 0 0 1 3 3.012 3.006 3.006 0 0 1-3 2.988H4.743Zm.005-5.992a2.247 2.247 0 0 0-2.167 2.849A2.252 2.252 0 0 0 4.743 6h4.515a1.504 1.504 0 0 0 1.5-1.494 1.487 1.487 0 0 0-.435-1.062A1.485 1.485 0 0 0 9.266 3c-.419 0-.811.17-1.093.467a.758.758 0 0 1-.725.211.752.752 0 0 1-.542-.527 2.228 2.228 0 0 0-1.06-1.352 2.242 2.242 0 0 0-1.098-.29Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cable": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.99 4.771a.04.04 0 0 0-.037.025.04.04 0 0 0-.003.015V6.203a3.41 3.41 0 0 0 2.889 3.447h.361a3.25 3.25 0 0 0 3.25-3.25V4.821a.05.05 0 0 0-.05-.05h-6.41Zm.014-1.5a1.54 1.54 0 0 0-1.554 1.555v1.353a4.91 4.91 0 0 0 4.23 4.964.747.747 0 0 0 .104.007h.416a4.75 4.75 0 0 0 4.75-4.75V4.821a1.55 1.55 0 0 0-1.55-1.55h-6.396Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.8.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM19.6.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM17.2 9.65a.75.75 0 0 1 .75.75V16a7.95 7.95 0 0 1-15.9.005c-.02-1.479.274-2.946.862-4.303a.75.75 0 0 1 1.376.596 8.967 8.967 0 0 0-.738 3.691V16a6.45 6.45 0 0 0 12.9 0v-5.6a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cables_connected": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.073 13.87a.04.04 0 0 0 .028.012.04.04 0 0 0 .028-.012l.007-.007.966-.966.012-.011a3.41 3.41 0 0 0 .394-4.48l-.255-.256a3.25 3.25 0 0 0-4.597 0L10.54 9.267a.05.05 0 0 0 0 .07l4.533 4.533Zm-1.071 1.05a1.538 1.538 0 0 0 2.198 0l.957-.956a4.91 4.91 0 0 0 .518-6.502.753.753 0 0 0-.068-.078l-.294-.294a4.75 4.75 0 0 0-6.717 0L9.479 8.206a1.55 1.55 0 0 0 0 2.192l4.523 4.522Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.498 10.366a.039.039 0 0 0-.028-.012.038.038 0 0 0-.028.012l-.007.008-.966.965-.012.012a3.41 3.41 0 0 0-.394 4.48l.255.255a3.25 3.25 0 0 0 4.597 0l1.116-1.116a.05.05 0 0 0 0-.071l-4.533-4.533Zm1.071-1.05a1.54 1.54 0 0 0-2.198 0l-.957.957a4.91 4.91 0 0 0-.519 6.501c.021.028.044.054.068.078l.295.295a4.75 4.75 0 0 0 6.717 0l1.116-1.117a1.55 1.55 0 0 0 0-2.192L10.57 9.316ZM20.099 0l-.044.255c-.646 3.49-2.737 6.165-4.014 7.152l.918 1.186c1.555-1.201 3.854-4.197 4.57-8.065.033-.175.062-.35.087-.528H20.1Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.65 15.336c-1.766.93-4.295 3.495-5.405 7.172-.145.48-.266.978-.357 1.492h1.526c.074-.364.164-.717.267-1.058.998-3.306 3.268-5.541 4.668-6.278l-.698-1.328Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cables_connected-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.073 13.87a.04.04 0 0 0 .028.012.04.04 0 0 0 .028-.012l.007-.007.966-.966.012-.011a3.41 3.41 0 0 0 .394-4.48l-.255-.256a3.25 3.25 0 0 0-4.597 0L10.54 9.267a.05.05 0 0 0 0 .07l4.533 4.533Zm-1.071 1.05a1.538 1.538 0 0 0 2.198 0l.957-.956a4.91 4.91 0 0 0 .518-6.502.753.753 0 0 0-.068-.078l-.294-.294a4.75 4.75 0 0 0-6.717 0L9.479 8.206a1.55 1.55 0 0 0 0 2.192l4.523 4.522Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.498 10.366a.039.039 0 0 0-.028-.012.038.038 0 0 0-.028.012l-.007.008-.966.965-.012.012a3.41 3.41 0 0 0-.394 4.48l.255.255a3.25 3.25 0 0 0 4.597 0l1.116-1.116a.05.05 0 0 0 0-.071l-4.533-4.533Zm1.071-1.05a1.54 1.54 0 0 0-2.198 0l-.957.957a4.91 4.91 0 0 0-.519 6.501c.021.028.044.054.068.078l.295.295a4.75 4.75 0 0 0 6.717 0l1.116-1.117a1.55 1.55 0 0 0 0-2.192L10.57 9.316ZM20.099 0l-.044.255c-.646 3.49-2.737 6.165-4.014 7.152l.918 1.186c1.555-1.201 3.854-4.197 4.57-8.065.033-.175.062-.35.087-.528H20.1Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.65 15.336c-1.766.93-4.295 3.495-5.405 7.172-.145.48-.266.978-.357 1.492h1.526c.074-.364.164-.717.267-1.058.998-3.306 3.268-5.541 4.668-6.278l-.698-1.328Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.78 8.871a.75.75 0 0 1 .919-.53l1.634.236a.75.75 0 0 1-.388 1.449L4.31 9.79a.75.75 0 0 1-.53-.919ZM9.871 2.78a.75.75 0 0 0-.53.919l.236 1.634a.75.75 0 0 0 1.449-.388L10.79 3.31a.75.75 0 0 0-.919-.53ZM5.548 4.31a.75.75 0 0 1 1.061 0L8.18 5.88a.75.75 0 1 1-1.06 1.06l-1.572-1.57a.75.75 0 0 1 0-1.061ZM15.451 20.542a.75.75 0 0 0 .53-.919l-.236-1.634a.75.75 0 1 0-1.448.389l.236 1.634a.75.75 0 0 0 .918.53ZM21.542 14.451a.75.75 0 0 1-.919.53l-1.634-.235a.75.75 0 0 1 .389-1.45l1.634.237a.75.75 0 0 1 .53.918ZM20.013 18.774a.75.75 0 0 0 0-1.06l-1.571-1.572a.75.75 0 0 0-1.061 1.061l1.571 1.571a.75.75 0 0 0 1.06 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--cables_connecting-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.073 11.87a.04.04 0 0 0 .028.012.04.04 0 0 0 .028-.012l.007-.007.966-.966.012-.011a3.41 3.41 0 0 0 .394-4.48l-.255-.256a3.25 3.25 0 0 0-4.597 0L12.54 7.267a.05.05 0 0 0 0 .07l4.533 4.533Zm-1.071 1.05a1.538 1.538 0 0 0 2.198 0l.957-.956a4.91 4.91 0 0 0 .518-6.502.753.753 0 0 0-.068-.078l-.294-.294a4.75 4.75 0 0 0-6.717 0l-1.117 1.116a1.55 1.55 0 0 0 0 2.192l4.523 4.522Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.126 10.449a.75.75 0 0 1 0 1.06l-1.572 1.572a.75.75 0 0 1-1.06-1.061l1.57-1.571a.75.75 0 0 1 1.062 0ZM13.954 13.277a.75.75 0 0 1 0 1.061l-1.568 1.568a.75.75 0 0 1-1.06-1.06l1.567-1.569a.75.75 0 0 1 1.061 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.498 12.366a.039.039 0 0 0-.028-.012.038.038 0 0 0-.028.012l-.007.008-.966.965-.012.012a3.41 3.41 0 0 0-.394 4.48l.255.255a3.25 3.25 0 0 0 4.597 0l1.116-1.116a.05.05 0 0 0 0-.071l-4.533-4.533Zm1.07-1.05a1.538 1.538 0 0 0-2.197 0l-.957.957a4.91 4.91 0 0 0-.519 6.501c.021.028.044.054.068.078l.295.295a4.75 4.75 0 0 0 6.717 0l1.116-1.117a1.55 1.55 0 0 0 0-2.192L8.57 11.316ZM21.288 0c-.279 2.32-1.521 3.995-2.641 4.86l.917 1.188C20.995 4.942 22.51 2.853 22.797 0h-1.51Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.65 17.336c-1.759.927-3.824 3.006-4.425 6.253-.025.135-.047.272-.067.411h1.518l.024-.138c.507-2.737 2.242-4.458 3.65-5.198l-.7-1.328Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cables_disconnected": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.073 11.87a.04.04 0 0 0 .028.012.04.04 0 0 0 .028-.012l.007-.007.966-.966.012-.011a3.41 3.41 0 0 0 .394-4.48l-.255-.256a3.25 3.25 0 0 0-4.597 0L12.54 7.267a.05.05 0 0 0 0 .07l4.533 4.533Zm-1.071 1.05a1.538 1.538 0 0 0 2.198 0l.957-.956a4.91 4.91 0 0 0 .518-6.502.753.753 0 0 0-.068-.078l-.294-.294a4.75 4.75 0 0 0-6.717 0l-1.117 1.116a1.55 1.55 0 0 0 0 2.192l4.523 4.522ZM11.126 10.449a.75.75 0 0 1 0 1.06l-1.572 1.572a.75.75 0 0 1-1.06-1.061l1.57-1.571a.75.75 0 0 1 1.062 0ZM13.954 13.277a.75.75 0 0 1 0 1.061l-1.568 1.568a.75.75 0 0 1-1.06-1.06l1.567-1.569a.75.75 0 0 1 1.061 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.498 12.366a.039.039 0 0 0-.028-.012.038.038 0 0 0-.028.012l-.007.008-.966.965-.012.012a3.41 3.41 0 0 0-.394 4.48l.255.255a3.25 3.25 0 0 0 4.597 0l1.116-1.116a.05.05 0 0 0 0-.071l-4.533-4.533Zm1.07-1.05a1.538 1.538 0 0 0-2.197 0l-.957.957a4.91 4.91 0 0 0-.519 6.501c.021.028.044.054.068.078l.295.295a4.75 4.75 0 0 0 6.717 0l1.116-1.117a1.55 1.55 0 0 0 0-2.192L8.57 11.316ZM21.288 0c-.279 2.32-1.521 3.995-2.641 4.86l.917 1.188C20.995 4.942 22.51 2.853 22.797 0h-1.51Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.65 17.336c-1.759.927-3.824 3.006-4.425 6.253-.025.135-.047.272-.067.411h1.518l.024-.138c.507-2.737 2.242-4.457 3.65-5.198l-.7-1.328Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cables_disconnected-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.073 11.87a.04.04 0 0 0 .028.012.04.04 0 0 0 .028-.012l.007-.007.966-.966.012-.011a3.41 3.41 0 0 0 .394-4.48l-.255-.256a3.25 3.25 0 0 0-4.597 0L12.54 7.267a.05.05 0 0 0 0 .07l4.533 4.533Zm-1.071 1.05a1.538 1.538 0 0 0 2.198 0l.957-.956a4.91 4.91 0 0 0 .518-6.502.753.753 0 0 0-.068-.078l-.294-.294a4.75 4.75 0 0 0-6.717 0l-1.117 1.116a1.55 1.55 0 0 0 0 2.192l4.523 4.522ZM11.126 10.449a.75.75 0 0 1 0 1.06l-1.572 1.572a.75.75 0 0 1-1.06-1.061l1.57-1.571a.75.75 0 0 1 1.062 0ZM13.954 13.277a.75.75 0 0 1 0 1.061l-1.568 1.568a.75.75 0 0 1-1.06-1.06l1.567-1.569a.75.75 0 0 1 1.061 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.498 12.366a.039.039 0 0 0-.028-.012.038.038 0 0 0-.028.012l-.007.008-.966.965-.012.012a3.41 3.41 0 0 0-.394 4.48l.255.255a3.25 3.25 0 0 0 4.597 0l1.116-1.116a.05.05 0 0 0 0-.071l-4.533-4.533Zm1.07-1.05a1.538 1.538 0 0 0-2.197 0l-.957.957a4.91 4.91 0 0 0-.519 6.501c.021.028.044.054.068.078l.295.295a4.75 4.75 0 0 0 6.717 0l1.116-1.117a1.55 1.55 0 0 0 0-2.192L8.57 11.316ZM21.288 0c-.279 2.32-1.521 3.995-2.641 4.86l.917 1.188C20.995 4.942 22.51 2.853 22.797 0h-1.51Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.65 17.336c-1.759.927-3.824 3.006-4.425 6.253-.025.135-.047.272-.067.411h1.518l.024-.138c.507-2.737 2.242-4.458 3.65-5.198l-.7-1.328Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.78 8.871a.75.75 0 0 1 .919-.53l1.634.236a.75.75 0 0 1-.388 1.449L4.31 9.79a.75.75 0 0 1-.53-.919ZM9.871 2.78a.75.75 0 0 0-.53.919l.236 1.634a.75.75 0 0 0 1.449-.388L10.79 3.31a.75.75 0 0 0-.919-.53ZM5.548 4.31a.75.75 0 0 1 1.061 0L8.18 5.88a.75.75 0 1 1-1.06 1.06l-1.572-1.57a.75.75 0 0 1 0-1.061ZM15.451 20.542a.75.75 0 0 0 .53-.919l-.236-1.634a.75.75 0 1 0-1.448.389l.236 1.634a.75.75 0 0 0 .918.53ZM21.542 14.451a.75.75 0 0 1-.919.53l-1.634-.235a.75.75 0 0 1 .389-1.45l1.634.237a.75.75 0 0 1 .53.918ZM20.013 18.774a.75.75 0 0 0 0-1.06l-1.571-1.572a.75.75 0 0 0-1.061 1.061l1.571 1.571a.75.75 0 0 0 1.06 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--calendar": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="19.5" width="6" height="1.5" rx=".75" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M2.25 24A2.252 2.252 0 0 1 0 21.75V5.25A2.252 2.252 0 0 1 2.25 3H6V.75a.75.75 0 0 1 1.5 0V3h9V.75a.75.75 0 0 1 1.5 0V3h3.75A2.252 2.252 0 0 1 24 5.25v16.5A2.252 2.252 0 0 1 21.75 24H2.25Zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V10.5h-21v11.25ZM22.5 9V5.25a.75.75 0 0 0-.75-.75H18V6a.75.75 0 0 1-1.5 0V4.5h-9V6A.75.75 0 0 1 6 6V4.5H2.25a.75.75 0 0 0-.75.75V9h21Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--calendar_clock-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 18.02A2.253 2.253 0 0 1 0 15.769V3.754a2.253 2.253 0 0 1 2.25-2.252H4.5V.75a.75.75 0 1 1 1.5 0v.75h6v-.75a.75.75 0 1 1 1.5 0v.75h2.25c1.241 0 2.25 1.01 2.25 2.253V8.26a.75.75 0 1 1-1.5 0v-.75h-15v8.26c0 .414.336.75.75.75h6a.75.75 0 0 1 0 1.502h-6ZM16.5 6.008V3.754a.75.75 0 0 0-.75-.75H13.5v.75a.75.75 0 1 1-1.5 0v-.75H6v.75a.75.75 0 1 1-1.5 0v-.75H2.25a.75.75 0 0 0-.75.75v2.253h15Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M17.25 24.028c-3.722 0-6.75-3.032-6.75-6.758s3.028-6.758 6.75-6.758S24 13.544 24 17.27s-3.028 6.758-6.75 6.758Zm0-12.014A5.259 5.259 0 0 0 12 17.27a5.259 5.259 0 0 0 5.25 5.256 5.259 5.259 0 0 0 5.25-5.256 5.259 5.259 0 0 0-5.25-5.256Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M17.25 18.02a.75.75 0 0 1-.75-.75v-2.654a.75.75 0 1 1 1.5 0v1.903h1.902a.75.75 0 0 1 0 1.502H17.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M3 14.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--calendar-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 24A2.252 2.252 0 0 1 0 21.75V5.25A2.252 2.252 0 0 1 2.25 3H6V.75a.75.75 0 0 1 1.5 0V3h9V.75a.75.75 0 0 1 1.5 0V3h3.75A2.252 2.252 0 0 1 24 5.25v16.5A2.252 2.252 0 0 1 21.75 24H2.25Zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V10.5h-21v11.25ZM22.5 9V5.25a.75.75 0 0 0-.75-.75H18V6a.75.75 0 0 1-1.5 0V4.5h-9V6A.75.75 0 0 1 6 6V4.5H2.25a.75.75 0 0 0-.75.75V9h21Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><rect x="3" y="19.5" width="6" height="1.5" rx=".75" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--call": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.035 24a6.295 6.295 0 0 1-3.411-1.01A50.474 50.474 0 0 1 1.004 9.375C-.6 6.85-.253 3.629 1.845 1.53L2.62.758A2.58 2.58 0 0 1 4.454 0c.694 0 1.345.269 1.834.758L9.55 4.022a2.595 2.595 0 0 1-.002 3.665 1.097 1.097 0 0 0 0 1.549l5.233 5.23c.193.192.468.306.76.306s.567-.114.773-.32a2.58 2.58 0 0 1 1.835-.758 2.58 2.58 0 0 1 1.835.757l3.26 3.259a2.596 2.596 0 0 1 0 3.667l-.773.774A6.241 6.241 0 0 1 18.035 24Zm-2.581-2.259c.798.5 1.683.757 2.583.757 1.267 0 2.464-.5 3.372-1.408l.774-.773a1.098 1.098 0 0 0 0-1.549l-3.26-3.257a1.087 1.087 0 0 0-.774-.319c-.293 0-.568.114-.774.32a2.578 2.578 0 0 1-1.834.758 2.57 2.57 0 0 1-1.824-.75l-5.228-5.226a2.596 2.596 0 0 1 0-3.667 1.096 1.096 0 0 0 0-1.544l-.026-.028-3.236-3.238a1.09 1.09 0 0 0-.773-.318c-.293 0-.568.114-.775.32l-.774.773a4.752 4.752 0 0 0-.653 5.948 48.957 48.957 0 0 0 13.202 13.201Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--car-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.534 4.98A2.24 2.24 0 0 1 8.92 4.5h12.83A2.25 2.25 0 0 1 24 6.75v8.85a2.25 2.25 0 0 1-2.25 2.25h-.25a.75.75 0 0 1 0-1.5h.25a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75H9.559c-.167 0-.786-.051-.952.115-.167.167-.473.624-.473.624l-2.37 3.61a.75.75 0 0 1-.287.3L1.82 12.193a.75.75 0 0 0-.32.615v2.941a.75.75 0 0 0 .75.75h3.13a.75.75 0 0 1 0 1.5H2.25A2.25 2.25 0 0 1 0 15.75v-2.94c0-.372.092-.737.267-1.064.14-.342.576-.7.776-.835l3.493-1.45 2.231-3.346.064-.13c.202-.406.369-.743.703-1.006Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.75 15.85a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-3 1.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM18.5 15.85a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-3 1.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.25 17a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 9.25a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--car_charger-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m11.01 0 11.672.31a1.131 1.131 0 0 1 1.103 1.114L24 16.992l-2.031 2.186a1.13 1.13 0 0 1-.79.322H8.006a1 1 0 0 1-1-1.007l.06-8.48c.458-.206.91-.415 1.262-.598l-.058 8.429 2.133-1.5V1.32l-2.02.199-.03 4.246c-.33.073-.768.174-1.26.298l.032-4.666A1.13 1.13 0 0 1 8.148.282L11.01 0Zm.653 1.273v14.832h11.066l-.201-14.543-10.865-.29ZM22.25 17.36H11.18l-1.18.885h11.277l.973-.885Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.684 8.027v-1.75c-.997.226-2.324.556-3.568.955-.861.277-1.639.572-2.226.872-.294.15-.509.284-.653.397a.97.97 0 0 0-.142.13c-.119.252-.246.68-.359 1.284-.112.6-.197 1.296-.259 2.018a46.971 46.971 0 0 0-.15 2.97h.815l1.21-3.533c.04-.113.182-.523.607-.807.232-.155.73-.411 1.216-.66l.45-.23c.423-.216.884-.451 1.337-.688a30.782 30.782 0 0 0 1.722-.958ZM10 8.614V5.29a.514.514 0 0 0-.618-.51C7.46 5.18 1.674 6.5.924 8.032.12 9.671.014 13.941 0 15.694a.52.52 0 0 0 .524.523h.627c-.18 1.166-.238 2.93.186 4.477.427 1.56 1.416 3.096 3.463 3.303.357.036.677-.211.715-.552a.628.628 0 0 0-.578-.682c-1.25-.126-1.972-1.029-2.342-2.382-.37-1.349-.32-2.952-.153-4.016.008-.05.009-.1.005-.148h.26a.525.525 0 0 0 .498-.355l1.393-4.067a.259.259 0 0 1 .092-.14c.192-.127.795-.435 1.528-.81C7.803 10.038 10 8.916 10 8.616Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="m14.49 8.203-.412.614a.9.9 0 0 0-.141.915.789.789 0 0 0 .583.428l1.202.19a.096.096 0 0 1 .085.111l-.618 4.224a.272.272 0 0 0 .166.297.277.277 0 0 0 .322-.096L18.56 11l1.391-1.801a.975.975 0 0 0 .16-.387.879.879 0 0 0 0-.413.805.805 0 0 0-.21-.357.643.643 0 0 0-.367-.186l-1.222-.196a.08.08 0 0 1-.07-.09c.09-.553.643-4.073.638-4.325-.005-.251-.392-.347-.568-.105L15.81 6.5l-1.32 1.703Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--chainsaw": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.666.587a.751.751 0 0 0-1.467.329l.42 1.878A4.51 4.51 0 0 0 2.8 4.59L.958 4.064A.751.751 0 1 0 .546 5.51l1.756.5a4.507 4.507 0 0 0 .742 3.332l-1.017.936a.751.751 0 1 0 1.018 1.106l1.023-.94 2.358 2.255-1.172 1.079a.751.751 0 1 0 1.019 1.105l1.242-1.143 1.901 1.819-.5.46c-1.359 1.252-1.419 3.335-.13 4.523l3.08 2.686c1.362 1.255 3.594.938 4.696-.667l.478-.697 4.834.176a.75.75 0 0 0 .739-.411l1.306-2.543a.75.75 0 0 0-.335-1.007l-2.886-1.544 1.331-1.94c.77-1.12.758-2.569-.03-3.595l-1.344-1.353c-1.073-1.4-3.17-1.52-4.536-.26L16 9.494 13.918 7.47l1.19-1.094A.751.751 0 1 0 14.09 5.27L12.838 6.42 10.7 4.344l.95-.875a.751.751 0 1 0-1.017-1.106l-1.012.931a4.51 4.51 0 0 0-3.57-.98L5.667.587Zm14.176 17.195-1.794 2.613 3.452.105.742-1.414-2.4-1.304ZM9.052 4.838a3.007 3.007 0 1 0-4.451 4.036l5.91 5.649 4.371-4.021L9.11 4.893a.762.762 0 0 1-.056-.055Zm6.988 11.645a.751.751 0 1 0-1.063-1.063l-2.757 2.755a.751.751 0 1 0 1.063 1.063l2.757-2.755Zm1.098-5.991-7.203 6.633c-.68.625-.71 1.667-.065 2.261l3.08 2.686c.68.628 1.797.47 2.348-.333l5.467-7.966c.385-.56.38-1.285-.014-1.798l-1.346-1.353c-.536-.7-1.584-.76-2.267-.13Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--chat": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 19.716v-7.934c0-5.694-4.701-10.31-10.5-10.31-5.781 0-10.5 4.707-10.5 10.418 0 5.832 4.818 10.637 10.722 10.637h7.414c.654 0 1.076 0 1.4-.02.311-.019.431-.052.488-.073.408-.149.73-.464.881-.865.022-.056.055-.173.074-.48.02-.317.021-.731.021-1.373ZM12 0C5.373 0 0 5.383 0 11.89 0 18.517 5.472 24 12.222 24h7.414c1.27 0 1.905 0 2.412-.186a2.973 2.973 0 0 0 1.763-1.73c.189-.498.189-1.121.189-2.368v-7.934C24 5.275 18.627 0 12 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.55 10.582c.835 0 1.51.66 1.51 1.473 0 .813-.675 1.473-1.51 1.473-.833 0-1.51-.66-1.51-1.473 0-.813.677-1.473 1.51-1.473ZM12.081 10.582c.834 0 1.51.66 1.51 1.473 0 .813-.676 1.473-1.51 1.473s-1.51-.66-1.51-1.473c0-.813.676-1.473 1.51-1.473ZM16.611 10.582c.834 0 1.51.66 1.51 1.473 0 .813-.675 1.473-1.51 1.473-.834 0-1.51-.66-1.51-1.473 0-.813.676-1.473 1.51-1.473Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--charging_battery": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.938 6.537c.6-.6 1.414-.937 2.263-.937H17.6a3.2 3.2 0 0 1 3.2 3.2h.8a2.4 2.4 0 0 1 2.4 2.4v1.6a2.4 2.4 0 0 1-2.4 2.4h-.8a3.2 3.2 0 0 1-3.2 3.2H3.2A3.2 3.2 0 0 1 0 15.2V8.8c0-.849.338-1.663.938-2.263Zm2.263.663A1.601 1.601 0 0 0 1.6 8.8v6.4a1.6 1.6 0 0 0 1.6 1.6h14.4a1.6 1.6 0 0 0 1.6-1.6v-.8a.8.8 0 0 1 .8-.8h1.6a.8.8 0 0 0 .8-.8v-1.6a.8.8 0 0 0-.8-.8H20a.8.8 0 0 1-.8-.8v-.8a1.6 1.6 0 0 0-1.6-1.6H3.201Zm2.4 1.6a.8.8 0 0 1 .8.8v4.8a.8.8 0 1 1-1.6 0V9.6a.8.8 0 0 1 .8-.8Zm5.6.8a.8.8 0 1 0-1.6 0v4.8a.8.8 0 1 0 1.6 0V9.6Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--charge": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.72a.75.75 0 0 1 .75.75v10.78a.75.75 0 0 0 .75.75h7.52a.75.75 0 0 1 0 1.5H5.25A2.25 2.25 0 0 1 3 17.25V6.47a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.036.177a.75.75 0 0 1 .968 0l8.88 7.5a.75.75 0 1 1-.968 1.146L10.52 1.732 1.234 9.573a.75.75 0 0 1-.968-1.146l9.77-8.25ZM17.25 12a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-4.5Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 24 12.75v9A2.25 2.25 0 0 1 21.75 24h-4.5A2.25 2.25 0 0 1 15 21.75v-9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 20.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM10.52 6.75a.75.75 0 0 1 .75.75V10a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.93 8.33a.75.75 0 0 1 0 1.06 2.25 2.25 0 1 0 3.18 0 .75.75 0 1 1 1.06-1.06 3.75 3.75 0 1 1-5.3 0 .75.75 0 0 1 1.06 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--charging_battery-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.938 6.537c.6-.6 1.414-.937 2.263-.937H17.6a3.2 3.2 0 0 1 3.2 3.2h.8a2.4 2.4 0 0 1 2.4 2.4v1.6a2.4 2.4 0 0 1-2.4 2.4h-.8a3.2 3.2 0 0 1-3.2 3.2H3.2A3.2 3.2 0 0 1 0 15.2V8.8c0-.849.338-1.663.938-2.263Zm2.263.663A1.601 1.601 0 0 0 1.6 8.8v6.4a1.6 1.6 0 0 0 1.6 1.6h14.4a1.6 1.6 0 0 0 1.6-1.6v-.8a.8.8 0 0 1 .8-.8h1.6a.8.8 0 0 0 .8-.8v-1.6a.8.8 0 0 0-.8-.8H20a.8.8 0 0 1-.8-.8v-.8a1.6 1.6 0 0 0-1.6-1.6H3.201Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.601 8.8a.8.8 0 0 1 .8.8v4.8a.8.8 0 1 1-1.6 0V9.6a.8.8 0 0 1 .8-.8ZM10.401 8.8a.8.8 0 0 1 .8.8v4.8a.8.8 0 1 1-1.6 0V9.6a.8.8 0 0 1 .8-.8Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--check": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.468.225c.562.393.699 1.168.305 1.73L9.346 22.566l-.001.002a3.347 3.347 0 0 1-5.427.09v-.002l-3.67-4.89a1.243 1.243 0 0 1 1.99-1.492l3.672 4.895a.86.86 0 0 0 1.395-.023l.002-.003L21.737.53a1.243 1.243 0 0 1 1.73-.305Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--check-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.468.225c.562.393.699 1.168.305 1.73L9.346 22.566l-.001.002a3.347 3.347 0 0 1-5.427.09v-.002l-3.67-4.89a1.243 1.243 0 0 1 1.99-1.492l3.672 4.895a.86.86 0 0 0 1.395-.023l.002-.003L21.737.53a1.243 1.243 0 0 1 1.73-.305Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--check_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.591 11.31a.75.75 0 0 0-1.06 1.06l3.535 3.53a.75.75 0 0 0 1.06 0l7.072-7.062a.749.749 0 1 0-1.061-1.06l-6.54 6.534L7.59 11.31Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--check_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.53 11.31a.75.75 0 0 1 1.061 0l3.005 3.002 6.54-6.534a.75.75 0 0 1 1.062 1.06L11.126 15.9a.75.75 0 0 1-1.06 0L6.53 12.369a.749.749 0 0 1 0-1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--check_circle-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.47 11.309a.75.75 0 0 1 1.06 0l3.006 3.002 6.54-6.534a.75.75 0 0 1 1.06 1.06l-7.07 7.063a.75.75 0 0 1-1.06 0L6.47 12.368a.748.748 0 0 1 0-1.06Z" fill="var(--e-color-icon-filled-foreground-1, var(--e-color-icon-filled-foreground-1, #FFFFFF))"/></svg>', "e-icon--check_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.47 11.309a.75.75 0 0 1 1.06 0l3.006 3.002 6.54-6.534a.75.75 0 0 1 1.06 1.06l-7.07 7.063a.75.75 0 0 1-1.06 0L6.47 12.368a.748.748 0 0 1 0-1.06Z" fill="#000"/></svg>', "e-icon--check_shield": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3-.001a2.25 2.25 0 0 0-2.25 2.25v9c0 1.387.519 2.759 1.274 4.028.758 1.273 1.784 2.492 2.867 3.588 2.166 2.19 4.635 3.959 5.893 4.773a2.228 2.228 0 0 0 2.43 0c1.258-.813 3.729-2.583 5.895-4.773 1.083-1.096 2.109-2.315 2.867-3.588.755-1.27 1.274-2.64 1.274-4.028v-9A2.25 2.25 0 0 0 21-.001H3Zm-.53 1.72a.75.75 0 0 1 .53-.22h18a.75.75 0 0 1 .75.75v9c0 1.02-.385 2.122-1.063 3.26-.675 1.135-1.612 2.257-2.645 3.3-2.065 2.09-4.441 3.793-5.642 4.57l-.003.002a.726.726 0 0 1-.794 0l-.003-.002c-1.2-.777-3.577-2.48-5.642-4.57-1.033-1.043-1.97-2.165-2.645-3.3-.678-1.138-1.063-2.24-1.063-3.26v-9a.75.75 0 0 1 .22-.53Zm16.868 3.404a.75.75 0 0 0-1.177-.93l-7.843 9.927-.008.01a.301.301 0 0 1-.487-.014l-.01-.014-2.45-3.48a.75.75 0 0 0-1.226.863l2.446 3.475a1.8 1.8 0 0 0 2.916.085l7.84-9.922Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--checklist-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 12a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm-6.75 5.25a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 10.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75ZM4.5 14.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 1.5a3 3 0 0 0-3 3 .75.75 0 0 1-.75.75H2.25A.75.75 0 0 0 1.5 6v12.75a.75.75 0 0 0 .75.75h5.5a.75.75 0 0 1 0 1.5h-5.5A2.25 2.25 0 0 1 0 18.75V6a2.25 2.25 0 0 1 2.25-2.25h2.063a4.5 4.5 0 0 1 8.874 0h2.563A2.25 2.25 0 0 1 18 6v2.25a.75.75 0 0 1-1.5 0V6a.75.75 0 0 0-.75-.75H12.5a.75.75 0 0 1-.75-.75 3 3 0 0 0-3-3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 3a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M19.034 15.025a.81.81 0 0 1 .652-.336c.176 0 .346.058.488.168a.863.863 0 0 1 .162 1.182l-3.133 4.314a.808.808 0 0 1-.593.334h-.002a.793.793 0 0 1-.63-.245l-2.238-2.31a.851.851 0 0 1-.24-.597c0-.225.085-.438.24-.597a.793.793 0 0 1 1.15 0l1.574 1.625 2.57-3.537Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cleaning_vacuum": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M15.08 19.915a.75.75 0 0 1 .67-.415h6a.75.75 0 0 1 .67.415l1.5 3A.75.75 0 0 1 23.25 24h-9a.75.75 0 0 1-.67-1.085l1.5-3ZM16.212 21l-.75 1.5h6.574l-.75-1.5h-5.073ZM3.24 10.9a5.25 5.25 0 0 1 7.26 4.85v6A2.25 2.25 0 0 1 8.25 24h-6A2.25 2.25 0 0 1 0 21.75v-6a5.25 5.25 0 0 1 3.24-4.85ZM5.25 12a3.75 3.75 0 0 0-3.75 3.75v6a.75.75 0 0 0 .75.75h6a.75.75 0 0 0 .75-.75v-6A3.75 3.75 0 0 0 5.25 12Z"/><path d="M17.25 1.5a.75.75 0 0 0-.75.75v12a2.25 2.25 0 0 1-4.5 0V7.5a3 3 0 0 0-6 0v3.75a.75.75 0 0 1-1.5 0V7.5a4.5 4.5 0 0 1 9 0v6.75a.75.75 0 1 0 1.5 0v-12a2.25 2.25 0 0 1 4.5 0v18a.75.75 0 0 1-1.5 0v-18a.75.75 0 0 0-.75-.75ZM0 20.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75ZM5.25 16.125a.375.375 0 1 0 0-.75v-.75a1.125 1.125 0 1 0 0 2.25v-.75Z"/><path d="M5.25 14.625a1.125 1.125 0 1 1 0 2.25v-.75a.375.375 0 1 1 0-.75v-.75Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--clock": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0 6.616 5.383 12 12 12 6.616 0 12-5.384 12-12 0-6.617-5.384-12-12-12C5.383 0 0 5.383 0 12Zm1.6 0C1.6 6.266 6.266 1.6 12 1.6S22.4 6.266 22.4 12 17.734 22.4 12 22.4 1.6 17.734 1.6 12Zm14.834 5.566a.802.802 0 0 0 1.132-1.132L12.8 11.668V8a.8.8 0 0 0-1.6 0v4c0 .094.016.186.05.277l.01.027c.04.1.099.187.174.261l5 5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--close": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.636 2.122A1.243 1.243 0 1 0 21.878.364L12 10.242 2.122.364A1.243 1.243 0 0 0 .364 2.122L10.242 12 .364 21.878a1.243 1.243 0 1 0 1.758 1.758L12 13.758l9.878 9.878a1.243 1.243 0 1 0 1.758-1.758L13.758 12l9.878-9.878Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--close-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.636 2.122A1.243 1.243 0 1 0 21.878.364L12 10.242 2.122.364A1.243 1.243 0 0 0 .364 2.122L10.242 12 .364 21.878a1.243 1.243 0 1 0 1.758 1.758L12 13.758l9.878 9.878a1.243 1.243 0 1 0 1.758-1.758L13.758 12l9.878-9.878Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--close_menu": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.5a.75.75 0 0 1 1.5 0v21a.75.75 0 0 1-1.5 0v-21ZM9.53 7.72a.75.75 0 0 0-1.06 0l-3.75 3.75a.748.748 0 0 0 0 1.06l3.75 3.75a.75.75 0 0 0 1.06-1.06l-2.47-2.47h16.19a.75.75 0 0 0 0-1.5H7.06l2.47-2.47a.75.75 0 0 0 0-1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cloud_upload": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.288 17.036c-.407 0-.813-.305-.813-.712 0-.406.305-.813.813-.813h1.526s3.559-.509 3.559-4.068a4.08 4.08 0 0 0-4.068-4.068h-.203c-.305 0-.61-.203-.712-.406a6.565 6.565 0 0 0-3.458-3.153c-1.525-.508-3.152-.508-4.576.203C7.322 4.935 6 6.97 5.898 9.104c0 .204-.101.407-.305.61-.101.102-.305.204-.508.102-1.526-.305-3.051.712-3.458 2.237 0 .102-.025.204-.05.305-.026.102-.052.204-.052.305 0 .814.204 1.526.712 2.034.916.916 2.441.916 2.441.916H6.61c.407 0 .814.305.814.813 0 .407-.305.712-.814.712H4.678c-.102 0-2.136 0-3.458-1.322-.813-.814-1.22-1.83-1.22-3.05 0-.306 0-.611.102-.916.508-2.237 2.44-3.56 4.474-3.56.407-2.44 1.932-4.576 4.271-5.593 1.831-.813 3.865-.915 5.797-.305 1.729.61 3.153 1.83 4.068 3.458C21.66 5.952 24 8.494 24 11.443c0 3.966-3.254 5.39-5.085 5.593h-1.627Zm-6.101-3.762L9.559 14.9a.798.798 0 0 1-1.118 0 .798.798 0 0 1 0-1.119l3.05-3.05a.777.777 0 0 1 .51-.204c.203 0 .406 0 .711.203l3.05 3.051a.798.798 0 0 1 0 1.119.798.798 0 0 1-1.118 0l-1.83-1.83v8.745c0 .508-.306.814-.814.814a.802.802 0 0 1-.813-.814v-8.542Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--code": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.207 4.28a.75.75 0 0 1 .515.926l-4 14a.75.75 0 0 1-1.443-.412l4-14a.75.75 0 0 1 .928-.515ZM7.385 5.218a.75.75 0 0 1 .011 1.06L1.8 12l5.597 5.72a.75.75 0 1 1-1.072 1.05l-6.11-6.246a.75.75 0 0 1 0-1.049l6.11-6.245a.75.75 0 0 1 1.06-.012ZM16.615 5.218a.75.75 0 0 0-.011 1.06L22.2 12l-5.597 5.72a.75.75 0 1 0 1.072 1.05l6.11-6.246a.75.75 0 0 0 0-1.049l-6.11-6.245a.75.75 0 0 0-1.06-.012Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cog": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.747 12.004A5.259 5.259 0 0 0 12 17.258a5.259 5.259 0 0 0 5.252-5.254A5.259 5.259 0 0 0 12 6.75a5.259 5.259 0 0 0-5.253 5.254Zm1.501 0A3.756 3.756 0 0 1 12 8.251a3.756 3.756 0 0 1 3.751 3.753A3.756 3.756 0 0 1 12 15.757a3.756 3.756 0 0 1-3.752-3.753Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.331 23.296c.5.454 1.147.704 1.823.704a2.72 2.72 0 0 0 2.006-.884l.946-1.042a1.202 1.202 0 0 1 .896-.398c.344 0 .67.145.9.398l.944 1.044a2.704 2.704 0 0 0 2.12.878 2.69 2.69 0 0 0 1.879-.88 2.7 2.7 0 0 0 .708-1.954l-.07-1.4a1.195 1.195 0 0 1 .397-.96c.225-.205.504-.313.806-.313l.066.002 1.402.071.131.003a2.72 2.72 0 0 0 2.016-.892 2.69 2.69 0 0 0 .695-1.954 2.695 2.695 0 0 0-.89-1.875l-1.042-.941a1.2 1.2 0 0 1-.396-.959 1.2 1.2 0 0 1 .396-.837l1.042-.94c.605-.548.93-1.33.89-2.145a2.697 2.697 0 0 0-.888-1.875 2.695 2.695 0 0 0-1.954-.7l-1.4.072h-.057l-.058-.001h-.003a1.211 1.211 0 0 1-1.147-1.268l.071-1.401A2.707 2.707 0 0 0 15.716.003a2.69 2.69 0 0 0-1.872.888l-.95 1.042a1.187 1.187 0 0 1-.958.396 1.2 1.2 0 0 1-.836-.399L10.16.89A2.71 2.71 0 0 0 8.028.008a2.714 2.714 0 0 0-2.58 2.836l.067 1.407a1.21 1.21 0 0 1-1.208 1.272s-.042 0-.064-.002l-1.402-.071A2.709 2.709 0 0 0 .006 8.288a2.69 2.69 0 0 0 .885 1.875l1.043.946a1.208 1.208 0 0 1 0 1.797l-1.043.941a2.7 2.7 0 0 0-.887 2.15c.038.724.355 1.389.892 1.873a2.7 2.7 0 0 0 1.954.692l1.401-.07c.021-.003.042-.003.063-.003l.062.002a1.211 1.211 0 0 1 1.144 1.27l-.072 1.405a2.704 2.704 0 0 0 .883 2.13Zm-1.88-6.303a2.121 2.121 0 0 0-.137-.004l-.138.002h-.003l-1.401.071c-.021.002-.043.002-.064.002a1.205 1.205 0 0 1-1.206-1.145 1.203 1.203 0 0 1 .396-.959l1.041-.94a2.715 2.715 0 0 0 .002-4.024L1.9 9.05a1.203 1.203 0 0 1-.396-.837 1.21 1.21 0 0 1 1.263-1.265l1.4.07a2.71 2.71 0 0 0 2.847-2.846l-.067-1.4a1.211 1.211 0 0 1 1.15-1.266l.057-.001c.34 0 .666.144.894.394l.94 1.039a2.692 2.692 0 0 0 2.01.895 2.704 2.704 0 0 0 2.01-.893l.949-1.04a1.197 1.197 0 0 1 .905-.4c.3 0 .576.107.802.312a1.2 1.2 0 0 1 .398.959l-.071 1.402a2.712 2.712 0 0 0 2.839 2.843l1.4-.071h.002l.06-.002c.298 0 .585.11.809.313.24.217.38.514.396.837.018.365-.126.713-.396.957l-1.043.94a2.715 2.715 0 0 0 0 4.025l1.043.941a1.2 1.2 0 0 1 .397.837c.016.322-.094.632-.311.872a1.2 1.2 0 0 1-.89.4l-.069-.003-1.4-.07a2.698 2.698 0 0 0-1.955.695 2.69 2.69 0 0 0-.89 2.15l.072 1.395a1.211 1.211 0 0 1-1.153 1.263l-.049.001c-.344 0-.67-.142-.896-.39l-.942-1.041a2.718 2.718 0 0 0-2.012-.893 2.705 2.705 0 0 0-2.01.893l-.944 1.04a1.2 1.2 0 0 1-.896.396 1.206 1.206 0 0 1-1.206-1.26l.072-1.402a2.713 2.713 0 0 0-2.567-2.846Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cog-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.331 23.296c.5.454 1.147.704 1.823.704a2.72 2.72 0 0 0 2.006-.884l.946-1.042a1.202 1.202 0 0 1 .896-.398c.344 0 .67.145.9.398l.944 1.044a2.704 2.704 0 0 0 2.12.878 2.69 2.69 0 0 0 1.879-.88 2.7 2.7 0 0 0 .708-1.954l-.07-1.4a1.195 1.195 0 0 1 .397-.96c.225-.205.504-.313.806-.313l.066.002 1.402.071.131.003a2.72 2.72 0 0 0 2.016-.892 2.69 2.69 0 0 0 .695-1.954 2.695 2.695 0 0 0-.89-1.875l-1.042-.941a1.2 1.2 0 0 1-.396-.959 1.2 1.2 0 0 1 .396-.837l1.042-.94c.605-.548.93-1.33.89-2.145a2.697 2.697 0 0 0-.888-1.875 2.695 2.695 0 0 0-1.954-.7l-1.4.072h-.057l-.058-.001h-.003a1.211 1.211 0 0 1-1.147-1.268l.071-1.401A2.707 2.707 0 0 0 15.716.003a2.69 2.69 0 0 0-1.872.888l-.95 1.042a1.187 1.187 0 0 1-.958.396 1.2 1.2 0 0 1-.836-.399L10.16.89A2.71 2.71 0 0 0 8.028.008a2.714 2.714 0 0 0-2.58 2.836l.067 1.407a1.21 1.21 0 0 1-1.208 1.272s-.042 0-.064-.002l-1.402-.071A2.709 2.709 0 0 0 .006 8.288a2.69 2.69 0 0 0 .885 1.875l1.043.946a1.208 1.208 0 0 1 0 1.797l-1.043.941a2.7 2.7 0 0 0-.887 2.15c.038.724.355 1.389.892 1.873a2.7 2.7 0 0 0 1.954.692l1.401-.07c.021-.003.042-.003.063-.003l.062.002a1.211 1.211 0 0 1 1.144 1.27l-.072 1.405a2.704 2.704 0 0 0 .883 2.13Zm-1.88-6.303a2.121 2.121 0 0 0-.137-.004l-.138.002h-.003l-1.401.071c-.021.002-.043.002-.064.002a1.205 1.205 0 0 1-1.206-1.145 1.203 1.203 0 0 1 .396-.959l1.041-.94a2.715 2.715 0 0 0 .002-4.024L1.9 9.05a1.203 1.203 0 0 1-.396-.837 1.21 1.21 0 0 1 1.263-1.265l1.4.07a2.71 2.71 0 0 0 2.847-2.846l-.067-1.4a1.211 1.211 0 0 1 1.15-1.266l.057-.001c.34 0 .666.144.894.394l.94 1.039a2.692 2.692 0 0 0 2.01.895 2.704 2.704 0 0 0 2.01-.893l.949-1.04a1.197 1.197 0 0 1 .905-.4c.3 0 .576.107.802.312a1.2 1.2 0 0 1 .398.959l-.071 1.402a2.712 2.712 0 0 0 2.839 2.843l1.4-.071h.002l.06-.002c.298 0 .585.11.809.313.24.217.38.514.396.837.018.365-.126.713-.396.957l-1.043.94a2.715 2.715 0 0 0 0 4.025l1.043.941a1.2 1.2 0 0 1 .397.837c.016.322-.094.632-.311.872a1.2 1.2 0 0 1-.89.4l-.069-.003-1.4-.07a2.698 2.698 0 0 0-1.955.695 2.69 2.69 0 0 0-.89 2.15l.072 1.395a1.211 1.211 0 0 1-1.153 1.263l-.049.001c-.344 0-.67-.142-.896-.39l-.942-1.041a2.718 2.718 0 0 0-2.012-.893 2.705 2.705 0 0 0-2.01.893l-.944 1.04a1.2 1.2 0 0 1-.896.396 1.206 1.206 0 0 1-1.206-1.26l.072-1.402a2.713 2.713 0 0 0-2.567-2.846Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.747 12.004A5.259 5.259 0 0 0 12 17.258a5.259 5.259 0 0 0 5.252-5.254A5.259 5.259 0 0 0 12 6.75a5.259 5.259 0 0 0-5.253 5.254Zm1.501 0A3.756 3.756 0 0 1 12 8.251a3.756 3.756 0 0 1 3.751 3.753A3.756 3.756 0 0 1 12 15.757a3.756 3.756 0 0 1-3.752-3.753Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.328 9.843a.75.75 0 0 1 1.019.294 3.25 3.25 0 0 1-2.847 4.82.75.75 0 0 1 0-1.5 1.75 1.75 0 0 0 1.534-2.595.75.75 0 0 1 .293-1.019Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--cog_hand_give": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.75 13c.414 0 .75.321.75.717v1.196h7.54c1.104 0 2.183.353 2.995 1.01.616.497 1.046 1.145 1.22 1.86h6.442c1.104 0 2.184.353 2.996 1.01.817.659 1.307 1.582 1.307 2.577 0 .19-.079.372-.22.507a.767.767 0 0 1-.53.21H1.5v1.196c0 .396-.336.717-.75.717S0 23.679 0 23.283v-9.566C0 13.321.336 13 .75 13Zm.75 7.652h20.838a2.157 2.157 0 0 0-.612-.763c-.52-.42-1.248-.672-2.029-.672H8c-.414 0-.75-.32-.75-.717 0-.396.336-.717.75-.717h3.68a2.16 2.16 0 0 0-.612-.764c-.52-.42-1.248-.671-2.029-.671H1.5v4.304ZM18.825 1.536a.468.468 0 0 0-.527.119l-.002.002-.587.646a1.963 1.963 0 0 1-2.922 0l-.586-.646a.47.47 0 0 0-.815.338l.045.873a1.974 1.974 0 0 1-1.26 1.938 1.969 1.969 0 0 1-.806.129l-.872-.045a.469.469 0 0 0-.338.816l.647.585a1.963 1.963 0 0 1 0 2.924l-.002.001-.643.581a.47.47 0 0 0 .335.816h.001l.867-.045a1.973 1.973 0 0 1 1.938 1.26c.1.257.143.531.13.806l-.046.873a.47.47 0 0 0 .816.338l.004-.004.59-.645a1.962 1.962 0 0 1 2.922.002l.001.002.583.645a.47.47 0 0 0 .744-.063.47.47 0 0 0 .072-.275l-.045-.872a1.974 1.974 0 0 1 1.26-1.938c.256-.099.53-.143.806-.129l.872.045a.469.469 0 0 0 .338-.817l-.645-.583-.002-.001a1.962 1.962 0 0 1 0-2.924l.002-.001.645-.583a.47.47 0 0 0-.338-.817l-.871.045a1.973 1.973 0 0 1-1.938-1.26 1.97 1.97 0 0 1-.129-.806l.045-.873a.47.47 0 0 0-.289-.457ZM18.212.048a1.968 1.968 0 0 1 2.4 2.022l-.045.871a.47.47 0 0 0 .492.493l.871-.045a1.969 1.969 0 0 1 1.42 3.428l-.65.588a.463.463 0 0 0 0 .69l.003.003.647.585a1.97 1.97 0 0 1-1.42 3.428l-.87-.045a.47.47 0 0 0-.493.493l.045.87a1.97 1.97 0 0 1-3.428 1.42l-.587-.65a.463.463 0 0 0-.69 0l-.006.007-.59.646a1.969 1.969 0 0 1-3.427-1.422l.045-.871a.47.47 0 0 0-.492-.493l-.875.045a1.968 1.968 0 0 1-1.414-3.424l.001-.001.65-.588a.463.463 0 0 0 0-.69l-.002-.003-.647-.585a1.969 1.969 0 0 1 1.42-3.428l.87.045a.471.471 0 0 0 .493-.493l-.045-.876A1.97 1.97 0 0 1 15.31.648l.593.652a.463.463 0 0 0 .69 0l.004-.004.587-.646.001-.001a1.969 1.969 0 0 1 1.027-.6Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.598 5.098a3.75 3.75 0 1 1 5.304 5.304 3.75 3.75 0 0 1-5.304-5.304Zm2.652.402a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--columns": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 4.5h-3v15h3v-15ZM1.5 3A1.5 1.5 0 0 0 0 4.5v15A1.5 1.5 0 0 0 1.5 21h3A1.5 1.5 0 0 0 6 19.5v-15A1.5 1.5 0 0 0 4.5 3h-3ZM13.5 4.5h-3v15h3v-15Zm-3-1.5A1.5 1.5 0 0 0 9 4.5v15a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3ZM22.5 4.5h-3v15h3v-15Zm-3-1.5A1.5 1.5 0 0 0 18 4.5v15a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 22.5 3h-3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--contract": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 7.5H3.75c-.41 0-.75-.34-.75-.75S3.34 6 3.75 6h10.5c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.25 12h-6.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h6.5c.41 0 .75.34.75.75s-.34.75-.75.75ZM7.5 16.5H3.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H7.5c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M7.5 21H2.25C1.01 21 0 19.99 0 18.75V2.25C0 1.01 1.01 0 2.25 0h10.63c.59 0 1.17.24 1.59.66l2.87 2.87c.42.42.66.99.66 1.59V7.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.12c0-.2-.08-.39-.22-.53l-2.87-2.87a.75.75 0 0 0-.53-.22H2.25c-.41 0-.75.34-.75.75v16.5c0 .41.34.75.75.75H7.5c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.134 8.5c.385-.003.765.077 1.118.232.353.156.67.383.934.666l.002.002c.263.285.468.62.607.984a3.168 3.168 0 0 1-.015 2.284 3.028 3.028 0 0 1-.616.971l-8.375 9.02a.75.75 0 0 1-.35.212l-3.99 1.102a.75.75 0 0 1-.929-.897l.981-4.12a.748.748 0 0 1 .088-.31.748.748 0 0 1 .134-.203l8.375-9.019c.26-.285.572-.516.921-.676.351-.16.73-.245 1.115-.248ZM11.678 20.49l-.405 1.7 1.65-.455-1.245-1.245Zm2.618.496L12.28 18.97l6.682-7.196 2.015 2.015-6.682 7.196ZM22 12.69l.073-.08c.13-.137.238-.304.312-.492a1.662 1.662 0 0 0 .007-1.2 1.533 1.533 0 0 0-.304-.497 1.349 1.349 0 0 0-.44-.315 1.223 1.223 0 0 0-1.004.007c-.161.074-.31.183-.438.324l-.006.006-.216.232L22 12.689Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--cookie": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.01 12.465a11.952 11.952 0 0 0 12.464 11.492 11.91 11.91 0 0 0 8.327-3.852 11.906 11.906 0 0 0 3.165-8.612 11.995 11.995 0 0 0-.562-3.172.751.751 0 0 0-1.065-.436c-.419.222-.892.34-1.365.342a3 3 0 0 1-2.996-2.994v-.025a.746.746 0 0 0-.75-.75.757.757 0 0 0-.457.155 2.978 2.978 0 0 1-1.798.614 2.978 2.978 0 0 1-2.117-.876 2.976 2.976 0 0 1-.88-2.118c0-.411.082-.81.244-1.187a.746.746 0 0 0-.07-.721.744.744 0 0 0-.61-.325h-.02l-.019.001a11.912 11.912 0 0 0-8.327 3.852A11.91 11.91 0 0 0 .01 12.465ZM4.277 4.87a10.455 10.455 0 0 1 6.245-3.277 4.47 4.47 0 0 0 1.275 3.821 4.476 4.476 0 0 0 4.838.989c.523 1.926 2.31 3.325 4.341 3.325h.005a4.464 4.464 0 0 0 1.211-.174c.155.655.248 1.326.275 1.999a10.419 10.419 0 0 1-2.768 7.535 10.423 10.423 0 0 1-7.719 3.379A10.456 10.456 0 0 1 1.508 12.405a10.424 10.424 0 0 1 2.77-7.535Zm.2 5.608c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3Zm1.5 0c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5-.673 1.5-1.5 1.5-1.5-.673-1.5-1.5Zm8.25 9a2.252 2.252 0 0 1-2.25-2.25 2.252 2.252 0 0 1 2.25-2.25 2.252 2.252 0 0 1 2.25 2.25 2.252 2.252 0 0 1-2.25 2.25Zm0-3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-5.998.375a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm4.871-5.624c-.236 0-.463-.073-.656-.212a1.118 1.118 0 0 1-.453-.733 1.113 1.113 0 0 1 .196-.836 1.116 1.116 0 0 1 .915-.469 1.12 1.12 0 0 1 1.11.945 1.122 1.122 0 0 1-1.112 1.305Zm5.345 2.787a1.116 1.116 0 0 0 .84.197 1.126 1.126 0 0 0-.364-2.22 1.126 1.126 0 0 0-.476 2.023Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cost_cut-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.32 13.656c0-.444.34-.804.759-.804s.758.36.758.804v9.44c0 .444-.34.803-.758.803-.42 0-.76-.36-.76-.803v-9.44ZM17.107 20.023c0-.444.34-.804.759-.804s.758.36.758.804v2.692c0 .444-.34.804-.758.804-.42 0-.76-.36-.76-.803v-2.693Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.379.454c-.434 0-.85.173-1.157.48-.307.309-.48.726-.48 1.162v20.438H1.738a.769.769 0 0 0-.768.77c0 .426.344.696.768.696h20.517c.424 0 .768-.27.768-.695a.769.769 0 0 0-.768-.77h-.978v-13.5c0-.435-.172-.853-.48-1.161a1.634 1.634 0 0 0-1.156-.48h-3.475c-.434 0-.85.172-1.158.48-.306.308-.479.726-.479 1.161v13.5H9.49V2.094c0-.435-.172-.852-.48-1.16A1.634 1.634 0 0 0 7.855.454H4.379Zm-.102 1.54h3.678v20.54H4.277V1.994Zm15.465 6.94v13.6h-3.678v-13.6h3.678Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="m18.278 6.04 1.608-1.517a.511.511 0 0 0 0-.752.584.584 0 0 0-.793 0l-.65.613V.606c0-.294-.252-.531-.56-.531-.31 0-.562.237-.562.531v3.778l-.65-.613a.584.584 0 0 0-.792 0 .511.511 0 0 0 0 .752l1.606 1.516.002.002a.576.576 0 0 0 .35.152l.045.002.059-.003a.601.601 0 0 0 .313-.132.493.493 0 0 0 .019-.015l.004-.003V6.04Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--collapse_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.187 9.106a1.149 1.149 0 0 1 1.626 0l4.237 4.237a.853.853 0 1 1-1.207 1.207L12 10.707 8.157 14.55a.853.853 0 0 1-1.207-1.207l4.237-4.237Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--collapse_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.187 9.106a1.149 1.149 0 0 1 1.626 0l4.237 4.237a.853.853 0 1 1-1.207 1.207L12 10.707 8.157 14.55a.853.853 0 0 1-1.207-1.207l4.237-4.237Z" fill="#000"/></svg>', "e-icon--community": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M12 7.5c-2.1 0-3.8-1.7-3.8-3.8C8.2 1.6 9.9 0 12 0c2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.7-3.8 3.7Zm0-6c-1.2 0-2.2 1-2.2 2.2 0 1.2 1 2.3 2.2 2.3 1.2 0 2.2-1 2.2-2.2 0-1.2-1-2.3-2.2-2.3ZM13.5 21h-3c-.4 0-.7-.3-.7-.7L9.1 15h-.9c-.4 0-.8-.3-.8-.8V12c0-1.2.5-2.3 1.3-3.2.9-.9 2-1.3 3.2-1.3 1.2 0 2.3.5 3.2 1.3.9.9 1.3 2 1.3 3.2v2.2c0 .4-.3.8-.8.8h-.8l-.7 5.3c.1.4-.2.7-.6.7Zm-2.3-1.5h1.7l.7-5.3c0-.4.4-.7.7-.7h.7V12c0-.8-.3-1.6-.9-2.1-1.1-1.2-3.1-1.2-4.2 0-.6.5-.9 1.3-.9 2.1v1.5h.8c.4 0 .7.3.7.7l.7 5.3ZM4.5 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3Zm0-4.5C3.7 4.5 3 5.2 3 6s.7 1.5 1.5 1.5S6 6.8 6 6s-.7-1.5-1.5-1.5Z"/><path d="M6 19.5H3c-.4 0-.7-.3-.7-.6L1.6 15H.8c-.5 0-.8-.3-.8-.7v-.8c0-.7.2-1.4.5-2.1.3-.6.8-1.2 1.4-1.6.6-.4 1.3-.7 2-.8.7-.1 1.4 0 2.1.2.4.1.6.6.5 1-.1.4-.6.6-1 .5-.4-.2-.9-.2-1.4-.1-.5.1-.9.3-1.3.5-.4.3-.7.6-.9 1.1-.2.4-.3.9-.3 1.4h.8c.4 0 .7.3.7.6l.5 3.8h1.7l.3-1.6c.1-.4.5-.7.9-.6.4.1.7.5.6.9L6.7 19c0 .2-.3.5-.7.5ZM19.5 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3Zm0-4.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5S21 6.8 21 6s-.7-1.5-1.5-1.5Z"/><path d="M21 19.5h-3c-.4 0-.7-.3-.7-.6l-.4-2.3c-.1-.4.2-.8.6-.9.4-.1.8.2.9.6l.3 1.6h1.7L21 14c.1-.4.4-.6.7-.6h.8c0-.5-.1-.9-.3-1.4-.2-.4-.5-.8-.9-1.1-.4-.3-.8-.5-1.3-.5-.5-.1-1 0-1.4.1-.4.1-.8-.1-1-.5-.1-.4.1-.8.5-1 .7-.2 1.4-.3 2.1-.2.7.1 1.4.4 2 .8.6.4 1.1 1 1.4 1.6.3.6.5 1.3.5 2.1v.8c0 .4-.3.8-.8.8h-.9l-.6 3.9c-.1.4-.4.7-.8.7ZM12 24C.3 24 0 21.3 0 21c0-.4.3-.8.8-.8.4 0 .7.3.7.7.5.6 4 1.6 10.5 1.6s10-1 10.5-1.6c0-.4.4-.7.7-.7.4 0 .8.3.8.8 0 .3-.3 3-12 3Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--compass": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M10.95 9.46A2.706 2.706 0 0 1 14.705 12a2.708 2.708 0 1 1-5.413 0 2.707 2.707 0 0 1 1.656-2.54ZM12 10.749a1.207 1.207 0 0 0-1.207 1.27 1.206 1.206 0 1 0 2.413 0 1.206 1.206 0 0 0-1.207-1.269ZM12.75.25V3a.75.75 0 0 1-1.5 0V.25h1.5ZM.25 11.25H3a.75.75 0 0 1 0 1.5H.25v-1.5ZM23.75 11.25H21a.75.75 0 0 0 0 1.5h2.75v-1.5ZM11.25 23.75V21a.75.75 0 0 1 1.5 0v2.75h-1.5Z"/><path d="M16.993 4.846a1.728 1.728 0 0 1 2.153 2.184l-2.812 8.172a1.913 1.913 0 0 1-1.142 1.142l-.014.005-8.148 2.797a1.728 1.728 0 0 1-2.176-2.176l2.8-8.157a1.914 1.914 0 0 1 1.159-1.158l.009-.003 8.149-2.798a.797.797 0 0 1 .022-.008Zm.45 1.432-8.129 2.79a.414.414 0 0 0-.246.246l-2.79 8.129a.228.228 0 0 0 .28.28l8.125-2.79a.412.412 0 0 0 .24-.24l2.8-8.136a.23.23 0 0 0-.165-.28.228.228 0 0 0-.115 0Z"/><path d="M3.515 3.515a12 12 0 1 1 16.97 16.97 12 12 0 0 1-16.97-16.97ZM12 1.532a10.468 10.468 0 1 0 0 20.936 10.468 10.468 0 0 0 0-20.936Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--configurations": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 5.265a.75.75 0 0 0-1.5 0v5.345a3.001 3.001 0 0 0-1.371 5.026 3 3 0 0 0 1.371.783v2.346a.75.75 0 1 0 1.5 0v-2.346a3.01 3.01 0 0 0 1.744-1.238A3 3 0 0 0 16.5 10.61V5.265Zm-.75 6.75a1.5 1.5 0 1 0 0 2.999 1.5 1.5 0 0 0 0-3ZM9 10.42a3 3 0 1 0-1.5 0v8.345a.75.75 0 1 0 1.5 0v-8.346Zm-.751-1.405a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 .001 3h-.001Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 0A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V2.25A2.25 2.25 0 0 0 21.75 0H2.25ZM1.5 2.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v19.5a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--copy": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1.973C1.5.892 2.398 0 3.502 0h12.524c.423 0 .766.343.766.766v.186a.766.766 0 0 1-.766.766H3.246v14.831a.766.766 0 0 1-.765.766h-.215a.766.766 0 0 1-.766-.766V1.973Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.015 6.43c0-1.082.899-1.974 2.002-1.974h12.417c1.104 0 2.002.892 2.002 1.973v15.598c0 1.081-.898 1.973-2.002 1.973H8.017c-1.103 0-2.002-.892-2.002-1.973V6.43Zm14.674-.256H7.762v16.108h12.927V6.174Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--crane": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 24.001a.75.75 0 0 1 0-1.5h3v-15h-3a.75.75 0 0 1 0-1.5h1.958L8.84.387a1.501 1.501 0 0 1 1.749-.188l9.865 5.802h2.796a.75.75 0 0 1 0 1.5H21v2.562c0 .298.177.568.45.688a2.998 2.998 0 0 1 .921 4.869 2.98 2.98 0 0 1-2.12.88 2.983 2.983 0 0 1-2.122-.878 2.98 2.98 0 0 1-.879-2.121.75.75 0 0 1 1.5 0c0 .401.156.777.44 1.06.283.283.659.439 1.06.439a1.49 1.49 0 0 0 1.061-.44 1.5 1.5 0 0 0-.461-2.434 2.25 2.25 0 0 1-1.35-2.062V7.501H9.75v15h3a.75.75 0 0 1 0 1.5h-12Zm7.5-1.5v-4.5l-3 4v.5h3Zm-3-3.001 3-4v-1l-3-4v9Zm3-7.5V7.5h-3V8l3 4Zm9.246-6-7.65-4.5L4.93 6h12.566Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--credit_card": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 4.5a.75.75 0 0 0-.75.75v13.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75H2.25ZM0 5.25A2.25 2.25 0 0 1 2.25 3h19.5A2.25 2.25 0 0 1 24 5.25v13.5A2.25 2.25 0 0 1 21.75 21H2.25A2.25 2.25 0 0 1 0 18.75V5.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.25a.75.75 0 0 1 .75-.75h22.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8.25ZM4.5 12.75a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75ZM4.5 15.75a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cut_electricity_pillar": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.935 4.18H.75a.71.71 0 1 1 0-1.42h.71v-.71c0-.395.325-.71.715-.71.39 0 .71.315.71.71v.71h1.42v-.71c0-.395.33-.71.72-.71.39 0 .71.315.71.71v.71H10v-.71a.71.71 0 1 1 1.42 0v.71h1.42v-.71a.71.71 0 1 1 1.42 0v.71h.71a.71.71 0 1 1 0 1.42h-1.185L8.57 8.09v13.86a.71.71 0 1 1-1.42 0V8.09L1.935 4.18ZM7.86 6.845l3.555-2.665h-7.11L7.86 6.845Zm8.095 2.25-.355.615 6.16 3.56.355-.615a.71.71 0 0 1 1.23.71l-.355.615.615.355a.71.71 0 0 1-.71 1.23L21.92 15l-5.26 1.41-3.405 5.9a.703.703 0 0 1-.615.355.71.71 0 0 1-.615-1.065l3.405-5.9-1.41-5.26-.975-.565a.71.71 0 0 1 .71-1.23L14.37 9l.355-.615a.71.71 0 0 1 1.23.71Zm-.195 2.35.935 3.48 3.48-.93-4.415-2.55Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--cut_electricity_pillar-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 4.18h1.185L7.15 8.09v13.86a.71.71 0 1 0 1.42 0V8.09l5.215-3.91h1.185a.71.71 0 1 0 0-1.42h-.71v-.71a.71.71 0 1 0-1.42 0v.71h-1.42v-.71a.71.71 0 1 0-1.42 0v.71H5.735v-.71a.71.71 0 0 0-.71-.71c-.39 0-.72.315-.72.71v.71h-1.42v-.71a.71.71 0 0 0-.71-.71.714.714 0 0 0-.715.71v.71H.75a.71.71 0 1 0 0 1.42Zm10.665 0L7.86 6.845 4.305 4.18h7.11Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m15.6 9.71.355-.615a.71.71 0 0 0-1.23-.71L14.37 9l-.615-.355a.71.71 0 0 0-.71 1.23l.975.565 1.41 5.26-3.405 5.9a.71.71 0 0 0 1.23.71l3.405-5.9L21.92 15l.975.565a.7.7 0 0 0 .355.095.71.71 0 0 0 .355-1.325l-.615-.355.355-.615a.71.71 0 0 0-1.23-.71l-.355.615-6.16-3.56Zm1.095 5.215-.935-3.48 4.415 2.55-3.48.93Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--danger_electricity-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 4.5a.75.75 0 0 1-.75-.75V1.5H.75a.75.75 0 0 1 0-1.5h15a.75.75 0 0 1 .75.75V3h6.75a.75.75 0 0 1 0 1.5h-7.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M13.5 11.25a.744.744 0 0 1-.728-.569l-.675-2.698-3.484-2.09a.747.747 0 0 1-.361-.703.748.748 0 0 1 .469-.637l3.75-1.5a.747.747 0 0 1 .969.992.745.745 0 0 1-.411.401l-2.346.938 2.453 1.472a.744.744 0 0 1 .342.461l.523 2.093 2.164-1.082a.754.754 0 0 1 .615-.025l2.464.986-.479-2.393a.748.748 0 1 1 1.471-.293l.75 3.75a.75.75 0 0 1-1.014.843l-3.437-1.375-2.699 1.349a.742.742 0 0 1-.336.08Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M5.25 18a3.754 3.754 0 0 1-3.75-3.75 3.754 3.754 0 0 1 3.75-3.75A3.754 3.754 0 0 1 9 14.25 3.754 3.754 0 0 1 5.25 18Zm0-6A2.252 2.252 0 0 0 3 14.25a2.252 2.252 0 0 0 2.25 2.25 2.252 2.252 0 0 0 2.25-2.25A2.252 2.252 0 0 0 5.25 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M7.5 24a.75.75 0 0 1-.75-.75v-.75c0-.392.306-.72.697-.748 3.538-.252 6.619-2.666 8.242-6.456a.762.762 0 0 0-.351-1.02.749.749 0 0 0-.998.361l-.02.047a8.58 8.58 0 0 1-7.322 5.226l-4.698.338a.818.818 0 0 1-.054.002H.75a.75.75 0 0 1 0-1.5h1.469l4.673-.336A7.072 7.072 0 0 0 12.982 14a2.26 2.26 0 0 1 2.04-1.296c.33 0 .65.071.951.212.543.254.956.706 1.161 1.271a2.232 2.232 0 0 1-.077 1.72c-1.725 4.029-5.002 6.726-8.807 7.265v.076A.75.75 0 0 1 7.5 24Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--dark_theme": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.439 23.983c-1.21 0-2.42-.18-3.6-.549a11.875 11.875 0 0 1-7.04-5.893 11.87 11.87 0 0 1-.81-9.14 11.887 11.887 0 0 1 5.89-7.033 11.956 11.956 0 0 1 9.15-.809c.31.1.53.39.53.72 0 .33-.21.619-.52.719a10.444 10.444 0 0 0-7.35 10.009c0 4.605 2.96 8.62 7.35 10.009.31.1.53.39.53.719 0 .33-.21.62-.53.719-1.18.37-2.39.55-3.6.55v-.02Zm-.01-22.485c-1.67 0-3.32.4-4.85 1.199a10.43 10.43 0 0 0-5.16 6.153c-.84 2.677-.59 5.514.71 8.001a10.435 10.435 0 0 0 6.16 5.155c1.31.41 2.67.559 4.01.45a11.928 11.928 0 0 1-6.12-10.46c0-4.415 2.38-8.37 6.12-10.458-.29-.02-.59-.04-.88-.04h.01Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--dashboard": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.25a5.256 5.256 0 0 0 5.25 5.25 5.256 5.256 0 0 0 5.25-5.25A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25Zm1.5 0A3.754 3.754 0 0 1 5.25 1.5 3.754 3.754 0 0 1 9 5.25 3.754 3.754 0 0 1 5.25 9 3.754 3.754 0 0 1 1.5 5.25ZM0 18.75A5.256 5.256 0 0 0 5.25 24a5.256 5.256 0 0 0 5.25-5.25 5.256 5.256 0 0 0-5.25-5.25A5.256 5.256 0 0 0 0 18.75Zm1.5 0A3.754 3.754 0 0 1 5.25 15 3.754 3.754 0 0 1 9 18.75a3.754 3.754 0 0 1-3.75 3.75 3.754 3.754 0 0 1-3.75-3.75ZM18.75 10.5a5.256 5.256 0 0 1-5.25-5.25A5.256 5.256 0 0 1 18.75 0 5.256 5.256 0 0 1 24 5.25a5.256 5.256 0 0 1-5.25 5.25Zm0-9A3.754 3.754 0 0 0 15 5.25 3.754 3.754 0 0 0 18.75 9a3.754 3.754 0 0 0 3.75-3.75 3.754 3.754 0 0 0-3.75-3.75ZM13.5 18.75A5.256 5.256 0 0 0 18.75 24 5.256 5.256 0 0 0 24 18.75a5.256 5.256 0 0 0-5.25-5.25 5.256 5.256 0 0 0-5.25 5.25Zm1.5 0A3.754 3.754 0 0 1 18.75 15a3.754 3.754 0 0 1 3.75 3.75 3.754 3.754 0 0 1-3.75 3.75A3.754 3.754 0 0 1 15 18.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--dashboard-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 24A5.256 5.256 0 0 1 0 18.75a5.256 5.256 0 0 1 5.25-5.25 5.256 5.256 0 0 1 5.25 5.25A5.256 5.256 0 0 1 5.25 24Zm0-9a3.754 3.754 0 0 0-3.75 3.75 3.754 3.754 0 0 0 3.75 3.75A3.754 3.754 0 0 0 9 18.75 3.754 3.754 0 0 0 5.25 15Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M5.25 10.5A5.256 5.256 0 0 1 0 5.25 5.256 5.256 0 0 1 5.25 0a5.256 5.256 0 0 1 5.25 5.25 5.256 5.256 0 0 1-5.25 5.25Zm0-9A3.754 3.754 0 0 0 1.5 5.25 3.754 3.754 0 0 0 5.25 9 3.754 3.754 0 0 0 9 5.25 3.754 3.754 0 0 0 5.25 1.5ZM18.75 10.5a5.256 5.256 0 0 1-5.25-5.25A5.256 5.256 0 0 1 18.75 0 5.256 5.256 0 0 1 24 5.25a5.256 5.256 0 0 1-5.25 5.25Zm0-9A3.754 3.754 0 0 0 15 5.25 3.754 3.754 0 0 0 18.75 9a3.754 3.754 0 0 0 3.75-3.75 3.754 3.754 0 0 0-3.75-3.75ZM18.75 24a5.256 5.256 0 0 1-5.25-5.25 5.256 5.256 0 0 1 5.25-5.25A5.256 5.256 0 0 1 24 18.75 5.256 5.256 0 0 1 18.75 24Zm0-9A3.754 3.754 0 0 0 15 18.75a3.754 3.754 0 0 0 3.75 3.75 3.754 3.754 0 0 0 3.75-3.75A3.754 3.754 0 0 0 18.75 15Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--decent": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M6 7.5c-2.1 0-3.8-1.7-3.8-3.8C2.2 1.6 3.9 0 6 0c2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.7-3.8 3.7Zm0-6c-1.2 0-2.2 1-2.2 2.2C3.8 4.9 4.8 6 6 6c1.2 0 2.2-1 2.2-2.2 0-1.2-1-2.3-2.2-2.3Z"/><path d="M8.2 24H3.8c-.4 0-.8-.3-.8-.7l-.7-6.8H.8c-.4 0-.8-.3-.8-.8v-2.2c0-1.4.5-2.7 1.3-3.7.8-1.1 2-1.8 3.4-2.1 1.3-.4 2.7-.2 3.9.4 1.2.6 2.2 1.6 2.8 2.8.2.4 0 .8-.4 1-.4.2-.8 0-1-.4-.4-.9-1.1-1.6-2-2-.9-.5-2-.6-3-.4-1 .2-1.9.8-2.5 1.6-.6.8-1 1.8-1 2.8V15H3c.4 0 .7.3.7.7l.7 6.8h3.1L8 18c0-.4.4-.7.8-.7s.7.4.7.8L9 23.3c0 .4-.4.7-.8.7Z"/><path d="M13.4 24h-.2c-.3 0-.6-.2-.9-.4-.2-.2-.4-.5-.5-.8-.1-.3 0-.6.1-.9l1.2-2.9-2.1-2.2c-.2-.2-.4-.4-.4-.7-.1-.3-.1-.6.1-.9.1-.3.3-.5.6-.7.3-.2.6-.2.9-.2h2.5l1.3-2.9c.2-.3.3-.5.6-.6.2-.1.5-.2.8-.2.3 0 .6.1.8.2.2.1.4.4.6.6l1.3 2.9h2.5c.3 0 .6.1.8.2.3.2.5.4.6.7.1.3.1.6.1.9 0 .3-.2.6-.5.8L21.3 19l1.2 2.8c.1.3.2.6.1.9-.1.3-.2.6-.5.8-.2.2-.5.3-.9.4-.3 0-.6 0-.9-.2L17.2 22l-3.1 1.8c-.2.1-.5.2-.7.2Zm3.8-3.6c.1 0 .3 0 .4.1l3.5 2-1.4-3.3c-.1-.3-.1-.6.2-.8l2.6-2.6h-3c-.3 0-.6-.2-.7-.4L17.3 12l-1.6 3.3c-.1.3-.4.4-.7.4h-3l2.6 2.6c.2.2.3.5.2.8l-1.4 3.3 3.6-1.9s.1-.1.2-.1ZM16.5 6.8c-1.9 0-3.4-1.5-3.4-3.4S14.6 0 16.5 0s3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4Zm0-5.3c-1 0-1.9.8-1.9 1.9 0 1.1.8 1.9 1.9 1.9 1.1 0 1.9-.8 1.9-1.9 0-1.1-.9-1.9-1.9-1.9Z"/><path d="M20.4 9.7c-.3 0-.5-.1-.7-.4-.3-.5-.7-1-1.2-1.3-.5-.3-1.1-.5-1.7-.6-.6-.1-1.2 0-1.7.2s-1 .6-1.4 1c-.3.3-.7.3-1.1.1-.3-.3-.3-.7-.1-1.1.5-.6 1.2-1.1 2-1.4.8-.1 1.7-.3 2.5-.2.8.1 1.6.4 2.3.8.7.5 1.3 1.1 1.7 1.8.2.4.1.8-.3 1 0 .1-.2.1-.3.1Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--design_process-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 3 0ZM21 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 21 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M.75 20.25a.75.75 0 0 1 .75-.75h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75ZM.75 9.75A.75.75 0 0 1 1.5 9h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 3A.75.75 0 0 1 6 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5ZM6 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H9v-5.25H7.5ZM12 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H15v-5.25h-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 3A.75.75 0 0 1 9 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.598 2.05a.75.75 0 0 1 .996-.365l2.721 1.263a.75.75 0 0 1 .364.996l-2.842 6.122a.75.75 0 0 1-.996.365l-2.72-1.263a.75.75 0 0 1-.365-.996l2.842-6.123Zm1.045 1.311-2.211 4.762 1.36.632 2.211-4.762-1.36-.632Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--digging-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.687 10.94a.836.836 0 0 0-.13-.423l-5.932-8.84c-.26-.363-.49-.629-.859-.668a1.187 1.187 0 0 0-.998.354l-3.785 3.005h-1.897a1.611 1.611 0 0 0-1.099.452 2.486 2.486 0 0 0-.66 1.906v4.027c.001.026-.01.051-.028.07a.1.1 0 0 1-.07.028H3.514a1.688 1.688 0 0 0-1.145.59 1.631 1.631 0 0 0-.373 1.218v2.809c.012.302.059.602.14.894a2.772 2.772 0 0 0-1.554.979A2.692 2.692 0 0 0 0 19.063v1.324c-.003.689.272 1.35.764 1.84.493.49 1.162.768 1.862.773h12.782c.7-.005 1.37-.283 1.862-.773.492-.49.767-1.151.765-1.84v-1.324a2.758 2.758 0 0 0-.546-1.671 2.835 2.835 0 0 0-1.452-1.02.08.08 0 0 1-.07-.081c0-.013.004-.026.01-.037.157-.455.198-.94.12-1.415-.156-1.185-.507-3.593-.808-5.66l-.328-2.257a.116.116 0 0 1 0-.088L16 5.95l4.112 5.933a.089.089 0 0 1 .027.064.087.087 0 0 1-.027.063l-1.997 1.454a.87.87 0 0 0-.117 1.353.904.904 0 0 0 .456.238l4.514 1.042a.823.823 0 0 0 .729-.177.828.828 0 0 0 .3-.707l-.31-4.273Zm-.969.58.18 3.32a.097.097 0 0 1-.04.082.099.099 0 0 1-.09.015l-3.345-.785a.1.1 0 0 1-.057-.089.1.1 0 0 1 .056-.088l3.296-2.456Zm-21.43 7.543a1.47 1.47 0 0 1 .377-1.01c.25-.277.678-.514 1.053-.553H15.5c.373.041.636.279.883.557.248.278.38.637.373 1.006v1.324c.002.174-.042.401-.108.563a1.325 1.325 0 0 1-.724.723 1.368 1.368 0 0 1-.516.104H2.626a1.37 1.37 0 0 1-.954-.395 1.325 1.325 0 0 1-.394-.94l.01-1.379Zm20.98-8.565-5.701-8.33-2.826 2.27c.259.062.759.562.88 1.237l.877-.644a1 1 0 0 1 1.405.223l4.307 6 1.059-.756ZM3.626 16.293H14.02c.148.007.475-.033.6-.255a1.237 1.237 0 0 0 .21-1.032c-.28-2.18-1.28-9.056-1.28-9.056a.443.443 0 0 0-.409-.295H10.5c-.5 0-.864.345-.864.884v4.619a1 1 0 0 1-1 1H3.555c-.11 0-.31.078-.31.5v2.85c0 .539 0 .603.13.707.07.056.16.084.25.078Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M5.25 20.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM12.25 20.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--diversity": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M17.2 24c-.2 0-.4-.1-.5-.2l-5.1-5.3c-.6-.6-.9-1.3-1-2.1-.1-.8 0-1.6.4-2.3.3-.5.7-1 1.1-1.4.5-.4 1-.6 1.6-.7.6-.1 1.2 0 1.8.1.6.2 1.1.5 1.5.9l.3.3.3-.3c.4-.4.9-.7 1.5-.9.6-.2 1.2-.2 1.8-.1.6.1 1.2.3 1.6.7.5.4.9.8 1.1 1.4.4.7.5 1.5.3 2.3-.1.8-.5 1.5-1.1 2.1l-5.1 5.3c0 .1-.2.2-.5.2Zm-2.9-10.5h-.4c-.4.1-.7.2-1 .4-.3.2-.5.5-.7.8-.2.5-.2 1-.2 1.4.1.5.3.9.6 1.2l4.6 4.8 4.6-4.8c.3-.4.6-.8.6-1.3s0-1-.2-1.4c-.2-.3-.4-.6-.7-.8-.3-.2-.6-.4-1-.4-.4-.1-.7 0-1.1.1-.3.1-.7.3-.9.6l-.7.9c-.3.3-.8.3-1.1 0l-.8-.8c-.3-.3-.6-.4-.9-.6-.3-.1-.5-.1-.7-.1ZM.8 15c-.1 0-.1 0 0 0-.6-.1-.8-.4-.8-.8.2-1.6 1-3.1 2.3-4.2 1.2-1.1 2.8-1.6 4.5-1.7 1.6 0 3.3.6 4.5 1.7.3.3.3.7.1 1.1-.3.3-.7.3-1.1.1-1-.9-2.2-1.4-3.5-1.3-1.3 0-2.5.5-3.5 1.3s-1.6 2-1.8 3.3c-.1.2-.4.5-.7.5ZM6.8 8.3c-2.3 0-4.1-1.9-4.1-4.1C2.7 2 4.5 0 6.8 0s4.1 1.9 4.1 4.1c0 2.2-1.9 4.2-4.1 4.2Zm0-6.8c-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6ZM16.5 6.8c-1.9 0-3.4-1.5-3.4-3.4S14.6 0 16.5 0s3.4 1.5 3.4 3.4-1.5 3.4-3.4 3.4Zm0-5.3c-1 0-1.9.8-1.9 1.9 0 1.1.8 1.9 1.9 1.9 1.1 0 1.9-.8 1.9-1.9 0-1.1-.9-1.9-1.9-1.9Z"/><path d="M20.4 9.8c-.3 0-.5-.1-.7-.4-.3-.5-.7-1-1.2-1.3-.5-.3-1.1-.5-1.7-.6-.6-.1-1.2 0-1.7.2s-1 .6-1.4 1c-.3.3-.7.3-1.1.1-.3-.3-.3-.7-.1-1.1.5-.6 1.2-1.1 2-1.4.8-.2 1.7-.4 2.5-.3.8.1 1.6.4 2.3.8.7.5 1.3 1.1 1.7 1.8.2.4.1.8-.3 1 0 .1-.2.2-.3.2Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--download": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.741 16.453a.755.755 0 0 0 .518 0l.026-.01a.763.763 0 0 0 .246-.164l4.5-4.5a.743.743 0 0 0 .22-.53c0-.2-.078-.389-.22-.53a.744.744 0 0 0-1.06 0l-3.22 3.22V3.75a.75.75 0 0 0-1.5 0v10.19l-3.22-3.22a.743.743 0 0 0-.53-.22c-.2 0-.389.078-.53.22a.743.743 0 0 0-.22.53c0 .2.078.389.22.53l4.499 4.5c.07.071.153.126.249.165l.022.008Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M.001 17.25A3.754 3.754 0 0 0 3.751 21h16.5A3.754 3.754 0 0 0 24 17.25v-1.5a.75.75 0 0 0-1.5 0v1.5a2.252 2.252 0 0 1-2.25 2.25H3.75a2.252 2.252 0 0 1-2.25-2.25v-1.5a.75.75 0 0 0-1.5 0v1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--drag_handle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.6 2.4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM9.6 12a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM9.6 21.6a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM19.2 2.4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM19.2 12a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM19.2 21.6a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--edit": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 24a.755.755 0 0 1-.531-.22.754.754 0 0 1-.196-.716l1.77-6.905a.84.84 0 0 1 .045-.121.73.73 0 0 1 .151-.223L16.515 1.289A4.355 4.355 0 0 1 19.613 0c1.178 0 2.277.454 3.106 1.279l.029.029a4.367 4.367 0 0 1 1.251 3.121 4.356 4.356 0 0 1-1.32 3.087L8.185 22.01a.735.735 0 0 1-.231.154.784.784 0 0 1-.111.042L.935 23.978A.773.773 0 0 1 .75 24Zm1.041-1.791 4.41-1.131-3.281-3.275-1.129 4.406Zm5.868-1.795 13.02-13.02-4.074-4.074L3.582 16.344l4.077 4.07ZM21.738 6.332a2.893 2.893 0 0 0-.059-3.972l-.02-.02a2.872 2.872 0 0 0-2.037-.84v-.375l-.001.375a2.873 2.873 0 0 0-1.954.762l4.071 4.07Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--electric_cabinet": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.727 3.126 6.36 1.635l.033-.196h10.354c.535 0 .988.405.988.918 0 .39.347.716.787.716.44 0 .786-.33.786-.716 0-1.29-1.146-2.357-2.567-2.357H3.6c-.77 0-1.38.573-1.38 1.263v19.148c.006.476.287.903.754 1.124a.969.969 0 0 0 .073.03l6.466 2.326c.202.071.41.109.616.109.338 0 .669-.093.952-.272.46-.288.728-.763.728-1.268v-1.355h4.932c1.42 0 2.567-1.067 2.567-2.357v-1.532c0-.39-.346-.716-.786-.716-.44 0-.787.33-.787.716v1.532c0 .512-.453.918-.988.918h-4.932V4.561c0-.631-.437-1.212-1.088-1.435ZM3.8 2.296l6.43 2.199v18.103L3.8 20.287V2.297Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m15.708 9.817.412-.614L17.44 7.5l2.502-3.36c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.882.882 0 0 1 0 .413.976.976 0 0 1-.16.387L20.19 12l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.018-.074.095.095 0 0 0-.067-.036l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--electric_cabinet-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.727 3.126 6.36 1.635l.033-.196h10.354c.535 0 .988.405.988.918 0 .39.347.716.787.716.44 0 .786-.33.786-.716 0-1.29-1.146-2.357-2.567-2.357H3.6c-.77 0-1.38.573-1.38 1.263v19.148c.006.476.287.903.754 1.124a.972.972 0 0 0 .073.03l6.466 2.326c.202.071.41.109.616.109.338 0 .669-.093.952-.272.46-.288.728-.763.728-1.268v-1.355h4.932c1.42 0 2.567-1.067 2.567-2.357v-1.532c0-.39-.346-.716-.786-.716-.44 0-.787.33-.787.716v1.532c0 .512-.453.918-.988.918h-4.932V4.561c0-.631-.437-1.212-1.088-1.435ZM3.8 2.296l6.43 2.199v18.103L3.8 20.287V2.297Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m15.708 9.817.412-.614L17.44 7.5l2.502-3.36c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.882.882 0 0 1 0 .413.976.976 0 0 1-.16.387L20.19 12l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.018-.074.095.095 0 0 0-.067-.036l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--electric_car-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 15.75A.75.75 0 0 1 4.5 15H6a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM17.25 15.75A.75.75 0 0 1 18 15h1.5a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.893 7.642A.75.75 0 0 1 6.33 7.5a.75.75 0 0 0 0-1.5 2.25 2.25 0 0 0-2.153 1.606l-1.11 4.765-1.66 1.66a2.25 2.25 0 0 0-.658 1.59v3.129a2.25 2.25 0 0 0 1.5 2.121v.879a2.25 2.25 0 0 0 4.5 0V21h10.5v.75a2.25 2.25 0 0 0 4.5 0v-.879a2.25 2.25 0 0 0 1.5-2.121v-3.13a2.25 2.25 0 0 0-.659-1.59l-1.66-1.659-1.108-4.765A2.25 2.25 0 0 0 17.67 6a.75.75 0 0 0-.001 1.5.75.75 0 0 1 .702.486L19.305 12H4.695l.934-4.014a.75.75 0 0 1 .264-.344ZM20.25 21h-1.5v.75a.75.75 0 1 0 1.5 0V21ZM18 19.5h3a.75.75 0 0 0 .75-.75v-3.129a.75.75 0 0 0-.22-.53L19.94 13.5H4.06l-1.59 1.591a.75.75 0 0 0-.22.53v3.129a.75.75 0 0 0 .75.75h15ZM3.75 21.75V21h1.5v.75a.75.75 0 1 1-1.5 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.25.75a.75.75 0 0 0-1.5 0V3H9a.75.75 0 0 0-.75.75 3.75 3.75 0 0 0 3 3.674V9.75a.75.75 0 0 0 1.5 0V7.424a3.75 3.75 0 0 0 3-3.674A.75.75 0 0 0 15 3h-.75V.75a.75.75 0 0 0-1.5 0V3h-1.5V.75ZM12 6a2.25 2.25 0 0 0 2.121-1.5H9.88A2.25 2.25 0 0 0 12 6Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--electric_home": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m21 11.584 1.724 1.702a.76.76 0 0 0 .527.216.75.75 0 0 0 .527-1.28l-10.14-10.01a2.252 2.252 0 0 0-1.485-.696.715.715 0 0 0-.306 0 2.23 2.23 0 0 0-1.47.675L3.22 9.259.222 12.216a.75.75 0 0 0 1.054 1.065l1.723-1.703v8.671A2.256 2.256 0 0 0 5.25 22.5h13.502A2.256 2.256 0 0 0 21 20.25v-8.666Zm-2.25 9.419H5.25a.751.751 0 0 1-.749-.748V10.101l6.95-6.868A.75.75 0 0 1 12 2.997c.206 0 .406.084.57.258l6.929 6.847V20.25a.752.752 0 0 1-.748.754Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m9.196 13.332.39-.562 1.248-1.562 2.364-3.08c.167-.221.533-.134.537.097.005.23-.518 3.457-.603 3.964a.072.072 0 0 0 .038.074.08.08 0 0 0 .028.009l1.155.18a.615.615 0 0 1 .347.17c.095.09.164.203.2.328.03.124.03.253 0 .378a.878.878 0 0 1-.152.354l-1.315 1.651-2.725 3.563a.27.27 0 0 1-.304.088.254.254 0 0 1-.128-.11.243.243 0 0 1-.03-.162l.585-3.873a.084.084 0 0 0-.017-.067.09.09 0 0 0-.063-.034l-1.137-.175a.76.76 0 0 1-.324-.131.73.73 0 0 1-.227-.261.802.802 0 0 1 .133-.839Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--electric_home-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m21 11.584 1.724 1.702a.76.76 0 0 0 .527.216.75.75 0 0 0 .527-1.28l-10.14-10.01a2.252 2.252 0 0 0-1.485-.696.715.715 0 0 0-.306 0 2.23 2.23 0 0 0-1.47.675L3.22 9.259.222 12.216a.75.75 0 0 0 1.054 1.065l1.723-1.703v8.671A2.256 2.256 0 0 0 5.25 22.5h13.502A2.256 2.256 0 0 0 21 20.25v-8.666Zm-2.25 9.419H5.25a.751.751 0 0 1-.749-.748V10.101l6.95-6.868A.75.75 0 0 1 12 2.997c.206 0 .406.084.57.258l6.929 6.847V20.25a.752.752 0 0 1-.748.754Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m9.196 13.332.39-.562 1.248-1.562 2.364-3.08c.167-.221.533-.134.537.097.005.23-.518 3.457-.603 3.964a.072.072 0 0 0 .038.074.08.08 0 0 0 .028.009l1.155.18a.615.615 0 0 1 .347.17c.095.09.164.203.2.328.03.124.03.253 0 .378a.878.878 0 0 1-.152.354l-1.315 1.651-2.725 3.563a.27.27 0 0 1-.304.088.254.254 0 0 1-.128-.11.243.243 0 0 1-.03-.162l.585-3.873a.084.084 0 0 0-.017-.067.09.09 0 0 0-.063-.034l-1.137-.175a.76.76 0 0 1-.324-.131.73.73 0 0 1-.227-.261.802.802 0 0 1 .133-.839Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--electrical_system": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.749 22a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066L10.409.662A2.229 2.229 0 0 1 12 0c.601 0 1.166.235 1.591.662l2.206 2.218 5.202 5.231 2.78 2.795a.76.76 0 0 1 0 1.067.742.742 0 0 1-1.06 0l-1.72-1.729-1.5-1.508L12.53 1.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754H6.5s1 0 1 .754-1 .754-1 .754H3.749Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M20.235 11H9.765C8.824 11 8 11.843 8 12.806v9.388C8 23.157 8.824 24 9.765 24h10.47c.942 0 1.765-.843 1.765-1.806v-9.388c0-.963-.823-1.806-1.765-1.806Zm.236 10.833c0 .361-.236.602-.589.602H10c-.353 0-.588-.24-.588-.602v-8.787c0-.36.235-.602.588-.602h9.882c.353 0 .589.241.589.602v8.787Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m12.806 17.363.309-.46.99-1.278 1.876-2.52c.132-.181.423-.11.426.079.004.188-.41 2.828-.479 3.243a.061.061 0 0 0 .03.06.063.063 0 0 0 .023.008l.917.147a.482.482 0 0 1 .275.14c.075.074.13.166.158.268a.66.66 0 0 1 0 .309.732.732 0 0 1-.12.29L16.167 19l-2.162 2.915a.208.208 0 0 1-.241.071.203.203 0 0 1-.125-.222l.464-3.168a.072.072 0 0 0-.064-.083l-.901-.143a.592.592 0 0 1-.438-.321.674.674 0 0 1 .106-.686Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--electrical_system-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.749 22a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066L10.409.662A2.229 2.229 0 0 1 12 0c.601 0 1.166.235 1.591.662l2.206 2.218 5.202 5.231 2.78 2.795a.76.76 0 0 1 0 1.067.742.742 0 0 1-1.06 0l-1.72-1.729-1.5-1.508L12.53 1.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754H6.5s1 0 1 .754-1 .754-1 .754H3.749Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M20.235 11H9.765C8.824 11 8 11.843 8 12.806v9.388C8 23.157 8.824 24 9.765 24h10.47c.942 0 1.765-.843 1.765-1.806v-9.388c0-.963-.823-1.806-1.765-1.806Zm.236 10.833c0 .361-.236.602-.589.602H10c-.353 0-.588-.24-.588-.602v-8.787c0-.36.235-.602.588-.602h9.882c.353 0 .589.241.589.602v8.787Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m12.806 17.363.309-.46.99-1.278 1.876-2.52c.132-.181.423-.11.426.079.004.188-.41 2.828-.479 3.243a.061.061 0 0 0 .03.06.063.063 0 0 0 .023.008l.917.147a.482.482 0 0 1 .275.14c.075.074.13.166.158.268a.66.66 0 0 1 0 .309.732.732 0 0 1-.12.29L16.167 19l-2.162 2.915a.208.208 0 0 1-.241.071.203.203 0 0 1-.125-.222l.464-3.168a.072.072 0 0 0-.064-.083l-.901-.143a.592.592 0 0 1-.438-.321.674.674 0 0 1 .106-.686Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--electricity_pillar": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 23.2c0 .442.336.8.75.8s.75-.358.75-.8V7.6l5.5-4.4h1.25c.414 0 .75-.358.75-.8 0-.442-.336-.8-.75-.8H15V.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8H12V.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8H6V.8c0-.442-.336-.8-.75-.8S4.5.358 4.5.8v.8H3V.8c0-.442-.336-.8-.75-.8S1.5.358 1.5.8v.8H.75c-.414 0-.75.358-.75.8 0 .442.336.8.75.8H2l5.5 4.4v15.6Zm4.5-20-3.75 3-3.75-3H12Zm4.5 20c0 .442.336.8.75.8s.75-.358.75-.8v-7.668l4.061-4.332h1.189c.414 0 .75-.358.75-.8 0-.442-.336-.8-.75-.8h-.75v-.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8h-7.5v-.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8h-.75c-.414 0-.75.358-.75.8 0 .442.336.8.75.8h1.189l4.061 4.332V23.2Zm3.439-12-2.689 2.868-2.69-2.868h5.379Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--electricity_safety": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 0a.75.75 0 0 1 .75.75V4.5h4.5V.75a.75.75 0 0 1 1.5 0V4.5h.75a2.25 2.25 0 0 1 2.25 2.25v3a6.75 6.75 0 0 1-6 6.708v2.292a2.25 2.25 0 0 0 4.5 0 3.75 3.75 0 0 1 7.5 0v4.5a.75.75 0 0 1-1.5 0v-4.5a2.25 2.25 0 0 0-4.5 0 3.75 3.75 0 0 1-7.5 0v-2.292a6.75 6.75 0 0 1-6-6.708v-3A2.25 2.25 0 0 1 3.5 4.5h.75V.75A.75.75 0 0 1 5 0Zm6.712 13.462A5.25 5.25 0 0 1 2.75 9.75v-3A.75.75 0 0 1 3.5 6h9a.75.75 0 0 1 .75.75v3a5.25 5.25 0 0 1-1.538 3.712ZM7.5 7.5a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m17.938 5.817.412-.614L19.67 3.5 22.172.14c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.879.879 0 0 1 0 .413.975.975 0 0 1-.16.387L22.42 8l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.048-.099.096.096 0 0 0-.037-.011l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--electricity_safety-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 0a.75.75 0 0 1 .75.75V4.5h4.5V.75a.75.75 0 0 1 1.5 0V4.5h.75a2.25 2.25 0 0 1 2.25 2.25v3a6.75 6.75 0 0 1-6 6.708v2.292a2.25 2.25 0 0 0 4.5 0 3.75 3.75 0 0 1 7.5 0v4.5a.75.75 0 0 1-1.5 0v-4.5a2.25 2.25 0 0 0-4.5 0 3.75 3.75 0 0 1-7.5 0v-2.292a6.75 6.75 0 0 1-6-6.708v-3A2.25 2.25 0 0 1 3.5 4.5h.75V.75A.75.75 0 0 1 5 0Zm6.712 13.462A5.25 5.25 0 0 1 2.75 9.75v-3A.75.75 0 0 1 3.5 6h9a.75.75 0 0 1 .75.75v3a5.25 5.25 0 0 1-1.538 3.712ZM7.5 7.5a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m17.938 5.817.412-.614L19.67 3.5 22.172.14c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.879.879 0 0 1 0 .413.975.975 0 0 1-.16.387L22.42 8l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.048-.099.096.096 0 0 0-.037-.011l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--electricity_tower": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.969 24a.75.75 0 0 1-.69-.455l-1.323-3.089-6.238-3.119-6.236 3.118-1.324 3.089a.747.747 0 0 1-.984.396.752.752 0 0 1-.395-.985L6.832 13.5H2.874a1.127 1.127 0 0 1-.795-1.92l4.08-4.08H2.874c-.301 0-.583-.117-.795-.33a1.114 1.114 0 0 1-.329-.796c0-.3.117-.582.329-.794L7.439.22l.02-.019a.447.447 0 0 1 .035-.029.635.635 0 0 1 .054-.042l.02-.014a.718.718 0 0 1 .061-.033.438.438 0 0 1 .053-.026l.027-.01a.67.67 0 0 1 .128-.035c.027-.005.053-.007.079-.009A.47.47 0 0 1 7.969 0h7.487a.63.63 0 0 1 .075.005h.002c.012 0 .042.003.073.009l.059.014a.908.908 0 0 1 .094.031.522.522 0 0 1 .058.029c.01.004.028.013.046.025l.03.02a1.023 1.023 0 0 1 .089.071L21.36 5.58a1.122 1.122 0 0 1-.001 1.591 1.132 1.132 0 0 1-.795.329H17.28l4.08 4.08a1.122 1.122 0 0 1-.001 1.591 1.13 1.13 0 0 1-.795.329h-3.958l4.052 9.455A.751.751 0 0 1 19.969 24Zm-2.928-5.677-1.287-3.002-2.358 1.179 3.645 1.823Zm-10.644-.001 3.644-1.822-2.358-1.179-1.286 3.001Zm5.322-2.661 3.444-1.722-.188-.439H8.464l-.188.439 3.443 1.722ZM3.78 12h3.44V8.561L3.78 12Zm15.878 0-3.439-3.439V12h3.439Zm-5.542 0-2.397-3.835L9.323 12h4.793Zm-5.397-1.865 2.115-3.385-2.115-3.385v6.77Zm6 0v-6.77L12.604 6.75l2.115 3.385ZM3.78 6h3.44V2.561L3.78 6Zm15.878 0-3.439-3.439V6h3.439Zm-7.939-.665L14.116 1.5H9.323l2.396 3.835Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--elsmart-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 4.02a.77.77 0 0 0-.77-.77H4.5c-1.241 0-2.25 1.035-2.25 2.308v9.83L.194 20.005a2.336 2.336 0 0 0-.194.937c0 1.273 1.009 2.308 2.25 2.308v.001h19.5c.317 0 .624-.068.914-.199 1.134-.517 1.646-1.883 1.143-3.046L21.75 15.39V5.558c0-1.273-1.01-2.308-2.25-2.308h-2.23a.77.77 0 0 0 0 1.538h2.23a.76.76 0 0 1 .75.77v9.23H3.75v-9.23a.76.76 0 0 1 .75-.77h2.23a.77.77 0 0 0 .77-.769ZM1.561 20.636a.774.774 0 0 0-.061.305c0 .424.337.77.75.77h19.5a.73.73 0 0 0 .305-.067.778.778 0 0 0 .38-1.014l-1.917-4.305H3.482l-1.921 4.31Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M10.5 20.168a.76.76 0 0 1-.75-.769.76.76 0 0 1 .75-.769h3a.76.76 0 0 1 .75.77.76.76 0 0 1-.75.768h-3Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M14.536 7.194c.305.284.303.783-.05 1.003a3.862 3.862 0 0 1-.747.344 4.244 4.244 0 0 1-1.528.262 3.678 3.678 0 0 1-2.634-1.091 3.823 3.823 0 0 1-.786-1.208A3.82 3.82 0 0 1 8.5 5.019c0-.533.087-1.028.262-1.484.184-.466.432-.864.742-1.194.32-.34.699-.606 1.135-.8a3.436 3.436 0 0 1 1.412-.291c.495 0 .95.097 1.368.291.427.184.79.442 1.091.771.31.33.553.728.728 1.194.175.456.262.955.262 1.499a.407.407 0 0 1-.408.407h-4.977c.078.573.32 1.048.728 1.426a2.1 2.1 0 0 0 1.455.568c.34 0 .66-.058.96-.175.077-.03.149-.064.218-.1.34-.176.78-.199 1.06.063Zm-2.5-4.605a1.71 1.71 0 0 0-1.237.495c-.29.282-.492.646-.605 1.091a.19.19 0 0 0 .189.233h3.32c.125 0 .22-.113.188-.234a2.294 2.294 0 0 0-.618-1.076c-.34-.34-.752-.51-1.237-.51Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--exit_full_screen": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894ZM5.76 7.014c0 .425-.344.77-.767.77H.908a.768.768 0 0 1-.766-.77c0-.424.343-.769.766-.769h3.32V2.912c0-.425.342-.77.765-.77s.766.345.766.77v4.102ZM5.76 16.81a.768.768 0 0 0-.767-.77H.908a.768.768 0 0 0-.766.77c0 .424.343.769.766.769h3.32v3.333c0 .425.342.77.765.77a.768.768 0 0 0 .766-.77V16.81ZM18.832 7.784a.768.768 0 0 1-.766-.77V2.912c0-.425.343-.77.766-.77s.766.345.766.77v3.333h3.319c.423 0 .766.345.766.77 0 .424-.343.769-.766.769h-4.085ZM18.831 16.04a.768.768 0 0 0-.766.77v4.102c0 .425.343.77.766.77a.768.768 0 0 0 .766-.77V17.58h3.32a.768.768 0 0 0 .765-.77.768.768 0 0 0-.765-.769H18.83Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.458 2.544c.3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0-.3-.3-.3-.787 0-1.087l2.888-2.901c.3-.3.784-.3 1.083 0ZM4.514 17.467c.299.3.299.788 0 1.088l-2.889 2.901c-.3.3-.784.3-1.083 0-.3-.3-.3-.787 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0ZM.542 2.544c-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.784.301 1.083 0 .3-.3.3-.787 0-1.087L1.625 2.544c-.3-.3-.784-.3-1.083 0ZM19.486 17.467c-.299.3-.299.788 0 1.088l2.889 2.901c.3.3.784.3 1.083 0 .3-.3.3-.787 0-1.088l-2.888-2.9c-.3-.301-.784-.301-1.084 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--exit_full_screen-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.76 7.014c0 .425-.344.77-.767.77H.908a.768.768 0 0 1-.766-.77c0-.424.343-.769.766-.769h3.32V2.912c0-.425.342-.77.765-.77s.766.345.766.77v4.102ZM5.76 16.81a.768.768 0 0 0-.767-.77H.908a.768.768 0 0 0-.766.77c0 .424.343.769.766.769h3.32v3.333c0 .425.342.77.765.77a.768.768 0 0 0 .766-.77V16.81ZM18.832 7.784a.768.768 0 0 1-.766-.77V2.912c0-.425.343-.77.766-.77s.766.345.766.77v3.333h3.319c.423 0 .766.345.766.77 0 .424-.343.769-.766.769h-4.085ZM18.831 16.04a.768.768 0 0 0-.766.77v4.102c0 .425.343.77.766.77a.768.768 0 0 0 .766-.77V17.58h3.32a.768.768 0 0 0 .765-.77.768.768 0 0 0-.765-.769H18.83Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.458 2.544c.3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0-.3-.3-.3-.787 0-1.087l2.888-2.901c.3-.3.784-.3 1.083 0ZM4.514 17.467c.299.3.299.788 0 1.088l-2.889 2.901c-.3.3-.784.3-1.083 0-.3-.3-.3-.787 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0ZM.542 2.544c-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.784.301 1.083 0 .3-.3.3-.787 0-1.087L1.625 2.544c-.3-.3-.784-.3-1.083 0ZM19.486 17.467c-.299.3-.299.788 0 1.088l2.889 2.901c.3.3.784.3 1.083 0 .3-.3.3-.787 0-1.088l-2.888-2.9c-.3-.301-.784-.301-1.084 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--expand_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.813 15.393a1.149 1.149 0 0 1-1.626 0L6.95 11.157A.853.853 0 1 1 8.157 9.95L12 13.793l3.843-3.843a.853.853 0 0 1 1.207 1.207l-4.237 4.236Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--expand_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.813 15.393a1.149 1.149 0 0 1-1.626 0L6.95 11.157A.853.853 0 1 1 8.157 9.95L12 13.793l3.843-3.843a.853.853 0 0 1 1.207 1.207l-4.237 4.236Z" fill="#000"/></svg>', "e-icon--extension_cord": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.059 4.75a.05.05 0 0 0-.05.05v1.414a3.399 3.399 0 0 0 2.913 3.44c.093.006.186.005.28-.002a.746.746 0 0 1 .057-.002 3.25 3.25 0 0 0 3.25-3.25V4.808a.06.06 0 0 0-.058-.058h-6.392Zm-1.096-1.046a1.55 1.55 0 0 1 1.096-.454h6.41a1.56 1.56 0 0 1 1.54 1.54V6.4a4.75 4.75 0 0 1-4.722 4.75 3.469 3.469 0 0 1-.546-.007 4.9 4.9 0 0 1-4.232-4.954V4.8c0-.411.163-.805.454-1.096Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.859.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM20.659.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM18.259 9.65a.75.75 0 0 1 .75.75V16c0 2.114-.566 4.092-1.73 5.558-1.178 1.486-2.93 2.392-5.154 2.392-2.152 0-3.983-.657-5.278-1.926C5.55 20.753 4.87 18.944 4.87 16.8a8.7 8.7 0 0 1 .821-3.66c.524-1.095 1.336-2.093 2.447-2.513a.75.75 0 1 1 .531 1.402c-.606.23-1.186.843-1.625 1.759A7.2 7.2 0 0 0 6.37 16.8c0 1.823.572 3.215 1.528 4.152.958.939 2.38 1.498 4.228 1.498 1.777 0 3.091-.705 3.98-1.824.903-1.14 1.404-2.762 1.404-4.626v-5.6a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.277 12.324a5.46 5.46 0 0 0-2.218-.385c-1.122 0-2.247.621-3.118 1.598-.871.98-1.391 2.211-1.391 3.263a.75.75 0 0 1-1.5 0c0-1.498.712-3.071 1.771-4.26 1.058-1.188 2.557-2.096 4.226-2.1a6.957 6.957 0 0 1 7.162 7.233 8.515 8.515 0 0 1-2.41 5.836.75.75 0 0 1-1.075-1.045 7.015 7.015 0 0 0 1.985-4.842 5.456 5.456 0 0 0-3.432-5.298Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--facebook": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.74 0a11.235 11.235 0 0 1 8.984 4.463 11.254 11.254 0 0 1-4.915 17.281 11.233 11.233 0 0 1-9.63-.727l-6.106 2.91a.75.75 0 0 1-1-1l2.908-6.112A11.24 11.24 0 0 1 7.042 1.546 11.22 11.22 0 0 1 12.74 0Zm0 .75v.75a9.72 9.72 0 0 0-8.514 5.001 9.742 9.742 0 0 0 .241 9.878.75.75 0 0 1 .04.718l-2.172 4.567 4.561-2.174a.75.75 0 0 1 .72.04 9.736 9.736 0 0 0 14.512-5.611 9.758 9.758 0 0 0-1.6-8.551A9.744 9.744 0 0 0 12.741 1.5L12.74.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.273 4.05c-1.515 0-2.513.59-3.103 1.444-.562.814-.697 1.784-.697 2.486v.799H8.1a.65.65 0 0 0-.65.65v2.702c0 .359.291.65.65.65h1.373V18.2c0 .359.291.65.65.65h3.372a.65.65 0 0 0 .65-.65v-5.42h1.947a.65.65 0 0 0 .646-.582l.281-2.702a.65.65 0 0 0-.646-.717h-2.228v-.634a.655.655 0 0 0-.006-.086v-.003l.002-.003.002-.001h.034l1.11.004.902.003a.65.65 0 0 0 .653-.65V4.7a.65.65 0 0 0-.65-.65h-2.92Zm2.269 2.706V5.35h-2.27c-1.132 0-1.71.415-2.032.883-.351.508-.467 1.177-.467 1.747v1.449a.65.65 0 0 1-.65.65H8.75v1.402h1.373a.65.65 0 0 1 .65.65v5.419h2.072v-5.42a.65.65 0 0 1 .65-.65h2.01l.146-1.401h-2.156a.65.65 0 0 1-.65-.65V8.18a1.308 1.308 0 0 1 1.346-1.429l1.101.004h.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--fearless": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M13.87 24c-4.51-.16-8.12-3.77-8.28-8.22V9.75c0-.41.34-.75.75-.75s.75.34.75.75v6c.13 3.64 3.11 6.62 6.78 6.75 3.62-.13 6.59-3.11 6.72-6.78v-4.73c-2.25-.93-3.29-.66-5.18 1.18-.88.85-2.26.85-3.13 0-.34-.33-.7-.64-1.07-.93a.749.749 0 1 1 .91-1.19c.42.32.82.67 1.2 1.04.29.28.75.28 1.04 0 2.46-2.39 4.16-2.69 7.29-1.28.27.12.44.39.44.68v5.25c-.16 4.48-3.77 8.09-8.22 8.25V24Z"/><path d="M17.21 17.2c-.89 0-1.88-.27-2.96-.96a.76.76 0 0 0-.82 0c-3.49 2.26-6.06-.05-7.59-1.43a.756.756 0 0 1-.06-1.06c.28-.31.75-.33 1.06-.06 1.84 1.66 3.44 2.8 5.77 1.29.74-.48 1.7-.48 2.45 0 2.37 1.54 3.97.37 5.54-1.07l.24-.22c.31-.28.78-.25 1.06.05.28.31.25.78-.05 1.06l-.23.21c-.86.79-2.38 2.19-4.41 2.19Z"/><path d="M16.84 14.25c-.28 0-.54-.15-.67-.42a.745.745 0 0 1 .34-1.01l1.5-.75c.37-.19.82-.03 1.01.34.19.37.04.82-.34 1.01l-1.5.75a.8.8 0 0 1-.33.08h-.01ZM10.84 14.25c-.11 0-.23-.03-.33-.08l-1.5-.75a.763.763 0 0 1-.34-1.01c.19-.37.64-.52 1.01-.34l1.5.75c.37.19.52.64.34 1.01-.13.26-.4.42-.67.42h-.01ZM21.34 11.25c-.41 0-.75-.34-.75-.75V6.67c0-2.48-1.18-3.83-3.93-4.52-4.78-1.2-6.81-.47-8.43.11-1.32.47-2.57.92-4.63.1-.14.32-.14.67 0 1.08.39 1.16 1.97 2.58 3.96 2.93 1.22.22 2.97.11 4.38-1.66a.748.748 0 0 1 1.17.93c-1.46 1.83-3.53 2.61-5.82 2.2-2.34-.42-4.5-2.08-5.12-3.94-.36-1.11-.14-2.18.63-3a.73.73 0 0 1 .87-.16c1.85.89 2.68.59 4.06.1C9.45.22 11.8-.62 17.03.69c3.41.85 5.07 2.81 5.07 5.98v3.83c0 .41-.34.75-.75.75h-.01ZM14 21h-.19c-.92.05-1.92-.28-2.69-.92a.757.757 0 0 1-.1-1.06c.26-.32.74-.36 1.06-.1.49.4 1.1.61 1.74.58.7.03 1.32-.18 1.81-.58.32-.26.79-.22 1.06.1.26.32.22.79-.1 1.06-.73.6-1.63.93-2.57.93L14 21Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--feedback": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5 1.5 17.799 1.5 12ZM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm6.72 15.333a.75.75 0 0 0-1.344-.666A6 6 0 0 1 12 18a.75.75 0 0 0 0 1.5 7.5 7.5 0 0 0 6.72-4.167ZM8.25 7.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm6.704.33a1.125 1.125 0 1 1 1.591 1.59 1.125 1.125 0 0 1-1.59-1.59Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--filter": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.496 24c-.829 0-1.504-.698-1.504-1.555v-9.622C4.049 11.497.37 6.952.004 1.663.002 1.625 0 1.591 0 1.556c0-.414.156-.805.44-1.1A1.47 1.47 0 0 1 1.503 0h20.994a1.473 1.473 0 0 1 1.13.53c.264.312.396.712.37 1.128l-.001.01c-.37 5.288-4.05 9.832-8.992 11.155v7.03c0 .463-.197.898-.542 1.195l-3.005 2.591c-.27.232-.61.361-.961.361ZM1.504 1.555c.348 4.852 3.795 8.916 8.39 9.888a.774.774 0 0 1 .6.762v10.24l3.007-2.593v-7.647c0-.368.252-.689.601-.762 4.605-.972 8.057-5.039 8.395-9.89l-20.993.002Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--filter-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.992 22.445c0 .857.675 1.555 1.504 1.555.35 0 .691-.129.96-.36l3.006-2.592c.345-.297.543-.732.542-1.196v-7.03c4.943-1.322 8.622-5.866 8.992-11.154v-.01a1.582 1.582 0 0 0-.37-1.128 1.473 1.473 0 0 0-1.13-.53H1.504C1.101 0 .723.163.44.456.156.751 0 1.142 0 1.556c0 .035.002.069.004.107.367 5.289 4.045 9.834 8.988 11.16v9.622Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/></svg>', "e-icon--flag": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.1 13.07a8.86 8.86 0 0 0-3.725.322.75.75 0 1 1-.442-1.433 10.36 10.36 0 0 1 8.478 1.078 8.869 8.869 0 0 0 7.08.98.75.75 0 0 1 .412 1.442 10.364 10.364 0 0 1-8.278-1.145m-3.526-1.243a8.858 8.858 0 0 1 3.526 1.243l-3.526-1.243Z" fill="#262626"/><path d="M.75 24a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.88l2.184-.671a10.355 10.355 0 0 1 8.477 1.079 8.87 8.87 0 0 0 7.079.974l2.369-.677a1.867 1.867 0 0 1 1.839.476c.356.353.552.824.552 1.325v11.728c0 .833-.559 1.574-1.36 1.803l-2.987.854a10.362 10.362 0 0 1-8.278-1.145 8.853 8.853 0 0 0-7.25-.922l-2.625.808v4.988a.75.75 0 0 1-.75.75Zm5.981-8.438c1.919 0 3.796.531 5.43 1.537a8.874 8.874 0 0 0 7.08.98l2.987-.854a.377.377 0 0 0 .272-.361V5.137a.373.373 0 0 0-.48-.361l-2.368.677a10.372 10.372 0 0 1-8.278-1.138 8.853 8.853 0 0 0-7.25-.922L1.5 4.199v12.494l2.184-.672a10.352 10.352 0 0 1 3.047-.459Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--flag-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.187 12.47a9.975 9.975 0 0 1 4.324-.385c1.452.19 2.848.699 4.093 1.49a8.162 8.162 0 0 0 3.23 1.2c1.144.163 2.309.078 3.42-.249a.973.973 0 0 1 1.209.69 1.004 1.004 0 0 1-.67 1.233 9.976 9.976 0 0 1-4.23.306 10.081 10.081 0 0 1-3.988-1.48 8.152 8.152 0 0 0-3.312-1.206 8.067 8.067 0 0 0-3.497.311.972.972 0 0 1-1.223-.663 1.005 1.005 0 0 1 .644-1.247Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.974.95C2.54.95 3 1.409 3 1.974v21.952a1.024 1.024 0 0 1-2.049 0V1.974C.95 1.41 1.409.95 1.974.95Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 2.397a10.404 10.404 0 0 1 8.51 1.082 8.353 8.353 0 0 0 6.67.918l2.313-.66a2.123 2.123 0 0 1 2.703 2.04v12.555a2.122 2.122 0 0 1-1.539 2.04l-2.914.834a10.407 10.407 0 0 1-8.31-1.143 8.35 8.35 0 0 0-6.833-.869l-3.073.95a1.024 1.024 0 0 1-1.327-.98V4.322c0-.45.293-.846.723-.979l3.077-.946Zm4.114 1.656a8.355 8.355 0 0 0-3.511.302l-2.354.724v12.697l1.746-.54a10.4 10.4 0 0 1 8.512 1.082 8.354 8.354 0 0 0 6.673.918l2.914-.833a.073.073 0 0 0 .053-.07V5.777a.073.073 0 0 0-.03-.06.074.074 0 0 0-.064-.011l-2.31.66a10.403 10.403 0 0 1-8.306-1.143 8.355 8.355 0 0 0-3.323-1.171Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--flag-bold-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.187 12.47a9.975 9.975 0 0 1 4.324-.385c1.452.19 2.848.699 4.093 1.49a8.162 8.162 0 0 0 3.23 1.2c1.144.163 2.309.078 3.42-.249a.973.973 0 0 1 1.209.69 1.004 1.004 0 0 1-.67 1.233 9.976 9.976 0 0 1-4.23.306 10.081 10.081 0 0 1-3.988-1.48 8.152 8.152 0 0 0-3.312-1.206 8.067 8.067 0 0 0-3.497.311.972.972 0 0 1-1.223-.663 1.005 1.005 0 0 1 .644-1.247Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.974.95C2.54.95 3 1.409 3 1.974v21.952a1.024 1.024 0 0 1-2.049 0V1.974C.95 1.41 1.409.95 1.974.95Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 2.397a10.404 10.404 0 0 1 8.51 1.082 8.353 8.353 0 0 0 6.67.918l2.313-.66a2.123 2.123 0 0 1 2.703 2.04v12.555a2.122 2.122 0 0 1-1.539 2.04l-2.914.834a10.407 10.407 0 0 1-8.31-1.143 8.35 8.35 0 0 0-6.833-.869l-3.073.95a1.024 1.024 0 0 1-1.327-.98V4.322c0-.45.293-.846.723-.979l3.077-.946Zm4.114 1.656a8.355 8.355 0 0 0-3.511.302l-2.354.724v12.697l1.746-.54a10.4 10.4 0 0 1 8.512 1.082 8.354 8.354 0 0 0 6.673.918l2.914-.833a.073.073 0 0 0 .053-.07V5.777a.073.073 0 0 0-.03-.06.074.074 0 0 0-.064-.011l-2.31.66a10.403 10.403 0 0 1-8.306-1.143 8.355 8.355 0 0 0-3.323-1.171Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--flag-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.1 13.07a8.86 8.86 0 0 0-3.725.322.75.75 0 1 1-.442-1.433 10.36 10.36 0 0 1 8.478 1.078 8.869 8.869 0 0 0 7.08.98.75.75 0 0 1 .412 1.442 10.364 10.364 0 0 1-8.278-1.145m-3.526-1.243a8.858 8.858 0 0 1 3.526 1.243l-3.526-1.243Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M.75 24a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.88l2.184-.671a10.355 10.355 0 0 1 8.477 1.079 8.87 8.87 0 0 0 7.079.974l2.369-.677a1.867 1.867 0 0 1 1.839.476c.356.353.552.824.552 1.325v11.728c0 .833-.559 1.574-1.36 1.803l-2.987.854a10.362 10.362 0 0 1-8.278-1.145 8.853 8.853 0 0 0-7.25-.922l-2.625.808v4.988a.75.75 0 0 1-.75.75Zm5.981-8.438c1.919 0 3.796.531 5.43 1.537a8.874 8.874 0 0 0 7.08.98l2.987-.854a.377.377 0 0 0 .272-.361V5.137a.373.373 0 0 0-.48-.361l-2.368.677a10.372 10.372 0 0 1-8.278-1.138 8.853 8.853 0 0 0-7.25-.922L1.5 4.199v12.494l2.184-.672a10.352 10.352 0 0 1 3.047-.459Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--folder": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.571 22.5C1.153 22.5 0 21.323 0 19.875V4.125C0 2.677 1.153 1.5 2.571 1.5h4.286c.805 0 1.574.392 2.057 1.05l1.8 2.45H21.43C22.847 5 24 6.177 24 7.625v12.25c0 1.448-1.153 2.625-2.571 2.625H2.57Zm0-19.25a.867.867 0 0 0-.857.875v15.75c0 .483.384.875.857.875H21.43a.867.867 0 0 0 .857-.875V7.625a.867.867 0 0 0-.857-.875H10.286A.855.855 0 0 1 9.6 6.4L7.543 3.6a.855.855 0 0 0-.686-.35H2.571Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--folder_create": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.447 19.5a.725.725 0 0 1-.231-.037A2.465 2.465 0 0 1 0 17.06V2.25A2.252 2.252 0 0 1 2.25 0h4.5C7.99 0 9 1.009 9 2.25V3h9.75C19.99 3 21 4.009 21 5.25V7.5h.75c.601 0 1.166.234 1.591.658a2.235 2.235 0 0 1 .583 2.171.752.752 0 0 1-.919.531.747.747 0 0 1-.53-.918A.746.746 0 0 0 21.75 9H7.879a.755.755 0 0 0-.722.542l-2.351 8.154a2.337 2.337 0 0 1-.108.304H8.25a.75.75 0 0 1 0 1.5H2.447Zm-.197-18a.75.75 0 0 0-.75.75v14.8a.95.95 0 0 0 1.864.235l2.352-8.158A2.261 2.261 0 0 1 7.878 7.5H19.5V5.25a.75.75 0 0 0-.75-.75H8.25a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 0-.75-.75h-4.5Zm15 22.5a6.758 6.758 0 0 1-6.75-6.75 6.758 6.758 0 0 1 6.75-6.75A6.758 6.758 0 0 1 24 17.25 6.758 6.758 0 0 1 17.25 24Zm0-12A5.256 5.256 0 0 0 12 17.25a5.256 5.256 0 0 0 5.25 5.25 5.256 5.256 0 0 0 5.25-5.25A5.256 5.256 0 0 0 17.25 12Zm-.75 8.25a.75.75 0 0 0 1.5 0V18h2.25a.75.75 0 0 0 0-1.5H18v-2.25a.75.75 0 0 0-1.5 0v2.25h-2.25a.75.75 0 0 0 0 1.5h2.25v2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--folder_open": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.447 22.5a.731.731 0 0 1-.223-.034A2.464 2.464 0 0 1 0 20.06V3.75A2.252 2.252 0 0 1 2.25 1.5h4.5C7.99 1.5 9 2.509 9 3.75v.75h9.75C19.99 4.5 21 5.509 21 6.75V9h.75c.601 0 1.166.234 1.591.658a2.235 2.235 0 0 1 .583 2.171l-2.196 8.985A2.258 2.258 0 0 1 19.55 22.5H2.447ZM19.55 21a.75.75 0 0 0 .725-.557l2.196-8.985a.746.746 0 0 0-.721-.958H7.878a.754.754 0 0 0-.721.541l-2.342 9.625a2.81 2.81 0 0 1-.119.334H19.55ZM2.25 3a.75.75 0 0 0-.75.75v16.3a.95.95 0 0 0 1.864.235l2.344-9.631A2.276 2.276 0 0 1 7.877 9H19.5V6.75a.75.75 0 0 0-.75-.75H8.25a.75.75 0 0 1-.75-.75v-1.5A.75.75 0 0 0 6.75 3h-4.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--form_check-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.032 3.73a.603.603 0 0 1 .83-.115.568.568 0 0 1 .118.808L6.698 7.37a.598.598 0 0 1-.433.228.597.597 0 0 1-.46-.167l-1.63-1.578a.563.563 0 0 1 0-.816.597.597 0 0 1 .418-.169c.158 0 .308.06.42.169l1.147 1.11L8.032 3.73Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M0 18.75C0 19.991 1.01 21 2.253 21h5.256a.75.75 0 1 0 0-1.5H2.253a.75.75 0 0 1-.751-.75V2.25a.75.75 0 0 1 .75-.75h10.642c.2 0 .388.078.53.219L16.3 4.591c.139.14.219.333.219.53V8.25a.75.75 0 0 0 1.502 0V5.12c0-.6-.235-1.165-.66-1.59L14.486.658A2.24 2.24 0 0 0 12.894 0H2.253A2.254 2.254 0 0 0 0 2.25v16.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.733 23.78a.744.744 0 0 0 .679.204l3.753-.75c.146-.029.28-.1.385-.205l7.638-7.63.021-.022c1.065-1.155 1.056-2.926-.036-4.045a2.854 2.854 0 0 0-2.022-.832c-.767 0-1.488.298-2.028.839l-7.639 7.63a.747.747 0 0 0-.205.384l-.751 3.75c-.05.246.027.5.205.677Zm3.915-1.971-2.427.485.485-2.424 7.479-7.47c.257-.258.6-.4.965-.4v-.375l.001.375c.364 0 .706.14.946.379l.021.022c.506.519.5 1.397.001 1.945l-7.471 7.463Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M4 10.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM4.75 13a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--form": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 18.75C0 19.991 1.01 21 2.253 21h5.256a.75.75 0 1 0 0-1.5H2.253a.75.75 0 0 1-.751-.75V2.25a.75.75 0 0 1 .75-.75h10.642c.2 0 .388.078.53.219L16.3 4.591c.139.14.219.333.219.53V8.25a.75.75 0 0 0 1.502 0V5.12c0-.6-.235-1.165-.66-1.59L14.486.658A2.24 2.24 0 0 0 12.894 0H2.253A2.254 2.254 0 0 0 0 2.25v16.5ZM4.844 6C4.378 6 4 6.336 4 6.75s.378.75.844.75h7.312c.466 0 .844-.336.844-.75S12.622 6 12.156 6H4.844ZM4 10.25c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 11 4 10.664 4 10.25ZM10.78 24a.773.773 0 0 1-.551-.228.771.771 0 0 1-.213-.702l.779-3.89a.775.775 0 0 1 .213-.397l7.93-7.913a2.958 2.958 0 0 1 2.105-.87c.793 0 1.538.307 2.1.863 1.132 1.16 1.141 2.997.037 4.195a.437.437 0 0 1-.022.022l-7.93 7.913a.773.773 0 0 1-.399.213l-3.896.777a.713.713 0 0 1-.154.017Zm.993-1.77 2.519-.502 7.756-7.74c.518-.568.524-1.478-.001-2.017l-.022-.022a1.393 1.393 0 0 0-.982-.393l-.001-.39v.39c-.378 0-.735.147-1.002.414l-7.763 7.747-.504 2.514ZM4 13.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--form-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10.25c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 11 4 10.664 4 10.25ZM4 6.75c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 7.5 4 7.164 4 6.75ZM4 13.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M10.78 24a.773.773 0 0 1-.551-.228.771.771 0 0 1-.213-.702l.779-3.89a.775.775 0 0 1 .213-.397l7.93-7.913a2.958 2.958 0 0 1 2.105-.87c.793 0 1.538.307 2.1.863 1.132 1.16 1.141 2.997.037 4.195a.437.437 0 0 1-.022.022l-7.93 7.913a.773.773 0 0 1-.399.213l-3.896.777a.713.713 0 0 1-.154.017Zm.993-1.77 2.519-.502 7.756-7.74c.518-.568.524-1.478-.001-2.017l-.022-.022a1.393 1.393 0 0 0-.982-.393l-.001-.39v.39c-.378 0-.735.147-1.002.414l-7.763 7.747-.504 2.514ZM2.253 21A2.253 2.253 0 0 1 0 18.75V2.25A2.254 2.254 0 0 1 2.253 0h10.64a2.24 2.24 0 0 1 1.593.658L17.36 3.53c.425.425.66.99.66 1.59v3.13a.75.75 0 0 1-1.502 0V5.121c0-.197-.08-.39-.22-.53l-2.875-2.872a.749.749 0 0 0-.53-.219H2.253a.75.75 0 0 0-.751.75v16.5c0 .414.336.75.75.75H7.51a.75.75 0 1 1 0 1.5H2.253Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--full_battery": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5.5H3.201c-.849 0-1.663.342-2.263.952C.338 7.062 0 7.888 0 8.75v6.5c0 .862.337 1.689.937 2.298.6.61 1.414.952 2.263.952h1.792s.814 0 .814-.813c0-.812-.814-.812-.814-.812H3.2c-.424 0-.831-.171-1.131-.476A1.638 1.638 0 0 1 1.6 15.25v-6.5c0-.431.169-.844.47-1.149.3-.305.707-.476 1.131-.476H5s.806 0 .806-.813C5.806 5.5 5 5.5 5 5.5ZM15.364 16.875H17.6c.424 0 .831-.171 1.131-.476.3-.305.469-.718.469-1.149v-.813c0-.448.358-.812.8-.812h1.6a.794.794 0 0 0 .566-.238.819.819 0 0 0 .234-.575v-1.624a.819.819 0 0 0-.234-.575.794.794 0 0 0-.566-.238H20a.806.806 0 0 1-.8-.813V8.75c0-.431-.169-.844-.469-1.149a1.588 1.588 0 0 0-1.131-.476h-2.21s-.89 0-.89-.813c0-.812.89-.812.89-.812h2.21c.849 0 1.663.342 2.263.952.6.61.937 1.436.937 2.298h.8c.636 0 1.247.257 1.697.714.45.457.703 1.077.703 1.723v1.626c0 .646-.253 1.266-.703 1.723-.45.457-1.06.714-1.697.714h-.8c0 .862-.337 1.689-.937 2.298-.6.61-1.414.952-2.263.952h-2.236s-.864 0-.864-.813c0-.812.864-.812.864-.812ZM6.725 11.802l.447-.665 1.43-1.845 2.71-3.64c.19-.262.61-.159.615.114.006.272-.593 4.085-.691 4.684a.088.088 0 0 0 .043.088c.01.006.021.01.033.01l1.324.213c.15.022.29.093.397.202.109.106.188.24.23.386.034.147.034.3 0 .447-.028.15-.087.294-.175.42l-1.507 1.95-3.124 4.21a.3.3 0 0 1-.348.104.294.294 0 0 1-.18-.321l.67-4.576a.104.104 0 0 0-.093-.12l-1.302-.207a.856.856 0 0 1-.632-.463.975.975 0 0 1 .153-.991Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--full_battery-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5.5H3.201c-.849 0-1.663.342-2.263.952C.338 7.062 0 7.888 0 8.75v6.5c0 .862.337 1.689.937 2.298.6.61 1.414.952 2.263.952h1.792s.814 0 .814-.813c0-.812-.814-.812-.814-.812H3.2c-.424 0-.831-.171-1.131-.476A1.638 1.638 0 0 1 1.6 15.25v-6.5c0-.431.169-.844.47-1.149.3-.305.707-.476 1.131-.476H5s.806 0 .806-.813C5.806 5.5 5 5.5 5 5.5ZM15.364 16.875H17.6c.424 0 .831-.171 1.131-.476.3-.305.469-.718.469-1.149v-.813c0-.448.358-.812.8-.812h1.6a.794.794 0 0 0 .566-.238.819.819 0 0 0 .234-.575v-1.624a.819.819 0 0 0-.234-.575.794.794 0 0 0-.566-.238H20a.806.806 0 0 1-.8-.813V8.75c0-.431-.169-.844-.469-1.149a1.588 1.588 0 0 0-1.131-.476h-2.21s-.89 0-.89-.813c0-.812.89-.812.89-.812h2.21c.849 0 1.663.342 2.263.952.6.61.937 1.436.937 2.298h.8c.636 0 1.247.257 1.697.714.45.457.703 1.077.703 1.723v1.626c0 .646-.253 1.266-.703 1.723-.45.457-1.06.714-1.697.714h-.8c0 .862-.337 1.689-.937 2.298-.6.61-1.414.952-2.263.952h-2.236s-.864 0-.864-.813c0-.812.864-.812.864-.812Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m6.725 11.802.447-.665 1.43-1.845 2.71-3.64c.19-.262.61-.159.615.114.006.272-.593 4.085-.691 4.684a.088.088 0 0 0 .043.088c.01.006.021.01.033.01l1.324.213c.15.022.29.093.397.202.109.106.188.24.23.386.034.147.034.3 0 .447-.028.15-.087.294-.175.42l-1.507 1.95-3.124 4.21a.3.3 0 0 1-.348.104.294.294 0 0 1-.18-.321l.67-4.576a.104.104 0 0 0-.093-.12l-1.302-.207a.856.856 0 0 1-.632-.463.975.975 0 0 1 .153-.991Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--full_screen": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894ZM0 2.77C0 2.343.343 2 .766 2h4.085c.423 0 .766.344.766.77 0 .424-.343.768-.766.768h-3.32v3.334c0 .425-.342.769-.765.769A.768.768 0 0 1 0 6.871V2.77ZM0 21.23c0 .426.343.77.766.77h4.085a.768.768 0 0 0 .766-.77.768.768 0 0 0-.766-.768h-3.32v-3.334a.768.768 0 0 0-.765-.769.768.768 0 0 0-.766.77v4.102ZM23.234 2c.423 0 .766.344.766.77v4.102c0 .425-.343.769-.766.769a.768.768 0 0 1-.766-.77V3.539h-3.32a.768.768 0 0 1-.765-.769c0-.425.343-.769.766-.769h4.085ZM23.234 22a.768.768 0 0 0 .766-.77v-4.102a.768.768 0 0 0-.766-.769.768.768 0 0 0-.766.77v3.332h-3.32a.768.768 0 0 0-.765.77c0 .425.343.769.766.769h4.085Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.608 7.24c-.3-.3-.3-.788 0-1.088l2.888-2.901c.3-.3.784-.3 1.083 0 .3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0ZM1.246 20.573c-.3-.3-.3-.788 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0 .299.3.299.787 0 1.087l-2.89 2.901c-.298.3-.783.3-1.082 0ZM5.218 7.24c.299-.3.299-.788 0-1.088L2.329 3.25c-.3-.3-.784-.3-1.083 0-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.785.301 1.084 0ZM22.579 20.573c.3-.3.3-.788 0-1.088l-2.889-2.9c-.299-.301-.784-.301-1.083 0-.299.3-.299.787 0 1.087l2.889 2.901c.299.3.784.3 1.083 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--full_screen-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.77C0 2.343.343 2 .766 2h4.085c.423 0 .766.344.766.77 0 .424-.343.768-.766.768h-3.32v3.334c0 .425-.342.769-.765.769A.768.768 0 0 1 0 6.871V2.77ZM0 21.23c0 .426.343.77.766.77h4.085a.768.768 0 0 0 .766-.77.768.768 0 0 0-.766-.768h-3.32v-3.334a.768.768 0 0 0-.765-.769.768.768 0 0 0-.766.77v4.102ZM23.234 2c.423 0 .766.344.766.77v4.102c0 .425-.343.769-.766.769a.768.768 0 0 1-.766-.77V3.539h-3.32a.768.768 0 0 1-.765-.769c0-.425.343-.769.766-.769h4.085ZM23.234 22a.768.768 0 0 0 .766-.77v-4.102a.768.768 0 0 0-.766-.769.768.768 0 0 0-.766.77v3.332h-3.32a.768.768 0 0 0-.765.77c0 .425.343.769.766.769h4.085Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.608 7.24c-.3-.3-.3-.788 0-1.088l2.888-2.901c.3-.3.784-.3 1.083 0 .3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0ZM1.246 20.573c-.3-.3-.3-.788 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0 .299.3.299.787 0 1.087l-2.89 2.901c-.298.3-.783.3-1.082 0ZM5.218 7.24c.299-.3.299-.788 0-1.088L2.329 3.25c-.3-.3-.784-.3-1.083 0-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.785.301 1.084 0ZM22.579 20.573c.3-.3.3-.788 0-1.088l-2.889-2.9c-.299-.301-.784-.301-1.083 0-.299.3-.299.787 0 1.087l2.889 2.901c.299.3.784.3 1.083 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--freshchat-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.887 10.35c0-.414.35-.75.783-.75h10.174c.432 0 .782.336.782.75s-.35.75-.782.75H7.67c-.433 0-.783-.336-.783-.75ZM6.887 13.35c0-.414.35-.75.783-.75h7.043c.432 0 .783.336.783.75s-.35.75-.783.75H7.67c-.433 0-.783-.336-.783-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1.5h-9C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12V3A1.5 1.5 0 0 0 21 1.5ZM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12V3a3 3 0 0 0-3-3h-9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--future": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12.739c0-1.493-.301-2.886-.904-4.28a.858.858 0 0 0-.402-.398c-.2-.1-.402-.1-.602 0a.749.749 0 0 0-.503.697c0 .1.03.132.1.299.503 1.194.704 2.388.704 3.682 0 2.488-.904 4.777-2.712 6.568-1.808 1.792-4.219 2.887-6.73 2.986-2.612.1-5.022-.896-6.93-2.687-1.91-1.792-3.014-4.28-3.014-6.867 0-2.488.904-4.777 2.712-6.569 1.707-1.691 4.018-2.786 6.328-2.985 2.11-.1 4.219.398 6.027 1.592H14.66c-.402 0-.804.398-.804.796s.402.796.804.796h4.821c.402 0 .804-.398.804-.796V.796A.788.788 0 0 0 19.482 0a.788.788 0 0 0-.803.796v2.787c-1.909-1.294-4.32-2.09-6.63-1.99-.2 0-.502 0-.803.099H10.944c-2.712.298-5.022 1.493-6.83 3.384A11.196 11.196 0 0 0 1 12.838c0 1.493.301 2.887.904 4.28 0 .1.1.199.2.298.604 1.294 1.407 2.488 2.512 3.484 4.52 4.28 11.652 4.08 15.971-.299 1.808-2.19 2.913-4.976 2.913-7.862Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M16.798 17.8a.792.792 0 0 1-.565-.234l-5-5a.79.79 0 0 1-.173-.262l-.01-.027A.786.786 0 0 1 11 12V8a.8.8 0 0 1 1.6 0v3.668l4.765 4.766A.794.794 0 0 1 17.6 17a.802.802 0 0 1-.801.801Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--graph_bar": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 10.75A2.252 2.252 0 0 0 4.5 13a2.252 2.252 0 0 0 2.25-2.25c0-.411-.115-.816-.327-1.166l4.818-5.218c.244.088.509.134.762.134.892 0 1.497-.562 1.497-.562L17.38 6.5s-.13.25-.13.75c0 1.25 1.009 2.25 2.25 2.25a2.252 2.252 0 0 0 2.25-2.25A2.252 2.252 0 0 0 19.5 5c-.5 0-1.1.28-1.1.28L14.22 2.6C14.5 1 13.166 0 12.003 0a2.252 2.252 0 0 0-2.25 2.25c0 .411.115.816.327 1.166L5.262 8.634A2.252 2.252 0 0 0 2.25 10.75ZM4.5 10a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm15-3.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-7.497-5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM0 23.25c0 .414.336.75.75.75h22.5a.75.75 0 0 0 0-1.5h-.75V15c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v7.5H15v-12c0-.827-.673-1.5-1.5-1.5h-3C9.673 9 9 9.673 9 10.5v12H7.5V18c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5v4.5H.75a.75.75 0 0 0-.75.75ZM21 15v7.5h-3V15h3Zm-7.5-4.5v12h-3v-12h3ZM6 18v4.5H3V18h3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--graph_bar-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 24a.75.75 0 0 1 0-1.5h.75V18c0-.827.673-1.5 1.5-1.5h3c.827 0 1.5.673 1.5 1.5v4.5H9v-12c0-.827.673-1.5 1.5-1.5h3c.827 0 1.5.673 1.5 1.5v12h1.5V15c0-.827.673-1.5 1.5-1.5h3c.827 0 1.5.673 1.5 1.5v7.5h.75a.75.75 0 0 1 0 1.5H.75ZM21 22.5V15h-3v7.5h3Zm-7.5 0v-12h-3v12h3Zm-7.5 0V18H3v4.5h3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 13a2.252 2.252 0 0 1-2.25-2.25 2.252 2.252 0 0 1 3.012-2.116l4.818-5.218a2.257 2.257 0 0 1-.327-1.166A2.252 2.252 0 0 1 12.003 0c1.163 0 2.497 1 2.217 2.6l4.18 2.68S19 5 19.5 5a2.252 2.252 0 0 1 2.25 2.25A2.252 2.252 0 0 1 19.5 9.5c-1.241 0-2.25-1-2.25-2.25 0-.5.13-.75.13-.75L13.5 3.938s-.605.562-1.497.562c-.253 0-.518-.046-.762-.134L6.423 9.584c.212.35.327.755.327 1.166A2.252 2.252 0 0 1 4.5 13Zm-.75-2.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm15-3.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm-7.497-5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--graph_down": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 23.25c0 .414.336.75.75.75h22.5a.75.75 0 0 0 0-1.5h-.75V19c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v3.5H15v-6c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v6H7.5V13c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5v9.5H.75a.75.75 0 0 0-.75.75ZM21 19v3.5h-3V19h3Zm-7.5-2.5v6h-3v-6h3ZM6 13v9.5H3V13h3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M.75 0C.55 0 .361.078.22.22A.743.743 0 0 0 0 .75c0 .2.078.389.22.53l7.189 7.189c.425.425.99.658 1.592.658.602 0 1.167-.234 1.591-.658l3.128-3.128a.747.747 0 0 1 1.062 0L21.441 12H16.5a.75.75 0 0 0 0 1.5h6.75a.735.735 0 0 0 .261-.048l.032-.012a.75.75 0 0 0 .401-.405l.01-.026A.751.751 0 0 0 24 12.75V6a.75.75 0 0 0-1.5 0v4.939L15.841 4.28a2.235 2.235 0 0 0-1.592-.658 2.23 2.23 0 0 0-1.59.658L9.53 7.409a.744.744 0 0 1-.53.219.746.746 0 0 1-.53-.219L1.28.22A.743.743 0 0 0 .75 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--graph_down-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 23.25c0 .414.336.75.75.75h22.5a.75.75 0 0 0 0-1.5h-.75V19c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v3.5H15v-6c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v6H7.5V13c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5v9.5H.75a.75.75 0 0 0-.75.75ZM21 19v3.5h-3V19h3Zm-7.5-2.5v6h-3v-6h3ZM6 13v9.5H3V13h3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M.75 0C.55 0 .361.078.22.22A.743.743 0 0 0 0 .75c0 .2.078.389.22.53l7.189 7.189c.425.425.99.658 1.592.658.602 0 1.167-.234 1.591-.658l3.128-3.128a.747.747 0 0 1 1.062 0L21.441 12H16.5a.75.75 0 0 0 0 1.5h6.75a.735.735 0 0 0 .261-.048l.032-.012a.75.75 0 0 0 .401-.405l.01-.026A.751.751 0 0 0 24 12.75V6a.75.75 0 0 0-1.5 0v4.939L15.841 4.28a2.235 2.235 0 0 0-1.592-.658 2.23 2.23 0 0 0-1.59.658L9.53 7.409a.744.744 0 0 1-.53.219.746.746 0 0 1-.53-.219L1.28.22A.743.743 0 0 0 .75 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--graph_up": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.22 13.28c.141.142.33.22.53.22s.389-.078.53-.22l7.19-7.189A.746.746 0 0 1 9 5.872c.201 0 .389.078.53.219l3.129 3.129a2.23 2.23 0 0 0 1.59.658c.602 0 1.167-.233 1.592-.658L22.5 2.561V7.5a.75.75 0 0 0 1.5 0V.75a.751.751 0 0 0-.052-.276l-.004-.009a.75.75 0 0 0-.401-.405l-.032-.012A.735.735 0 0 0 23.25 0H16.5a.75.75 0 0 0 0 1.5h4.941l-6.659 6.659a.747.747 0 0 1-1.062 0l-3.128-3.128a2.235 2.235 0 0 0-1.591-.658c-.602 0-1.167.233-1.592.658L.22 12.22a.743.743 0 0 0-.22.53c0 .2.078.389.22.53ZM0 23.25c0 .414.336.75.75.75h22.5a.75.75 0 0 0 0-1.5h-.75V15c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v7.5H15v-7c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v7H7.5V18c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5v4.5H.75a.75.75 0 0 0-.75.75ZM21 15v7.5h-3V15h3Zm-7.5.5v7h-3v-7h3ZM6 18v4.5H3V18h3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--ground_fault": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.249 23a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066l10.19-10.246A2.229 2.229 0 0 1 12 1c.601 0 1.166.235 1.591.662l2.206 2.218 3.83 3.858.373.39a.76.76 0 0 1 0 1.066.742.742 0 0 1-1.06 0l-.814-.83L12.53 2.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28H16s1 0 1 .754S16 23 16 23h-1.751Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m17.754 16.817.425-.614L19.54 14.5l2.58-3.36c.181-.242.58-.146.586.105.005.252-.565 3.772-.659 4.325a.077.077 0 0 0 .017.06.083.083 0 0 0 .056.03l1.26.196a.67.67 0 0 1 .379.186.8.8 0 0 1 .217.357.854.854 0 0 1 0 .413.96.96 0 0 1-.166.387L22.376 19l-2.973 3.886a.294.294 0 0 1-.332.096.278.278 0 0 1-.14-.12.265.265 0 0 1-.031-.177l.638-4.224a.093.093 0 0 0-.02-.074.098.098 0 0 0-.068-.036l-1.24-.191a.828.828 0 0 1-.354-.143.797.797 0 0 1-.247-.285.874.874 0 0 1 .145-.915Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--ground_fault-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.249 23a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066l10.19-10.246A2.229 2.229 0 0 1 12 1c.601 0 1.166.235 1.591.662l2.206 2.218 3.83 3.858.373.39a.76.76 0 0 1 0 1.066.742.742 0 0 1-1.06 0l-.814-.83L12.53 2.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28H16s1 0 1 .754S16 23 16 23h-1.751Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m17.754 16.817.425-.614L19.54 14.5l2.58-3.36c.181-.242.58-.146.586.105.005.252-.565 3.772-.659 4.325a.077.077 0 0 0 .017.06.083.083 0 0 0 .056.03l1.26.196a.67.67 0 0 1 .379.186.8.8 0 0 1 .217.357.854.854 0 0 1 0 .413.96.96 0 0 1-.166.387L22.376 19l-2.973 3.886a.294.294 0 0 1-.332.096.278.278 0 0 1-.14-.12.265.265 0 0 1-.031-.177l.638-4.224a.093.093 0 0 0-.02-.074.098.098 0 0 0-.068-.036l-1.24-.191a.828.828 0 0 1-.354-.143.797.797 0 0 1-.247-.285.874.874 0 0 1 .145-.915Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--hammer_wrench-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.31 11.204a.747.747 0 0 1-.53-.22l-.693-.69a5.226 5.226 0 0 1-1.787.313 5.28 5.28 0 0 1-1.761-.304A5.27 5.27 0 0 1 .522 7.591a5.299 5.299 0 0 1-.007-4.573.751.751 0 0 1 .676-.43c.2 0 .39.079.53.22l1.426 1.425c.15.155.338.236.545.238h.039c.232 0 .402-.119.504-.218a.763.763 0 0 0 .23-.54.754.754 0 0 0-.215-.543L2.81 1.732a.754.754 0 0 1 .206-1.21A5.239 5.239 0 0 1 7.06.304a5.263 5.263 0 0 1 3.013 2.714 5.326 5.326 0 0 1 .213 4.066l.615.614c.293.293.293.77.003 1.064a.746.746 0 0 1-1.06.002l-.972-.97a.756.756 0 0 1-.148-.856 3.794 3.794 0 0 0-.004-3.272 3.77 3.77 0 0 0-2.158-1.945 3.783 3.783 0 0 0-1.816-.178l.574.574c.425.436.653 1.008.646 1.614a2.258 2.258 0 0 1-.682 1.597 2.251 2.251 0 0 1-1.583.647h-.025a2.256 2.256 0 0 1-1.594-.684L1.54 4.75c-.108.741.005 1.5.336 2.191a3.771 3.771 0 0 0 2.161 1.943 3.746 3.746 0 0 0 2.9-.157.743.743 0 0 1 .853.145L8.839 9.92a.749.749 0 0 1 .002 1.064.744.744 0 0 1-.531.221ZM18.7 24a5.28 5.28 0 0 1-1.766-.305 5.263 5.263 0 0 1-3.013-2.715 5.321 5.321 0 0 1-.213-4.064L12.64 15.85a.755.755 0 0 1-.001-1.064.746.746 0 0 1 1.061-.001l1.423 1.422a.758.758 0 0 1 .148.855 3.793 3.793 0 0 0 .003 3.27 3.769 3.769 0 0 0 2.159 1.946 3.784 3.784 0 0 0 1.814.177l-.546-.545a2.291 2.291 0 0 1-.003-3.185 2.245 2.245 0 0 1 1.616-.679c.598 0 1.16.231 1.586.65l.551.55a3.792 3.792 0 0 0-.335-2.186 3.817 3.817 0 0 0-3.429-2.16c-.567 0-1.116.125-1.632.373a.75.75 0 0 1-.852-.145l-1.424-1.423a.754.754 0 0 1 .53-1.284c.2 0 .389.078.53.22l1.067 1.066a5.226 5.226 0 0 1 1.78-.31 5.324 5.324 0 0 1 4.782 3.014 5.29 5.29 0 0 1 .007 4.568.747.747 0 0 1-1.206.21l-1.425-1.423a.753.753 0 0 0-.531-.216.754.754 0 0 0-.546.23.77.77 0 0 0-.002 1.072l1.418 1.416a.755.755 0 0 1-.207 1.212 5.223 5.223 0 0 1-2.277.52Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M3 24c-.8 0-1.554-.31-2.12-.872a2.982 2.982 0 0 1-.012-4.218l4.714-4.696c.284-.282.66-.437 1.061-.437.401 0 .778.155 1.061.437l.44.436 6.3-6.081-2.64-2.626a2.238 2.238 0 0 1-.007-3.165L13.925.661c.424-.423.99-.656 1.592-.656.602 0 1.167.232 1.59.654l6.233 6.198c.425.422.659.983.66 1.58a2.22 2.22 0 0 1-.653 1.585l-.031.03-2.097 2.09a2.24 2.24 0 0 1-1.592.656 2.24 2.24 0 0 1-1.59-.655l-2.528-2.514-6.302 6.081.62.616c.283.283.439.658.439 1.058a1.488 1.488 0 0 1-.473 1.09l-4.671 4.654A2.988 2.988 0 0 1 3 24Zm-1.06-4.039A1.487 1.487 0 0 0 3 22.501c.402 0 .78-.156 1.062-.437l4.703-4.683L7.6 16.227l-.956-.95-4.702 4.684ZM15.52 1.505c-.2 0-.39.078-.531.217l-2.121 2.11a.743.743 0 0 0-.001 1.05l6.232 6.198c.141.141.33.218.531.218s.39-.077.531-.218l2.12-2.112a.733.733 0 0 0 0-1.048L16.049 1.72a.748.748 0 0 0-.53-.216Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--han": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.76 11.434 13.698.792C13.271.226 12.629 0 11.987 0c-.643 0-1.285.34-1.713.792L.214 11.434A.892.892 0 0 0 0 12c0 .226.107.453.214.566a.795.795 0 0 0 .535.226.795.795 0 0 0 .535-.226l1.82-1.925v11.434c0 .567.428.906.856.906h2.76s.937.075.937-.831c0-.906-.937-.867-.937-.867H4.71V8.943l6.742-7.132a.795.795 0 0 1 .536-.226c.107 0 .32.113.535.34l10.167 10.754a.795.795 0 0 0 .535.227.795.795 0 0 0 .535-.227.925.925 0 0 0 0-1.245Zm-8.563.226c.642 0 1.178-.566 1.178-1.245 0-.68-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .68.535 1.245 1.177 1.245Zm1.178 7.132c0 .68-.536 1.246-1.178 1.246-.642 0-1.177-.566-1.177-1.246 0-.679.535-1.245 1.177-1.245s1.178.566 1.178 1.245Zm3.531-4.867h-1.498v1.584h1.07c.321 0 .535.227.535.567v5.886c0 .34-.214.566-.535.566H10.81c-.32 0-.535-.226-.535-.566v-5.886c0-.34.214-.567.535-.567h1.285v-1.584H10.38c-.856 0-1.605.792-1.605 1.698v6.679c0 .906.75 1.698 1.605 1.698h9.525c.857 0 1.606-.792 1.606-1.698v-6.68c0-.905-.75-1.697-1.606-1.697Zm-3.531.679c0 .679-.536 1.245-1.178 1.245-.642 0-1.177-.566-1.177-1.245 0-.68.535-1.245 1.177-1.245s1.178.566 1.178 1.245Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--han-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.197 11.66c.642 0 1.178-.566 1.178-1.245 0-.68-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .68.535 1.245 1.177 1.245ZM15.197 20.038c.642 0 1.178-.566 1.178-1.246 0-.679-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .68.535 1.246 1.177 1.246Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="m13.699.792 10.06 10.642a.925.925 0 0 1 0 1.245.795.795 0 0 1-.535.227.795.795 0 0 1-.535-.227L12.522 1.925c-.214-.227-.428-.34-.535-.34a.795.795 0 0 0-.536.226L4.71 8.943v12.34H6.72s.937-.039.937.867-.937.831-.937.831H3.96c-.428 0-.856-.34-.856-.906V10.642l-1.82 1.924a.795.795 0 0 1-.535.226.795.795 0 0 1-.535-.226A.891.891 0 0 1 0 12c0-.226.107-.453.214-.566L10.274.792C10.702.34 11.344 0 11.987 0c.642 0 1.284.226 1.712.792Zm4.709 13.133h1.498c.857 0 1.606.792 1.606 1.698v6.679c0 .906-.75 1.698-1.606 1.698h-9.525c-.856 0-1.605-.792-1.605-1.698v-6.68c0-.905.75-1.697 1.605-1.697h1.713v1.584h-1.285c-.32 0-.535.227-.535.567v5.886c0 .34.214.566.535.566h8.67c.32 0 .534-.226.534-.566v-5.886c0-.34-.214-.567-.535-.567h-1.07v-1.584Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M15.197 15.85c.642 0 1.178-.567 1.178-1.246 0-.68-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .679.535 1.245 1.177 1.245Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--hand_pointer": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.64 2.363c0-.856-.747-1.605-1.601-1.605s-1.602.75-1.602 1.605V14.35l-2.563-2.034c-.747-.535-1.708-.428-2.349.214l-.107.107a1.842 1.842 0 0 0 0 1.82l3.951 5.886a6.357 6.357 0 0 0 5.34 2.89h3.096c1.495 0 2.883-.536 3.844-1.606a5.438 5.438 0 0 0 1.601-3.853V10.39c0-.856-.747-1.605-1.601-1.605s-1.602.749-1.602 1.605v-.75c0-.855-.747-1.605-1.602-1.605-.854 0-1.601.75-1.601 1.606 0-.856-.748-1.606-1.602-1.606-.854 0-1.602.75-1.602 1.606V2.363Z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.636 8.662v2.503M13.844 8.662v2.503M17.04 9.533v1.63" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', "e-icon--health_safety_environment": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.8 21.8c-1 0-2-.4-2.6-1-.4-.4-.7-1-.7-1.6v-.9c0-.6.2-1.1.7-1.6.6-.6 1.5-1 2.5-1 1.1 0 2 .7 2 1.7v2.7c0 .4-.2.8-.5 1.1-.3.3-.8.6-1.4.6Zm0-4.5c-.6 0-1.2.2-1.5.5-.2.1-.3.3-.3.5v.9c0 .2.1.4.2.5.3.3.9.5 1.5.5.3 0 .4-.1.5-.2v-2.7c0 .1-.1 0-.4 0ZM18.2 21.8c-.6 0-1.1-.2-1.5-.6-.3-.3-.5-.7-.5-1.1v-2.7c0-.9.9-1.7 2-1.7 1 0 1.9.3 2.5 1 .4.4.7 1 .7 1.6v.9c0 .6-.2 1.1-.7 1.6-.5.6-1.4 1-2.5 1Zm-.4-1.7c0 .1.2.2.5.2.6 0 1.2-.2 1.5-.5.1-.1.2-.3.2-.5v-.9c0-.2-.1-.3-.2-.5-.3-.3-.9-.5-1.5-.5-.3 0-.5.1-.5.2v2.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M17 24H7c-.6 0-1.2-.2-1.6-.7-.4-.4-.7-1-.7-1.6V21c0-.4.3-.8.8-.8s.8.3.8.8v.8c0 .2.1.4.2.5.1.1.3.2.5.2h10c.2 0 .4-.1.5-.2.1-.1.2-.3.2-.5V21c0-.4.3-.8.8-.8s.8.3.8.8v.8c0 .6-.2 1.2-.7 1.6-.5.4-1 .6-1.6.6ZM18.5 17.3c-.4 0-.8-.3-.8-.8v-2.2c0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2H7c-.1 0-.2 0-.3.1-.1 0-.2.1-.2.2-.1.1-.1.2-.2.2 0 .1-.1.2-.1.3v2.2c0 .4-.3.8-.8.8s-.8-.3-.8-.8v-2.2c0-.3.1-.6.2-.9.1-.3.3-.5.5-.7.2-.2.5-.4.7-.5.4-.2.7-.3 1-.3h10c.6 0 1.2.2 1.6.7.4.4.7 1 .7 1.6v2.2c-.1.4-.4.8-.8.8Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M14 18h-4c-.4 0-.8-.3-.8-.8v-4.5c0-.4.3-.8.8-.8h4c.4 0 .8.3.8.8v4.5c0 .5-.4.8-.8.8Zm-3.2-1.5h2.5v-3h-2.5v3ZM17.2 7.5c-.4 0-.8-.3-.8-.8V3.9c0-.2 0-.3-.1-.4l-.3-.3-3.8-1.6c-.2-.1-.4-.1-.6 0L8 3.2c-.2 0-.3.1-.4.3-.1.2-.1.2-.1.4v2.9c0 .4-.3.8-.8.8S6 7.2 6 6.8V3.9c0-.4.1-.9.4-1.2.2-.4.6-.7 1-.9L11.2.2c.6-.2 1.2-.2 1.8 0l3.8 1.6c.4.2.8.5 1 .8.1.4.2.9.2 1.3v2.8c0 .5-.3.8-.8.8Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 4.9V2.6c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.2-1.1 1.2ZM12 4.9c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1v2.2ZM18.8 7.5H5.2c-.4 0-.8-.3-.8-.8s.4-.7.8-.7h13.5c.4 0 .8.3.8.8s-.3.7-.7.7Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M9.1 10.9c-.2 0-.3-.1-.5-.2-.6-.4-1-1.1-1.4-1.7-.3-.7-.4-1.5-.4-2.2-.1-.5.3-.8.7-.8.4 0 .7.3.8.7 0 .5.1 1.1.3 1.6.2.5.6.9 1 1.3.3.3.4.7.1 1.1-.2.2-.4.2-.6.2ZM14.9 10.9c-.2 0-.4-.1-.6-.3-.3-.3-.2-.8.1-1.1.4-.3.8-.8 1-1.3.2-.5.3-1 .3-1.6 0-.4.3-.8.8-.8s.8.3.8.8c0 .8-.2 1.5-.5 2.2-.3.7-.8 1.3-1.4 1.8-.2.3-.3.3-.5.3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--heating": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.41.22a.75.75 0 0 1 0 1.06 2.25 2.25 0 0 0 0 3.18l-.53.53.53-.531a3.75 3.75 0 0 1 0 5.312.75.75 0 0 1-1.06-1.062 2.25 2.25 0 0 0 0-3.188l.53-.531-.53.53a3.75 3.75 0 0 1 0-5.3.75.75 0 0 1 1.06 0ZM14.42.22a.75.75 0 0 1 0 1.06 2.25 2.25 0 0 0 0 3.18l-.53.53.53-.531a3.75 3.75 0 0 1 0 5.312.75.75 0 0 1-1.06-1.062 2.25 2.25 0 0 0 0-3.188V5.52a3.75 3.75 0 0 1 0-5.3.75.75 0 0 1 1.06 0ZM18.42.22a.75.75 0 0 1 0 1.06 2.25 2.25 0 0 0 0 3.18l-.53.53.53-.531a3.75 3.75 0 0 1 0 5.312.75.75 0 0 1-1.06-1.062 2.25 2.25 0 0 0 0-3.188l.53-.531-.53.53a3.75 3.75 0 0 1 0-5.3.75.75 0 0 1 1.06 0ZM18.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM12.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM15.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM9.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM4.5 10.13A1.12 1.12 0 0 1 3.38 9 1.11 1.11 0 0 1 4.5 7.88 1.12 1.12 0 0 1 5.63 9M4.5 10.13A1.13 1.13 0 0 0 5.63 9m-1.5 0ZM4.5 14.5a1.12 1.12 0 0 1-1.12-1.13 1.11 1.11 0 0 1 1.12-1.12 1.12 1.12 0 0 1 1.13 1.12M4.5 14.5a1.13 1.13 0 0 0 1.13-1.13m-1.5 0ZM3.75 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM20.25 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M.659 5.159A2.25 2.25 0 0 1 2.25 4.5h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75.75.75 0 0 1 0-1.5A2.25 2.25 0 0 1 24 6.75v13.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 20.25V6.75c0-.597.237-1.169.659-1.591Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--history": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12.739c0-1.493.301-2.886.904-4.28.1-.199.24-.318.402-.398.2-.1.402-.1.602 0 .302.1.503.398.503.697 0 .1-.03.132-.1.299-.503 1.194-.704 2.388-.704 3.682 0 2.488.904 4.777 2.712 6.568 1.808 1.792 4.219 2.887 6.73 2.986 2.612.1 5.022-.896 6.93-2.687 1.91-1.792 3.014-4.28 3.014-6.867 0-2.488-.904-4.777-2.712-6.569-1.707-1.691-4.018-2.786-6.328-2.985-2.11-.1-4.219.398-6.027 1.592H9.84c.402 0 .804.398.804.796s-.402.796-.804.796H5.018c-.402 0-.804-.398-.804-.796V.796c0-.398.302-.796.804-.796s.803.398.803.796v2.787c1.909-1.294 4.32-2.09 6.63-1.99.2 0 .502 0 .803.099H13.556c2.712.298 5.022 1.493 6.83 3.384a11.196 11.196 0 0 1 3.114 7.762c0 1.493-.301 2.887-.904 4.28 0 .1-.1.199-.2.298-.604 1.294-1.407 2.488-2.512 3.484-4.52 4.28-11.652 4.08-15.971-.299C2.105 18.411 1 15.625 1 12.74Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M16.798 17.8a.792.792 0 0 1-.565-.234l-5-5a.79.79 0 0 1-.173-.262l-.01-.027A.786.786 0 0 1 11 12V8a.8.8 0 0 1 1.6 0v3.668l4.765 4.766A.794.794 0 0 1 17.6 17a.802.802 0 0 1-.801.801Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--home": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m11.469 2.73-6.97 7.008v11.754h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28h4.5V9.736L12.53 2.73a.746.746 0 0 0-1.061 0Zm9.53 8.514v11.002a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066l10.19-10.246A2.229 2.229 0 0 1 12 1c.601 0 1.166.235 1.591.662l2.206 2.218 5.202 5.231 2.78 2.795a.76.76 0 0 1 0 1.067.742.742 0 0 1-1.06 0l-1.72-1.729ZM12 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--home-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.249 23a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754V9.5c0-.416.336-.754.75-.754s.75.338.75.754V21.492h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28h4.5V9.5c0-.416.336-.754.75-.754s.75.838.75 1.254v12.246a.752.752 0 0 1-.75.754h-6Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M2.999 11.246V9.5c0-.416.336-.754.75-.754s.75.338.75.754v.238l6.97-7.008a.746.746 0 0 1 1.061 0l6.969 7.006V9.5c0-.416.336-.754.75-.754s.75.838.75 1.254v1.244l1.72 1.73a.742.742 0 0 0 1.06 0 .76.76 0 0 0 0-1.068l-2.78-2.795-5.202-5.231-2.206-2.218A2.232 2.232 0 0 0 12 1c-.602 0-1.167.235-1.591.662L.219 11.908a.76.76 0 0 0 0 1.066.744.744 0 0 0 1.06.001l1.72-1.729Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M13.5 11a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--home_office": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 1.5a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75h-9Zm-2.25.75A2.25 2.25 0 0 1 3.5 0h9a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-6ZM1.916 13.495a.754.754 0 0 1 .036.082l.722 1.924h.002l.034-.001h18.61l.595-1.885a.752.752 0 0 1 .047-.115H2a.735.735 0 0 1-.084-.005ZM2.056 12a1.462 1.462 0 0 0-1.464.751 1.51 1.51 0 0 0-.029 1.394l.735 1.958c.01.028.022.055.036.082a1.51 1.51 0 0 0 1.39.815h18.611a1.51 1.51 0 0 0 1.33-.815.762.762 0 0 0 .05-.12l.612-1.941a1.51 1.51 0 0 0-.039-1.374l-.005-.01a1.46 1.46 0 0 0-1.288-.74H2.055Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.48 15.536a.75.75 0 0 1 .484.944l-2.25 7a.75.75 0 0 1-1.428-.46l2.25-7a.75.75 0 0 1 .944-.484ZM18.52 15.536a.75.75 0 0 1 .944.484l2.25 7a.75.75 0 1 1-1.428.46l-2.25-7a.75.75 0 0 1 .485-.944ZM6.682 9.022a.75.75 0 0 1 .546.91l-.75 3a.75.75 0 1 1-1.455-.364l.75-3a.75.75 0 0 1 .91-.546ZM9.318 9.022a.75.75 0 0 1 .91.546l.75 3a.75.75 0 0 1-1.455.364l-.75-3a.75.75 0 0 1 .545-.91ZM16.25 8.75A.75.75 0 0 1 17 8h4a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1-.75-.75v-4Zm1.5.75V12h2.5V9.5h-2.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.72 4.783a.75.75 0 0 1 .497.938l-1 3.25a.75.75 0 1 1-1.434-.442l1-3.25a.75.75 0 0 1 .938-.496Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--house_rebuilding-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.749 22h5.04s.711 0 .711-.754-.71-.754-.71-.754H4.499V8.738l-1.5 1.508v11c0 .416.336.754.75.754ZM19.499 20.492H16.5s-.75 0-.75.754.75.754.75.754h3.749c.414 0 .75-.338.75-.754V10.244l-1.5-1.508v11.756Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M.219 11.974a.744.744 0 0 0 1.06.001l1.72-1.729 1.5-1.508 6.97-7.008a.746.746 0 0 1 1.061 0l6.969 7.006 1.5 1.508 1.72 1.73a.742.742 0 0 0 1.06 0 .76.76 0 0 0 0-1.068l-2.78-2.795-5.202-5.231L13.591.662A2.232 2.232 0 0 0 12 0c-.602 0-1.167.235-1.591.662L.219 10.907a.76.76 0 0 0 0 1.067Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6 15.7c.1 0 .1.1.1.2v6.3c0 .9.6 1.6 1.6 1.8h.1c.9 0 1.7-.6 1.8-1.6v-6.6c0-.1.1-.2.1-.2h.1c.6.2.9.4 1.2.9.2.3.5.4.7.4.2 0 .5 0 .8-.2l.2-.2c.1-.1.2-.3.2-.5v-1.6c0-1.9-1.5-3.4-3.5-3.4h-3.8c-.1 0-.1 0-.1-.1-.1-.2-.2-.3-.3-.4-.1-.1-.4-.3-.8-.3H6.6c-.3 0-.6.3-.6.6v5c0 .3.3.6.6.6H9c.3 0 .6-.1.8-.3.1-.1.2-.2.2-.3 0-.1.1-.1.1-.1h.5Zm2.4 6.5c0 .2-.1.3-.2.4-.1.1-.2.1-.3.1-.2 0-.3-.1-.4-.2-.1-.1-.2-.2-.2-.3v-6.4c0-.1.1-.2.1-.2h.8c.2.1.2.1.2.2v6.4Zm-2.7-9.9c0-.1.1-.1.2-.1H14c1.4 0 2.3 1 2.3 2.3v.6c0 .1 0 .1-.1.1H16c-.4-.4-.8-.6-1.4-.7h-4.1c-.1 0-.2-.1-.2-.2v-2ZM8.9 15c0 .1-.1.2-.1.2H7.4c-.1 0-.2-.1-.2-.2v-3.5c0-.1.1-.1.2-.1h1.4c.1 0 .2.1.2.1V15h-.1Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--image": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 21.75C1 22.991 1.987 24 3.2 24h17.6c1.213 0 2.2-1.009 2.2-2.25V5.133c0-.603-.242-1.19-.664-1.611L19.448.639A2.164 2.164 0 0 0 17.91 0H3.2C1.987 0 1 1.009 1 2.25v19.5Zm1.467-19.5c0-.414.328-.75.733-.75h14.712a.72.72 0 0 1 .511.213l2.888 2.883c.141.14.222.336.222.537V21.75c0 .414-.328.75-.733.75H3.2a.742.742 0 0 1-.733-.75V2.25Zm5.806 8.25c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm0-4.5c-.827 0-1.5.673-1.5 1.5S7.446 9 8.273 9s1.5-.673 1.5-1.5S9.1 6 8.273 6Zm10.54 12.95a.75.75 0 0 1-.625-.334l-3.925-5.888a.264.264 0 0 0-.363-.074.262.262 0 0 0-.069.068l-2.692 3.846a.75.75 0 0 1-1.084.155l-1.668-1.338a.257.257 0 0 0-.161-.057l-.03.002a.255.255 0 0 0-.175.096l-2.125 3.19a.75.75 0 0 1-1.249-.831l2.111-3.171a1.746 1.746 0 0 1 1.471-.786c.401 0 .78.134 1.096.387l1.044.837 2.232-3.189a1.758 1.758 0 0 1 2.91.034l3.925 5.887a.748.748 0 0 1-.623 1.166Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--image-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.273 10.5c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm0-4.5c-.827 0-1.5.673-1.5 1.5S7.446 9 8.273 9s1.5-.673 1.5-1.5S9.1 6 8.273 6Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M18.813 18.95a.75.75 0 0 1-.625-.334l-3.925-5.888a.264.264 0 0 0-.363-.074.262.262 0 0 0-.069.068l-2.692 3.846a.75.75 0 0 1-1.084.155l-1.668-1.338a.257.257 0 0 0-.19-.055.255.255 0 0 0-.176.096l-2.125 3.19a.75.75 0 0 1-1.249-.831l2.111-3.171a1.746 1.746 0 0 1 1.471-.786c.401 0 .78.134 1.096.387l1.044.837 2.232-3.19a1.758 1.758 0 0 1 2.91.035l3.925 5.887a.748.748 0 0 1-.623 1.166Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M3.2 24C1.987 24 1 22.991 1 21.75V2.25C1 1.009 1.987 0 3.2 0h14.71c.58 0 1.124.227 1.538.639l2.888 2.883c.422.421.664 1.008.664 1.611V21.75c0 1.241-.987 2.25-2.2 2.25H3.2Zm0-22.5a.742.742 0 0 0-.733.75v19.5c0 .414.328.75.733.75h17.6a.742.742 0 0 0 .733-.75V5.133a.762.762 0 0 0-.222-.537l-2.888-2.883a.72.72 0 0 0-.511-.213H3.2Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--image_add-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 12a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm-6.75 5.25a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M4.455 5.205a1.125 1.125 0 1 1 1.59 1.59 1.125 1.125 0 0 1-1.59-1.59Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M18 14.25a.75.75 0 0 0-1.5 0v2.25h-2.25a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0V18h2.25a.75.75 0 0 0 0-1.5H18v-2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.5a.75.75 0 0 0-.75.75v16.5a.75.75 0 0 0 .75.75h6a.75.75 0 0 1 0 1.5h-6A2.25 2.25 0 0 1 0 18.75V2.25A2.25 2.25 0 0 1 2.25 0h10.629a2.25 2.25 0 0 1 1.59.658l2.872 2.873c.422.421.659.994.659 1.59V8.25a.75.75 0 0 1-1.5 0V5.121a.75.75 0 0 0-.22-.53L13.41 1.72a.75.75 0 0 0-.53-.219H2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.94 7.332a1.499 1.499 0 0 1 1.946.521l1.03 1.65a.75.75 0 0 1-1.273.794l-1.017-1.63-2 2.85a.75.75 0 0 1-1.083.155l-1.227-.982L4.95 13.5H8.25a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.674-1.078L5.013 9.94a.751.751 0 0 1 .05-.088 1.5 1.5 0 0 1 2.186-.338l.608.487 1.54-2.195c.14-.2.327-.364.544-.475Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--information_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 17.25A2.252 2.252 0 0 1 11.25 15v-3.75h-.75a.75.75 0 0 1 0-1.5h.75c.827 0 1.5.673 1.5 1.5V15c0 .414.336.75.75.75h.75a.75.75 0 0 1 0 1.5h-.75ZM11.625 8.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--information_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.625 8.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M13.5 17.25A2.252 2.252 0 0 1 11.25 15v-3.75h-.75a.75.75 0 0 1 0-1.5h.75c.827 0 1.5.673 1.5 1.5V15c0 .414.336.75.75.75h.75a.75.75 0 0 1 0 1.5h-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--information_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M13.5 17.25A2.252 2.252 0 0 1 11.25 15v-3.75h-.75a.75.75 0 0 1 0-1.5h.75c.827 0 1.5.673 1.5 1.5V15c0 .414.336.75.75.75h.75a.75.75 0 0 1 0 1.5h-.75ZM11.625 8.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" fill="#000"/></svg>', "e-icon--installatorweb-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 4.02a.77.77 0 0 0-.77-.77H4.5c-1.241 0-2.25 1.035-2.25 2.308v9.83L.194 20.005a2.336 2.336 0 0 0-.194.937c0 1.273 1.009 2.308 2.25 2.308v.001h19.5c.317 0 .624-.068.914-.199 1.134-.517 1.646-1.883 1.143-3.046L21.75 15.39V5.558c0-1.273-1.01-2.308-2.25-2.308h-3.73a.77.77 0 0 0 0 1.538h3.73a.76.76 0 0 1 .75.77v9.23H3.75v-9.23a.76.76 0 0 1 .75-.77h3.73A.77.77 0 0 0 9 4.02ZM1.561 20.636a.774.774 0 0 0-.061.305c0 .424.337.77.75.77h19.5a.73.73 0 0 0 .305-.067.778.778 0 0 0 .38-1.014l-1.917-4.305H3.482l-1.921 4.31Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M10.5 20.168a.76.76 0 0 1-.75-.769.76.76 0 0 1 .75-.769h3a.76.76 0 0 1 .75.77.76.76 0 0 1-.75.768h-3Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5c.414 0 .75.32.75.716v3.818c0 .395-.336.716-.75.716s-.75-.32-.75-.716V4.216c0-.395.336-.716.75-.716Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M13 1.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--invoice": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 21.75C1 22.991 1.987 24 3.2 24h17.6c1.213 0 2.2-1.009 2.2-2.25V5.133c0-.603-.242-1.19-.664-1.611L19.448.639A2.164 2.164 0 0 0 17.91 0H3.2C1.987 0 1 1.009 1 2.25v19.5Zm1.467-19.5c0-.414.328-.75.733-.75h14.712a.72.72 0 0 1 .511.213l2.888 2.883c.141.14.222.336.222.537V21.75c0 .414-.328.75-.733.75H3.2a.742.742 0 0 1-.733-.75V2.25Zm3.573 6c0 .413.299.748.667.748h10.666c.367 0 .667-.335.667-.749 0-.413-.299-.749-.667-.749H6.707c-.368 0-.667.336-.667.75Zm.667 5.248c-.368 0-.667-.335-.667-.749 0-.413.299-.749.667-.749h10.666c.368 0 .667.336.667.75 0 .413-.299.748-.667.748H6.707ZM6.04 17.25c0 .414.299.75.667.75h5.333c.367 0 .667-.336.667-.75 0-.413-.3-.749-.667-.749H6.707c-.368 0-.667.336-.667.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--invoice-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.707 8.998c-.368 0-.667-.335-.667-.749 0-.413.299-.75.667-.75h10.666c.368 0 .667.337.667.75 0 .414-.3.75-.667.75H6.707Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M3.2 24C1.987 24 1 22.991 1 21.75V2.25C1 1.009 1.987 0 3.2 0h14.71c.58 0 1.124.227 1.538.639l2.888 2.883c.422.421.664 1.008.664 1.611V21.75c0 1.241-.987 2.25-2.2 2.25H3.2Zm0-22.5a.742.742 0 0 0-.733.75v19.5c0 .414.328.75.733.75h17.6a.742.742 0 0 0 .733-.75V5.133a.762.762 0 0 0-.222-.537l-2.888-2.883a.72.72 0 0 0-.511-.213H3.2Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M6.707 13.498c-.368 0-.667-.335-.667-.749 0-.413.299-.75.667-.75h10.666c.368 0 .667.337.667.75 0 .414-.299.75-.667.75H6.707Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M6.707 17.998c-.368 0-.667-.335-.667-.749 0-.413.299-.749.667-.749h5.333c.367 0 .667.336.667.75 0 .413-.3.748-.667.748H6.707Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--it_systems-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 3C18-1 6-1 6 3v3c0 2 3 3 6 3s6-1 6-3V3Zm-6-1.5c2.8 0 4.5 1 4.5 1.5S14.8 4.5 12 4.5 7.5 3.5 7.5 3 9.2 1.5 12 1.5Zm0 6c-2.8 0-4.5-1-4.5-1.5V5c1.2.6 2.8 1 4.5 1 1.7 0 3.3-.3 4.5-1v1c0 .5-1.7 1.5-4.5 1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M8.2 13.5h-6c-1.2 0-2.2 1-2.2 2.2v3C0 20 1 21 2.2 21h2.2v1.5H3c-.4 0-.8.3-.8.8s.4.7.8.7h4.5c.4 0 .8-.3.8-.8s-.3-.8-.8-.8H6V21h2.2c1.2 0 2.2-1 2.2-2.2v-3c.1-1.3-.9-2.3-2.2-2.3Zm.8 5.3c0 .4-.3.8-.8.8h-6c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8h6c.5 0 .8.3.8.8v3ZM21.8 13.5h-6c-1.2 0-2.2 1-2.2 2.2v3c0 1.2 1 2.2 2.2 2.2H18v1.5h-1.5c-.4 0-.8.3-.8.8s.3.8.8.8H21c.4 0 .8-.3.8-.8s-.3-.8-.8-.8h-1.5V21h2.2c1.2 0 2.2-1 2.2-2.2v-3c.1-1.3-.9-2.3-2.1-2.3Zm.7 5.3c0 .4-.3.8-.8.8h-6c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8h6c.4 0 .8.3.8.8v3ZM2.3 12c-.4 0-.8-.3-.8-.8V7.8c0-1.2 1-2.2 2.2-2.2.4 0 .8.3.8.8s-.3.6-.7.6c-.5 0-.8.3-.8.8v3.5c0 .4-.3.7-.7.7ZM21.8 12c-.4 0-.8-.3-.8-.8V7.8c0-.5-.3-.8-.7-.8-.4 0-.8-.3-.8-.8s.3-.8.8-.8c1.2 0 2.2 1 2.2 2.2v3.5c0 .6-.3.9-.7.9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--laptop-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 21.999c-1.241 0-2.25-1.035-2.25-2.308 0-.325.065-.64.194-.937l2.056-4.615V4.308C2.25 3.035 3.259 2 4.5 2h15c1.24 0 2.25 1.035 2.25 2.308v9.832l2.057 4.615c.503 1.163-.01 2.53-1.143 3.046-.29.131-.597.199-.914.199H2.25v-.001Zm-.689-2.612a.774.774 0 0 0-.061.305c0 .424.337.77.75.77h19.5a.73.73 0 0 0 .305-.067.778.778 0 0 0 .38-1.014l-1.917-4.305H3.482l-1.921 4.31Zm18.689-5.85v-9.23a.76.76 0 0 0-.75-.769h-15a.76.76 0 0 0-.75.77v9.23h16.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M10.5 18.922a.76.76 0 0 1-.75-.769.76.76 0 0 1 .75-.77h3a.76.76 0 0 1 .75.77.76.76 0 0 1-.75.77h-3Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--layers": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.545 1.81 1.803 6.358a.103.103 0 0 0 0 .177l9.74 4.512a1.164 1.164 0 0 0 .912 0L22.197 6.5a.103.103 0 0 0 0-.177l-9.74-4.512a1.165 1.165 0 0 0-.912 0ZM10.853.243a2.88 2.88 0 0 1 2.313.009l9.771 4.526a1.818 1.818 0 0 1 .002 3.269l-9.77 4.56c-.008.002-.015.006-.022.009a2.88 2.88 0 0 1-2.294 0l-.019-.009-9.771-4.525a1.817 1.817 0 0 1-.002-3.269l9.77-4.56a.836.836 0 0 1 .022-.01Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.921 12.241c.198.43.01.94-.42 1.138l-10.457 4.817-.003.001a2.571 2.571 0 0 1-2.134 0l-.004-.002L.497 13.378a.857.857 0 1 1 .72-1.556l10.402 4.815.001.001a.857.857 0 0 0 .709 0h.001l10.454-4.817a.857.857 0 0 1 1.137.42Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.921 17.813c.198.43.01.939-.42 1.137l-10.457 4.817-.003.001a2.571 2.571 0 0 1-2.134 0l-.004-.002L.497 18.95a.857.857 0 0 1 .72-1.555l10.402 4.815h.001a.857.857 0 0 0 .709 0h.001l10.454-4.816a.857.857 0 0 1 1.137.42Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--light_theme": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM6.75 12a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0ZM12 0a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 12 0ZM12 18.75a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75ZM18.75 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H19.5a.75.75 0 0 1-.75-.75ZM0 12a.75.75 0 0 1 .75-.75H4.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 12ZM20.78 3.22a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0ZM7.28 16.72a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0ZM16.72 16.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06ZM3.22 3.22a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--laws": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.41 13.44c0-.39.12-.75.35-1.08.23-.33.57-.6 1.03-.8.46-.2.99-.3 1.61-.3.46 0 .89.06 1.28.17.39.11.72.27 1 .46s.48.4.63.63c.15.23.22.45.22.68 0 .18-.08.33-.25.47-.17.14-.35.21-.56.21-.21 0-.35-.05-.46-.14-.11-.09-.26-.25-.45-.46-.19-.21-.38-.39-.58-.5-.2-.11-.45-.17-.76-.17-.36 0-.65.08-.86.25-.21.17-.32.35-.32.57 0 .22.09.42.27.58.18.16.49.35.93.57.44.22.72.37.86.46.41.23.78.43 1.11.61.33.18.62.37.89.58.27.21.48.45.63.73.15.28.23.6.23.97 0 .42-.12.79-.36 1.13-.24.34-.59.63-1.04.87.63.5.95 1.08.95 1.75 0 .32-.07.62-.21.9-.14.28-.35.53-.63.75-.28.22-.61.38-.99.5s-.8.18-1.25.18c-.55 0-1.03-.07-1.45-.21-.42-.14-.78-.33-1.08-.57-.3-.24-.53-.5-.67-.77s-.21-.52-.21-.76c0-.22.08-.42.25-.59a.86.86 0 0 1 .93-.2c.1.04.17.08.22.14.23.28.4.52.51.73.27.59.75.88 1.44.88.38 0 .69-.1.92-.29.23-.19.35-.42.35-.67 0-.18-.07-.34-.2-.49-.13-.15-.32-.31-.57-.47-.25-.16-.62-.39-1.13-.68-.51-.29-1.02-.6-1.54-.91-.2-.12-.4-.26-.61-.39-.21-.13-.4-.29-.56-.45-.16-.16-.28-.35-.38-.57-.1-.22-.14-.47-.14-.76 0-.8.49-1.45 1.48-1.94-.56-.45-.84-.98-.84-1.58l.01-.02Zm1.79 2.32c-.55.33-.82.67-.82 1.02 0 .18.07.35.21.5.14.15.32.3.56.45.24.15.6.35 1.09.63.15.08.34.19.6.33.26.14.5.28.75.4.56-.38.84-.71.84-1.01a.71.71 0 0 0-.15-.44c-.1-.13-.23-.26-.4-.39s-.38-.26-.63-.4-.57-.32-.97-.53l-.72-.39c-.16-.09-.28-.15-.35-.18l-.01.01ZM17.04 7.5H6.54c-.41 0-.75-.34-.75-.75S6.13 6 6.54 6h10.5c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 12H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 16.5H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M10.29 21H5.04c-1.24 0-2.25-1.01-2.25-2.25V2.25C2.79 1.01 3.8 0 5.04 0h10.63c.59 0 1.17.24 1.59.66l2.87 2.87c.42.42.66.99.66 1.59V7.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.12c0-.2-.08-.39-.22-.53L16.2 1.72a.75.75 0 0 0-.53-.22H5.04c-.41 0-.75.34-.75.75v16.5c0 .41.34.75.75.75h5.25c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--laws-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.41 13.44c0-.39.12-.75.35-1.08.23-.33.57-.6 1.03-.8.46-.2.99-.3 1.61-.3.46 0 .89.06 1.28.17.39.11.72.27 1 .46s.48.4.63.63c.15.23.22.45.22.68 0 .18-.08.33-.25.47-.17.14-.35.21-.56.21-.21 0-.35-.05-.46-.14-.11-.09-.26-.25-.45-.46-.19-.21-.38-.39-.58-.5-.2-.11-.45-.17-.76-.17-.36 0-.65.08-.86.25-.21.17-.32.35-.32.57 0 .22.09.42.27.58.18.16.49.35.93.57.44.22.72.37.86.46.41.23.78.43 1.11.61.33.18.62.37.89.58.27.21.48.45.63.73.15.28.23.6.23.97 0 .42-.12.79-.36 1.13-.24.34-.59.63-1.04.87.63.5.95 1.08.95 1.75 0 .32-.07.62-.21.9-.14.28-.35.53-.63.75-.28.22-.61.38-.99.5s-.8.18-1.25.18c-.55 0-1.03-.07-1.45-.21-.42-.14-.78-.33-1.08-.57-.3-.24-.53-.5-.67-.77s-.21-.52-.21-.76c0-.22.08-.42.25-.59a.86.86 0 0 1 .93-.2c.1.04.17.08.22.14.23.28.4.52.51.73.27.59.75.88 1.44.88.38 0 .69-.1.92-.29.23-.19.35-.42.35-.67 0-.18-.07-.34-.2-.49-.13-.15-.32-.31-.57-.47-.25-.16-.62-.39-1.13-.68-.51-.29-1.02-.6-1.54-.91-.2-.12-.4-.26-.61-.39-.21-.13-.4-.29-.56-.45-.16-.16-.28-.35-.38-.57-.1-.22-.14-.47-.14-.76 0-.8.49-1.45 1.48-1.94-.56-.45-.84-.98-.84-1.58l.01-.02Zm1.79 2.32c-.55.33-.82.67-.82 1.02 0 .18.07.35.21.5.14.15.32.3.56.45.24.15.6.35 1.09.63.15.08.34.19.6.33.26.14.5.28.75.4.56-.38.84-.71.84-1.01a.71.71 0 0 0-.15-.44c-.1-.13-.23-.26-.4-.39s-.38-.26-.63-.4-.57-.32-.97-.53l-.72-.39c-.16-.09-.28-.15-.35-.18l-.01.01Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M17.04 7.5H6.54c-.41 0-.75-.34-.75-.75S6.13 6 6.54 6h10.5c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 12H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 16.5H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M10.29 21H5.04c-1.24 0-2.25-1.01-2.25-2.25V2.25C2.79 1.01 3.8 0 5.04 0h10.63c.59 0 1.17.24 1.59.66l2.87 2.87c.42.42.66.99.66 1.59V7.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.12c0-.2-.08-.39-.22-.53L16.2 1.72a.75.75 0 0 0-.53-.22H5.04c-.41 0-.75.34-.75.75v16.5c0 .41.34.75.75.75h5.25c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--lighting": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.132 3.092a3.75 3.75 0 0 1 1.487-.037 3.87 3.87 0 0 1 3.101 3.862v.652a8.99 8.99 0 0 1 5.266 7.317c.003.025.004.05.004.074v.07a1.49 1.49 0 0 1-1.504 1.47H4.49c-.016 0-.033 0-.049-.002a1.49 1.49 0 0 1-1.39-1.59l.002-.02A8.99 8.99 0 0 1 8.26 7.573v-.79a3.491 3.491 0 0 1 .01-.657 3.75 3.75 0 0 1 2.862-3.034Zm1.2 1.436a2.25 2.25 0 0 0-2.578 1.818 1.99 1.99 0 0 0 .003.336.752.752 0 0 1 .003.068v1.32a.75.75 0 0 1-.478.699A7.49 7.49 0 0 0 4.55 15h14.94v-.002a7.49 7.49 0 0 0-4.787-6.227.75.75 0 0 1-.483-.701V6.895a2.37 2.37 0 0 0-1.887-2.367Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.96 0a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM14.97 15a.75.75 0 0 1 .75.75 3.75 3.75 0 0 1-7.5 0h1.5a2.25 2.25 0 0 0 4.5 0 .75.75 0 0 1 .75-.75ZM11.96 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM16.794 19.626a.75.75 0 0 1 1.04.208l1.5 2.25a.75.75 0 1 1-1.248.832l-1.5-2.25a.75.75 0 0 1 .208-1.04ZM7.126 19.626a.75.75 0 0 1 .208 1.04l-1.5 2.25a.75.75 0 1 1-1.248-.832l1.5-2.25a.75.75 0 0 1 1.04-.208Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--link": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.663 0a5.342 5.342 0 0 0-3.776 1.563l-2.22 2.22-.002.001a5.313 5.313 0 0 0-1.539 4.057.9.9 0 0 0 1.797-.105 3.512 3.512 0 0 1 1.017-2.682l2.22-2.218a3.542 3.542 0 0 1 6.044 2.502c0 .938-.373 1.839-1.037 2.502l-2.22 2.219a3.514 3.514 0 0 1-2.685 1.02.9.9 0 1 0-.103 1.797 5.314 5.314 0 0 0 4.06-1.544l2.22-2.22A5.333 5.333 0 0 0 24 5.338 5.333 5.333 0 0 0 18.663 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M17.82 6.186a.9.9 0 0 1 0 1.273L7.457 17.815a.9.9 0 0 1-1.273-1.273L16.547 6.187a.9.9 0 0 1 1.272 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M5.65 11.463a5.315 5.315 0 0 1 2.195-.339.9.9 0 1 1-.104 1.796 3.514 3.514 0 0 0-2.684 1.02l-2.22 2.22a3.538 3.538 0 0 0 2.504 6.04c.939 0 1.84-.372 2.503-1.036l2.22-2.218a3.514 3.514 0 0 0 1.021-2.683.9.9 0 0 1 1.797-.104 5.308 5.308 0 0 1-1.544 4.058l-2.22 2.22A5.342 5.342 0 0 1 0 18.662c0-1.416.563-2.773 1.564-3.774l2.22-2.22a5.316 5.316 0 0 1 1.866-1.205Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--list": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.5a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 2.25A2.25 2.25 0 0 1 2.25 0h19.5A2.25 2.25 0 0 1 24 2.25v1.5A2.25 2.25 0 0 1 21.75 6H2.25A2.25 2.25 0 0 1 0 3.75v-1.5ZM2.25 10.5a.75.75 0 0 0-.75.75v1.5c0 .415.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 11.25A2.25 2.25 0 0 1 2.25 9h19.5A2.25 2.25 0 0 1 24 11.25v1.5A2.25 2.25 0 0 1 21.75 15H2.25A2.25 2.25 0 0 1 0 12.75v-1.5ZM2.25 19.5a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 20.25A2.25 2.25 0 0 1 2.25 18h19.5A2.25 2.25 0 0 1 24 20.25v1.5A2.25 2.25 0 0 1 21.75 24H2.25A2.25 2.25 0 0 1 0 21.75v-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--list_color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.5a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 2.25A2.25 2.25 0 0 1 2.25 0h19.5A2.25 2.25 0 0 1 24 2.25v1.5A2.25 2.25 0 0 1 21.75 6H2.25A2.25 2.25 0 0 1 0 3.75v-1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 10.497a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h19.5a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 12.747v-1.5ZM2.25 19.497a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h19.5a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 21.747v-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--list-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.5a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 2.25A2.25 2.25 0 0 1 2.25 0h19.5A2.25 2.25 0 0 1 24 2.25v1.5A2.25 2.25 0 0 1 21.75 6H2.25A2.25 2.25 0 0 1 0 3.75v-1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 10.497a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h19.5a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 12.747v-1.5ZM2.25 19.497a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h19.5a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 21.747v-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--list_bullets-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.034 5.068a2.034 2.034 0 1 0 0-4.068 2.034 2.034 0 0 0 0 4.068ZM4.068 12.187a2.034 2.034 0 1 1-4.068 0 2.034 2.034 0 0 1 4.068 0ZM4.068 21.339a2.034 2.034 0 1 1-4.068 0 2.034 2.034 0 0 1 4.068 0ZM7.627 1.915a1.119 1.119 0 0 0 0 2.238h15.254a1.119 1.119 0 0 0 0-2.238H7.627ZM6.508 12.186c0-.617.501-1.118 1.12-1.118H22.88a1.119 1.119 0 1 1 0 2.237H7.627c-.618 0-1.119-.5-1.119-1.119ZM7.627 20.22a1.119 1.119 0 0 0 0 2.238h15.254a1.119 1.119 0 1 0 0-2.238H7.627Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--loading": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 15.998a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM14 14.998a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM24 11.998a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--lock": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 24A2.252 2.252 0 0 1 3 21.75v-10.5A2.252 2.252 0 0 1 5.25 9H6V6c0-3.308 2.692-6 6-6s6 2.692 6 6v3h.75A2.252 2.252 0 0 1 21 11.25v10.5A2.252 2.252 0 0 1 18.75 24H5.25Zm0-13.5a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75H5.25ZM16.5 9V6c0-2.481-2.019-4.5-4.5-4.5A4.505 4.505 0 0 0 7.5 6v3h9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 18.75a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--lock_hierarchy": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 24c-1.654 0-3-1.346-3-3 0-1.37.947-2.564 2.25-2.902V16.5h-7.5v1.598A3.016 3.016 0 0 1 15 21c0 1.654-1.346 3-3 3s-3-1.346-3-3c0-1.37.947-2.564 2.25-2.902V16.5h-7.5v1.598A3.016 3.016 0 0 1 6 21c0 1.654-1.346 3-3 3s-3-1.346-3-3c0-1.37.947-2.564 2.25-2.902V15.75A.75.75 0 0 1 3 15h8.25v-1.5H9a2.252 2.252 0 0 1-2.25-2.25V7.5c0-.96.615-1.808 1.5-2.121V3.75A3.754 3.754 0 0 1 12 0a3.754 3.754 0 0 1 3.75 3.75v1.629a2.26 2.26 0 0 1 1.5 2.121v3.75A2.252 2.252 0 0 1 15 13.5h-2.25V15H21a.75.75 0 0 1 .75.75v2.348A3.016 3.016 0 0 1 24 21c0 1.654-1.346 3-3 3Zm0-4.5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5Zm-9 0c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5Zm-9 0c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5ZM9 6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75H9Zm5.25-1.5v-1.5A2.252 2.252 0 0 0 12 1.5a2.252 2.252 0 0 0-2.25 2.25v1.5h4.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><rect x="11.3" y="8" width="1.5" height="2.5" rx=".75" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--logout": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.28 7.724a.75.75 0 1 0-1.06 1.06l2.47 2.47H.75a.75.75 0 0 0 0 1.5h13.94l-2.47 2.47a.75.75 0 0 0 1.06 1.06l3.75-3.75a.748.748 0 0 0 0-1.06l-3.75-3.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.233 1.7a11.25 11.25 0 1 1-5.601 15.228.75.75 0 0 1 1.348-.656 9.75 9.75 0 1 0 .167-8.86.75.75 0 0 1-1.324-.707 11.25 11.25 0 0 1 5.41-5.006Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--magic": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m13.677 5.83-2.475 2.048a.75.75 0 0 1-.7.139l-3.596-1.11 1.11 3.596a.75.75 0 0 1-.138.699l-2.049 2.476 3.682-.1a.75.75 0 0 1 .677.386l1.734 3.138 1.245-3.48a.75.75 0 0 1 .454-.454l3.481-1.246-3.139-1.734a.75.75 0 0 1-.387-.677l.101-3.681Zm.126-1.834a1.204 1.204 0 0 1 1.392 1.212v.006l-.107 3.882 3.292 1.818a1.227 1.227 0 0 1-.227 2.225l-3.693 1.322-1.321 3.691a1.227 1.227 0 0 1-2.224.229l-1.82-3.292-3.887.107a1.204 1.204 0 0 1-.928-1.999l2.184-2.639-1.136-3.68a1.25 1.25 0 0 1 1.55-1.55l3.68 1.136 2.638-2.183c.171-.15.381-.25.607-.285Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.343 13.343a.75.75 0 0 1 1.06 0l9.377 9.377a.75.75 0 0 1-1.06 1.06l-9.377-9.377a.75.75 0 0 1 0-1.06ZM17.25 2.25A.75.75 0 0 1 18 1.5h3A.75.75 0 0 1 21 3h-3a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 0a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 19.5 0ZM1.5 20.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 18a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM9 0a.75.75 0 0 1 .75.75V3a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 9 0ZM0 9.75A.75.75 0 0 1 .75 9H3a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 9.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--mail": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.4 20.748c-1.324 0-2.4-1.07-2.4-2.386V5.635a2.346 2.346 0 0 1 .531-1.497l.025-.029A2.393 2.393 0 0 1 2.4 3.25h19.2a2.4 2.4 0 0 1 1.874.895l.02.028c.331.423.506.928.506 1.463v12.727a2.396 2.396 0 0 1-2.4 2.386H2.4Zm-.8-2.386c0 .439.358.795.8.795h19.2c.442 0 .8-.356.8-.795V5.966L14.639 11.9a4.365 4.365 0 0 1-2.639.892c-.95 0-1.888-.317-2.639-.892L1.6 5.966v12.396Zm8.736-7.722a2.747 2.747 0 0 0 3.327 0l7.585-5.802H2.751l7.585 5.802Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--mail-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.4 20.748c-1.324 0-2.4-1.07-2.4-2.386V5.635a2.346 2.346 0 0 1 .531-1.497l.025-.029A2.393 2.393 0 0 1 2.4 3.25h19.2a2.4 2.4 0 0 1 1.874.895l.02.028c.331.423.506.928.506 1.463v12.727a2.396 2.396 0 0 1-2.4 2.386H2.4Zm-.8-2.386c0 .439.358.795.8.795h19.2c.442 0 .8-.356.8-.795V5.966L14.639 11.9a4.365 4.365 0 0 1-2.639.892c-.95 0-1.888-.317-2.639-.892L1.6 5.966v12.396Zm8.736-7.722a2.747 2.747 0 0 0 3.327 0l7.585-5.802H2.751l7.585 5.802Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 16a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--mail_error-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.023 24a2.528 2.528 0 0 1-2.258-3.654l4.226-8.451a2.513 2.513 0 0 1 2.262-1.396c.393 0 .771.089 1.124.266.486.243.887.644 1.13 1.13l4.226 8.451A2.526 2.526 0 0 1 21.475 24h-8.452Zm4.229-12c-.392 0-.744.217-.918.567l-4.226 8.451a1.025 1.025 0 0 0 .915 1.483h8.452a1.026 1.026 0 0 0 .917-1.483l-4.226-8.451a1.037 1.037 0 0 0-.458-.459 1.013 1.013 0 0 0-.456-.108Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M17.249 21.75c-.62 0-1.125-.505-1.125-1.125s.505-1.125 1.125-1.125l.071.005a1.117 1.117 0 0 1 1.054 1.12c0 .62-.505 1.125-1.125 1.125ZM17.249 18.75a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM2.249 16.5a2.252 2.252 0 0 1-2.25-2.25v-12c0-.504.164-.981.476-1.38L.493.844A2.242 2.242 0 0 1 2.249 0h18a2.242 2.242 0 0 1 1.777.875c.309.398.472.873.472 1.375v8.25a.75.75 0 0 1-1.5 0V2.562l-7.276 5.596a4.077 4.077 0 0 1-2.474.841 4.07 4.07 0 0 1-2.473-.841L1.499 2.562V14.25c0 .414.336.75.75.75h7.5a.75.75 0 0 1 0 1.5h-7.5ZM9.69 6.969c.45.347.99.53 1.56.53.562 0 1.116-.188 1.56-.53L19.92 1.5H2.578L9.69 6.969Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--mail_monitor-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 23.25a.75.75 0 0 1 0-1.5h1.615l.5-3H3.75A3.754 3.754 0 0 1 0 15V4.5A3.754 3.754 0 0 1 3.75.75h16.5A3.754 3.754 0 0 1 24 4.5V15a3.754 3.754 0 0 1-3.75 3.75h-5.115l.5 3h1.615a.75.75 0 0 1 0 1.5H6.75Zm7.365-1.5-.5-3h-3.229l-.5 3h4.229ZM3.75 2.25A2.252 2.252 0 0 0 1.5 4.5V15a2.252 2.252 0 0 0 2.25 2.25h16.5A2.252 2.252 0 0 0 22.5 15V4.5a2.252 2.252 0 0 0-2.25-2.25H3.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.857 6.5a.107.107 0 0 0-.107.107V12.8c0 .06.048.107.107.107h10.286c.059 0 .107-.048.107-.107V6.607a.107.107 0 0 0-.107-.107H6.857Zm-1.607.107C5.25 5.72 5.97 5 6.857 5h10.286c.887 0 1.607.72 1.607 1.607V12.8c0 .888-.72 1.607-1.607 1.607H6.857c-.887 0-1.607-.72-1.607-1.607V6.607Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4 6.071a.75.75 0 0 1-.136 1.052l-4.654 3.58a2.64 2.64 0 0 1-3.22 0l-4.654-3.58a.75.75 0 1 1 .915-1.189l4.654 3.58a1.14 1.14 0 0 0 1.39 0l4.654-3.58a.75.75 0 0 1 1.052.137Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--mail_send-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 17.63A2.252 2.252 0 0 1 0 15.38v-12a2.252 2.252 0 0 1 2.25-2.25h18a2.252 2.252 0 0 1 2.25 2.25v9a.75.75 0 0 1-1.5 0V3.633l-7.25 5.543c-.692.62-1.579.96-2.5.96a3.746 3.746 0 0 1-2.5-.96L1.5 3.635V15.38c0 .414.336.75.75.75h6a.75.75 0 0 1 0 1.5h-6Zm7.435-9.627.049.041a2.25 2.25 0 0 0 1.516.591 2.25 2.25 0 0 0 1.516-.591.677.677 0 0 1 .048-.04l7.03-5.374H2.655l7.03 5.373Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M17.25 22.88a.747.747 0 0 1-.75-.75v-1.5h-3.75a2.252 2.252 0 0 1-2.25-2.25v-1.5a2.252 2.252 0 0 1 2.25-2.25h3.75v-1.5a.746.746 0 0 1 .75-.75c.161 0 .321.053.45.15l6.001 4.5a.753.753 0 0 1 0 1.2l-6 4.5a.759.759 0 0 1-.451.15Zm-4.5-6.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h4.5a.75.75 0 0 1 .75.75v.75l4-3-4-3v.75a.75.75 0 0 1-.75.75h-4.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--map_pin-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m22.57 2.565-6-2.4a2.2 2.2 0 0 0-1.67 0L8.24 2.8c.27-.075-.09.014 0 0 0 0 .09.01 0-.005L2.05.355A1.49 1.49 0 0 0 0 1.755v14.37a2.25 2.25 0 0 0 1.41 2.09l6 2.4a2.26 2.26 0 0 0 1.67 0l2.87-1.17a.754.754 0 1 0-.56-1.4l-2.4 1V4.169l.08-.034 5.92-2.39v6.51a.75.75 0 1 0 1.5 0v-6.51l5.52 2.21a.76.76 0 0 1 .48.7v4.35a.75.75 0 1 0 1.5 0v-4.35a2.24 2.24 0 0 0-1.42-2.09ZM1.96 16.825a.75.75 0 0 1-.47-.7V1.745l6 2.39v14.88l-5.53-2.19Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M18.76 24a1.5 1.5 0 0 1-1.19-.56c-1.85-2.37-4.06-5.61-4.06-7.6a5.251 5.251 0 0 1 10.5 0c0 2-2.22 5.23-4.07 7.6a1.49 1.49 0 0 1-1.18.56Zm0-11.93a3.76 3.76 0 0 0-3.75 3.75c0 1.16 1.43 3.72 3.75 6.68 2.31-3 3.75-5.52 3.75-6.68a3.76 3.76 0 0 0-3.75-3.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.8 13.3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Zm-.943 2.2a.943.943 0 1 1 1.886 0 .943.943 0 0 1-1.886 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--media": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.75 8.25A.75.75 0 0 1 1.5 9v12.75a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75V9A.75.75 0 0 1 24 9v12.75A2.25 2.25 0 0 1 21.75 24H2.25A2.25 2.25 0 0 1 0 21.75V9a.75.75 0 0 1 .75-.75ZM2.25 1.5a.75.75 0 0 0-.75.75v3h21v-3a.75.75 0 0 0-.75-.75H2.25ZM.659.66A2.25 2.25 0 0 1 2.25 0h19.5A2.25 2.25 0 0 1 24 2.25V6a.75.75 0 0 1-.75.75H.75A.75.75 0 0 1 0 6V2.25C0 1.653.237 1.081.659.66Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.206.03a.75.75 0 0 1 .515.926l-1.5 5.25a.75.75 0 1 1-1.442-.412l1.5-5.25A.75.75 0 0 1 9.206.03ZM16.706.03a.75.75 0 0 1 .515.926l-1.5 5.25a.75.75 0 0 1-1.442-.412l1.5-5.25a.75.75 0 0 1 .927-.515ZM9.153 12.011a.105.105 0 0 0-.103.005.106.106 0 0 0-.05.09m.153-.095Zm-.12-1.51c.273-.012.545.046.79.168l5.789 2.895a1.607 1.607 0 0 1 0 2.872l-5.789 2.895a1.61 1.61 0 0 1-2.12-.655 1.606 1.606 0 0 1-.203-.782v-5.788a1.606 1.606 0 0 1 1.533-1.604Zm.12 1.51 5.788 2.895-5.788-2.895ZM9 12.106v5.788a.106.106 0 0 0 .153.095l5.788-2.895a.106.106 0 0 0 0-.188" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--media-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.48 0H2.25A2.25 2.25 0 0 0 0 2.25V6c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 6V2.25A2.25 2.25 0 0 0 21.75 0h-5.269Zm-.974 1.5h-5.94L8.494 5.25h5.94l1.072-3.75Zm.489 3.75H22.5v-3a.75.75 0 0 0-.75-.75h-4.684l-1.071 3.75Zm-9.06 0 1.07-3.75H2.25a.75.75 0 0 0-.75.75v3h5.434ZM1.5 9A.75.75 0 0 0 0 9v12.75A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V9a.75.75 0 0 0-1.5 0v12.75a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.153 12.011a.106.106 0 0 0-.153.095m.153-.095Zm-.12-1.51c.273-.012.545.046.79.168l5.789 2.895a1.607 1.607 0 0 1 .648 2.28 1.605 1.605 0 0 1-.648.592L9.824 19.33a1.608 1.608 0 0 1-2.12-.655 1.606 1.606 0 0 1-.203-.782v-5.788a1.606 1.606 0 0 1 1.533-1.604Zm.12 1.51 5.788 2.895-5.788-2.895ZM9 12.106v5.788a.106.106 0 0 0 .153.095l5.788-2.895a.106.106 0 0 0 0-.188" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--menu": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 4.253a.75.75 0 0 0 0 1.5h22.5a.75.75 0 0 0 0-1.5H.75ZM0 12.003a.75.75 0 0 1 .75-.75h22.5a.75.75 0 1 1 0 1.5H.75a.75.75 0 0 1-.75-.75ZM0 19.003a.75.75 0 0 1 .75-.75h22.5a.75.75 0 1 1 0 1.5H.75a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--menu-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.217 3.78a1.217 1.217 0 1 0 0 2.433h21.566a1.217 1.217 0 0 0 0-2.433H1.217ZM0 11.997c0-.672.545-1.217 1.217-1.217h21.566a1.217 1.217 0 0 1 0 2.433H1.217A1.217 1.217 0 0 1 0 11.997ZM0 18.997c0-.672.545-1.217 1.217-1.217h21.566a1.217 1.217 0 0 1 0 2.433H1.217A1.217 1.217 0 0 1 0 18.997Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--minus": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.3A1.3 1.3 0 0 1 1.3 11h21.4a1.3 1.3 0 1 1 0 2.6H1.3A1.3 1.3 0 0 1 0 12.3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--minus-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.3A1.3 1.3 0 0 1 1.3 11h21.4a1.3 1.3 0 1 1 0 2.6H1.3A1.3 1.3 0 0 1 0 12.3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--money-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.181.962C1.011 1.547 0 2.495 0 3.766v15.062c0 1.291 1.012 2.24 2.19 2.822 1.217.602 2.843.944 4.588.944.857 0 1.605-.107 2.299-.206l.017-.002a.753.753 0 1 0-.213-1.491c-.707.1-1.36.193-2.103.193-1.569 0-2.955-.31-3.921-.788-1.007-.498-1.35-1.056-1.35-1.472v-.586c.216.147.446.278.682.395 1.218.602 2.844.945 4.59.945.856 0 1.604-.107 2.298-.206l.017-.003a.753.753 0 0 0-.213-1.491c-.707.101-1.36.193-2.103.193-1.569 0-2.955-.31-3.921-.788-1.007-.497-1.35-1.055-1.35-1.471v-.586c.216.146.446.278.682.395 1.218.602 2.844.944 4.59.944.856 0 1.604-.107 2.298-.206l.017-.002a.753.753 0 1 0-.213-1.492c-.707.101-1.36.194-2.103.194-1.569 0-2.955-.31-3.921-.788-1.007-.498-1.35-1.056-1.35-1.472v-.586c.216.147.446.278.682.395 1.218.602 2.844.944 4.59.944.856 0 1.604-.106 2.298-.205l.017-.003a.753.753 0 0 0-.213-1.491c-.707.1-1.36.193-2.103.193-1.569 0-2.955-.31-3.921-.788-1.007-.497-1.35-1.055-1.35-1.471v-.586c.216.146.446.278.682.395 1.218.602 2.844.944 4.59.944 1.744 0 3.37-.342 4.588-.944a5.84 5.84 0 0 0 .683-.395v.586a.753.753 0 0 0 1.506 0V3.766c0-1.271-1.01-2.219-2.18-2.804C10.16.354 8.533 0 6.777 0 5.023 0 3.396.354 2.181.962Zm.674 1.347c-1.01.505-1.349 1.064-1.349 1.457s.338.951 1.349 1.456c.965.483 2.351.803 3.923.803s2.959-.32 3.924-.803c1.01-.505 1.348-1.063 1.348-1.456s-.338-.952-1.348-1.457c-.965-.482-2.352-.803-3.924-.803s-2.958.32-3.923.803Zm.002 5.94c-1.007-.497-1.35-1.055-1.35-1.47v-.603c.213.146.44.277.674.394 1.215.607 2.842.961 4.597.961 1.756 0 3.382-.354 4.597-.961.234-.117.461-.248.675-.394v.602c0 .416-.344.974-1.35 1.472-.966.477-2.353.788-3.922.788s-2.955-.311-3.921-.788Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.624 11.405c-1.17.586-2.18 1.533-2.18 2.804v6.025c0 1.291 1.011 2.24 2.189 2.822 1.218.602 2.844.944 4.589.944 1.745 0 3.37-.342 4.589-.944 1.177-.582 2.189-1.53 2.189-2.822V14.21c0-1.27-1.01-2.218-2.181-2.804-1.216-.607-2.842-.961-4.597-.961-1.756 0-3.382.354-4.598.961Zm.674 1.348c-1.01.505-1.348 1.063-1.348 1.456s.338.952 1.348 1.457c.965.482 2.351.803 3.924.803 1.572 0 2.958-.32 3.923-.803 1.01-.505 1.349-1.064 1.349-1.457s-.338-.951-1.349-1.456c-.965-.483-2.351-.803-3.923-.803-1.573 0-2.959.32-3.924.803Zm9.196 4.469v-.602a5.881 5.881 0 0 1-.675.393c-1.216.608-2.842.962-4.597.962-1.756 0-3.382-.354-4.598-.962a5.88 5.88 0 0 1-.674-.393v.602c0 .416.344.974 1.35 1.471.966.477 2.353.788 3.922.788 1.568 0 2.955-.31 3.921-.788 1.007-.497 1.35-1.055 1.35-1.471ZM11.95 19.648c.216.147.446.278.683.395 1.218.602 2.844.944 4.589.944 1.745 0 3.37-.342 4.589-.944.236-.117.466-.248.683-.395v.586c0 .416-.344.974-1.35 1.472-.967.477-2.354.788-3.922.788-1.57 0-2.956-.31-3.922-.788-1.006-.498-1.35-1.056-1.35-1.472v-.586Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.336 13.704a.754.754 0 0 0-1.478.204c0 .45.27.763.492.94.229.184.513.316.795.413.573.196 1.312.304 2.077.304.765 0 1.503-.108 2.076-.304.283-.097.567-.23.796-.412.22-.178.492-.49.492-.941a.753.753 0 0 0-1.478-.204 1.512 1.512 0 0 1-.297.132c-.381.13-.948.223-1.59.223-.64 0-1.207-.093-1.588-.223a1.513 1.513 0 0 1-.297-.132Zm3.827-.04-.003.002a.014.014 0 0 1 .003-.002Zm-3.88.002-.002-.002.002.002ZM4.892 3.26a.753.753 0 0 0-1.478.204c0 .45.271.764.492.94.229.184.513.316.796.413.573.196 1.311.304 2.076.304.765 0 1.504-.108 2.077-.304.282-.097.566-.229.795-.412.221-.177.492-.49.492-.94a.753.753 0 0 0-1.478-.205 1.508 1.508 0 0 1-.297.132c-.38.13-.948.223-1.589.223-.64 0-1.208-.093-1.589-.223a1.508 1.508 0 0 1-.297-.132Zm3.827-.04Zm-3.88.002Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--more_menu": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 19.46a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08ZM9 21a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM12 1.46a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08ZM9 3a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM12 10.46a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--move_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Zm8.25-3.75A.75.75 0 0 1 9 7.5h6.44l-1.72-1.72a.75.75 0 0 1 1.06-1.06l3 3a.748.748 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L15.44 9H9a.75.75 0 0 1-.75-.75ZM8.56 15l1.72-1.72a.75.75 0 1 0-1.06-1.06l-3 3a.748.748 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06L8.56 16.5H15a.75.75 0 0 0 0-1.5H8.56Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--move_truck-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.342H8.601c-.8 0-1.5.682-1.5 1.463v1.268h-3c-.8 0-1.5.683-1.5 1.464v2.926c0 .781.7 1.464 1.5 1.464h8.2c.4 0 .7-.293.7-.78V7C13 6.5 12.623 6.342 12 6.342Zm-7.899 7.414v-3.122h3v3.122h-3Zm7.5 0h-3V7.903h3v5.853Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M0 5.146V17.39c0 1.171 1 2.147 2.2 2.147h2.4C4.9 20.415 5.7 21 6.7 21s1.8-.585 2.1-1.463h7.8c.3.878 1.1 1.463 2.1 1.463s1.8-.585 2.1-1.463h1.5c1-.098 1.7-.878 1.7-1.756V9.731c.1-1.952-1.4-3.708-3.4-3.805h-4.7v-.78C15.9 3.975 14.9 3 13.7 3H2.2C1 3 0 3.976 0 5.146Zm14.3 8.512H1.5V5.146c0-.39.3-.78.8-.78h11.2c.4 0 .8.293.8.78v8.512Zm8.2-4.024v.866H19c-.1 0-.1 0-.1-.098V7.39h1.7c1 0 2 1.073 1.9 2.244Zm-.2 8.537h-1.4c-.3-.878-1.1-1.464-2.1-1.464s-1.8.586-2.1 1.464h-.9V7.39h1.6v3.11c0 .878.7 1.561 1.6 1.561h3.5v2.183h-1.2c-.4 0-.8.293-.8.78 0 .488.3.78.8.78h1.2v2.172l-.2.195Zm-4.3.683c0-.39.3-.78.8-.78s.8.292.8.78c0 .488-.3.78-.8.78s-.8-.39-.8-.78Zm-12 0c0-.39.3-.78.8-.78s.8.292.8.78c0 .488-.3.78-.8.78s-.8-.39-.8-.78ZM1.5 17.39v-2.17h12.8v2.95H8.9c-.3-.877-1.1-1.463-2.1-1.463s-1.8.586-2.1 1.464H2.2c-.4 0-.7-.39-.7-.78Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--movie": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.48 0H2.25A2.25 2.25 0 0 0 0 2.25V6c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 6V2.25A2.25 2.25 0 0 0 21.75 0h-5.269Zm-.974 1.5h-5.94L8.494 5.25h5.94l1.072-3.75Zm.489 3.75H22.5v-3a.75.75 0 0 0-.75-.75h-4.684l-1.071 3.75Zm-9.06 0 1.07-3.75H2.25a.75.75 0 0 0-.75.75v3h5.434ZM1.5 9A.75.75 0 0 0 0 9v12.75A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V9a.75.75 0 0 0-1.5 0v12.75a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.153 12.011a.106.106 0 0 0-.153.095m.153-.095Zm-.12-1.51c.273-.012.545.046.79.168l5.789 2.895a1.607 1.607 0 0 1 .648 2.28 1.605 1.605 0 0 1-.648.592L9.824 19.33a1.608 1.608 0 0 1-2.12-.655 1.606 1.606 0 0 1-.203-.782v-5.788a1.606 1.606 0 0 1 1.533-1.604Zm.12 1.51 5.788 2.895-5.788-2.895ZM9 12.106v5.788a.106.106 0 0 0 .153.095l5.788-2.895a.106.106 0 0 0 0-.188" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--new_tab": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.105 1.983C1.832 1.983 0 3.79 0 6.003V19.98C0 22.195 1.832 24 4.105 24h13.806c2.273 0 4.105-1.805 4.105-4.019v-4.15a.88.88 0 0 0-.892-.87.88.88 0 0 0-.892.87v4.15c0 1.266-1.045 2.281-2.32 2.281H4.104c-1.275 0-2.32-1.015-2.32-2.28V6.001c0-1.265 1.045-2.28 2.32-2.28H8.19a.88.88 0 0 0 .892-.87.88.88 0 0 0-.892-.869H4.105Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12.17 10.536a.916.916 0 0 0 1.294 1.295l8.705-8.705v7.134a.916.916 0 1 0 1.831 0V.916a.911.911 0 0 0-.334-.707.909.909 0 0 0-.582-.209H13.74a.916.916 0 0 0 0 1.832h7.134l-8.704 8.704Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--new_tab-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m20.142 2.26-7.811 7.811a1.13 1.13 0 0 0 1.597 1.598l7.813-7.812v6.138a1.13 1.13 0 1 0 2.259 0V1.13a1.125 1.125 0 0 0-.412-.872A1.123 1.123 0 0 0 22.87 0h-8.865a1.13 1.13 0 0 0 0 2.26h6.137ZM.05 6.209c0-2.296 1.899-4.159 4.243-4.159H8.26c.62 0 1.12.492 1.12 1.098 0 .605-.5 1.098-1.12 1.098H4.293c-1.105 0-2.002.878-2.002 1.963V19.79c0 1.085.897 1.963 2.002 1.963h13.414c1.105 0 2.002-.878 2.002-1.963v-4.033c0-.605.5-1.098 1.12-1.098.62 0 1.121.493 1.121 1.098v4.033c0 2.296-1.899 4.159-4.243 4.159H4.293C1.949 23.95.05 22.087.05 19.791V6.21Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--note_approved": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="m9.489 11.315 4.027-5.75c.146-.209.21-.469.175-.73a.982.982 0 0 0-.354-.644.847.847 0 0 0-.534-.191.88.88 0 0 0-.715.385l-3.41 4.868-2.151-2.302a.854.854 0 0 0-.63-.28.853.853 0 0 0-.629.28A1.01 1.01 0 0 0 5 7.645c0 .264.096.51.268.693l2.877 3.08c.17.184.394.282.63.282l.062-.002a.88.88 0 0 0 .652-.383Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--note_approved-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="m9.489 11.315 4.027-5.75c.146-.209.21-.469.175-.73a.982.982 0 0 0-.354-.644.847.847 0 0 0-.534-.191.88.88 0 0 0-.715.385l-3.41 4.868-2.151-2.302a.854.854 0 0 0-.63-.28.853.853 0 0 0-.629.28A1.01 1.01 0 0 0 5 7.645c0 .264.096.51.268.693l2.877 3.08c.17.184.394.282.63.282l.062-.002a.88.88 0 0 0 .652-.383Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--note_check-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.875 18.75c-.483 0-.875-.336-.875-.75s.392-.75.875-.75h5.25c.483 0 .875.336.875.75s-.392.75-.875.75h-5.25ZM12.875 11.25c-.483 0-.875-.336-.875-.75s.392-.75.875-.75h5.25c.483 0 .875.336.875.75s-.392.75-.875.75h-5.25Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M2.25 24A2.252 2.252 0 0 1 0 21.75v-18A2.252 2.252 0 0 1 2.25 1.5H4.5V.75a.75.75 0 0 1 1.5 0v.75h12V.75a.75.75 0 0 1 1.5 0v.75h2.25A2.252 2.252 0 0 1 24 3.75v18A2.252 2.252 0 0 1 21.75 24H2.25Zm0-21a.75.75 0 0 0-.75.75v18c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-18a.75.75 0 0 0-.75-.75H19.5v.75a.75.75 0 0 1-1.5 0V3H6v.75a.75.75 0 0 1-1.5 0V3H2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M8.743 8.28a.7.7 0 0 1 .977-.14.704.704 0 0 1 .139.985L7.174 12.72a.697.697 0 0 1-.509.278h-.001a.69.69 0 0 1-.54-.204L4.205 10.87A.7.7 0 0 1 4 10.372a.699.699 0 0 1 1.191-.498l1.35 1.355L8.743 8.28ZM8.743 15.28a.7.7 0 0 1 .977-.14.704.704 0 0 1 .139.985L7.174 19.72a.697.697 0 0 1-.509.278h-.001a.69.69 0 0 1-.54-.204L4.205 17.87A.7.7 0 0 1 4 17.372a.699.699 0 0 1 1.191-.498l1.35 1.355 2.202-2.949Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--note_not_approved": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><rect width="2.007" height="10.721" rx="1.003" transform="rotate(45 2.065 16.936)" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><rect width="2.007" height="10.721" rx="1.003" transform="rotate(135 4.705 8.44)" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--note_not_approved-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><rect width="2.007" height="10.721" rx="1.003" transform="rotate(45 2.065 16.936)" fill="var(--e-color-icon-danger, var(--e-color-icon-danger, #EE0701))"/><rect width="2.007" height="10.721" rx="1.003" transform="rotate(135 4.705 8.44)" fill="var(--e-color-icon-danger, var(--e-color-icon-danger, #EE0701))"/></svg>', "e-icon--notification": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0a.75.75 0 0 1 .75.75v1.534a8.25 8.25 0 0 1 7.5 8.216c0 3.476.37 5.456.715 6.54.171.54.334.851.435 1.012.05.08.086.122.099.137A.75.75 0 0 1 21 19.5H3a.75.75 0 0 1-.597-1.203v-.001a2.883 2.883 0 0 0 .16-.281c.12-.236.292-.631.468-1.226.35-1.19.719-3.18.719-6.288a8.25 8.25 0 0 1 7.5-8.216V.75A.75.75 0 0 1 12 0ZM4.205 18h15.508a8.25 8.25 0 0 1-.178-.506c-.406-1.279-.785-3.424-.785-6.994a6.75 6.75 0 0 0-13.5 0c0 3.225-.382 5.361-.78 6.712-.09.3-.179.562-.265.788Zm5.584 3.03a.75.75 0 0 1 .93.509 1.338 1.338 0 0 0 2.566 0 .75.75 0 1 1 1.44.422 2.837 2.837 0 0 1-5.445 0 .75.75 0 0 1 .509-.93Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--notification-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.73 0c-.287 0-.556.109-.75.32-.192.208-.287.49-.287.799v1.565c-4.064.51-7.244 3.965-7.244 8.102 0 2.783-.311 4.609-.616 5.729-.152.56-.302.943-.412 1.182a3.273 3.273 0 0 1-.153.297.99.99 0 0 0-.238.502c-.03.163-.03.333-.03.467v.161l.106.105.024.023c.175.174.466.462.908.462h17.386c.249 0 .495-.06.69-.195a.774.774 0 0 0 .345-.577 1.088 1.088 0 0 0-.279-1.058 1.914 1.914 0 0 1-.13-.224 5.682 5.682 0 0 1-.373-1.049c-.28-1.045-.567-2.846-.567-5.825 0-4.11-3.217-7.54-7.244-8.09V1.12C12.866.417 12.287 0 11.73 0Zm2.31 20.535c-.544-.135-1.145.129-1.304.72-.153.44-.51.697-.909.697s-.755-.257-.908-.697c-.159-.591-.76-.855-1.304-.72-.61.15-.884.748-.747 1.29.336 1.325 1.66 2.175 2.96 2.175 1.32 0 2.517-.866 2.95-2.149l.005-.013.004-.013c.137-.541-.136-1.14-.747-1.29Zm-8.418-9.75c0-3.336 2.65-6.118 6.109-6.118 3.467 0 6.205 2.789 6.205 6.119 0 3.44.372 5.514.806 6.785H4.788c.38-1.266.834-3.398.834-6.785Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="m10.793 2.772-.088.01c-4.015.504-7.156 3.92-7.156 8.004 0 2.79-.312 4.625-.62 5.755a7.853 7.853 0 0 1-.417 1.197 3.373 3.373 0 0 1-.159.308l-.005.009-.006.007a.89.89 0 0 0-.214.452 2.501 2.501 0 0 0-.028.449v.12l.076.075.024.023c.178.176.441.433.838.433h17.386c.233 0 .459-.057.633-.178a.674.674 0 0 0 .303-.502v-.01l.003-.01a.988.988 0 0 0-.255-.96l-.01-.01-.015-.025a.263.263 0 0 1-.006-.008l.083-.055a.725.725 0 0 0 .02.028c.254.262.394.654.28 1.058a.774.774 0 0 1-.346.577 1.218 1.218 0 0 1-.69.195H3.038c-.442 0-.733-.288-.908-.462l-.024-.023L2 19.124v-.161c0-.134 0-.304.03-.467a.99.99 0 0 1 .238-.502 3.273 3.273 0 0 0 .153-.297c.11-.239.26-.622.412-1.182.305-1.12.616-2.946.616-5.73 0-4.136 3.18-7.592 7.244-8.101V1.119c0-.31.095-.591.287-.8.194-.21.463-.319.75-.319.557 0 1.136.417 1.136 1.119v1.577c4.027.55 7.244 3.98 7.244 8.09 0 2.979.288 4.78.567 5.825.14.523.277.854.374 1.049.048.097.086.16.11.196l-.084.055a1.978 1.978 0 0 1-.116-.207c-.1-.201-.24-.54-.38-1.067-.283-1.056-.571-2.866-.571-5.851 0-4.056-3.176-7.446-7.158-7.99l-.086-.013V1.12C12.766.482 12.242.1 11.73.1a.906.906 0 0 0-.678.287c-.172.187-.26.443-.26.732v1.653Zm2.037 18.516c-.165.476-.556.764-1.002.764-.447 0-.838-.288-1.003-.764l-.003-.007c-.142-.529-.681-.773-1.183-.65-.549.136-.8.673-.674 1.17.323 1.272 1.6 2.099 2.863 2.099 1.277 0 2.436-.838 2.856-2.081l.003-.01.003-.009c.126-.496-.125-1.033-.674-1.168-.502-.124-1.041.12-1.184.65l-.002.006Zm1.953.55-.004.013C14.345 23.134 13.149 24 11.828 24c-1.3 0-2.624-.85-2.96-2.175-.137-.541.136-1.14.747-1.29.544-.135 1.145.129 1.304.72.153.44.51.697.909.697s.755-.257.908-.697c.159-.591.76-.855 1.304-.72.61.15.884.748.747 1.29l-.004.013Zm4.1-4.167H4.652l.039-.128c.377-1.257.83-3.38.83-6.757 0-3.391 2.692-6.22 6.209-6.22 3.521 0 6.306 2.834 6.306 6.22 0 3.433.37 5.496.8 6.753l.045.132Zm-14.095-.1.03-.1c.373-1.277.804-3.386.804-6.685 0-3.337 2.65-6.12 6.109-6.12 3.467 0 6.205 2.79 6.205 6.12 0 3.35.353 5.406.773 6.685l.033.1H4.788Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--open": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M12 13.6c-.6 0-1.2-.2-1.6-.7L5.1 7.5C4.4 6.9 4 6 3.8 5.1c-.2-.9 0-1.9.4-2.7.4-.6.8-1.2 1.4-1.6.6-.4 1.3-.7 2-.8.7-.1 1.4 0 2.1.2.7.2 1.3.6 1.8 1.1l.5.5.5-.5C13 .8 13.6.4 14.3.2c.7-.2 1.4-.3 2.1-.1.7.1 1.4.4 1.9.8.6.4 1.1 1 1.4 1.6.4.8.6 1.8.4 2.7-.1.8-.5 1.7-1.2 2.3l-5.3 5.4c-.4.5-1 .7-1.6.7ZM8.3 1.5h-.5c-.4.1-.9.3-1.3.5s-.7.7-.9 1.1c-.3.6-.4 1.2-.3 1.8.1.6.4 1.1.8 1.6l5.3 5.4c.3.3.8.3 1.1 0l5.3-5.4c.4-.4.7-1 .8-1.6.1-.6 0-1.2-.3-1.8-.2-.4-.5-.8-.9-1.1-.4-.3-.8-.5-1.3-.5-.5-.1-1 0-1.4.1-.4.1-.8.4-1.2.8l-1 1c-.3.3-.8.3-1.1 0l-1-1c-.3-.4-.7-.6-1.1-.8-.4-.1-.7-.1-1-.1ZM3.8 24c-.2 0-.4-.1-.6-.3l-2-2.4c-.8-.9-1.2-2-1.2-3.2v-5.2c0-.6.2-1.2.7-1.6.8-.9 2.3-.9 3.2 0 .4.4.7 1 .7 1.6v3.9c0 .4-.3.8-.8.8s-.8-.4-.8-.8v-3.9c0-.2-.1-.4-.2-.5-.3-.3-.8-.3-1.1 0-.1.1-.2.3-.2.5v5.2c0 .8.3 1.7.8 2.3l2 2.4c.3.3.2.8-.1 1.1-.1 0-.3.1-.4.1Z"/><path d="M8.2 24c-.4 0-.8-.3-.8-.8v-3c0-.7-.2-1.5-.6-2.1l-1.1-1.8c-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.2-.1H5c-.1 0-.2.1-.2.1-.1.1-.2.2-.3.4v.5l1.3 2.2c.2.4.1.8-.3 1-.4.2-.8.1-1-.3l-1.4-2.2c-.3-.5-.3-1.1-.2-1.6.1-.5.4-.9.9-1.2.2-.2.5-.3.8-.3.3-.1.6-.1.9 0 .3.1.6.2.8.4.2.2.4.4.6.7L8 17.4c.7.8 1 1.8 1 2.9v3c0 .4-.3.7-.8.7ZM20.2 24c-.2 0-.3-.1-.5-.2-.3-.3-.4-.7-.1-1.1l2-2.4c.5-.6.8-1.5.8-2.3v-5.2c0-.2-.1-.4-.2-.5-.3-.3-.8-.3-1.1 0-.1.1-.2.3-.2.5v3.9c0 .4-.3.8-.8.8s-.8-.3-.8-.8v-3.9c0-.6.2-1.2.7-1.6.8-.8 2.3-.8 3.2 0 .4.4.7 1 .7 1.6V18c0 1.2-.4 2.4-1.2 3.3l-2 2.4c0 .2-.2.3-.5.3Z"/><path d="M15.8 24c-.4 0-.8-.3-.8-.8v-3c0-1 .3-2.1.9-2.9l1.1-1.7c.1-.2.3-.4.6-.6.2-.2.5-.3.8-.4.3-.1.6-.1.9 0 .3.1.6.2.8.3.4.3.7.7.9 1.2.1.5.1 1-.2 1.5L19.4 20c-.2.4-.7.5-1 .3-.4-.2-.5-.7-.3-1l1.4-2.2c0-.1.1-.3 0-.4 0-.2-.1-.3-.3-.4-.1-.1-.2-.1-.3-.1h-.3c-.1 0-.2.1-.2.1l-.2.2-1.2 1.8c-.4.6-.6 1.3-.6 2.1v3c.1.3-.2.6-.6.6Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--open_menu": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 1.5a.75.75 0 0 0-1.5 0v21a.75.75 0 0 0 1.5 0v-21ZM14.47 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.748.748 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H.75a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--office": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.75.75a2.249 2.249 0 0 0-2.2 1.767 1.457 1.457 0 0 0-.8-.267 1.5 1.5 0 0 0 0 3h3a2.25 2.25 0 1 0 0-4.5Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM21 3.75a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75ZM15.75 6.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .75-.75ZM21 7.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V7.5ZM15.75 10.5a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM21 11.25a.75.75 0 0 0-1.5 0V12a.75.75 0 0 0 1.5 0v-.75ZM15.75 14.25a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V15a.75.75 0 0 1 .75-.75ZM21 15a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V15ZM15.75 18a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM21 18.75a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.513.513A1.75 1.75 0 0 1 13.75 0h8.5A1.75 1.75 0 0 1 24 1.75v21A1.25 1.25 0 0 1 22.75 24h-9.5A1.25 1.25 0 0 1 12 22.75v-21c0-.464.184-.91.513-1.237Zm1.237.987a.25.25 0 0 0-.25.25V22.5h9V1.75a.25.25 0 0 0-.25-.25h-8.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M3.75 15a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM7.5 15.75a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75ZM3.75 18.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM7.5 19.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10.75A1.75 1.75 0 0 0 8.75 9h-7A1.75 1.75 0 0 0 0 10.75v12A1.25 1.25 0 0 0 1.25 24h8a1.25 1.25 0 0 0 1.25-1.25v-12ZM1.5 12H9v-1.25a.25.25 0 0 0-.25-.25h-7a.25.25 0 0 0-.25.25V12ZM9 13.5H1.5v9H9v-9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--office-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.75.75a2.249 2.249 0 0 0-2.2 1.767 1.457 1.457 0 0 0-.8-.267 1.5 1.5 0 0 0 0 3h3a2.25 2.25 0 1 0 0-4.5Z" stroke="#29D305" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM21 3.75a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75ZM15.75 6.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .75-.75ZM21 7.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V7.5ZM15.75 10.5a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM21 11.25a.75.75 0 0 0-1.5 0V12a.75.75 0 0 0 1.5 0v-.75ZM15.75 14.25a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V15a.75.75 0 0 1 .75-.75ZM21 15a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V15ZM15.75 18a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM21 18.75a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.513.513A1.75 1.75 0 0 1 13.75 0h8.5A1.75 1.75 0 0 1 24 1.75v21A1.25 1.25 0 0 1 22.75 24h-9.5A1.25 1.25 0 0 1 12 22.75v-21c0-.464.184-.91.513-1.237Zm1.237.987a.25.25 0 0 0-.25.25V22.5h9V1.75a.25.25 0 0 0-.25-.25h-8.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M3.75 15a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM7.5 15.75a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75ZM3.75 18.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM7.5 19.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10.75A1.75 1.75 0 0 0 8.75 9h-7A1.75 1.75 0 0 0 0 10.75v12A1.25 1.25 0 0 0 1.25 24h8a1.25 1.25 0 0 0 1.25-1.25v-12ZM1.5 12H9v-1.25a.25.25 0 0 0-.25-.25h-7a.25.25 0 0 0-.25.25V12ZM9 13.5H1.5v9H9v-9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--paper_plane_speed_color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.102 1.31a.8.8 0 0 0-.44.122L3.488 11.526A.799.799 0 0 0 3.912 13h7.3c.206 0 .4.098.524.263l4.56 6.075c-.001 0 0 0 0 0a.8.8 0 0 0 1.425-.331l3.15-16.75v-.001a.797.797 0 0 0-.769-.946ZM18.966.32a2.114 2.114 0 0 1 3.072.983c.156.379.2.795.123 1.197l-3.15 16.75a2.11 2.11 0 0 1-2.799 1.592 2.112 2.112 0 0 1-.967-.716l-4.362-5.814h-6.97a2.114 2.114 0 0 1-2.031-1.528 2.106 2.106 0 0 1 .91-2.37L18.967.322Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.367 13.657c0-.362.294-.656.656-.656h2.188c.207 0 .402.098.525.263l2.869 3.826a.654.654 0 0 1-.156.934l-2.78 1.892a2.115 2.115 0 0 1-2.999-.654 2.105 2.105 0 0 1-.303-1.088v-4.517Zm1.313.655v3.862a.796.796 0 0 0 .844.797.798.798 0 0 0 .405-.138l2.214-1.506-2.26-3.015H9.68Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.303.389c.288.219.345.63.126.918l-9.696 12.746a.657.657 0 0 1-1.045-.793L20.383.514a.657.657 0 0 1 .92-.125Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.227 21.06c.33.243.394.697.14 1.015l-1.306 1.64a.775.775 0 0 1-1.057.136.705.705 0 0 1-.14-1.015l1.306-1.64a.775.775 0 0 1 1.057-.136ZM6.518 16.375c.331.243.394.698.141 1.015l-1.306 1.641a.775.775 0 0 1-1.057.135.705.705 0 0 1-.14-1.014l1.306-1.641a.775.775 0 0 1 1.056-.136ZM13.554 20.494c.33.243.394.697.141 1.015l-1.307 1.64a.775.775 0 0 1-1.056.136.705.705 0 0 1-.141-1.015l1.306-1.64a.775.775 0 0 1 1.057-.136Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--paper_plane_flying-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.102 1.31a.8.8 0 0 0-.44.122L3.488 11.526A.799.799 0 0 0 3.912 13h7.3c.206 0 .4.098.524.263l4.56 6.075c-.001 0 0 0 0 0a.8.8 0 0 0 1.425-.331l3.15-16.75v-.001a.797.797 0 0 0-.769-.946ZM18.966.32a2.114 2.114 0 0 1 3.072.983c.156.379.2.795.123 1.197l-3.15 16.75a2.11 2.11 0 0 1-2.799 1.592 2.112 2.112 0 0 1-.967-.716l-4.362-5.814h-6.97a2.114 2.114 0 0 1-2.031-1.528 2.106 2.106 0 0 1 .91-2.37L18.967.322Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.367 13.657c0-.362.294-.656.656-.656h2.188c.207 0 .402.098.525.263l2.869 3.826a.654.654 0 0 1-.156.934l-2.78 1.892a2.115 2.115 0 0 1-2.999-.654 2.105 2.105 0 0 1-.303-1.088v-4.517Zm1.313.655v3.862a.796.796 0 0 0 .844.797.798.798 0 0 0 .405-.138l2.214-1.506-2.26-3.015H9.68Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.303.389c.288.219.345.63.126.918l-9.696 12.746a.657.657 0 0 1-1.045-.793L20.383.514a.657.657 0 0 1 .92-.125Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.227 21.06c.33.243.394.697.14 1.015l-1.306 1.64a.775.775 0 0 1-1.057.136.705.705 0 0 1-.14-1.015l1.306-1.64a.775.775 0 0 1 1.057-.136ZM6.518 16.375c.331.243.394.698.141 1.015l-1.306 1.641a.775.775 0 0 1-1.057.135.705.705 0 0 1-.14-1.014l1.306-1.641a.775.775 0 0 1 1.056-.136ZM13.554 20.494c.33.243.394.697.141 1.015l-1.307 1.64a.775.775 0 0 1-1.056.136.705.705 0 0 1-.141-1.015l1.306-1.64a.775.775 0 0 1 1.057-.136Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--paper_plane": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m15.82 23.035-1.545-2.003-2.664 1.763a2.547 2.547 0 0 1-2.56.14 2.456 2.456 0 0 1-.967-.888 2.36 2.36 0 0 1-.357-1.246v-4.42H2.485c-.54 0-1.064-.17-1.495-.486a2.414 2.414 0 0 1-.894-1.262 2.348 2.348 0 0 1 .069-1.53c.193-.49.545-.905 1.003-1.183L20.198.367a2.54 2.54 0 0 1 2.72.054c.399.265.71.637.894 1.07.184.434.235.91.145 1.37v.002l-3.707 19.17c-.09.46-.314.885-.648 1.223a2.505 2.505 0 0 1-1.23.681c-.47.106-.961.078-1.414-.082a2.481 2.481 0 0 1-1.138-.82Zm5.245-21.424a.951.951 0 0 0-.048.028L1.987 13.192a.92.92 0 0 0-.38.447.89.89 0 0 0-.026.58c.056.19.175.358.338.478a.96.96 0 0 0 .566.184h8.204L21.065 1.61Zm1.386.709L12.04 15.633l5.015 6.502c.11.141.26.25.43.31a.968.968 0 0 0 1.002-.227.904.904 0 0 0 .245-.462L22.44 2.585v-.002a.886.886 0 0 0 .012-.263ZM9.27 16.38v4.421c0 .166.047.33.135.472a.93.93 0 0 0 .366.336.964.964 0 0 0 .97-.053l2.604-1.725-2.66-3.45H9.272Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--paper_plane-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m15.82 23.035-1.545-2.003-2.664 1.763a2.547 2.547 0 0 1-2.56.14 2.456 2.456 0 0 1-.967-.888 2.36 2.36 0 0 1-.357-1.246v-4.42H2.485c-.54 0-1.064-.17-1.495-.486a2.414 2.414 0 0 1-.894-1.262 2.348 2.348 0 0 1 .069-1.53c.193-.49.545-.905 1.003-1.183L20.198.367a2.54 2.54 0 0 1 2.72.054c.399.265.71.637.894 1.07.184.434.235.91.145 1.37v.002l-3.707 19.17c-.09.46-.314.885-.648 1.223a2.505 2.505 0 0 1-1.23.681c-.47.106-.961.078-1.414-.082a2.481 2.481 0 0 1-1.138-.82Zm5.245-21.424a.951.951 0 0 0-.048.028L1.987 13.192a.92.92 0 0 0-.38.447.89.89 0 0 0-.026.58c.056.19.175.358.338.478a.96.96 0 0 0 .566.184h8.204L21.065 1.61Zm1.386.709L12.04 15.633l5.015 6.502c.11.141.26.25.43.31a.968.968 0 0 0 1.002-.227.904.904 0 0 0 .245-.462L22.44 2.585v-.002a.886.886 0 0 0 .012-.263ZM9.27 16.38v4.421c0 .166.047.33.135.472a.93.93 0 0 0 .366.336.964.964 0 0 0 .97-.053l2.604-1.725-2.66-3.45H9.272Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M18.5 12 17 18.5" stroke="#29D305" stroke-width="1.5" stroke-linecap="round"/></svg>', "e-icon--pause_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.584 7.317h-.84a.84.84 0 0 0-.842.84v7.568c0 .464.377.84.841.84h.841a.84.84 0 0 0 .84-.84V8.158a.84.84 0 0 0-.84-.84ZM14.852 7.317h-.84a.84.84 0 0 0-.841.84v7.568c0 .464.376.84.84.84h.841a.84.84 0 0 0 .841-.84V8.158a.84.84 0 0 0-.84-.84Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.756C6.342 1.756 1.756 6.342 1.756 12c0 5.658 4.586 10.244 10.244 10.244 5.658 0 10.244-4.586 10.244-10.244 0-5.658-4.586-10.244-10.244-10.244ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--pause_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M9.682 7.37H8.84A.84.84 0 0 0 8 8.21v7.568c0 .464.376.84.84.84h.842a.84.84 0 0 0 .84-.84V8.211a.84.84 0 0 0-.84-.841ZM14.95 7.37h-.841a.84.84 0 0 0-.84.84v7.568c0 .464.376.84.84.84h.84a.84.84 0 0 0 .842-.84V8.211a.84.84 0 0 0-.841-.841Z" fill="#000"/></svg>', "e-icon--phone": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.251 24a3.754 3.754 0 0 1-3.75-3.75V3.75A3.754 3.754 0 0 1 8.251 0h7.5a3.754 3.754 0 0 1 3.75 3.75v16.5a3.754 3.754 0 0 1-3.75 3.75h-7.5Zm-2.25-3.75a2.252 2.252 0 0 0 2.25 2.25h7.5a2.252 2.252 0 0 0 2.25-2.25v-.75h-12v.75Zm12-2.25V3.75a2.252 2.252 0 0 0-2.25-2.25h-7.5a2.252 2.252 0 0 0-2.25 2.25V18h12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--phone_comment": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 15.75A.75.75 0 0 1 15 15v-3h-3a3.754 3.754 0 0 1-3.75-3.75v-4.5A3.754 3.754 0 0 1 12 0h8.25A3.754 3.754 0 0 1 24 3.75v4.5A3.754 3.754 0 0 1 20.25 12h-.439l-3.53 3.53a.747.747 0 0 1-.531.22ZM12 1.5a2.252 2.252 0 0 0-2.25 2.25v4.5A2.252 2.252 0 0 0 12 10.5h3.75a.75.75 0 0 1 .75.75v1.939l2.47-2.47c.14-.14.333-.22.53-.22h.75a2.252 2.252 0 0 0 2.25-2.25v-4.5a2.252 2.252 0 0 0-2.25-2.25H12V1.5ZM3.483 23.998A3.487 3.487 0 0 1 0 20.518V4.98a3.489 3.489 0 0 1 3.483-3.483H6a.75.75 0 0 1 0 1.5H3.483c-1.093 0-1.983.89-1.983 1.983v13.017H12v-3.75a.75.75 0 0 1 1.5 0v6.268a3.486 3.486 0 0 1-3.482 3.482H3.483ZM1.5 20.516c0 1.093.89 1.982 1.983 1.982h6.535A1.984 1.984 0 0 0 12 20.516v-1.018H1.5v1.018ZM11.25 6c0 .62.505 1.125 1.125 1.125S13.5 6.62 13.5 6c0-.611-.48-1.104-1.081-1.122h-.021l-.022-.001-.042.001A1.12 1.12 0 0 0 11.25 6Zm4.875 1.125C15.505 7.125 15 6.62 15 6c0-.607.476-1.1 1.084-1.122l.042-.001h.021l.022.001A1.117 1.117 0 0 1 17.25 6c0 .62-.505 1.125-1.125 1.125ZM21 6a1.125 1.125 0 1 1-2.25 0A1.125 1.125 0 0 1 21 6Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--phone_comment-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.462 15.693a.75.75 0 0 0 .819-.163l3.53-3.53h.439A3.754 3.754 0 0 0 24 8.25v-4.5A3.754 3.754 0 0 0 20.25 0H12a3.754 3.754 0 0 0-3.75 3.75v4.5A3.754 3.754 0 0 0 12 12h3v3a.75.75 0 0 0 .462.693ZM9.75 3.75A2.252 2.252 0 0 1 12 1.5v-.001h8.25a2.252 2.252 0 0 1 2.25 2.25v4.5a2.252 2.252 0 0 1-2.25 2.25h-.75c-.197 0-.39.08-.53.22l-2.47 2.47V11.25a.75.75 0 0 0-.75-.75H12a2.252 2.252 0 0 1-2.25-2.25v-4.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 20.517a3.487 3.487 0 0 0 3.483 3.481h6.535a3.486 3.486 0 0 0 3.482-3.482v-6.268a.75.75 0 0 0-1.5 0v3.75H1.5V4.981c0-1.093.89-1.983 1.983-1.983H6a.75.75 0 0 0 0-1.5H3.483A3.489 3.489 0 0 0 0 4.981v15.536Zm3.483 1.981A1.985 1.985 0 0 1 1.5 20.516v-1.018H12v1.018a1.984 1.984 0 0 1-1.982 1.982H3.483Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12.375 7.125c-.62 0-1.125-.505-1.125-1.125 0-.607.476-1.1 1.084-1.122l.042-.001.043.001A1.117 1.117 0 0 1 13.5 6c0 .62-.505 1.125-1.125 1.125ZM16.125 7.125C15.505 7.125 15 6.62 15 6c0-.607.476-1.1 1.084-1.122l.042-.001.043.001A1.117 1.117 0 0 1 17.25 6c0 .62-.505 1.125-1.125 1.125ZM19.875 7.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--phone_image": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 11.25c0 1.24 1.009 2.25 2.25 2.25h9a2.252 2.252 0 0 0 2.25-2.25v-9A2.252 2.252 0 0 0 20.25 0h-9A2.252 2.252 0 0 0 9 2.25v9Zm12 0a.75.75 0 0 1-.75.75h-7.6l1.764-2.652.002-.001 1.236.989a.752.752 0 0 0 1.082-.155l2.001-2.851L21 10.727v.523Zm-10.5-9a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v5.773l-1.016-1.525a1.49 1.49 0 0 0-1.251-.669 1.491 1.491 0 0 0-1.226.64l-1.542 2.196-.613-.49a1.501 1.501 0 0 0-2.185.341l-2.261 3.398a.745.745 0 0 1-.406-.664v-9ZM4.983 23.998a3.486 3.486 0 0 1-3.483-3.48V4.981a3.486 3.486 0 0 1 3.483-3.483H6.75a.75.75 0 0 1 0 1.5H4.983C3.89 2.998 3 3.888 3 4.981v13.017h10.5v-2.25a.75.75 0 0 1 1.5 0v4.768a3.486 3.486 0 0 1-3.482 3.482H4.983ZM3 20.516c0 1.093.89 1.982 1.982 1.982h6.535a1.985 1.985 0 0 0 1.983-1.982v-1.018H3v1.018ZM13.875 5.25a1.124 1.124 0 0 1-.059-2.246h.007L13.875 3C14.495 3 15 3.505 15 4.125s-.505 1.125-1.125 1.125Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--pdf_document": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.5a.75.75 0 0 0-.75.75v19.465c0 .217.091.437.22.565.14.141.331.22.53.22h2.243a.75.75 0 0 1 0 1.5H2.25a2.25 2.25 0 0 1-1.591-.659A2.332 2.332 0 0 1 0 21.715V2.25A2.25 2.25 0 0 1 2.25 0h11.618a2.25 2.25 0 0 1 1.592.66l5.87 5.87a2.251 2.251 0 0 1 .66 1.592v4.628a.75.75 0 0 1-1.5 0V8.122a.752.752 0 0 0-.22-.53L14.399 1.72a.752.752 0 0 0-.53-.22H2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.74 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 0 .75.75h6a.75.75 0 0 1 0 1.5h-6a2.25 2.25 0 0 1-2.25-2.25v-6a.75.75 0 0 1 .75-.75ZM8.24 15a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.49 15.75a.75.75 0 0 1 .75-.75h.753a3 3 0 0 1 0 6h-.75a.75.75 0 0 1 0-1.5h.75a1.5 1.5 0 1 0 0-3H8.24a.75.75 0 0 1-.75-.75ZM13.49 15.75a.75.75 0 0 1 .75-.75 3.75 3.75 0 0 1 3.75 3.75v1.5A3.75 3.75 0 0 1 14.24 24a.75.75 0 0 1-.75-.75v-7.5Zm1.5.879v5.742a2.25 2.25 0 0 0 1.5-2.121v-1.5a2.25 2.25 0 0 0-1.5-2.121ZM21.74 16.5a.75.75 0 0 0-.75.75v6a.75.75 0 0 1-1.5 0v-6A2.25 2.25 0 0 1 21.74 15h1.5a.75.75 0 0 1 0 1.5h-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.49 20.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--pie_chart": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 10.5a.75.75 0 0 1-.75-.75v-9A.75.75 0 0 1 13.5 0c5.376 0 9.75 4.374 9.75 9.75a.75.75 0 0 1-.75.75h-9ZM21.716 9c-.359-3.929-3.537-7.107-7.466-7.466V9h7.466Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M10.501 24a9.688 9.688 0 0 1-6.894-2.855 9.683 9.683 0 0 1-2.856-6.894 9.687 9.687 0 0 1 2.855-6.894A9.684 9.684 0 0 1 10.5 4.5a.753.753 0 0 1 .75.75v8.741l5.401 6.873a.743.743 0 0 1 .155.553.745.745 0 0 1-.281.5A9.795 9.795 0 0 1 10.501 24ZM9.75 6.034a8.216 8.216 0 0 0-5.083 2.383 8.196 8.196 0 0 0-2.416 5.834 8.19 8.19 0 0 0 2.417 5.833 8.196 8.196 0 0 0 5.833 2.416c1.58 0 3.157-.469 4.486-1.327l-5.076-6.46a.756.756 0 0 1-.16-.463V6.034H9.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M19.061 20.577a.743.743 0 0 1-.59-.287l-5.561-7.077a.753.753 0 0 1-.084-.792A.755.755 0 0 1 13.5 12h9a.75.75 0 0 1 .75.749 9.677 9.677 0 0 1-3.726 7.667.746.746 0 0 1-.463.161Zm.106-1.829a8.116 8.116 0 0 0 2.551-5.248h-6.674l4.123 5.248Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--piggy_bank-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.087 10.5c-.2 0-.4-.08-.54-.23l-4.38-4.57c-.49-.49-.81-1.12-.92-1.82-.11-.7 0-1.4.31-2.03.24-.48.59-.89 1.01-1.2.42-.31.92-.52 1.45-.61.52-.08 1.06-.04 1.56.12s.96.45 1.34.82l.18.19.19-.19c.37-.37.83-.66 1.34-.82.5-.16 1.04-.2 1.56-.12.52.08 1.02.29 1.45.61.42.31.77.73 1.01 1.2.32.63.42 1.33.31 2.03-.11.7-.44 1.33-.94 1.83l-4.37 4.56c-.14.15-.34.23-.54.23h-.02Zm-2.55-9c-.1 0-.2 0-.29.02-.29.05-.56.16-.8.33-.23.17-.43.4-.56.66-.17.35-.23.73-.17 1.12.06.38.24.73.52 1.01l3.85 4.02 3.84-4.01c.29-.29.46-.63.53-1.02.06-.38 0-.77-.17-1.12-.13-.26-.32-.49-.56-.66-.23-.17-.51-.29-.8-.33-.28-.05-.58-.02-.86.07-.28.09-.53.25-.74.45l-.72.72c-.28.28-.78.28-1.06 0l-.72-.72c-.21-.21-.46-.36-.74-.45-.18-.06-.38-.09-.57-.09h.02Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M5.25 24c-.06 0-.12 0-.18-.02-.4-.1-.65-.51-.55-.91l.76-3.05c.1-.4.51-.65.91-.55.4.1.65.51.55.91l-.76 3.05c-.08.34-.39.57-.73.57ZM17.25 24c-.34 0-.64-.23-.73-.57l-.76-3.04c-.1-.4.14-.81.55-.91.4-.1.81.14.91.55l.76 3.04a.748.748 0 0 1-.73.93Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M11.09 22.5c-1.68 0-3.35-.44-4.82-1.26A9.914 9.914 0 0 1 2.82 18H.75c-.41 0-.75-.34-.75-.75v-6c0-.41.34-.75.75-.75h1.32a8.962 8.962 0 0 1 2.7-3.73l.31-2.5c.03-.27.14-.52.3-.73.17-.21.38-.38.63-.48.25-.1.52-.13.79-.09.27.04.52.16.72.33l1.96 1.64c.32.27.36.74.1 1.06-.27.32-.74.36-1.06.1L6.56 4.46l-.35 2.81c-.02.2-.13.38-.29.51a7.461 7.461 0 0 0-2.62 3.7c-.1.31-.39.52-.72.52h-1.1v4.5h1.74c.27 0 .51.14.65.37a8.404 8.404 0 0 0 3.12 3.06c1.29.72 2.75 1.1 4.23 1.07 4.56 0 8.26-3.36 8.26-7.5 0-.23-.01-.45-.03-.68a.75.75 0 0 1 .67-.82c.42-.04.78.26.82.67.03.27.04.55.04.82 0 4.96-4.37 9-9.75 9h-.16l.02.01Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M7.5 11.62c-.62 0-1.12-.5-1.12-1.12 0-.62.5-1.12 1.12-1.12v2.25-.01ZM7.5 11.62V9.37c.62 0 1.12.5 1.12 1.12 0 .62-.5 1.12-1.12 1.12v.01Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--pin": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.227 3.477A6.75 6.75 0 0 1 18.75 8.25c0 .706-.273 1.77-.772 3.08-.49 1.287-1.167 2.732-1.907 4.169-1.48 2.874-3.184 5.665-4.071 7.001l.625.415L12 22.5l-.625.415L12 22.5c-.887-1.336-2.591-4.127-4.071-7.001-.74-1.438-1.417-2.883-1.907-4.17-.499-1.308-.772-2.373-.772-3.079a6.75 6.75 0 0 1 1.977-4.773Zm-1.06-1.06A8.25 8.25 0 0 1 20.25 8.25c0 .997-.361 2.278-.87 3.614-.518 1.358-1.222 2.857-1.975 4.321-1.508 2.928-3.24 5.766-4.155 7.145a1.5 1.5 0 0 1-2.5 0c-.914-1.379-2.647-4.217-4.155-7.145-.753-1.463-1.457-2.963-1.975-4.321-.509-1.336-.87-2.617-.87-3.614a8.25 8.25 0 0 1 2.416-5.834ZM9 8.25a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--pin-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.5a6.75 6.75 0 0 0-6.75 6.75c0 .706.273 1.77.772 3.08.49 1.287 1.167 2.732 1.907 4.169 1.48 2.874 3.184 5.665 4.071 7.001l-.625.415L12 22.5l.625.415L12 22.5c.887-1.336 2.591-4.127 4.071-7.001.74-1.438 1.417-2.883 1.907-4.17.499-1.308.772-2.373.772-3.079A6.75 6.75 0 0 0 12 1.5ZM12 0a8.25 8.25 0 0 0-8.25 8.25c0 .997.361 2.278.87 3.614.518 1.358 1.222 2.857 1.975 4.321 1.508 2.928 3.24 5.766 4.155 7.145a1.5 1.5 0 0 0 2.5 0c.914-1.379 2.647-4.217 4.155-7.145.753-1.463 1.457-2.963 1.975-4.321.509-1.336.87-2.617.87-3.614A8.25 8.25 0 0 0 12 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-4.5 3a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--pin-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0a8.25 8.25 0 0 0-8.25 8.25c0 .997.361 2.278.87 3.614.518 1.358 1.222 2.857 1.975 4.321 1.508 2.928 3.24 5.766 4.155 7.145a1.5 1.5 0 0 0 2.5 0c.914-1.379 2.647-4.217 4.155-7.145.753-1.463 1.457-2.963 1.975-4.321.509-1.336.87-2.617.87-3.614A8.25 8.25 0 0 0 12 0Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-4.5 3a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" fill="var(--e-color-icon-filled-foreground-1, var(--e-color-icon-filled-foreground-1, #FFFFFF))"/></svg>', "e-icon--pin-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 3.75a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm-3 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" fill="#000"/><path d="M6.166 2.416A8.25 8.25 0 0 1 20.25 8.25c0 .997-.361 2.278-.87 3.614-.518 1.358-1.222 2.857-1.975 4.321-1.508 2.928-3.24 5.766-4.155 7.145a1.5 1.5 0 0 1-2.5 0c-.914-1.379-2.647-4.217-4.155-7.145-.753-1.463-1.457-2.963-1.975-4.321-.509-1.336-.87-2.617-.87-3.614a8.25 8.25 0 0 1 2.416-5.834Zm1.061 1.061A6.75 6.75 0 0 1 18.75 8.25c0 .706-.273 1.77-.772 3.08-.49 1.287-1.167 2.732-1.907 4.169-1.48 2.874-3.184 5.665-4.071 7.001-.887-1.336-2.591-4.127-4.071-7.001-.74-1.438-1.417-2.883-1.907-4.17-.499-1.308-.772-2.373-.772-3.079a6.75 6.75 0 0 1 1.977-4.773Z" fill="#000"/><path d="M12 1.5a6.75 6.75 0 0 0-6.75 6.75c0 .706.273 1.77.772 3.08.49 1.287 1.167 2.732 1.907 4.169 1.48 2.874 3.184 5.665 4.071 7.001.887-1.336 2.591-4.127 4.071-7.001.74-1.438 1.417-2.883 1.907-4.17.499-1.308.772-2.373.772-3.079A6.75 6.75 0 0 0 12 1.5Zm0 2.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--play_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.906 7.36a1.069 1.069 0 0 1 1.15.015l7.181 3.592c.318.16.645.455.645.894 0 .44-.326.735-.645.894l-7.182 3.591a1.069 1.069 0 0 1-1.647-1.019V8.396a1.07 1.07 0 0 1 .498-1.036Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.756C6.342 1.756 1.756 6.342 1.756 12c0 5.658 4.586 10.244 10.244 10.244 5.658 0 10.244-4.586 10.244-10.244 0-5.658-4.586-10.244-10.244-10.244ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--play_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.906 7.36a1.069 1.069 0 0 1 1.15.015l7.181 3.592c.318.16.645.455.645.894 0 .44-.326.735-.645.894l-7.182 3.591a1.069 1.069 0 0 1-1.647-1.019V8.396a1.07 1.07 0 0 1 .498-1.036Z" fill="#000"/></svg>', "e-icon--plus": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.243 1.243a1.243 1.243 0 1 0-2.486 0v9.514H1.243a1.243 1.243 0 1 0 0 2.486h9.514v9.514a1.243 1.243 0 1 0 2.486 0v-9.514h9.514a1.243 1.243 0 1 0 0-2.486h-9.514V1.243Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--plus-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.243 1.243a1.243 1.243 0 1 0-2.486 0v9.514H1.243a1.243 1.243 0 1 0 0 2.486h9.514v9.514a1.243 1.243 0 1 0 2.486 0v-9.514h9.514a1.243 1.243 0 1 0 0-2.486h-9.514V1.243Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--position-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.88 1a1 1 0 0 1 1-1h.25a1 1 0 0 1 1 1v1.466a9.604 9.604 0 0 1 8.405 8.409H23a1 1 0 0 1 1 1v.25a1 1 0 0 1-1 1h-1.465a9.604 9.604 0 0 1-8.405 8.41V23a1 1 0 0 1-1 1h-.25a1 1 0 0 1-1-1v-1.465a9.604 9.604 0 0 1-8.415-8.41H1a1 1 0 0 1-1-1v-.25a1 1 0 0 1 1-1h1.465a9.604 9.604 0 0 1 8.415-8.41V1ZM12 19.35a7.35 7.35 0 1 0 0-14.7 7.35 7.35 0 0 0 0 14.7Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--position-bold-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.88 1a1 1 0 0 1 1-1h.25a1 1 0 0 1 1 1v1.466a9.604 9.604 0 0 1 8.405 8.409H23a1 1 0 0 1 1 1v.25a1 1 0 0 1-1 1h-1.465a9.604 9.604 0 0 1-8.405 8.41V23a1 1 0 0 1-1 1h-.25a1 1 0 0 1-1-1v-1.465a9.604 9.604 0 0 1-8.415-8.41H1a1 1 0 0 1-1-1v-.25a1 1 0 0 1 1-1h1.465a9.604 9.604 0 0 1 8.415-8.41V1ZM12 19.35a7.35 7.35 0 1 0 0-14.7 7.35 7.35 0 0 0 0 14.7Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--position_off-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.278.722a1.1 1.1 0 0 1 0 1.556l-21 21a1.1 1.1 0 1 1-1.556-1.556l21-21a1.1 1.1 0 0 1 1.556 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.88 1a1 1 0 0 1 1-1h.25a1 1 0 0 1 1 1v1.466a9.604 9.604 0 0 1 8.405 8.409H23a1 1 0 0 1 1 1v.25a1 1 0 0 1-1 1h-1.465a9.604 9.604 0 0 1-8.405 8.41V23a1 1 0 0 1-1 1h-.25a1 1 0 0 1-1-1v-1.465a9.604 9.604 0 0 1-8.415-8.41H1a1 1 0 0 1-1-1v-.25a1 1 0 0 1 1-1h1.465a9.604 9.604 0 0 1 8.415-8.41V1ZM12 19.35a7.35 7.35 0 1 0 0-14.7 7.35 7.35 0 0 0 0 14.7Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--power": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m6.97 10.407-.825 1.227a1.8 1.8 0 0 0-.281 1.83 1.579 1.579 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .17.221L8.369 23.37a.543.543 0 0 0 .332.594.553.553 0 0 0 .643-.191L15.11 16l2.782-3.602a1.95 1.95 0 0 0 .322-.774 1.76 1.76 0 0 0 0-.825 1.61 1.61 0 0 0-.423-.714 1.287 1.287 0 0 0-.734-.372l-2.444-.393a.16.16 0 0 1-.136-.117.16.16 0 0 1-.005-.064C14.655 8.033 15.76.993 15.75.49c-.01-.503-.785-.694-1.137-.211L9.61 7l-2.64 3.407Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--power_2": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m9.61 7-2.64 3.407-.825 1.227a1.8 1.8 0 0 0-.281 1.83 1.58 1.58 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .17.222L8.369 23.37a.543.543 0 0 0 .332.593.553.553 0 0 0 .643-.191L15.11 16l2.782-3.602a1.95 1.95 0 0 0 .322-.774 1.76 1.76 0 0 0 0-.825 1.609 1.609 0 0 0-.423-.714 1.287 1.287 0 0 0-.734-.372l-2.444-.392a.16.16 0 0 1-.136-.118.16.16 0 0 1-.005-.063c.147-.896.9-5.684 1.177-7.74l.008-.065.033-.254.002-.015c.038-.3.06-.504.058-.576-.01-.503-.785-.694-1.137-.21L9.61 7Zm4.155-3.07-2.96 3.977-2.618 3.379-.84 1.248-.048.058a.3.3 0 0 0-.066.233c.01.007.02.01.031.013h.002l2.379.378a1.691 1.691 0 0 1 1.443 1.93l-.685 4.681 3.51-4.732 2.763-3.576a.45.45 0 0 0 .061-.16l.008-.043.01-.044a.26.26 0 0 0 .006-.087l-2.37-.38a1.661 1.661 0 0 1-1.405-1.863l.003-.022.003-.023a546.003 546.003 0 0 0 .773-4.967Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--power_outage": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m15.558 16.775-7.043-5.634a.566.566 0 0 0-.838.09.532.532 0 0 0 .108.787l1.256 1.007a.057.057 0 0 1 0 .079l-.464.69a1.013 1.013 0 0 0-.159 1.03.89.89 0 0 0 .657.48l1.352.215a.108.108 0 0 1 .094.081c.004.014.004.03.002.044l-.696 4.752a.305.305 0 0 0 .187.334.311.311 0 0 0 .362-.108l3.004-4.04a.062.062 0 0 1 .084 0l1.364 1.036a.513.513 0 0 0 .764-.068.52.52 0 0 0-.034-.775ZM13.98 7.526c.005.283-.617 4.243-.72 4.865a.092.092 0 0 0 .02.067.091.091 0 0 0 .06.035l1.375.22a.724.724 0 0 1 .413.21c.113.11.194.249.237.401a.991.991 0 0 1 0 .464c-.028.157-.09.305-.18.436l-.408.566a.137.137 0 0 1-.153.031.137.137 0 0 1-.045-.031l-2.133-1.726-2.036-1.63a.09.09 0 0 1 0-.124l2.93-3.903c.198-.272.634-.164.64.119Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--power_outage-2": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.946 16.934 6.425 6.917a1.006 1.006 0 0 0-1.489.16.945.945 0 0 0 .191 1.399l2.233 1.79a.1.1 0 0 1 0 .14l-.825 1.228a1.8 1.8 0 0 0-.281 1.83 1.58 1.58 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .171.221l-1.237 8.449a.543.543 0 0 0 .332.593.553.553 0 0 0 .644-.191l5.34-7.181a.11.11 0 0 1 .15 0l2.425 1.84a.915.915 0 0 0 1.357-.12.926.926 0 0 0-.06-1.378ZM16.14.49c.01.503-1.096 7.543-1.277 8.65a.16.16 0 0 0 .14.18l2.445.393c.278.04.536.17.734.372.2.197.346.443.422.714.066.27.066.554 0 .825-.05.278-.16.542-.322.774l-.724 1.006a.24.24 0 0 1-.352 0l-3.791-3.068L9.794 7.44a.16.16 0 0 1 0-.221l5.21-6.94c.352-.483 1.126-.292 1.136.211Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--power_outage-2-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.946 16.934 6.425 6.917a1.006 1.006 0 0 0-1.489.16.945.945 0 0 0 .191 1.399l2.233 1.79a.1.1 0 0 1 0 .14l-.825 1.228a1.8 1.8 0 0 0-.281 1.83 1.58 1.58 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .171.221l-1.237 8.449a.543.543 0 0 0 .332.593.553.553 0 0 0 .644-.191l5.34-7.181a.11.11 0 0 1 .15 0l2.425 1.84a.915.915 0 0 0 1.357-.12.926.926 0 0 0-.06-1.378ZM16.14.49c.01.503-1.096 7.543-1.277 8.65a.16.16 0 0 0 .14.18l2.445.393c.278.04.536.17.734.372.2.197.346.443.422.714.066.27.066.554 0 .825-.05.278-.16.542-.322.774l-.724 1.006a.24.24 0 0 1-.352 0l-3.791-3.068L9.794 7.44a.16.16 0 0 1 0-.221l5.21-6.94c.352-.483 1.126-.292 1.136.211Z" fill="var(--e-color-icon-warning, var(--e-color-icon-warning, #FFA000))"/></svg>', "e-icon--power_outage-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m15.558 16.775-7.043-5.634a.566.566 0 0 0-.838.09.532.532 0 0 0 .108.787l1.256 1.007a.057.057 0 0 1 0 .079l-.464.69a1.013 1.013 0 0 0-.159 1.03.89.89 0 0 0 .657.48l1.352.215a.108.108 0 0 1 .094.081c.004.014.004.03.002.044l-.696 4.752a.305.305 0 0 0 .187.334.311.311 0 0 0 .362-.108l3.004-4.04a.062.062 0 0 1 .084 0l1.364 1.036a.513.513 0 0 0 .764-.068.52.52 0 0 0-.034-.775ZM13.98 7.526c.005.283-.617 4.243-.72 4.865a.092.092 0 0 0 .02.067.091.091 0 0 0 .06.035l1.375.22a.724.724 0 0 1 .413.21c.113.11.194.249.237.401a.991.991 0 0 1 0 .464c-.028.157-.09.305-.18.436l-.408.566a.137.137 0 0 1-.153.031.137.137 0 0 1-.045-.031l-2.133-1.726-2.036-1.63a.09.09 0 0 1 0-.124l2.93-3.903c.198-.272.634-.164.64.119Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--power_outage_map": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m21.997 19.584-7.825-6.261a.629.629 0 0 0-.93.1.59.59 0 0 0 .119.874l1.395 1.12a.063.063 0 0 1 0 .087l-.515.767a1.125 1.125 0 0 0-.176 1.144.987.987 0 0 0 .729.534l1.502.24a.12.12 0 0 1 .107.137l-.773 5.28a.34.34 0 0 0 .207.371.345.345 0 0 0 .403-.119l3.338-4.488a.07.07 0 0 1 .094 0l1.515 1.15a.572.572 0 0 0 .848-.075.577.577 0 0 0-.038-.861ZM20.244 9.306c.006.315-.685 4.715-.799 5.406a.1.1 0 0 0 .05.101.1.1 0 0 0 .038.012l1.528.245a.806.806 0 0 1 .459.233c.125.123.216.277.264.446.04.17.04.346 0 .516-.031.174-.1.339-.201.484l-.453.628a.152.152 0 0 1-.22 0l-2.37-1.917-2.262-1.81a.1.1 0 0 1 0-.138l3.256-4.338c.22-.301.704-.182.71.132Z" fill="var(--e-color-icon-warning, var(--e-color-icon-warning, #FFA000))"/><path d="M21.402 2.28 16.07.146a1.955 1.955 0 0 0-1.484 0L8.665 2.49c.24-.067-.08.013 0 0 0 0 .08.009 0-.004L3.162.315A1.324 1.324 0 0 0 1.34 1.56v12.773a2 2 0 0 0 1.253 1.858l5.334 2.133a2.01 2.01 0 0 0 1.484 0l2.551-1.04a.67.67 0 1 0-.497-1.244l-2.134.889V3.706l.071-.03 5.263-2.125v5.786a.667.667 0 1 0 1.333 0V1.551l4.907 1.964a.676.676 0 0 1 .426.622v3.867a.667.667 0 0 0 1.334 0V4.137a1.992 1.992 0 0 0-1.263-1.857ZM3.082 14.955a.667.667 0 0 1-.417-.622V1.551l5.333 2.124v13.227l-4.916-1.947Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--power_outage-orange-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m15.558 16.525-7.043-5.634a.566.566 0 0 0-.838.09.532.532 0 0 0 .108.787l1.256 1.007a.057.057 0 0 1 0 .079l-.464.69a1.013 1.013 0 0 0-.159 1.03.89.89 0 0 0 .657.48l1.352.215a.108.108 0 0 1 .094.081c.004.014.004.03.002.044l-.696 4.752a.305.305 0 0 0 .187.334.311.311 0 0 0 .362-.108l3.004-4.04a.062.062 0 0 1 .084 0l1.364 1.036a.513.513 0 0 0 .764-.068.52.52 0 0 0-.034-.775ZM13.98 7.276c.005.283-.617 4.243-.72 4.865a.092.092 0 0 0 .02.067.091.091 0 0 0 .06.035l1.375.22a.724.724 0 0 1 .413.21c.113.11.194.249.237.401a.991.991 0 0 1 0 .464c-.028.157-.09.305-.18.436l-.408.566a.137.137 0 0 1-.153.031.137.137 0 0 1-.045-.031l-2.133-1.726-2.036-1.63a.09.09 0 0 1 0-.124l2.93-3.903c.198-.272.634-.164.64.119Z" fill="var(--e-color-icon-warning, var(--e-color-icon-warning, #FFA000))"/></svg>', "e-icon--power_service": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2 10.5c-3.7 0-6.6 2.7-6.8 6.3H6.3c-3.3 0-4.8-3.1-4.8-6 0-1.7.5-3.3 1.3-4.4.9-1.3 2.3-1.9 3.9-1.9h1.5c.3 1.7 1.9 3 3.7 3h1.5c1 0 1.8-.6 2.1-1.5H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.2V3H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.4C15.3.7 14.5 0 13.5 0H12c-1.8 0-3.3 1.3-3.7 3H6.8c-2.1 0-3.9.9-5.1 2.5C.6 7 0 8.8 0 10.9c0 3.7 2.2 7.5 6.3 7.5h4.2c.6 3.2 3.4 5.6 6.7 5.6 3.8 0 6.8-3.1 6.8-6.8 0-3.7-3-6.7-6.8-6.7ZM12 1.6h1.5c.4 0 .8.3.8.8v3c-.1.3-.4.6-.8.6H12c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2Zm5.2 20.8c-2.8 0-5.2-2.4-5.2-5.2 0-2.8 2.3-5.2 5.2-5.2 2.9 0 5.2 2.4 5.2 5.2 0 2.8-2.4 5.2-5.2 5.2Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.001 17.2c0 .5-.3.8-.8.8-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3ZM16.1 19.9c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--power_service-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2 10.5c-3.7 0-6.6 2.7-6.8 6.3H6.3c-3.3 0-4.8-3.1-4.8-6 0-1.7.5-3.3 1.3-4.4.9-1.3 2.3-1.9 3.9-1.9h1.5c.3 1.7 1.9 3 3.7 3h1.5c1 0 1.8-.6 2.1-1.5H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.2V3H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.4C15.3.7 14.5 0 13.5 0H12c-1.8 0-3.3 1.3-3.7 3H6.8c-2.1 0-3.9.9-5.1 2.5C.6 7 0 8.8 0 10.9c0 3.7 2.2 7.5 6.3 7.5h4.2c.6 3.2 3.4 5.6 6.7 5.6 3.8 0 6.8-3.1 6.8-6.8 0-3.7-3-6.7-6.8-6.7ZM12 1.6h1.5c.4 0 .8.3.8.8v3c-.1.3-.4.6-.8.6H12c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2Zm5.2 20.8c-2.8 0-5.2-2.4-5.2-5.2 0-2.8 2.3-5.2 5.2-5.2 2.9 0 5.2 2.4 5.2 5.2 0 2.8-2.4 5.2-5.2 5.2Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.001 17.2c0 .5-.3.8-.8.8-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3ZM16.1 19.9c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--power-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m6.98 10.407-.825 1.227a1.8 1.8 0 0 0-.281 1.83 1.579 1.579 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .17.221L8.379 23.37a.543.543 0 0 0 .332.594.553.553 0 0 0 .643-.191L15.12 16l2.782-3.602c.162-.232.272-.496.322-.774a1.758 1.758 0 0 0 0-.825 1.61 1.61 0 0 0-.423-.714 1.287 1.287 0 0 0-.734-.372l-2.444-.393a.16.16 0 0 1-.14-.18C14.662 8.032 15.77.992 15.76.49c-.01-.503-.785-.694-1.137-.211L9.62 7l-2.64 3.407Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--powerline": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.945 4.175H13.76l-5.22 3.91V21.96a.71.71 0 1 1-1.42 0V8.085L1.9 4.17H.715a.71.71 0 1 1 0-1.42h.71v-.71c0-.395.325-.71.715-.71.39 0 .71.315.71.71v.71h1.42v-.71c0-.395.33-.71.72-.71.39 0 .71.315.71.71v.71h4.27v-.71a.71.71 0 1 1 1.42 0v.71h1.425v-.71a.71.71 0 1 1 1.42 0v.71h.71c.395 0 .71.325.71.715a.71.71 0 0 1-.71.71ZM7.83 6.845l3.555-2.67H4.27l3.56 2.67Zm15.44 6.166a.714.714 0 0 1 .73.709.72.72 0 0 1-.74.715 15.53 15.53 0 0 1-12.19-5.86.714.714 0 0 1 .11-1 .714.714 0 0 1 1 .11 14.12 14.12 0 0 0 11.08 5.325l.01.001Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--powerline-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.76 4.175h1.185a.71.71 0 0 0 .71-.71.714.714 0 0 0-.71-.715h-.71v-.71a.71.71 0 1 0-1.42 0v.71H11.39v-.71a.71.71 0 1 0-1.42 0v.71H5.7v-.71a.71.71 0 0 0-.71-.71c-.39 0-.72.315-.72.71v.71H2.85v-.71a.71.71 0 0 0-.71-.71.714.714 0 0 0-.715.71v.71h-.71a.71.71 0 1 0 0 1.42H1.9l5.22 3.915V21.96a.71.71 0 1 0 1.42 0V8.085l5.22-3.91Zm-2.375 0L7.83 6.845l-3.56-2.67h7.115Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M23.285 13.01c-.01.005-.015 0-.025 0a14.12 14.12 0 0 1-11.08-5.325.714.714 0 0 0-1-.11.714.714 0 0 0-.11 1 15.53 15.53 0 0 0 12.19 5.86c.4.01.74-.31.74-.715a.714.714 0 0 0-.715-.71Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--powermeter_ams": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.79 0h14.32c.995 0 1.79.797 1.89 1.793v20.415C21 23.203 19.994 24 19 24H4.79C3.796 24 3 23.203 3 22.207V1.793C3 .797 3.796 0 4.79 0Zm13.662 22.5c1.048 0 1.048-.9 1.048-1v-9.54H4.492L4.5 21.5c0 .1 0 1 1 1h12.952ZM4.492 10.615H19.5V2.5c0-1-.9-1-1-1h-13c-1 0-1 .9-1 1v-1l-.008 9.115Zm7.955 6.373c0 1.692-1.292 2.987-2.983 2.987-1.591 0-2.983-1.295-2.983-2.987C6.48 15.295 7.773 14 9.464 14c1.69 0 2.983 1.295 2.983 2.988Zm-1.491 0c0-.797-.696-1.494-1.492-1.494-.795 0-1.492.697-1.492 1.494 0 .796.697 1.493 1.492 1.493.796 0 1.492-.697 1.492-1.493Zm5.27-.797c.597 0 1.095-.498 1.095-1.096 0-.597-.498-1.095-1.095-1.095-.596 0-1.093.498-1.093 1.095 0 .598.497 1.096 1.094 1.096Zm0 3.784a1.095 1.095 0 1 0-.001-2.19 1.095 1.095 0 0 0 .002 2.19ZM13.657 4h-3.104v.918h2.172v1.02h-2.172v.92h2.172v1.224h-2.172V9h3.103V4ZM9.102 8.082H6.931V6.857h2.172V4H6v.918h2.172v1.02H6V9h3.103v-.918ZM18 5.939h-1.965v-1.02H18V4h-2.897v2.857h1.966v1.225h-1.966V9H18V5.939Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--powermeter_ams-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.79 0h14.32c.995 0 1.79.797 1.89 1.793v20.415C21 23.203 19.994 24 19 24H4.79C3.796 24 3 23.203 3 22.207V1.793C3 .797 3.796 0 4.79 0Zm13.662 22.5c1.048 0 1.048-.9 1.048-1v-9.54H4.492L4.5 21.5c0 .1 0 1 1 1h12.952ZM4.492 10.615H19.5V2.5c0-1-.9-1-1-1h-13c-1 0-1 .9-1 1v-1l-.008 9.115Zm7.955 6.373c0 1.692-1.292 2.987-2.983 2.987-1.591 0-2.983-1.295-2.983-2.987C6.48 15.295 7.773 14 9.464 14c1.69 0 2.983 1.295 2.983 2.988Zm-1.491 0c0-.797-.696-1.494-1.492-1.494-.795 0-1.492.697-1.492 1.494 0 .796.697 1.493 1.492 1.493.796 0 1.492-.697 1.492-1.493ZM13.656 4h-3.104v.918h2.172v1.02h-2.172v.92h2.172v1.224h-2.172V9h3.103V4ZM9.102 8.082H6.931V6.857h2.172V4H6v.918h2.172v1.02H6V9h3.103v-.918ZM18 5.939h-1.965v-1.02H18V4h-2.897v2.857h1.966v1.225h-1.966V9H18V5.939Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><rect x="15.13" y="17.78" width="2.19" height="2.19" rx="1.095" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><rect x="15.13" y="14" width="2.19" height="2.19" rx="1.095" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--powermeter_old": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.5c-.9 0-1.8.6-2.1 1.5H8.3c.4-1.7 1.9-3 3.7-3 .5 0 1 .1 1.5.2L16 5.5c.1-.2.3-.3.6-.3.1 0 .3 0 .4.1.1.1.3.3.3.5.1.2 0 .4-.1.6l-2.5 3.7c.5.5.9 1.2 1 1.9h-1.6c-.3-.9-1.2-1.5-2.1-1.5ZM16.2 17.2H7.8c-.4 0-.7-.3-.7-.7v-.1c0-.4.3-.7.7-.7h8.4c.4 0 .7.3.7.7v.1c0 .4-.3.7-.7.7Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.11 0H4.79C3.796 0 3 .797 3 1.793v20.415C3 23.203 3.796 24 4.79 24H19c.994 0 2-.797 2-1.793V1.793C20.9.797 20.105 0 19.11 0Zm.39 21.5c0 .1 0 1-1.048 1H5.5c-1 0-1-.9-1-1l-.008-8.156H19.5V21.5Zm0-9.5H4.492L4.5 4.297h15V12Zm0-9.012h-15V2.5c0-.1 0-1 1-1h13c.1 0 1 0 1 1v.488Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--powermeter-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.5c-.9 0-1.8.6-2.1 1.5H8.3c.4-1.7 1.9-3 3.7-3 .5 0 1 .1 1.5.2L16 5.5c.1-.2.3-.3.6-.3.1 0 .3 0 .4.1.1.1.3.3.3.5.1.2 0 .4-.1.6l-2.5 3.7c.5.5.9 1.2 1 1.9h-1.6c-.3-.9-1.2-1.5-2.1-1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.11 0H4.79C3.796 0 3 .797 3 1.793v20.415C3 23.203 3.796 24 4.79 24H19c.994 0 2-.797 2-1.793V1.793C20.9.797 20.105 0 19.11 0Zm.39 21.5c0 .1 0 1-1.048 1H5.5c-1 0-1-.9-1-1l-.008-8.156H19.5V21.5Zm0-9.5H4.492L4.5 4.297h15V12Zm0-9.012h-15V2.5c0-.1 0-1 1-1h13c.1 0 1 0 1 1v.488Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 16.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--process-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.8 24h-9c-.3 0-.5-.2-.7-.4-.1-.3-.1-.6 0-.8l7.6-10.7L.1 1.2C0 1 0 .7.1.4.2.1.5 0 .8 0h9c.2 0 .5.1.6.3L19 11.6c.2.3.2.6 0 .9l-8.6 11.2c-.2.2-.4.3-.6.3Zm-7.6-1.5h7.2l8-10.4-8-10.5H2.2l7.1 10.2c.2.3.2.6 0 .9l-7.1 9.8Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M15.4 24c-.2 0-.3 0-.4-.1-.3-.2-.4-.7-.2-1.1l7.6-10.7-7.6-10.9c-.2-.3-.2-.8.2-1 .4-.2.8-.1 1 .2l7.9 11.4c.2.3.2.6 0 .9l-7.9 11c-.2.2-.4.3-.6.3Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--profile": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 6c0 3.308 2.692 6 6 6s6-2.692 6-6-2.692-6-6-6-6 2.692-6 6Zm1.5 0c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5A4.505 4.505 0 0 1 7.5 6ZM21 23.25a.75.75 0 0 0 1.5 0c0-5.79-4.71-10.5-10.5-10.5S1.5 17.46 1.5 23.25a.75.75 0 0 0 1.5 0c0-4.963 4.037-9 9-9s9 4.037 9 9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--profile-2": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 6c0 3.308 2.692 6 6 6s6-2.692 6-6-2.692-6-6-6-6 2.692-6 6Zm1.5 0c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5A4.505 4.505 0 0 1 7.5 6ZM21 23.25a.75.75 0 0 0 1.5 0c0-5.79-4.71-10.5-10.5-10.5S1.5 17.46 1.5 23.25a.75.75 0 0 0 1.5 0c0-4.963 4.037-9 9-9s9 4.037 9 9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--profile-2-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 6c0 3.308 2.692 6 6 6s6-2.692 6-6-2.692-6-6-6-6 2.692-6 6Zm1.5 0c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5A4.505 4.505 0 0 1 7.5 6ZM21 23.25a.75.75 0 0 0 1.5 0c0-5.79-4.71-10.5-10.5-10.5S1.5 17.46 1.5 23.25a.75.75 0 0 0 1.5 0c0-4.963 4.037-9 9-9s9 4.037 9 9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--profile-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.96 6.17a4.032 4.032 0 1 1 8.065 0 4.032 4.032 0 0 1-8.065 0ZM11.992 0a6.17 6.17 0 1 0 0 12.34 6.17 6.17 0 0 0 0-12.34ZM6.05 16.988a8.405 8.405 0 0 1 14.348 5.943 1.069 1.069 0 1 0 2.138 0 10.542 10.542 0 1 0-21.085 0 1.069 1.069 0 0 0 2.138 0c0-2.229.885-4.367 2.461-5.943Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--question_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15a.75.75 0 0 1-.75-.75v-1.006a2.251 2.251 0 0 1 1.5-2.122 2.254 2.254 0 0 0 1.5-2.121c0-.601-.234-1.166-.659-1.591A2.232 2.232 0 0 0 12 6.751c-.601 0-1.166.234-1.591.659A2.231 2.231 0 0 0 9.75 9a.75.75 0 0 1-1.5 0c0-1.002.391-1.943 1.099-2.651A3.725 3.725 0 0 1 12 5.251a3.755 3.755 0 0 1 3.75 3.75 3.756 3.756 0 0 1-2.5 3.535.752.752 0 0 0-.5.707v1.007A.75.75 0 0 1 12 15ZM12 18.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--question_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15a.75.75 0 0 1-.75-.75v-1.006a2.251 2.251 0 0 1 1.5-2.122 2.254 2.254 0 0 0 1.5-2.121c0-.601-.234-1.166-.659-1.591A2.232 2.232 0 0 0 12 6.751c-.601 0-1.166.234-1.591.659A2.231 2.231 0 0 0 9.75 9a.75.75 0 0 1-1.5 0c0-1.002.391-1.943 1.099-2.651A3.725 3.725 0 0 1 12 5.251a3.755 3.755 0 0 1 3.75 3.75 3.756 3.756 0 0 1-2.5 3.535.752.752 0 0 0-.5.707v1.007A.75.75 0 0 1 12 15Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 18.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--question_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M12 15a.75.75 0 0 1-.75-.75v-1.006a2.251 2.251 0 0 1 1.5-2.122 2.254 2.254 0 0 0 1.5-2.121c0-.601-.234-1.166-.659-1.591A2.232 2.232 0 0 0 12 6.751c-.601 0-1.166.234-1.591.659A2.231 2.231 0 0 0 9.75 9a.75.75 0 0 1-1.5 0c0-1.002.391-1.943 1.099-2.651A3.725 3.725 0 0 1 12 5.251a3.755 3.755 0 0 1 3.75 3.75 3.756 3.756 0 0 1-2.5 3.535.752.752 0 0 0-.5.707v1.007A.75.75 0 0 1 12 15ZM12 18.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" fill="#000"/></svg>', "e-icon--quotation-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.54 14.584a5.322 5.322 0 0 1 .792-10.582 5.32 5.32 0 0 1 3.772 9.085l-.004.003-6.608 6.593a1.084 1.084 0 0 1-1.532 0 1.078 1.078 0 0 1 0-1.528l3.58-3.572Zm9.755 3.569 3.58-3.571A5.32 5.32 0 0 1 18.667 4a5.32 5.32 0 0 1 3.772 9.085l-.003.003-6.61 6.594a1.084 1.084 0 0 1-1.531 0 1.079 1.079 0 0 1 0-1.529Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--recycle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.926 20.957h6.083c1.061 0 2.059-.397 2.812-1.12a3.71 3.71 0 0 0 .637-4.61l-1.38-2.29a.811.811 0 0 0-1.082-.275.743.743 0 0 0-.287 1.038l1.38 2.29c.212.346.318.753.318 1.15a2.2 2.2 0 0 1-.7 1.618 2.394 2.394 0 0 1-1.688.672h-6.114l1.836-1.76a.746.746 0 0 0 0-1.08.826.826 0 0 0-1.125 0l-3.184 3.054a.747.747 0 0 0-.234.54V20.192c0 .241.12.459.307.6l3.111 2.983c.16.153.361.224.563.224a.805.805 0 0 0 .562-.224.746.746 0 0 0 0-1.079l-1.815-1.74ZM18.442 9.785a.811.811 0 0 0 .74-.024.746.746 0 0 0 .39-.547L20.72 5.11c.116-.407-.139-.824-.563-.936-.435-.102-.86.132-.977.54l-.664 2.386-3.072-5.185a3.91 3.91 0 0 0-2.41-1.782 4.08 4.08 0 0 0-3.014.377 3.96 3.96 0 0 0-1.465 1.405L7.43 3.776c-.223.356-.085.825.286 1.038A.807.807 0 0 0 8.8 4.54l1.125-1.862c.212-.356.52-.641.881-.845a2.448 2.448 0 0 1 1.815-.224 2.37 2.37 0 0 1 1.444 1.069l3.078 5.188-2.494-.639a.796.796 0 0 0-.977.54c-.117.407.138.824.563.936l4.207 1.083ZM5.663 13.1c.095.345.414.57.764.57l.021.01c.064 0 .138-.01.202-.031.425-.112.68-.53.563-.937L6.045 8.54a.76.76 0 0 0-.372-.468.835.835 0 0 0-.605-.081L.716 9.11c-.424.111-.679.529-.562.936a.8.8 0 0 0 .976.54l2.513-.644-3.107 5.285c-1.104 1.821-.446 4.162 1.454 5.21a4.106 4.106 0 0 0 1.985.51h3.259c.435 0 .796-.346.796-.764 0-.417-.36-.763-.796-.763H3.986c-.414 0-.828-.102-1.19-.305-1.135-.631-1.528-2.036-.87-3.135l3.079-5.244.658 2.363Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--recycle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.926 20.957h6.083c1.061 0 2.059-.397 2.812-1.12a3.71 3.71 0 0 0 .637-4.61l-1.38-2.29a.811.811 0 0 0-1.082-.275.743.743 0 0 0-.287 1.038l1.38 2.29c.212.346.318.753.318 1.15a2.2 2.2 0 0 1-.7 1.618 2.394 2.394 0 0 1-1.688.672h-6.114l1.836-1.76a.746.746 0 0 0 0-1.08.826.826 0 0 0-1.125 0l-3.184 3.054a.747.747 0 0 0-.234.54V20.192c0 .241.12.459.307.6l3.111 2.983c.16.153.361.224.563.224a.805.805 0 0 0 .562-.224.746.746 0 0 0 0-1.079l-1.815-1.74ZM18.442 9.785a.811.811 0 0 0 .74-.024.746.746 0 0 0 .39-.547L20.72 5.11c.116-.407-.139-.824-.563-.936-.435-.102-.86.132-.977.54l-.664 2.386-3.072-5.185a3.91 3.91 0 0 0-2.41-1.782 4.08 4.08 0 0 0-3.014.377 3.96 3.96 0 0 0-1.465 1.405L7.43 3.776c-.223.356-.085.825.286 1.038A.807.807 0 0 0 8.8 4.54l1.125-1.862c.212-.356.52-.641.881-.845a2.448 2.448 0 0 1 1.815-.224 2.37 2.37 0 0 1 1.444 1.069l3.078 5.188-2.494-.639a.796.796 0 0 0-.977.54c-.117.407.138.824.563.936l4.207 1.083ZM5.663 13.1c.095.345.414.57.764.57l.021.01c.064 0 .138-.01.202-.031.425-.112.68-.53.563-.937L6.045 8.54a.76.76 0 0 0-.372-.468.835.835 0 0 0-.605-.081L.716 9.11c-.424.111-.679.529-.562.936a.8.8 0 0 0 .976.54l2.513-.644-3.107 5.285c-1.104 1.821-.446 4.162 1.454 5.21a4.106 4.106 0 0 0 1.985.51h3.259c.435 0 .796-.346.796-.764 0-.417-.36-.763-.796-.763H3.986c-.414 0-.828-.102-1.19-.305-1.135-.631-1.528-2.036-.87-3.135l3.079-5.244.658 2.363Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--refresh": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.193 23.25c1.48 0 2.926-.29 4.296-.862a.803.803 0 0 0-.616-1.485 9.518 9.518 0 0 1-3.682.74 9.538 9.538 0 0 1-6.633-2.669 9.564 9.564 0 0 1-2.952-6.735 9.566 9.566 0 0 1 2.653-6.86 9.493 9.493 0 0 1 6.93-2.963c2.484 0 4.838.945 6.628 2.664a9.59 9.59 0 0 1 2.935 6.252 9.608 9.608 0 0 1-1.563 5.991v-2.915a.803.803 0 0 0-.802-.804.803.803 0 0 0-.801.804v4.823c0 .444.359.804.802.804h.254a.397.397 0 0 0 .102 0h4.454a.803.803 0 0 0 0-1.608H20.38a11.241 11.241 0 0 0 1.998-6.649 11.27 11.27 0 0 0-.05-.816l-.008-.081c-.006-.07-.012-.14-.02-.211l-.006-.049a11.31 11.31 0 0 0-3.376-6.748A11.171 11.171 0 0 0 11.152.75c-1.48 0-2.927.288-4.296.858a.792.792 0 0 0-.278.192A11.099 11.099 0 0 0 3.1 4.268c-4.267 4.471-4.11 11.59.35 15.868a11.134 11.134 0 0 0 7.74 3.114h.003v.001Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--remove_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.97 17.03a.746.746 0 0 0 1.06.001.752.752 0 0 0 0-1.061L13.06 12l3.97-3.97a.743.743 0 0 0 .22-.53c0-.2-.078-.389-.22-.53a.744.744 0 0 0-1.06 0L12 10.94 8.03 6.97a.743.743 0 0 0-.53-.22c-.2 0-.389.078-.53.22a.743.743 0 0 0-.22.53c0 .2.078.389.22.53L10.94 12l-3.97 3.97a.752.752 0 0 0 .53 1.281c.2 0 .388-.078.53-.22l3.97-3.97 3.97 3.969Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--remove_circle-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M16.5 17.25a.743.743 0 0 1-.53-.22L12 13.061l-3.97 3.97a.744.744 0 0 1-1.06 0 .752.752 0 0 1 0-1.061L10.94 12 6.97 8.03a.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22L12 10.94l3.97-3.97a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53L13.06 12l3.97 3.97a.752.752 0 0 1 0 1.061.746.746 0 0 1-.53.219Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--remove_circle-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/><path d="M16.5 17.25a.743.743 0 0 1-.53-.22L12 13.061l-3.97 3.97a.744.744 0 0 1-1.06 0 .752.752 0 0 1 0-1.061L10.94 12 6.97 8.03a.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22L12 10.94l3.97-3.97a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53L13.06 12l3.97 3.97a.752.752 0 0 1 0 1.061.746.746 0 0 1-.53.219Z" fill="var(--e-color-icon-filled-foreground-1, var(--e-color-icon-filled-foreground-1, #FFFFFF))"/></svg>', "e-icon--remove_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M16.5 17.25a.743.743 0 0 1-.53-.22L12 13.061l-3.97 3.97a.744.744 0 0 1-1.06 0 .752.752 0 0 1 0-1.061L10.94 12 6.97 8.03a.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22L12 10.94l3.97-3.97a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53L13.06 12l3.97 3.97a.752.752 0 0 1 0 1.061.746.746 0 0 1-.53.219Z" fill="#000"/></svg>', "e-icon--renewable_energy": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.22 7.466a.782.782 0 0 0 1.318-.842 10.962 10.962 0 0 0-7.55-4.93.78.78 0 0 0-.892.653.784.784 0 0 0 .654.894 9.395 9.395 0 0 1 6.47 4.225ZM3.578 17.568a10.916 10.916 0 0 0 9.723 5.91h.004c.273 0 .555-.01.84-.031a.78.78 0 0 0 .723-.838.785.785 0 0 0-.838-.723c-.247.018-.49.027-.729.027a9.356 9.356 0 0 1-8.333-5.065.78.78 0 0 0-1.441.123.776.776 0 0 0 .051.597ZM7.043 10.174a3.134 3.134 0 0 1-3.13-3.13 3.134 3.134 0 0 1 3.13-3.13 3.134 3.134 0 0 1 3.13 3.13 3.134 3.134 0 0 1-3.13 3.13Zm0-4.696c-.862 0-1.565.703-1.565 1.566 0 .862.703 1.565 1.566 1.565.862 0 1.565-.703 1.565-1.565 0-.863-.703-1.566-1.566-1.566ZM7.043 3.13a.783.783 0 0 1-.782-.782V.783a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.782ZM11.74 7.826a.783.783 0 0 1 0-1.565h1.564a.783.783 0 0 1 0 1.565H11.74ZM7.043 14.087a.783.783 0 0 1-.782-.783V11.74a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.783ZM.783 7.826a.783.783 0 0 1 0-1.565h1.565a.783.783 0 0 1 0 1.565H.783ZM3.723 4.506a.775.775 0 0 1-.553-.23L2.063 3.17a.777.777 0 0 1 0-1.106.775.775 0 0 1 .553-.23c.209 0 .406.082.553.23L4.276 3.17a.777.777 0 0 1 0 1.106.777.777 0 0 1-.553.23ZM10.364 4.506a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.553c0-.208.082-.406.23-.553l1.107-1.107a.777.777 0 0 1 1.106 0c.148.147.23.344.23.553a.775.775 0 0 1-.23.553l-1.107 1.107a.777.777 0 0 1-.553.23ZM11.471 12.253a.775.775 0 0 1-.553-.23L9.81 10.918a.775.775 0 0 1-.23-.553c0-.209.082-.406.23-.553a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23l1.107 1.107c.148.147.23.344.23.553a.775.775 0 0 1-.23.553.772.772 0 0 1-.552.23ZM2.616 12.253a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.552c0-.209.082-.406.23-.553L3.17 9.81a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23.148.147.23.344.23.553a.775.775 0 0 1-.23.553L3.17 12.024a.775.775 0 0 1-.553.23ZM17.232 17.302l.46-.665 1.475-1.845 2.795-3.64c.196-.262.629-.159.634.114.006.272-.612 4.085-.713 4.684a.085.085 0 0 0 .018.066.088.088 0 0 0 .06.033l1.366.212c.155.022.3.093.41.202.112.106.193.24.236.386.036.147.036.3 0 .447a1.04 1.04 0 0 1-.18.42l-1.554 1.95-3.22 4.21a.318.318 0 0 1-.36.104.3.3 0 0 1-.151-.129.287.287 0 0 1-.035-.192l.691-4.576a.1.1 0 0 0-.02-.08.106.106 0 0 0-.075-.04l-1.343-.207a.898.898 0 0 1-.383-.155.863.863 0 0 1-.268-.308.948.948 0 0 1 .157-.991Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--renewable_energy-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.22 7.466a.782.782 0 0 0 1.318-.842 10.962 10.962 0 0 0-7.55-4.93.78.78 0 0 0-.892.653.784.784 0 0 0 .654.894 9.395 9.395 0 0 1 6.47 4.225ZM3.578 17.568a10.916 10.916 0 0 0 9.723 5.91h.004c.273 0 .555-.01.84-.031a.78.78 0 0 0 .723-.838.785.785 0 0 0-.838-.723c-.247.018-.49.027-.729.027a9.356 9.356 0 0 1-8.333-5.065.78.78 0 0 0-1.441.123.776.776 0 0 0 .051.597ZM7.043 10.174a3.134 3.134 0 0 1-3.13-3.13 3.134 3.134 0 0 1 3.13-3.13 3.134 3.134 0 0 1 3.13 3.13 3.134 3.134 0 0 1-3.13 3.13Zm0-4.696c-.862 0-1.565.703-1.565 1.566 0 .862.703 1.565 1.566 1.565.862 0 1.565-.703 1.565-1.565 0-.863-.703-1.566-1.566-1.566ZM7.043 3.13a.783.783 0 0 1-.782-.782V.783a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.782ZM11.74 7.826a.783.783 0 0 1 0-1.565h1.564a.783.783 0 0 1 0 1.565H11.74ZM7.043 14.087a.783.783 0 0 1-.782-.783V11.74a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.783ZM.783 7.826a.783.783 0 0 1 0-1.565h1.565a.783.783 0 0 1 0 1.565H.783ZM3.723 4.506a.775.775 0 0 1-.553-.23L2.063 3.17a.777.777 0 0 1 0-1.106.775.775 0 0 1 .553-.23c.209 0 .406.082.553.23L4.276 3.17a.777.777 0 0 1 0 1.106.777.777 0 0 1-.553.23ZM10.364 4.506a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.553c0-.208.082-.406.23-.553l1.107-1.107a.777.777 0 0 1 1.106 0c.148.147.23.344.23.553a.775.775 0 0 1-.23.553l-1.107 1.107a.777.777 0 0 1-.553.23ZM11.471 12.253a.775.775 0 0 1-.553-.23L9.81 10.918a.775.775 0 0 1-.23-.553c0-.209.082-.406.23-.553a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23l1.107 1.107c.148.147.23.344.23.553a.775.775 0 0 1-.23.553.772.772 0 0 1-.552.23ZM2.616 12.253a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.552c0-.209.082-.406.23-.553L3.17 9.81a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23.148.147.23.344.23.553a.775.775 0 0 1-.23.553L3.17 12.024a.775.775 0 0 1-.553.23Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m17.232 17.302.46-.665 1.475-1.845 2.795-3.64c.196-.262.629-.159.634.114.006.272-.612 4.085-.713 4.684a.085.085 0 0 0 .018.066.088.088 0 0 0 .06.033l1.366.212c.155.022.3.093.41.202.112.106.193.24.236.386.036.147.036.3 0 .447a1.04 1.04 0 0 1-.18.42l-1.554 1.95-3.22 4.21a.318.318 0 0 1-.36.104.3.3 0 0 1-.151-.129.287.287 0 0 1-.035-.192l.691-4.576a.1.1 0 0 0-.02-.08.106.106 0 0 0-.075-.04l-1.343-.207a.898.898 0 0 1-.383-.155.863.863 0 0 1-.268-.308.948.948 0 0 1 .157-.991Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--reset": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 12.739c0-1.493.301-2.886.904-4.28.1-.199.2-.398.402-.398.2-.1.402-.1.602 0 .302.1.503.398.503.697 0 .1 0 .199-.1.299-.503 1.194-.704 2.388-.704 3.682 0 2.488.904 4.777 2.712 6.568 1.808 1.792 4.219 2.887 6.73 2.986 2.612.1 5.022-.896 6.93-2.687 1.91-1.792 3.014-4.28 3.014-6.867 0-2.488-.904-4.777-2.712-6.569-1.707-1.691-4.018-2.786-6.328-2.985-2.11-.1-4.219.398-6.027 1.592H9.59c.402 0 .804.398.804.796s-.402.796-.804.796H4.768c-.402 0-.804-.398-.804-.796V.796c0-.398.302-.796.804-.796s.803.398.803.796v2.787c1.909-1.294 4.32-2.09 6.63-1.99.2 0 .502 0 .803.099H13.306c2.712.298 5.022 1.493 6.83 3.384a11.196 11.196 0 0 1 3.114 7.762c0 1.493-.301 2.887-.904 4.28 0 .1-.1.199-.2.298-.604 1.294-1.407 2.488-2.512 3.484-4.52 4.28-11.652 4.08-15.971-.299C1.855 18.411.75 15.625.75 12.74Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--rotate_right": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.8 11.556a.258.258 0 0 0-.257.259v10.37c0 .143.115.26.257.26h14.4a.258.258 0 0 0 .257-.26v-10.37a.258.258 0 0 0-.257-.26H7.8Zm-1.8.259C6 10.813 6.806 10 7.8 10h14.4c.994 0 1.8.813 1.8 1.815v10.37A1.807 1.807 0 0 1 22.2 24H7.8c-.994 0-1.8-.813-1.8-1.815v-10.37ZM8.559 7.693A.75.75 0 0 0 9.6 7.498l2.418-3.533a.75.75 0 0 0-.152-1.01L8.503.28a.75.75 0 1 0-.933 1.174l2.817 2.24L8.363 6.65a.75.75 0 0 0 .196 1.043Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M.506 10.421a.75.75 0 0 0 .953-.465 8.445 8.445 0 0 1 1.816-3.03A8.144 8.144 0 0 1 6.23 4.972a7.785 7.785 0 0 1 3.454-.48.75.75 0 0 0 .132-1.494 9.285 9.285 0 0 0-4.118.571 9.644 9.644 0 0 0-3.505 2.318l-.008.009A9.945 9.945 0 0 0 .04 9.468a.75.75 0 0 0 .465.953Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--rss-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.353 19.291a3.642 3.642 0 1 1-7.285.001 3.642 3.642 0 0 1 7.285 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.896 9.722a9.843 9.843 0 0 0-5.421.285A1.112 1.112 0 1 1 .75 7.903a12.067 12.067 0 0 1 15.692 8.7 12.074 12.074 0 0 1-.349 6.646 1.112 1.112 0 1 1-2.103-.724A9.849 9.849 0 0 0 6.896 9.722Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.64 2.95a17.047 17.047 0 0 0-8.306-.384A1.112 1.112 0 1 1 .89.386a19.27 19.27 0 0 1 22.287 13.322c.919 3.047 1.07 6.273.44 9.392a1.112 1.112 0 1 1-2.18-.441A17.056 17.056 0 0 0 9.64 2.949Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--ruler": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M2.697 14.76a.75.75 0 0 1 1.06 0l2.451 2.45a.75.75 0 1 1-1.06 1.06l-2.45-2.45a.75.75 0 0 1 0-1.06ZM5.125 12.246a.75.75 0 0 1 1.06-.008l1.803 1.819a.75.75 0 1 1-1.052 1.069l-1.803-1.82a.75.75 0 0 1-.008-1.06ZM7.603 9.767a.75.75 0 0 1 1.061 0l2.45 2.45a.75.75 0 0 1-1.06 1.06l-2.45-2.45a.75.75 0 0 1 0-1.06ZM10.078 7.292a.75.75 0 0 1 1.06 0l1.716 1.715a.75.75 0 0 1-1.06 1.06l-1.716-1.715a.75.75 0 0 1 0-1.06ZM12.553 4.816a.75.75 0 0 1 1.06 0l2.45 2.45a.75.75 0 1 1-1.06 1.061l-2.45-2.45a.75.75 0 0 1 0-1.06ZM14.99 2.657a.75.75 0 0 1 1.06 0l1.673 1.673a.75.75 0 1 1-1.06 1.06L14.99 3.719a.75.75 0 0 1 0-1.06Z"/><path d="M16.763.512a1.75 1.75 0 0 1 2.474 0l4.243 4.242a1.75 1.75 0 0 1 0 2.475L7.234 23.476a1.75 1.75 0 0 1-2.475 0L.516 19.233a1.75 1.75 0 0 1 0-2.475L16.763.512Zm1.414 1.06a.25.25 0 0 0-.354 0L1.577 17.82a.25.25 0 0 0 0 .354l4.242 4.242a.25.25 0 0 0 .354 0L22.419 6.17a.25.25 0 0 0 0-.354l-4.242-4.242Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--search": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9.75a.75.75 0 0 0-1.5 0 6.75 6.75 0 0 0 6.75 6.75.75.75 0 0 0 0-1.5A5.25 5.25 0 0 1 5 9.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.654 18.847a9.81 9.81 0 0 0 2.552-1.58l6.516 6.517a.75.75 0 0 0 1.06-1.061l-6.516-6.518a9.813 9.813 0 0 0 1.58-10.228C16.728.99 10.967-1.335 5.978.784.99 2.904-1.335 8.666.784 13.654c2.12 4.988 7.882 7.313 12.87 5.193ZM6.564 2.165a8.313 8.313 0 1 0 6.503 15.301A8.313 8.313 0 0 0 6.564 2.165Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--search-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.203 18.263a9.807 9.807 0 0 1-2.552 1.58c-4.988 2.12-10.75-.205-12.87-5.193C-.337 9.663 1.988 3.9 6.976 1.781c4.988-2.12 10.75.205 12.87 5.193a9.813 9.813 0 0 1-1.581 10.228l6.516 6.518a.75.75 0 0 1-1.06 1.06l-6.517-6.517Zm-14.04-4.2a8.313 8.313 0 1 1 15.3-6.502 8.313 8.313 0 0 1-15.3 6.503Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 10a.75.75 0 0 1 .75.75C6 13.65 8.35 16 11.25 16a.75.75 0 0 1 0 1.5 6.75 6.75 0 0 1-6.75-6.75.75.75 0 0 1 .75-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--search-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.98 6.02C16.845.996 11.042-1.346 6.02.79.996 2.925-1.346 8.727.79 13.75c2.135 5.023 7.937 7.364 12.96 5.23a9.896 9.896 0 0 0 2.293-1.363l6.057 6.057a1.113 1.113 0 1 0 1.573-1.573l-6.057-6.058A9.88 9.88 0 0 0 18.98 6.019ZM6.89 2.837a7.657 7.657 0 1 1 5.99 14.094A7.657 7.657 0 0 1 6.89 2.838ZM4 9a1 1 0 1 1 2 0 5 5 0 0 0 5 5 1 1 0 1 1 0 2 7 7 0 0 1-7-7Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--search-bold-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.02.79c5.023-2.135 10.825.207 12.96 5.23a9.88 9.88 0 0 1-1.364 10.023l6.057 6.058a1.113 1.113 0 0 1-1.573 1.573l-6.057-6.057a9.896 9.896 0 0 1-2.293 1.363C8.727 21.114 2.925 18.773.79 13.75-1.345 8.727.997 2.925 6.02.79Zm10.912 6.1a7.657 7.657 0 1 0-14.094 5.99 7.657 7.657 0 0 0 14.093-5.99Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M5 8a1 1 0 0 0-1 1 7 7 0 0 0 7 7 1 1 0 1 0 0-2 5 5 0 0 1-5-5 1 1 0 0 0-1-1Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--season": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.572 9.608a.782.782 0 0 1-.581-.479 9.395 9.395 0 0 0-5.56-5.365.784.784 0 0 1-.475-1 .78.78 0 0 1 1-.474 10.962 10.962 0 0 1 6.489 6.26.784.784 0 0 1-.873 1.058ZM2.205 16.119c.266.04.489.212.598.457a9.395 9.395 0 0 0 5.753 5.159c.41.13.64.57.51.982a.78.78 0 0 1-.982.51 10.961 10.961 0 0 1-6.713-6.02.784.784 0 0 1 .834-1.088ZM7.044 10.174a3.134 3.134 0 0 1-3.13-3.13 3.134 3.134 0 0 1 3.13-3.13 3.134 3.134 0 0 1 3.13 3.13 3.134 3.134 0 0 1-3.13 3.13Zm0-4.696c-.863 0-1.566.703-1.566 1.566 0 .862.703 1.565 1.566 1.565.862 0 1.565-.703 1.565-1.565 0-.863-.703-1.566-1.565-1.566ZM7.043 3.13a.783.783 0 0 1-.782-.782V.783a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.783.782ZM11.74 7.826a.783.783 0 0 1 0-1.565h1.564a.783.783 0 0 1 0 1.565H11.74ZM7.043 14.087a.783.783 0 0 1-.782-.783V11.74a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.783.783ZM.783 7.826a.783.783 0 0 1 0-1.565h1.565a.783.783 0 0 1 0 1.565H.783ZM3.723 4.506a.775.775 0 0 1-.553-.23L2.063 3.17a.777.777 0 0 1 0-1.106.775.775 0 0 1 .553-.23c.209 0 .406.082.553.23L4.276 3.17a.777.777 0 0 1 0 1.106.777.777 0 0 1-.553.23ZM10.364 4.506a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.553c0-.208.082-.406.23-.553l1.107-1.107a.777.777 0 0 1 1.106 0c.148.147.23.344.23.553a.775.775 0 0 1-.23.553l-1.107 1.107a.777.777 0 0 1-.553.23ZM11.471 12.253a.775.775 0 0 1-.553-.23L9.81 10.918a.775.775 0 0 1-.23-.553c0-.209.082-.406.23-.553a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23l1.107 1.107c.148.147.23.344.23.553a.775.775 0 0 1-.23.553.772.772 0 0 1-.552.23ZM2.616 12.253a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.552c0-.209.082-.406.23-.553L3.17 9.81a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23.148.147.23.344.23.553a.775.775 0 0 1-.23.553L3.17 12.024a.775.775 0 0 1-.553.23Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.612 12.612a.612.612 0 0 0-1.224 0v1.55l-1.069-.712a.612.612 0 1 0-.679 1.019l1.748 1.165v1.754h-1.754l-1.165-1.748a.612.612 0 0 0-1.02.68l.713 1.068h-1.55a.612.612 0 0 0 0 1.224h1.55l-.712 1.069a.612.612 0 1 0 1.019.679l1.165-1.748h1.754v1.754l-1.748 1.165a.612.612 0 1 0 .68 1.02l1.068-.713v1.55a.612.612 0 0 0 1.224 0v-1.55l1.069.712a.612.612 0 1 0 .679-1.019l-1.748-1.165v-1.754h1.754l1.165 1.748a.612.612 0 0 0 1.02-.68l-.713-1.068h1.55a.612.612 0 0 0 0-1.224h-1.55l.712-1.069a.612.612 0 1 0-1.019-.68l-1.165 1.749h-1.754v-1.754l1.748-1.165a.612.612 0 1 0-.68-1.02l-1.068.713v-1.55Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--select_area": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"><path d="M3.751 1.497a2.25 2.25 0 0 0-2.25 2.25.75.75 0 0 1-1.5 0 3.75 3.75 0 0 1 3.75-3.75.75.75 0 0 1 0 1.5ZM.751 16.497a.75.75 0 0 1 .75.75 2.25 2.25 0 0 0 2.25 2.25.75.75 0 0 1 0 1.5 3.75 3.75 0 0 1-3.75-3.75.75.75 0 0 1 .75-.75ZM16.501.747a.75.75 0 0 1 .75-.75 3.75 3.75 0 0 1 3.75 3.75.75.75 0 0 1-1.5 0 2.25 2.25 0 0 0-2.25-2.25.75.75 0 0 1-.75-.75ZM20.251 7.497a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75ZM.751 7.497a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75ZM7.501.747a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM7.501 20.247a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM14.235 14.232a.75.75 0 0 1 .793-.172l8.486 3.182a.75.75 0 0 1 .032 1.391l-3.437 1.473-1.473 3.436a.75.75 0 0 1-1.391-.032l-3.182-8.485a.75.75 0 0 1 .172-.793Zm1.812 1.812 1.946 5.19.856-1.995a.75.75 0 0 1 .394-.393l1.995-.856-5.191-1.946Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--settings_vertical": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 5.265a.75.75 0 0 0-1.5 0v5.345a3.001 3.001 0 0 0-1.371 5.026 3 3 0 0 0 1.371.783v2.346a.75.75 0 1 0 1.5 0v-2.346a3.01 3.01 0 0 0 1.744-1.238A3 3 0 0 0 16.5 10.61V5.265Zm-.75 6.75a1.5 1.5 0 1 0 0 2.999 1.5 1.5 0 0 0 0-3ZM9 10.42a3 3 0 1 0-1.5 0v8.345a.75.75 0 1 0 1.5 0v-8.346Zm-.751-1.405a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 .001 3h-.001Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 0A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V2.25A2.25 2.25 0 0 0 21.75 0H2.25ZM1.5 2.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v19.5a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V2.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--shortcut": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 1.5a.75.75 0 0 0-.75.75v6.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-6.5a.75.75 0 0 0-.75-.75h-6.5Zm-2.25.75A2.25 2.25 0 0 1 8.75 0h6.5a2.25 2.25 0 0 1 2.25 2.25v6.5A2.25 2.25 0 0 1 15.25 11h-6.5A2.25 2.25 0 0 1 6.5 8.75v-6.5Zm4.97 1.22a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1-1.06 1.06L12 5.06l-1.47 1.47a.75.75 0 1 1-1.06-1.06l2-2ZM2.25 14.5a.75.75 0 0 0-.75.75v6.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-6.5a.75.75 0 0 0-.75-.75h-6.5ZM0 15.25A2.25 2.25 0 0 1 2.25 13h6.5A2.25 2.25 0 0 1 11 15.25v6.5A2.25 2.25 0 0 1 8.75 24h-6.5A2.25 2.25 0 0 1 0 21.75v-6.5Zm15.25-.75a.75.75 0 0 0-.75.75v6.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-6.5a.75.75 0 0 0-.75-.75h-6.5Zm-2.25.75A2.25 2.25 0 0 1 15.25 13h6.5A2.25 2.25 0 0 1 24 15.25v6.5A2.25 2.25 0 0 1 21.75 24h-6.5A2.25 2.25 0 0 1 13 21.75v-6.5Zm-6.47.72a.75.75 0 0 1 0 1.06L5.06 18.5l1.47 1.47a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 0Zm10.94 0a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 1 1-1.06-1.06l1.47-1.47-1.47-1.47a.75.75 0 0 1 0-1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--shovel": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.022 1.747a.762.762 0 0 1 1.077 0l2.154 2.157a.762.762 0 0 1 0 1.075l-.009.008a2.285 2.285 0 1 1-3.231-3.231l.01-.01ZM19.561 0c-.604 0-1.183.239-1.611.664a3.807 3.807 0 0 0-.527 4.836l-7.02 7.019-3.23-3.232a.762.762 0 0 0-1.078 0l-4.31 4.307a6.096 6.096 0 0 0 8.621 8.62l4.309-4.309a.762.762 0 0 0 0-1.077l-1.616-1.615a.762.762 0 1 0-1.077 1.077l1.077 1.077-3.77 3.77a4.572 4.572 0 0 1-6.466-6.466l3.77-3.768 2.694 2.693-2.155 2.155a.762.762 0 1 0 1.077 1.077L18.5 6.577a3.808 3.808 0 0 0 4.836-.527 2.285 2.285 0 0 0-.005-3.222L21.177.669A2.286 2.286 0 0 0 19.56 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--smart_city": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.25 10.939a.751.751 0 0 1-.741-.71 8.788 8.788 0 0 0-8.627-8.218.74.74 0 0 1-.711-.78.75.75 0 0 1 .78-.731 10.259 10.259 0 0 1 10.069 9.648.74.74 0 0 1-.71.79h-.06ZM5.253 5.604H3.753v1.381h3.003v-1.38H5.254Zm.751-4.353v2.852h.8a1.431 1.431 0 0 1 1.502 1.311v1.571h.95a1.24 1.24 0 0 1 1.252 1.211v13.922h1.501v-7.176a1.491 1.491 0 0 1 1.501-1.431h3.753a1.491 1.491 0 0 1 1.502 1.471v7.136h2.252a.75.75 0 0 1 0 1.501H.75A.75.75 0 0 1 0 22.87V8.206a1.241 1.241 0 0 1 1.251-1.22h1V5.503a1.461 1.461 0 0 1 1.552-1.401h.7V1.251a.75.75 0 0 1 1.502 0Zm1.502 7.256H1.501v13.611h7.507V8.507H7.586a.758.758 0 0 1-.079 0Zm-4.285 2.642c.141.141.332.22.531.22h3.003a.75.75 0 1 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.531 3.103a.75.75 0 0 1 0-1.502h3.003a.75.75 0 0 1 0 1.502H3.753Zm-.53 2.662c.14.14.331.22.53.22h3.003a.75.75 0 0 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.53 3.102a.75.75 0 0 1 0-1.501h3.003a.75.75 0 0 1 0 1.501H3.753Zm14.471-8.142a.76.76 0 0 0 .522.216l-.01.02a.74.74 0 0 0 .73-.77 6.585 6.585 0 0 0-6.565-6.336.75.75 0 0 0 0 1.501 5.084 5.084 0 0 1 5.094 4.854.76.76 0 0 0 .23.515Zm-.96 10.244h-3.753v-7.146h3.753v7.146Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--smart_city-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.746 12.09a.76.76 0 0 1-.751-.73 5.084 5.084 0 0 0-5.094-4.855.75.75 0 0 1 0-1.501 6.585 6.585 0 0 1 6.565 6.335.74.74 0 0 1-.73.77l.01-.02ZM23.25 10.939a.751.751 0 0 1-.741-.71 8.788 8.788 0 0 0-8.627-8.218.74.74 0 0 1-.711-.78.75.75 0 0 1 .78-.731 10.259 10.259 0 0 1 10.069 9.648.74.74 0 0 1-.71.79h-.06Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.254 5.604H3.753v1.381h3.003v-1.38H5.254Zm.751-4.353v2.852h.8a1.431 1.431 0 0 1 1.502 1.311v1.571h.95a1.24 1.24 0 0 1 1.252 1.211v13.922h1.501v-7.176a1.491 1.491 0 0 1 1.501-1.431h3.753a1.491 1.491 0 0 1 1.502 1.471v7.136h2.252a.75.75 0 0 1 0 1.501H.75A.75.75 0 0 1 0 22.87V8.206a1.241 1.241 0 0 1 1.251-1.22h1V5.503a1.461 1.461 0 0 1 1.552-1.401h.7V1.251a.75.75 0 0 1 1.502 0Zm1.502 7.256H1.501v13.611h7.507V8.507H7.586a.758.758 0 0 1-.079 0Zm-4.285 2.642c.141.141.332.22.531.22h3.003a.75.75 0 1 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.531 3.103a.75.75 0 0 1 0-1.502h3.003a.75.75 0 0 1 0 1.502H3.753Zm-.53 2.662c.14.14.331.22.53.22h3.003a.75.75 0 0 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.53 3.102a.75.75 0 0 1 0-1.501h3.003a.75.75 0 0 1 0 1.501H3.753Zm13.511 2.102h-3.753v-7.146h3.753v7.146Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--solar_panel": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 1.5a.75.75 0 0 0 1.5 0V.75a.75.75 0 0 0-1.5 0v.75ZM4.9 12a.75.75 0 0 1-.557-.247 5.215 5.215 0 0 1-1.342-3.788 5.213 5.213 0 0 1 1.73-3.627 5.236 5.236 0 0 1 3.51-1.346c1.488 0 2.911.632 3.904 1.734.249.276.468.579.652.9.1.175.125.377.073.57a.749.749 0 0 1-1.375.176 3.758 3.758 0 0 0-5.762-.92 3.724 3.724 0 0 0-1.235 2.59c-.052 1 .288 1.962.958 2.706A.752.752 0 0 1 4.9 12Zm11.6 12a.75.75 0 0 1-.75-.75V21h-3v2.25a.75.75 0 0 1-1.5 0V21H6.313c-.401 0-.777-.156-1.06-.439a1.489 1.489 0 0 1-.352-1.563l3.214-9A1.5 1.5 0 0 1 9.527 9h9.114c.602 0 1.143.357 1.379.911l1.707 3.983c.021.039.039.08.053.123l2.098 4.893A1.502 1.502 0 0 1 22.5 21h-5.25v2.25a.75.75 0 0 1-.75.75ZM6.314 19.502 13.5 19.5V15H7.922l-1.608 4.502ZM22.5 19.5 20.57 15H15v4.5h7.5Zm-2.573-6-1.286-3H15v3h4.927Zm-6.427 0v-3H9.529l-1.071 3H13.5Zm0-9a.743.743 0 0 1-.53-.22.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53l.75-.75a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53l-.75.75a.744.744 0 0 1-.53.22ZM2.47 4.28a.744.744 0 0 0 1.06 0 .743.743 0 0 0 .22-.53c0-.2-.078-.389-.22-.53l-.75-.75a.743.743 0 0 0-.53-.22c-.2 0-.389.078-.53.22A.743.743 0 0 0 1.5 3c0 .2.078.389.22.53l.75.75ZM.75 9a.75.75 0 0 1 0-1.5h.75a.75.75 0 0 1 0 1.5H.75Zm.97 5.03a.748.748 0 0 0 1.06.001l.75-.75A.752.752 0 0 0 3 12a.744.744 0 0 0-.53.219l-.75.75a.752.752 0 0 0 0 1.061Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--solar_panel-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 24a.75.75 0 0 1-.75-.75V21h-3v2.25a.75.75 0 0 1-1.5 0V21H6.313c-.401 0-.777-.156-1.06-.439a1.489 1.489 0 0 1-.352-1.563l3.214-9A1.5 1.5 0 0 1 9.527 9h9.114c.602 0 1.143.357 1.379.911l1.707 3.983c.021.039.039.08.053.123l2.098 4.893A1.502 1.502 0 0 1 22.5 21h-5.25v2.25a.75.75 0 0 1-.75.75ZM6.314 19.502 13.5 19.5V15H7.922l-1.608 4.502ZM22.5 19.5 20.57 15H15v4.5h7.5Zm-2.573-6-1.286-3H15v3h4.927Zm-6.427 0v-3H9.529l-1.071 3H13.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M4.9 12a.75.75 0 0 1-.557-.247 5.215 5.215 0 0 1-1.342-3.788 5.213 5.213 0 0 1 1.73-3.627 5.236 5.236 0 0 1 3.51-1.346c1.488 0 2.911.632 3.904 1.734.249.276.468.579.652.9.1.175.125.377.073.57a.749.749 0 0 1-1.375.176 3.758 3.758 0 0 0-5.762-.92 3.724 3.724 0 0 0-1.235 2.59c-.052 1 .288 1.962.958 2.706A.752.752 0 0 1 4.9 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M8.25 2.25a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v.75a.75.75 0 0 1-.75.75ZM13.5 4.5a.743.743 0 0 1-.53-.22.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53l.75-.75a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53l-.75.75a.744.744 0 0 1-.53.22ZM3 4.5a.743.743 0 0 1-.53-.22l-.75-.75A.743.743 0 0 1 1.5 3c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22l.75.75c.142.141.22.33.22.53s-.078.389-.22.53A.744.744 0 0 1 3 4.5ZM.75 9a.75.75 0 0 1 0-1.5h.75a.75.75 0 0 1 0 1.5H.75ZM2.25 14.25a.752.752 0 0 1-.53-1.281l.75-.75A.744.744 0 0 1 3 12a.752.752 0 0 1 .53 1.281l-.75.75a.748.748 0 0 1-.53.219Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--sorting_ascending-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.596.08a1.043 1.043 0 0 0-.339.228l-4.76 4.76A1.048 1.048 0 1 0 7.978 6.55l2.974-2.973v19.375a1.048 1.048 0 1 0 2.095 0V3.577l2.974 2.973a1.048 1.048 0 1 0 1.481-1.481L12.74.307A1.044 1.044 0 0 0 11.596.08Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_descending-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6 23.92a1.044 1.044 0 0 0 1.143-.229l4.76-4.76a1.048 1.048 0 0 0-1.481-1.481l-2.974 2.973V1.048a1.048 1.048 0 1 0-2.095 0v19.375L7.979 17.45a1.048 1.048 0 0 0-1.481 1.481l4.762 4.762c.1.1.216.177.34.228Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_alfabetical_a_to_z": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.596.08a1.043 1.043 0 0 0-.339.228l-4.76 4.76A1.048 1.048 0 1 0 7.978 6.55l2.974-2.973v19.375a1.048 1.048 0 1 0 2.095 0V3.577l2.974 2.973a1.048 1.048 0 1 0 1.481-1.481L12.74.307A1.044 1.044 0 0 0 11.596.08Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_alfabetical_z_to_a": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6 23.92a1.044 1.044 0 0 0 1.143-.229l4.76-4.76a1.048 1.048 0 0 0-1.481-1.481l-2.974 2.973V1.048a1.048 1.048 0 1 0-2.095 0v19.375L7.979 17.45a1.048 1.048 0 0 0-1.481 1.481l4.762 4.762c.1.1.216.177.34.228Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_date_earliest_to_latest": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.596.08a1.043 1.043 0 0 0-.339.228l-4.76 4.76A1.048 1.048 0 1 0 7.978 6.55l2.974-2.973v19.375a1.048 1.048 0 1 0 2.095 0V3.577l2.974 2.973a1.048 1.048 0 1 0 1.481-1.481L12.74.307A1.044 1.044 0 0 0 11.596.08Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_date_latest_to_earliest": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6 23.92a1.044 1.044 0 0 0 1.143-.229l4.76-4.76a1.048 1.048 0 0 0-1.481-1.481l-2.974 2.973V1.048a1.048 1.048 0 1 0-2.095 0v19.375L7.979 17.45a1.048 1.048 0 0 0-1.481 1.481l4.762 4.762c.1.1.216.177.34.228Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.449.307c.409-.41 1.072-.41 1.481 0l4.762 4.762a1.048 1.048 0 0 1-1.481 1.481L18.19 2.53l-4.022 4.02a1.048 1.048 0 0 1-1.481-1.481L17.449.307Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.19 0c.578 0 1.047.469 1.047 1.048v21.904a1.048 1.048 0 1 1-2.095 0V1.048C17.142.469 17.61 0 18.189 0ZM6.55 23.693c-.409.41-1.072.41-1.481 0L.307 18.931a1.048 1.048 0 0 1 1.481-1.481l4.021 4.02 4.022-4.02a1.048 1.048 0 0 1 1.481 1.481L6.55 23.693Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.81 24a1.048 1.048 0 0 1-1.048-1.048V1.048a1.048 1.048 0 0 1 2.095 0v21.904c0 .579-.469 1.048-1.048 1.048Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting-2-bold": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.069.307c.409-.41 1.072-.41 1.481 0l4.762 4.762A1.048 1.048 0 0 1 9.831 6.55L5.81 2.53 1.788 6.55A1.048 1.048 0 0 1 .307 5.07L5.069.307Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.805 0c.579 0 1.048.469 1.048 1.048v21.904a1.048 1.048 0 1 1-2.095 0V1.048C4.758.469 5.227 0 5.805 0ZM19.166 23.693c-.41.41-1.073.41-1.482 0l-4.762-4.762a1.048 1.048 0 1 1 1.482-1.481l4.02 4.02 4.022-4.02a1.048 1.048 0 1 1 1.481 1.481l-4.761 4.762Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.429 24a1.048 1.048 0 0 1-1.048-1.048V1.048a1.048 1.048 0 0 1 2.096 0v21.904c0 .579-.47 1.048-1.048 1.048Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_number_high_to_low": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6 23.92a1.044 1.044 0 0 0 1.143-.229l4.76-4.76a1.048 1.048 0 0 0-1.481-1.481l-2.974 2.973V1.048a1.048 1.048 0 1 0-2.095 0v19.375L7.979 17.45a1.048 1.048 0 0 0-1.481 1.481l4.762 4.762c.1.1.216.177.34.228Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_number_low_to_high": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.596.08a1.043 1.043 0 0 0-.339.228l-4.76 4.76A1.048 1.048 0 1 0 7.978 6.55l2.974-2.973v19.375a1.048 1.048 0 1 0 2.095 0V3.577l2.974 2.973a1.048 1.048 0 1 0 1.481-1.481L12.74.307A1.044 1.044 0 0 0 11.596.08Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_time_earliest_to_latest": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.596.08a1.043 1.043 0 0 0-.339.228l-4.76 4.76A1.048 1.048 0 1 0 7.978 6.55l2.974-2.973v19.375a1.048 1.048 0 1 0 2.095 0V3.577l2.974 2.973a1.048 1.048 0 1 0 1.481-1.481L12.74.307A1.044 1.044 0 0 0 11.596.08Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sorting_time_latest_to_earliest": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6 23.92a1.044 1.044 0 0 0 1.143-.229l4.76-4.76a1.048 1.048 0 0 0-1.481-1.481l-2.974 2.973V1.048a1.048 1.048 0 1 0-2.095 0v19.375L7.979 17.45a1.048 1.048 0 0 0-1.481 1.481l4.762 4.762c.1.1.216.177.34.228Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--star-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.594 23.5a1.621 1.621 0 0 1-1.445-.88 1.645 1.645 0 0 1-.161-1.033l1.079-6.278-4.572-4.441A1.626 1.626 0 0 1 0 9.718c-.006-.437.156-.85.457-1.164.25-.259.583-.429.937-.481l6.321-.92 2.831-5.734a1.626 1.626 0 0 1 2.172-.754c.327.16.595.429.755.759l2.815 5.722 6.319.919c.888.129 1.505.961 1.376 1.852-.05.357-.221.69-.477.94l-4.573 4.444 1.079 6.278a1.636 1.636 0 0 1-1.605 1.913c-.26 0-.52-.064-.751-.187l-5.65-2.964-5.66 2.973a1.62 1.62 0 0 1-.752.186Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/></svg>', "e-icon--star": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.594 23.5a1.621 1.621 0 0 1-1.445-.88 1.645 1.645 0 0 1-.161-1.033l1.079-6.278-4.572-4.441A1.626 1.626 0 0 1 0 9.718c-.006-.437.156-.85.457-1.164.25-.259.583-.429.937-.481l6.321-.92 2.831-5.734a1.626 1.626 0 0 1 2.172-.754c.327.16.595.429.755.759l2.815 5.722 6.319.919c.888.129 1.505.961 1.376 1.852-.05.357-.221.69-.477.94l-4.573 4.444 1.079 6.278a1.636 1.636 0 0 1-1.605 1.913c-.26 0-.52-.064-.751-.187l-5.65-2.964-5.66 2.973a1.62 1.62 0 0 1-.752.186ZM8.983 8.264a.818.818 0 0 1-.612.447l-6.744.98 4.881 4.743c.194.188.281.46.236.726l-1.152 6.705 6.038-3.171a.813.813 0 0 1 .752-.002l6.027 3.163-1.152-6.705a.819.819 0 0 1 .236-.726l4.881-4.742-6.742-.981a.812.812 0 0 1-.612-.447l-3.01-6.117-3.027 6.127Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_1": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M13.362 7.1v9.8h-1.526V8.696l-1.736.756V8.094l2.296-.994h.966Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_2": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M8.794 16.926V15.82l4.018-4.2c.345-.373.588-.695.728-.966.15-.28.224-.574.224-.882 0-.41-.173-.751-.518-1.022-.336-.28-.76-.42-1.274-.42-.448 0-.868.093-1.26.28-.383.187-.807.495-1.274.924l-.868-1.05c.532-.495 1.083-.863 1.652-1.106A4.444 4.444 0 0 1 12.014 7c.952 0 1.727.252 2.324.756.607.495.91 1.134.91 1.918 0 .467-.103.9-.308 1.302-.205.401-.57.877-1.092 1.428l-3.136 3.234 4.718-.028v1.316H8.794Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_3": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M15.64 14.224c0 .41-.093.793-.28 1.148-.177.355-.43.658-.756.91-.317.252-.7.453-1.148.602-.448.14-.938.21-1.47.21a5.45 5.45 0 0 1-2.03-.378 4.585 4.585 0 0 1-1.596-1.092l1.036-.966c.392.401.784.686 1.176.854.392.159.859.238 1.4.238.625 0 1.134-.15 1.526-.448.401-.308.602-.7.602-1.176a1.3 1.3 0 0 0-.49-1.05c-.327-.28-.742-.42-1.246-.42h-1.218v-1.274h1.092c.467 0 .84-.13 1.12-.392.29-.27.434-.63.434-1.078 0-.439-.177-.807-.532-1.106-.355-.299-.798-.448-1.33-.448-.485 0-.915.089-1.288.266-.364.168-.747.467-1.148.896l-1.036-.966A4.752 4.752 0 0 1 11.986 7c.485 0 .933.07 1.344.21.41.14.76.331 1.05.574.299.243.532.532.7.868.168.336.252.7.252 1.092a2.1 2.1 0 0 1-.532 1.414 2.716 2.716 0 0 1-1.372.826c.663.13 1.195.401 1.596.812.41.401.616.877.616 1.428Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_4": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M14.39 7v6.062h1.26v1.316h-1.26V16.8h-1.526v-2.422H7.6v-1.246L12.654 7h1.736Zm-5.152 6.062h3.626V8.638l-3.626 4.424Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_5": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M8.878 12.068 9.102 7h5.964v1.316h-4.662l-.126 2.842c.327-.168.658-.29.994-.364a4.314 4.314 0 0 1 1.05-.126c.97 0 1.755.275 2.352.826.607.541.91 1.255.91 2.142 0 .495-.093.947-.28 1.358-.177.401-.43.747-.756 1.036-.317.29-.705.518-1.162.686a4.587 4.587 0 0 1-1.512.238 5.185 5.185 0 0 1-1.862-.336 4.965 4.965 0 0 1-1.582-.994l.924-1.05c.42.373.835.644 1.246.812.41.159.854.238 1.33.238.616 0 1.115-.177 1.498-.532.392-.355.588-.817.588-1.386 0-.532-.2-.97-.602-1.316-.401-.345-.91-.518-1.526-.518a3.76 3.76 0 0 0-.966.126 5.106 5.106 0 0 0-.98.392l-1.064-.322Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_6": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M12.066 16.9c-.802 0-1.507-.201-2.114-.603-.606-.4-1.082-.96-1.428-1.68-.345-.718-.518-1.554-.518-2.506 0-1.064.192-1.992.574-2.786.383-.793.915-1.409 1.596-1.848.691-.448 1.489-.672 2.394-.672.476 0 .948.075 1.414.224.467.15.864.355 1.19.616l-.84 1.134a2.919 2.919 0 0 0-.882-.448 3.17 3.17 0 0 0-1.008-.154c-.606 0-1.129.154-1.568.462-.429.308-.76.756-.994 1.344-.224.58-.34 1.284-.35 2.114a3.58 3.58 0 0 1 1.218-1.064c.476-.252.971-.378 1.484-.378.644 0 1.214.131 1.708.392a2.847 2.847 0 0 1 1.582 2.618 3.16 3.16 0 0 1-.448 1.666c-.298.486-.709.868-1.232 1.148-.522.28-1.115.42-1.778.42Zm-.07-5.04c-.457 0-.896.107-1.316.321-.41.206-.77.49-1.078.854.084.514.234.962.448 1.344.224.383.504.682.84.896.336.206.71.308 1.12.308.383 0 .724-.079 1.022-.238.299-.168.537-.392.714-.672.178-.289.266-.616.266-.98 0-.354-.088-.667-.266-.938-.168-.28-.401-.499-.7-.658a2.207 2.207 0 0 0-1.05-.238Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_7": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="m9.417 16.76 4.578-8.457H8.367V6.96h7.28v1.162l-4.424 8.638H9.417Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_8": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M12.041 16.913c-.709 0-1.339-.12-1.89-.364-.541-.242-.97-.578-1.288-1.008a2.52 2.52 0 0 1-.462-1.484c0-.373.089-.718.266-1.036.178-.326.425-.606.742-.84a2.957 2.957 0 0 1 1.092-.518 2.78 2.78 0 0 1-1.274-.854 2.004 2.004 0 0 1-.49-1.316c0-.513.145-.97.434-1.372.29-.41.682-.732 1.176-.966a3.985 3.985 0 0 1 1.694-.35c.635 0 1.2.117 1.694.35.504.234.896.556 1.176.966.29.402.434.86.434 1.372 0 .486-.163.924-.49 1.316a2.78 2.78 0 0 1-1.274.854c.616.16 1.12.458 1.512.896.392.44.588.938.588 1.498a2.52 2.52 0 0 1-.462 1.484c-.308.43-.737.766-1.288 1.008-.55.243-1.18.364-1.89.364Zm0-5.81c.346 0 .654-.065.924-.196.271-.14.486-.322.644-.546.159-.233.238-.494.238-.784a1.3 1.3 0 0 0-.238-.77 1.605 1.605 0 0 0-.644-.546 2.1 2.1 0 0 0-.924-.196c-.345 0-.653.066-.924.196-.27.131-.485.313-.644.546-.158.224-.238.481-.238.77 0 .29.08.551.238.784.159.224.374.406.644.546.271.131.579.196.924.196Zm0 4.55c.411 0 .77-.07 1.078-.21.318-.149.565-.354.742-.616a1.44 1.44 0 0 0 .28-.854 1.42 1.42 0 0 0-.28-.868 1.702 1.702 0 0 0-.742-.602 2.445 2.445 0 0 0-1.078-.224c-.401 0-.76.075-1.078.224-.317.14-.569.336-.756.588a1.47 1.47 0 0 0-.266.868c0 .327.089.621.266.882.187.252.439.453.756.602.318.14.677.21 1.078.21Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_9": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M11.733 6.805c.803 0 1.508.206 2.114.616.607.402 1.083.962 1.428 1.68.346.72.518 1.55.518 2.492 0 1.064-.19 1.998-.574 2.8-.382.794-.914 1.41-1.596 1.848-.68.44-1.479.658-2.394.658-.466 0-.938-.074-1.414-.224a3.676 3.676 0 0 1-1.19-.616l.84-1.12c.28.196.574.346.882.448.318.094.654.14 1.008.14.607 0 1.125-.154 1.554-.462.43-.308.761-.756.994-1.344.234-.588.355-1.288.364-2.1a3.578 3.578 0 0 1-1.218 1.064c-.476.252-.97.378-1.484.378-.644 0-1.213-.13-1.708-.392a2.98 2.98 0 0 1-1.162-1.064c-.28-.457-.42-.98-.42-1.568 0-.625.15-1.18.448-1.666.3-.485.71-.868 1.232-1.148a3.758 3.758 0 0 1 1.778-.42Zm.07 5.04c.458 0 .892-.102 1.302-.308a3.51 3.51 0 0 0 1.092-.868 3.877 3.877 0 0 0-.462-1.344 2.401 2.401 0 0 0-.812-.882 2.018 2.018 0 0 0-1.134-.322c-.382 0-.728.084-1.036.252a1.83 1.83 0 0 0-.714.672 1.84 1.84 0 0 0-.252.966c0 .355.084.672.252.952.178.28.416.5.714.658.308.15.658.224 1.05.224Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--step_10": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M7.251 16.76V8.57l-1.736.741V7.953l2.296-.994h.966v9.8H7.251ZM14.5 16.9c-.793 0-1.493-.21-2.1-.63-.597-.43-1.068-1.023-1.414-1.779-.336-.765-.504-1.642-.504-2.632 0-1.008.168-1.89.504-2.646.346-.756.817-1.344 1.414-1.764.607-.429 1.307-.644 2.1-.644.794 0 1.489.215 2.086.644.607.42 1.078 1.008 1.414 1.764.336.756.504 1.638.504 2.646 0 .99-.168 1.867-.504 2.632-.336.756-.807 1.35-1.414 1.778-.597.42-1.292.63-2.086.63Zm0-1.359c.504 0 .938-.149 1.302-.448.374-.308.663-.737.868-1.288.206-.55.308-1.199.308-1.946 0-.756-.102-1.409-.308-1.96-.205-.55-.494-.975-.868-1.274a1.95 1.95 0 0 0-1.302-.462c-.504 0-.942.154-1.316.462-.364.3-.653.724-.868 1.274-.205.551-.308 1.204-.308 1.96 0 .747.103 1.396.308 1.946.215.551.504.98.868 1.288.374.3.812.448 1.316.448Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--stove": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 19.5a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-.75A.75.75 0 0 1 6 19.5ZM9 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 9 18ZM12 19.5a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM18 19.5a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM15 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 15 18ZM3.75 23.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM5.25 3.75A.75.75 0 0 1 6 3h12a.75.75 0 0 1 .75.75v11A1.75 1.75 0 0 1 17 16.5H7a1.75 1.75 0 0 1-1.75-1.75v-11Zm1.5.75v10.25A.25.25 0 0 0 7 15h10a.25.25 0 0 0 .25-.25V4.5H6.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 3.75A.75.75 0 0 1 4.5 3h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM2.25 6.75A.75.75 0 0 1 3 6h3a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM17.25 6.75A.75.75 0 0 1 18 6h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.5a2.25 2.25 0 0 0-2.25 2.25.75.75 0 0 1-1.5 0 3.75 3.75 0 1 1 7.5 0 .75.75 0 0 1-1.5 0A2.25 2.25 0 0 0 12 1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--subtract_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 12.748a.75.75 0 1 1 0-1.498h9a.75.75 0 1 1 0 1.498h-9Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--subtract_circle-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/><path d="M7.5 12.748a.75.75 0 1 1 0-1.498h9a.75.75 0 1 1 0 1.498h-9Z" fill="var(--e-color-icon-filled-foreground-1, var(--e-color-icon-filled-foreground-1, #FFFFFF))"/></svg>', "e-icon--subtract_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M7.75 12.748a.75.75 0 1 1 0-1.498h9a.75.75 0 1 1 0 1.498h-9Z" fill="#000"/></svg>', "e-icon--support": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.874 23.249c0 .414.343.75.765.75a.754.754 0 0 0 .762-.749v-3.778c2.108-1.32 3.663-3.422 4.284-5.798a9.516 9.516 0 0 0-1.074-7.379 9.841 9.841 0 0 0-5.503-4.307V1.5c0-.827-.687-1.5-1.53-1.5h-3.057c-.843 0-1.53.673-1.53 1.5v.367c-4.065 1.05-6.879 4.259-6.879 7.894v.523l-1.726 2.54a2.233 2.233 0 0 0-.316.702 2.198 2.198 0 0 0 .257 1.703c.315.516.817.88 1.411 1.026l.955.234a.76.76 0 0 0 .926-.546.732.732 0 0 0-.086-.568.758.758 0 0 0-.47-.341L3.11 14.8a.76.76 0 0 1-.47-.342.732.732 0 0 1 .02-.802l1.855-2.729a.735.735 0 0 0 .128-.416v-.75c0-2.864 2.13-5.36 5.35-6.334v4.472a4.446 4.446 0 0 0-1.528 3.351c0 1.704.96 3.226 2.483 3.995A6.898 6.898 0 0 1 5.406 18h-1.53a.758.758 0 0 0-.764.75c0 .414.343.75.765.75h1.529c2.842 0 5.526-1.445 7.07-3.788.194.026.385.038.575.038 2.528 0 4.586-2.019 4.586-4.5a4.448 4.448 0 0 0-1.528-3.351V3.576a8.337 8.337 0 0 1 4.188 3.483 8.051 8.051 0 0 1 .91 6.242c-.56 2.139-1.999 3.997-3.95 5.098a.75.75 0 0 0-.383.65v4.2ZM13.815 11.25a.758.758 0 0 0-.764-.75.758.758 0 0 0-.765.75c0 .938-.192 1.842-.573 2.693a3 3 0 0 1-1.72-2.693c0-1.654 1.372-3 3.058-3 1.686 0 3.058 1.346 3.058 3 0 1.591-1.27 2.897-2.868 2.994a8.014 8.014 0 0 0 .574-2.994Zm.765-4.24a4.575 4.575 0 0 0-1.53-.26c-.525 0-1.038.087-1.528.26V1.5h3.058v5.51ZM7.7 23.25c0 .414.343.75.765.75a.759.759 0 0 0 .765-.748v-2.239a.746.746 0 0 0-.27-.572.77.77 0 0 0-.62-.168l-1.03.167a2.325 2.325 0 0 1-.949-.04.763.763 0 0 0-.93.538c-.106.4.14.81.549.914a3.875 3.875 0 0 0 1.584.066l.136-.022v1.354Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--sync": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 19.499h4.167l.019.001.031.002a.364.364 0 0 0 .045-.003h.238a.75.75 0 0 0 .75-.75v-4.5a.751.751 0 0 0-1.5-.001v2.721a8.976 8.976 0 0 1-1.489-5.158 8.943 8.943 0 0 1 2.775-6.307 8.967 8.967 0 0 1 6.228-2.5 8.95 8.95 0 0 1 3.451.689.748.748 0 1 0 .576-1.384 10.453 10.453 0 0 0-4.027-.804 10.46 10.46 0 0 0-7.265 2.916 10.433 10.433 0 0 0-3.237 7.358 10.493 10.493 0 0 0 1.875 6.22H.75a.75.75 0 0 0 0 1.5ZM7.957 21.693c1.288.536 2.646.808 4.038.808a10.46 10.46 0 0 0 7.274-2.925 10.438 10.438 0 0 0 3.228-7.362 10.503 10.503 0 0 0-1.882-6.215h2.635a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.499 0V7.025a8.973 8.973 0 0 1 1.497 5.158 8.941 8.941 0 0 1-2.767 6.31 8.96 8.96 0 0 1-6.234 2.508 8.961 8.961 0 0 1-3.462-.694.748.748 0 0 0-.981.979c.076.186.22.33.405.407Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--tag_add": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 16.5a.75.75 0 0 0 1.5 0v-3.75h3.75a.75.75 0 0 0 0-1.5h-3.75V7.5a.75.75 0 0 0-1.5 0v3.75H7.5a.75.75 0 0 0 0 1.5h3.75v3.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--tag": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.798 7.487c.747 0 1.353-.608 1.353-1.359 0-.75-.606-1.359-1.353-1.359s-1.353.609-1.353 1.36c0 .75.605 1.358 1.353 1.358Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.396 24c-.613 0-1.226-.205-1.634-.718L.715 16.205C.306 15.795 0 15.18 0 14.565c0-.616.204-1.232.715-1.642L12.562 1.128A3.937 3.937 0 0 1 15.319 0h6.434C22.98 0 24 1.026 24 2.256v6.462c0 1.026-.409 1.949-1.123 2.77L11.03 23.281c-.409.41-1.021.718-1.634.718Zm5.923-22.462c-.613 0-1.225.206-1.634.718L1.838 14.051a.785.785 0 0 0-.204.513c0 .205.102.41.204.513l7.047 7.077a.799.799 0 0 0 1.123 0l11.847-11.898c.409-.41.715-1.025.715-1.64v-6.36c0-.41-.306-.82-.817-.82l-6.434.102Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--third_party": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 1.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM.05 3a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.255 3.91a.7.7 0 0 1 .978-.156L7.16 5.152a.7.7 0 0 1-.822 1.134L4.411 4.888a.7.7 0 0 1-.156-.978ZM3 19.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM.05 21a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.317 17.869a.7.7 0 0 1-.156.978l-1.928 1.399a.7.7 0 0 1-.822-1.133l1.928-1.4a.7.7 0 0 1 .978.156ZM21 1.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM18.05 3a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.745 3.91a.7.7 0 0 1-.156.978L17.66 6.286a.7.7 0 1 1-.822-1.134l1.928-1.398a.7.7 0 0 1 .978.156ZM21 19.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM18.05 21a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.683 17.869a.7.7 0 0 1 .978-.155l1.928 1.399a.7.7 0 1 1-.822 1.133l-1.928-1.4a.7.7 0 0 1-.156-.977ZM12 5.95a1.925 1.925 0 1 0 0 3.85 1.925 1.925 0 0 0 0-3.85ZM8.675 7.875a3.325 3.325 0 1 1 6.65 0 3.325 3.325 0 0 1-6.65 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M12 11.95a3.8 3.8 0 0 0-3.735 3.1S8.192 16 7.5 16c-.692 0-.653-.95-.653-.95a5.2 5.2 0 0 1 10.306 0s.112.95-.653.95-.765-.95-.765-.95A3.8 3.8 0 0 0 12 11.95Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--thumbnail": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 0A2.25 2.25 0 0 0 0 2.25v6a2.25 2.25 0 0 0 2.25 2.25h6a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 8.25 0h-6ZM1.5 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6ZM2.25 13.5A2.25 2.25 0 0 0 0 15.75v6A2.25 2.25 0 0 0 2.25 24h6a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25h-6Zm-.75 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6ZM13.5 2.25A2.25 2.25 0 0 1 15.75 0h6A2.25 2.25 0 0 1 24 2.25v6a2.25 2.25 0 0 1-2.25 2.25h-6a2.25 2.25 0 0 1-2.25-2.25v-6Zm2.25-.75a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75h-6ZM15.75 13.5a2.25 2.25 0 0 0-2.25 2.25v6A2.25 2.25 0 0 0 15.75 24h6A2.25 2.25 0 0 0 24 21.75v-6a2.25 2.25 0 0 0-2.25-2.25h-6ZM15 15.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--thumbnail-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 0A2.25 2.25 0 0 0 0 2.25v6a2.25 2.25 0 0 0 2.25 2.25h6a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 8.25 0h-6ZM1.5 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 13.5A2.25 2.25 0 0 0 0 15.75v6A2.25 2.25 0 0 0 2.25 24h6a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25h-6Zm-.75 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6ZM13.5 2.25A2.25 2.25 0 0 1 15.75 0h6A2.25 2.25 0 0 1 24 2.25v6a2.25 2.25 0 0 1-2.25 2.25h-6a2.25 2.25 0 0 1-2.25-2.25v-6Zm2.25-.75a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75h-6ZM15.75 13.5a2.25 2.25 0 0 0-2.25 2.25v6A2.25 2.25 0 0 0 15.75 24h6A2.25 2.25 0 0 0 24 21.75v-6a2.25 2.25 0 0 0-2.25-2.25h-6ZM15 15.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--touch_finger-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.002 10.676a.74.74 0 0 0-.74.74v8.882a.74.74 0 0 1-1.294.492l-1.91-2.15a.797.797 0 1 0-1.191 1.058l2.727 3.07a.74.74 0 1 1-1.106.983L5.76 20.68a2.277 2.277 0 1 1 3.404-3.025l.617.695v-6.935a2.22 2.22 0 0 1 4.441 0v5.922h.74a5.18 5.18 0 0 1 5.182 5.18v.742a.74.74 0 1 1-1.48 0v-.741a3.701 3.701 0 0 0-3.702-3.701h-1.48a.74.74 0 0 1-.74-.74v-6.662a.74.74 0 0 0-.74-.74Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.241 1.537a8.142 8.142 0 0 1 9.646 13.118.74.74 0 1 1-.888-1.184 6.662 6.662 0 1 0-7.994 0 .74.74 0 0 1-.888 1.184A8.142 8.142 0 0 1 7.24 1.537Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--transformer": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.452 1.674a.28.28 0 0 0-.279.28v1.953h2.512c.463 0 .837.375.837.837v14.512a.837.837 0 0 1-.837.837H6.173v1.954c0 .154.125.279.28.279h11.162a.28.28 0 0 0 .28-.28v-1.953h-2.512a.837.837 0 0 1-.838-.837V4.744c0-.462.375-.837.838-.837h2.511V1.953a.28.28 0 0 0-.279-.279H6.452ZM19.57 20.093h2.511a.837.837 0 0 0 .838-.837V4.744a.837.837 0 0 0-.838-.837H19.57V1.953A1.953 1.953 0 0 0 17.615 0H6.452A1.953 1.953 0 0 0 4.5 1.953v1.954H1.988a.837.837 0 0 0-.838.837v14.512c0 .462.375.837.838.837h2.51v1.954c0 1.078.876 1.953 1.954 1.953h11.163a1.953 1.953 0 0 0 1.954-1.953v-1.954Zm-3.35-1.674V5.58h5.024V18.42H16.22Zm-13.394 0V5.58h5.023V18.42H2.825Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m1.152 13.416 8.371-4.932v2.1l-8.37 4.932v-2.1ZM14.546 10.482l8.371-4.931v2.1l-8.37 4.931v-2.1ZM14.546 15.998l8.371-4.932v2.1l-8.37 4.932v-2.1Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--transformer-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.452 1.674a.28.28 0 0 0-.279.28v1.953h2.512c.463 0 .837.375.837.837v14.512a.837.837 0 0 1-.837.837H6.173v1.954c0 .154.125.279.28.279h11.162a.28.28 0 0 0 .28-.28v-1.953h-2.512a.837.837 0 0 1-.838-.837V4.744c0-.462.375-.837.838-.837h2.511V1.953a.28.28 0 0 0-.279-.279H6.452ZM19.57 20.093h2.511a.837.837 0 0 0 .838-.837V4.744a.837.837 0 0 0-.838-.837H19.57V1.953A1.953 1.953 0 0 0 17.615 0H6.452A1.953 1.953 0 0 0 4.5 1.953v1.954H1.988a.837.837 0 0 0-.838.837v14.512c0 .462.375.837.838.837h2.51v1.954c0 1.078.876 1.953 1.954 1.953h11.163a1.953 1.953 0 0 0 1.954-1.953v-1.954Zm-3.35-1.674V5.58h5.024V18.42H16.22Zm-13.394 0V5.58h5.023V18.42H2.825Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m1.152 13.416 8.371-4.932v2.1l-8.37 4.932v-2.1ZM14.546 10.482l8.371-4.931v2.1l-8.37 4.931v-2.1ZM14.546 15.998l8.371-4.932v2.1l-8.37 4.932v-2.1Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--transformer_change": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12a.75.75 0 0 1 .75-.75H3.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 12ZM19.75 12a.75.75 0 0 1 .75-.75h2.75a.75.75 0 0 1 0 1.5H20.5a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM9 18A6 6 0 1 0 9 6a6 6 0 0 0 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--transformer_change-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12a.75.75 0 0 1 .75-.75H3.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 12ZM19.75 12a.75.75 0 0 1 .75-.75h2.75a.75.75 0 0 1 0 1.5H20.5a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM9 18A6 6 0 1 0 9 6a6 6 0 0 0 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--tree_falling": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.207 9.351c.524-.324.83-.915.79-1.534l-.407-6.245a1.673 1.673 0 0 0-.837-1.345 1.677 1.677 0 0 0-1.585-.053l-5.604 2.773a1.678 1.678 0 0 0-.93 1.452c-.018.62.306 1.198.842 1.511l.094.053L8.94 7.946c-.59.254-.978.81-1.014 1.446a1.68 1.68 0 0 0 .802 1.535l-5.68 2.314a1.694 1.694 0 0 0-1.043 1.44 1.69 1.69 0 0 0 .836 1.57l5.78 3.34-1.26 2.184a.848.848 0 0 0 .306 1.15c.13.078.277.113.418.113a.828.828 0 0 0 .725-.42l1.261-2.183 5.78 3.34a1.679 1.679 0 0 0 1.774-.059c.53-.353.813-.997.725-1.622l-.843-6.091a1.677 1.677 0 0 0 2.475-1.67l-.6-5.005.093.053a1.676 1.676 0 0 0 1.733-.03Zm-2.44-2.32a.85.85 0 0 0-.884.024.847.847 0 0 0-.37.803l.8 6.675-1.455-.838a.848.848 0 0 0-.89.03.85.85 0 0 0-.365.814l1.072 7.79-6.505-3.759h-.006L3.677 14.8l7.277-2.963a.838.838 0 0 0 .1-1.505L9.6 9.493l6.175-2.638a.841.841 0 0 0 .088-1.5l-1.55-.897 5.604-2.774.407 6.245-1.556-.897Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--tree_powerline": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.508 1.517a.778.778 0 0 0-.979-.478.751.751 0 0 0-.49.955c.555 1.624 1.773 3.59 3.121 5.29.947 1.194 2.005 2.318 3.004 3.124a1.378 1.378 0 0 0-.145.272c-.136.343-.126.718.026 1.054.12.26.323.483.575.629l-4.757 1.96a1.384 1.384 0 0 0-.759.749c-.142.34-.14.715.005 1.053.12.282.338.52.614.67l4.902 2.677-1.034 1.804a.68.68 0 0 0 .271.938c.34.186.77.067.96-.265l1.034-1.802 4.902 2.678c.328.179.708.222 1.07.123.363-.1.664-.33.849-.65.154-.268.213-.581.165-.884l-.776-4.983c.677.35 1.522.108 1.896-.55.146-.256.206-.559.166-.851l-.238-1.731a7.027 7.027 0 0 0 3.637-1.048c1.89-1.153 3.567-3.373 4.455-7.362a.755.755 0 0 0-.592-.898.774.774 0 0 0-.92.577c-.827 3.716-2.323 5.524-3.763 6.402-1.028.627-2.1.823-3.022.838l-.12-.876.082.045c.679.37 1.541.133 1.921-.53.137-.24.198-.508.176-.78l-.41-5.12a1.375 1.375 0 0 0-.72-1.095 1.433 1.433 0 0 0-1.332-.024L10.6 5.764a1.373 1.373 0 0 0-.7.803c-.116.35-.085.724.086 1.052.13.246.319.438.57.576l.082.045-2.986 1.292C6.883 8.897 5.335 7.56 4.384 6.36 3.088 4.725 1.985 2.914 1.508 1.517Zm5.887 9.69c.049-.028.146-.087.257-.168L12.5 8.94a.683.683 0 0 0 .059-1.231l-1.317-.719 4.684-2.337.41 5.118-1.313-.718a.718.718 0 0 0-.742.032.681.681 0 0 0-.303.662l.751 5.464-1.232-.673a.726.726 0 0 0-.747.034.686.686 0 0 0-.295.67l.995 6.376-11.038-6.027 6.087-2.509a.694.694 0 0 0 .43-.596.691.691 0 0 0-.36-.64v.001l-1.174-.64Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--tree_powerline-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.39 3.99c.418.09.683.491.592.899-.888 3.99-2.564 6.209-4.455 7.362-1.876 1.143-3.635 1.128-4.9.975V11.75c1.085.13 2.625.106 4.08-.781 1.44-.878 2.936-2.686 3.763-6.402a.774.774 0 0 1 .92-.577Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M.53 1.039a.778.778 0 0 1 .978.478c.477 1.397 1.58 3.208 2.876 4.843 1.305 1.646 3.737 3.554 3.73 3.546-.009-.008.207.295 0 .66-.208.365-.752.66-.752.66-1.302-.705-2.863-2.253-4.202-3.942C1.812 5.584.594 3.618.04 1.994a.751.751 0 0 1 .49-.955Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M5.862 22.214a.68.68 0 0 1-.271-.938l1.034-1.804-4.902-2.677a1.396 1.396 0 0 1-.614-.67 1.338 1.338 0 0 1-.005-1.053c.143-.341.413-.607.76-.749l4.756-1.96a1.405 1.405 0 0 1-.575-.63 1.336 1.336 0 0 1-.026-1.053c.136-.344.4-.616.746-.764l3.872-1.676-.082-.045a1.376 1.376 0 0 1-.57-.576A1.342 1.342 0 0 1 9.9 6.567c.115-.35.364-.636.7-.803l4.683-2.336a1.433 1.433 0 0 1 1.331.025c.414.225.684.634.72 1.095l.41 5.119c.023.272-.038.54-.175.78-.38.663-1.242.9-1.921.53l-.083-.045.564 4.098c.04.292-.02.595-.166.852a1.433 1.433 0 0 1-1.896.549l.776 4.983c.048.302-.011.616-.165.883a1.434 1.434 0 0 1-1.918.528l-4.903-2.678-1.033 1.802a.715.715 0 0 1-.961.265Zm2.707-10.366a.691.691 0 0 1 .36.639.693.693 0 0 1-.43.596l-6.087 2.51 11.038 6.026-.995-6.376a.686.686 0 0 1 .295-.67.726.726 0 0 1 .747-.034l1.232.673-.751-5.464a.681.681 0 0 1 .303-.662.718.718 0 0 1 .742-.032l1.314.718-.41-5.118-4.685 2.337 1.316.719A.683.683 0 0 1 12.5 8.94l-5.164 2.234 1.232.673Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--unlock": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 24A2.252 2.252 0 0 1 6 21.75v-10.5A2.252 2.252 0 0 1 8.25 9h2.25V6c0-2.481-2.019-4.5-4.5-4.5A4.505 4.505 0 0 0 1.5 6v3.75a.75.75 0 0 1-1.5 0V6c0-3.308 2.692-6 6-6s6 2.692 6 6v3h9.75A2.252 2.252 0 0 1 24 11.25v10.5A2.252 2.252 0 0 1 21.75 24H8.25Zm0-13.5a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75H8.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M15 18.75a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--upload": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.251 15.75a.75.75 0 0 0 1.5 0V5.56l3.22 3.22a.749.749 0 1 0 1.06-1.06l-4.499-4.499a.754.754 0 0 0-.257-.169l-.013-.004a.731.731 0 0 0-.522 0l-.025.009a.74.74 0 0 0-.245.163l-4.499 4.5a.743.743 0 0 0-.22.53c0 .2.078.389.22.53a.746.746 0 0 0 1.06.001l3.22-3.22V15.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M.001 17.25A3.754 3.754 0 0 0 3.751 21h16.5a3.754 3.754 0 0 0 3.75-3.75v-1.5a.75.75 0 0 0-1.5 0v1.5a2.252 2.252 0 0 1-2.25 2.25h-16.5a2.252 2.252 0 0 1-2.25-2.25v-1.5a.75.75 0 0 0-1.5 0v1.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--user_testing-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.881 17.25A1.885 1.885 0 0 1 0 15.388V1.862A1.879 1.879 0 0 1 1.871 0h16.498c1.03 0 1.872.835 1.881 1.861V4.5a.75.75 0 0 1-.75.75h-18v10.131a.378.378 0 0 0 .379.369h9.371a.75.75 0 0 1 0 1.5H1.881ZM18.75 3.75V1.868a.377.377 0 0 0-.378-.368h-16.5a.373.373 0 0 0-.372.368V3.75h17.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M11.888 24a1.5 1.5 0 0 1-1.315-2.22l4.432-7.001L15 10.5c0-.827.673-1.5 1.5-1.5H18c.827 0 1.5.673 1.5 1.5v4.287l4.204 6.992a1.505 1.505 0 0 1-.256 1.782 1.489 1.489 0 0 1-1.06.439h-10.5Zm10.5-1.5-2.255-3.75h-5.867l-2.371 3.744 10.493.006Zm-3.157-5.25-1.011-1.683a1.478 1.478 0 0 1-.22-.779V10.5h-1.5v4.287a1.512 1.512 0 0 1-.223.787l-1.061 1.676h4.015Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M21.75 9.75A.75.75 0 0 1 21 9v-.75h-.75a.75.75 0 0 1 0-1.5H21V6a.75.75 0 0 1 1.5 0v.75h.75a.75.75 0 0 1 0 1.5h-.75V9a.75.75 0 0 1-.75.75ZM11.25 11.85a.75.75 0 0 1-.75-.75v-.75h-.75a.75.75 0 0 1 0-1.5h.75V8.1a.75.75 0 0 1 1.5 0v.75h.75a.75.75 0 0 1 0 1.5H12v.75a.75.75 0 0 1-.75.75Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--users": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.125 7.875a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM7.5 3a4.875 4.875 0 1 0 0 9.75 7.5 7.5 0 0 0-7.5 7.5.75.75 0 0 0 1.5 0 6 6 0 1 1 12 0 .75.75 0 0 0 1.5 0 7.5 7.5 0 0 0-7.5-7.5A4.875 4.875 0 1 0 7.5 3Zm10.227 4.5a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25Zm-4.125 2.625a4.125 4.125 0 1 1 5.283 3.96A6.277 6.277 0 0 1 24 20.25a.75.75 0 0 1-1.5 0 4.775 4.775 0 0 0-6.428-4.478.75.75 0 1 1-.518-1.408c.33-.122.67-.215 1.013-.28a4.127 4.127 0 0 1-2.965-3.959Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--view_off": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.782 20.3a.788.788 0 0 1-.54-.212.66.66 0 0 1-.21-.493.664.664 0 0 1 .231-.486L21.011 2.503a.78.78 0 0 1 .519-.193c.203 0 .4.078.54.213a.658.658 0 0 1-.02.979L3.302 20.109a.787.787 0 0 1-.52.191ZM11.986 18.917h-.11c-1.048 0-2.103-.15-3.136-.445-.395-.114-.616-.502-.494-.866a.742.742 0 0 1 .717-.487c.075 0 .15.01.222.032a9.83 9.83 0 0 0 2.708.384h.25c3.852 0 7.754-2.57 10.123-4.975a.792.792 0 0 0-.002-1.126 19.343 19.343 0 0 0-2.959-2.447.681.681 0 0 1-.299-.452.647.647 0 0 1 .135-.515.794.794 0 0 1 1.048-.151 20.87 20.87 0 0 1 3.187 2.636c.832.852.832 2.133.003 2.983-2.586 2.626-6.894 5.43-11.236 5.43l-.157-.001ZM3.317 15.783a.793.793 0 0 0 .46.145c.234 0 .45-.097.593-.264a.648.648 0 0 0 .152-.51.678.678 0 0 0-.284-.461 19.623 19.623 0 0 1-2.502-2.131.792.792 0 0 1-.002-1.126C4.102 9.032 8.01 6.463 11.872 6.463h.23c.718 0 1.434.08 2.128.24.06.012.12.02.182.02.345 0 .645-.216.728-.525.099-.371-.146-.747-.547-.839a11.146 11.146 0 0 0-2.5-.281l-.237-.001c-4.34 0-8.649 2.804-11.234 5.428-.83.85-.83 2.132.003 2.984.824.832 1.73 1.603 2.692 2.294Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M8.249 12.69c-.413 0-.75-.31-.75-.693 0-1.107.468-2.149 1.318-2.934.85-.785 1.978-1.217 3.178-1.217.207 0 .374.154.375.345l.002.692c0 .092-.039.18-.109.245a.387.387 0 0 1-.265.101c-.8 0-1.554.29-2.12.812-.567.523-.88 1.218-.88 1.956a.664.664 0 0 1-.218.49.78.78 0 0 1-.531.202ZM11.624 15.803c0 .192.168.346.375.346 1.202 0 2.332-.433 3.182-1.217.85-.784 1.317-1.827 1.317-2.936 0-.382-.336-.692-.75-.692s-.75.31-.75.692a2.65 2.65 0 0 1-.878 1.958 3.11 3.11 0 0 1-2.122.811.389.389 0 0 0-.265.101.33.33 0 0 0-.11.245l.001.692Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--view_on": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.816 14.933c.85.784 1.98 1.217 3.181 1.217 1.202 0 2.332-.432 3.182-1.215.85-.785 1.319-1.826 1.319-2.939 0-1.109-.468-2.15-1.318-2.935-.85-.783-1.98-1.215-3.182-1.215-2.48 0-4.5 1.862-4.5 4.15 0 1.11.468 2.152 1.318 2.937ZM9 11.997c0-1.526 1.345-2.767 3-2.767.8 0 1.553.288 2.12.81.566.521.878 1.216.878 1.958 0 .739-.313 1.434-.879 1.957a3.11 3.11 0 0 1-2.12.81 3.11 3.11 0 0 1-2.122-.811A2.647 2.647 0 0 1 9 11.997Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M.623 13.49c2.583 2.624 6.886 5.428 11.218 5.428h.144l.15.001c4.347 0 8.657-2.805 11.243-5.43.83-.85.83-2.132-.002-2.983-2.585-2.623-6.89-5.426-11.218-5.426h-.303c-4.342 0-8.65 2.803-11.234 5.428-.828.849-.828 2.13.002 2.982Zm1.11-2.054C4.1 9.032 8.002 6.463 11.853 6.463l.132.002.156-.001c3.85 0 7.754 2.568 10.122 4.97a.792.792 0 0 1 .002 1.126c-2.369 2.405-6.277 4.975-10.144 4.975l-.136-.002-.13.002c-3.853 0-7.754-2.57-10.12-4.973a.792.792 0 0 1-.002-1.126Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--warning_circle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12ZM12 14.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 1.5 0v8.25a.75.75 0 0 1-.75.75ZM12 18a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 12 18Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--warning_circle-filled": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"/><path d="M12 18a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 12 18ZM12 14.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 1.5 0v8.25a.75.75 0 0 1-.75.75Z" fill="var(--e-color-icon-filled-foreground-1, var(--e-color-icon-filled-foreground-1, #FFFFFF))"/></svg>', "e-icon--warning_electricity-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.307 20.25a.846.846 0 0 1-.304-.06.434.434 0 0 1-.076-.03.839.839 0 0 1-.12-.073l-.018-.013a.856.856 0 0 1-.17-.177l-.027-.039a.838.838 0 0 1-.09-.193c-.006-.016-.012-.031-.015-.047l-.846-3.333a.834.834 0 0 1 .82-1.035c.39 0 .727.26.822.63l.29 1.148 1.751-3.445H9.461a.847.847 0 0 1-.706-.374.819.819 0 0 1-.071-.787l2.539-5.833a.849.849 0 0 1 1.111-.438.83.83 0 0 1 .445 1.094l-2.035 4.671h2.949c.291 0 .566.152.72.395.155.249.17.55.037.81l-2.563 5.047 1.6-.393a.842.842 0 0 1 1.027.607.833.833 0 0 1-.615 1.01l-3.385.833a.94.94 0 0 1-.207.024Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z" fill="var(--e-color-icon-warning, var(--e-color-icon-warning, #FFA000))"/></svg>', "e-icon--warning_triangle": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m22.235 20.515-9.74-17.561a.569.569 0 0 0-.99 0l-9.74 17.56c-.205.37.067.821.495.821h19.48c.428 0 .7-.45.495-.82Zm1.486-.797c.82 1.479-.268 3.282-1.981 3.282H2.26C.547 23-.542 21.197.28 19.718l9.74-17.561c.854-1.543 3.106-1.543 3.962 0l9.74 17.56Zm-11.739.125c-.612 0-1.11-.49-1.11-1.092 0-.602.498-1.092 1.11-1.092.613 0 1.111.49 1.111 1.092 0 .602-.498 1.092-1.11 1.092Zm-.74-4.37c0 .403.332.729.74.729s.74-.327.74-.728V8.19a.735.735 0 0 0-.74-.728.735.735 0 0 0-.74.728v7.283Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--warning_circle-filled-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M12.125 18a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM12.125 14.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 1.5 0v8.25a.75.75 0 0 1-.75.75Z" fill="#000"/></svg>', "e-icon--water_heater": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.04 16.872a1.13 1.13 0 1 0-2.258 0 1.13 1.13 0 0 0 2.258 0Zm-1.13 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.66.75a.75.75 0 0 0-1.5 0v1.249H8c-.679 0-1.327.184-1.828.517-.494.328-.922.865-.922 1.562v17.611c0 .036.003.072.008.107a2.568 2.568 0 0 0 2.78 2.192h7.923a2.56 2.56 0 0 0 2.782-2.196.751.751 0 0 0 .007-.103V4.078c0-.693-.422-1.231-.917-1.562C17.333 2.182 16.683 2 16 2h-3.34V.749ZM7.003 3.764c-.231.154-.253.28-.253.314v.92h10.5v-.92c0-.036-.023-.163-.25-.315-.222-.148-.573-.265-1-.265H8c-.421 0-.773.117-.997.266ZM6.75 6.497v15.131a1.07 1.07 0 0 0 1.168.865A.746.746 0 0 1 8 22.49h8c.029 0 .057.002.086.005a1.06 1.06 0 0 0 1.164-.863V6.497H6.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9 20.24a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.998a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75V20.24Zm1.5.75v1.499h3v-1.5h-3Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--washing_machine": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.952 9.24a4.85 4.85 0 1 0 0 9.7 4.85 4.85 0 0 0 0-9.7Zm-6.35 4.85a6.35 6.35 0 1 1 12.7 0 6.35 6.35 0 0 1-12.7 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.202 11.03a.75.75 0 0 1 .75-.75 3.81 3.81 0 0 1 3.81 3.81.75.75 0 0 1-1.5 0 2.31 2.31 0 0 0-2.31-2.31.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M6.482 4.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM10.732 4.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.25 1.5H4.75A2.5 2.5 0 0 0 2.25 4v16a2.5 2.5 0 0 0 2.5 2.5h14.5a2.5 2.5 0 0 0 2.5-2.5V4a2.5 2.5 0 0 0-2.5-2.5ZM4.75 0a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h14.5a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--web_library-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.19 4.446a2.35 2.35 0 0 0-1.89-.559 17.807 17.807 0 0 0-8.76 3.997.92.92 0 0 1-.54.13.87.87 0 0 1-.51-.17A17.757 17.757 0 0 0 2.7 3.847a2.322 2.322 0 0 0-1.87.56A2.358 2.358 0 0 0 0 6.225v11.21a2.357 2.357 0 0 0 2.05 2.329 16.256 16.256 0 0 1 8.5 3.736c.414.324.925.5 1.45.5.529 0 1.042-.176 1.46-.5A16.156 16.156 0 0 1 22 19.764a2.36 2.36 0 0 0 2-2.328V6.225a2.347 2.347 0 0 0-.81-1.779Zm-21 13.829a.85.85 0 0 1-.74-.84V6.226a.869.869 0 0 1 .86-.86h.12a16.376 16.376 0 0 1 8.11 3.648c.215.163.455.29.71.38v12.759a17.657 17.657 0 0 0-9.01-3.877h-.05Zm20.26-.84a.849.849 0 0 1-.73.84 17.727 17.727 0 0 0-9 3.877V9.422a2.77 2.77 0 0 0 .77-.41 16.307 16.307 0 0 1 8-3.666.86.86 0 0 1 1 .859l-.04 11.23Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M3.81 1.499a16.895 16.895 0 0 1 6.73 3.427 2.371 2.371 0 0 0 2.94 0 17.005 17.005 0 0 1 6.73-3.407.75.75 0 0 0 .54-.91.757.757 0 0 0-.91-.589 18.657 18.657 0 0 0-7.3 3.697.87.87 0 0 1-1.06 0A18.536 18.536 0 0 0 4.17.02a.76.76 0 0 0-.91.55.749.749 0 0 0 .55.929Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--worker": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 14.42c-4.735 0-8.578 3.925-8.578 8.84 0 .408-.318.74-.711.74-.393 0-.711-.332-.711-.74 0-5.753 4.498-10.322 10-10.322 5.506 0 10 4.673 10 10.321 0 .41-.318.74-.71.74-.393 0-.712-.33-.712-.74 0-4.82-3.847-8.84-8.578-8.84ZM6.504 5.32c.418 0 .758.355.758.79 0 2.715 2.078 4.794 4.6 4.794 2.514 0 4.6-2.174 4.6-4.793 0-.436.34-.79.759-.79s.758.354.758.79c0 3.491-2.766 6.374-6.117 6.374-3.341 0-6.117-2.768-6.117-6.374 0-.436.34-.79.759-.79Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.021.748c.414-.07.803.222.87.652l.81 5.162c.067.431-.213.837-.627.907-.413.07-.803-.221-.87-.652l-.809-5.162c-.067-.43.213-.837.626-.907ZM13.773 1.004s.986.056.91.485l-.91 5.162c-.075.429-.47.713-.883.634-.412-.079-.684-.49-.609-.92l.91-5.162c.076-.429.582-.2.582-.2Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.69c0-.437.358-.79.8-.79h14.4c.442 0 .8.353.8.79 0 .436-.358.79-.8.79H4.8a.795.795 0 0 1-.8-.79Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.384 2.145a1.302 1.302 0 0 1-.447.32l-.005.001c-1.63.716-2.67 2.318-2.67 4.329 0 .436-.34.316-.758.316-.42 0-.759.12-.759-.316 0-2.582 1.343-4.744 3.493-5.737.027-.092.078-.234.18-.38.226-.32.564-.472.922-.555.358-.084.848-.123 1.522-.123.677 0 1.174.04 1.543.12.368.081.694.22.933.487a1.337 1.337 0 0 1 .268.46c2.158 1.006 3.373 3.18 3.373 5.728 0 .436-.44.316-.86.316-.418 0-.656.12-.656-.316 0-2.039-.963-3.624-2.57-4.329a1.266 1.266 0 0 1-.656-.708l-.023-.059a1.199 1.199 0 0 0-.12-.032c-.219-.048-.594-.087-1.232-.087-.64 0-.997.04-1.192.085a1.278 1.278 0 0 0-.025.006 1.226 1.226 0 0 1-.261.474Zm2.887-.423Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--work_under_line-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.374 1.111a.633.633 0 0 0 .024-.89.622.622 0 0 0-.884-.024c-1.905 1.821-5.27 2.998-8.866 3.106C9.06 3.41 5.386 2.449 2.854.17a.622.622 0 0 0-.883.05.633.633 0 0 0 .05.89c2.841 2.557 6.866 3.566 10.663 3.452 3.788-.113 7.49-1.348 9.69-3.45Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path d="M5.25 21.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM12.25 21.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.557 11.518c.08.127.125.272.13.422l.31 4.273a.813.813 0 0 1-.3.707.814.814 0 0 1-.73.177l-4.513-1.042a.904.904 0 0 1-.457-.238.88.88 0 0 1-.203-.954.886.886 0 0 1 .32-.399l1.998-1.454a.09.09 0 0 0 .027-.063.087.087 0 0 0-.027-.064L16 6.95l-1.039.884a.116.116 0 0 0 0 .088l.328 2.257c.301 2.067.652 4.475.808 5.66a2.901 2.901 0 0 1-.13 1.452c0 .013.002.026.008.038a.079.079 0 0 0 .062.043 2.835 2.835 0 0 1 1.452 1.02c.36.485.551 1.07.546 1.671v1.324a2.581 2.581 0 0 1-.765 1.84 2.669 2.669 0 0 1-1.862.773H2.626a2.668 2.668 0 0 1-1.862-.773A2.581 2.581 0 0 1 0 21.387v-1.324a2.692 2.692 0 0 1 .583-1.722 2.771 2.771 0 0 1 1.554-.98 3.87 3.87 0 0 1-.14-.893v-2.81a1.615 1.615 0 0 1 .373-1.217 1.662 1.662 0 0 1 1.145-.59h4.713a.1.1 0 0 0 .071-.028.098.098 0 0 0 .03-.07V7.726a2.486 2.486 0 0 1 .658-1.906c.093-.09.196-.167.306-.231 1.614.236 3.202.206 4.709-.002.249.207.532.602.62 1.088l.876-.644a1 1 0 0 1 1.405.223l4.307 6 1.059-.756-4.636-6.772c.376-.126.742-.261 1.097-.403l4.827 7.194Zm-.66 4.321-.179-3.32-3.295 2.456a.1.1 0 0 0-.057.088.097.097 0 0 0 .057.089l3.345.786a.101.101 0 0 0 .09-.016.097.097 0 0 0 .04-.083ZM1.666 19.054c-.25.278-.384.638-.377 1.01l-.01 1.378c0 .352.142.69.394.94.253.25.596.393.954.395h12.782a1.368 1.368 0 0 0 .95-.395c.125-.124.223-.27.29-.432.066-.162.11-.389.108-.563v-1.324a1.468 1.468 0 0 0-.373-1.006c-.247-.278-.51-.515-.883-.557H2.718c-.375.04-.803.276-1.053.554Zm12.355-1.76H3.625a.363.363 0 0 1-.25-.08c-.13-.103-.13-.167-.13-.707V13.66c0-.423.2-.501.31-.501h5.081a1 1 0 0 0 1-1V7.539c0-.539.364-.884.864-.884h2.642a.455.455 0 0 1 .409.295s.998 6.876 1.278 9.056a1.227 1.227 0 0 1-.21 1.032c-.124.222-.451.262-.599.255Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--worker-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 14.42c-4.735 0-8.578 3.925-8.578 8.84 0 .408-.318.74-.711.74-.393 0-.711-.332-.711-.74 0-5.753 4.498-10.322 10-10.322 5.506 0 10 4.673 10 10.321 0 .41-.318.74-.71.74-.393 0-.712-.33-.712-.74 0-4.82-3.847-8.84-8.578-8.84ZM6.504 5.32c.418 0 .758.355.758.79 0 2.715 2.078 4.794 4.6 4.794 2.514 0 4.6-2.174 4.6-4.793 0-.436.34-.79.759-.79s.758.354.758.79c0 3.491-2.766 6.374-6.117 6.374-3.341 0-6.117-2.768-6.117-6.374 0-.436.34-.79.759-.79Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.021.748c.414-.07.803.222.87.652l.81 5.162c.067.431-.213.837-.627.907-.413.07-.803-.221-.87-.652l-.809-5.162c-.067-.43.213-.837.626-.907ZM13.773 1.004s.986.056.91.485l-.91 5.162c-.075.429-.47.713-.883.634-.412-.079-.684-.49-.609-.92l.91-5.162c.076-.429.582-.2.582-.2Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.69c0-.437.358-.79.8-.79h14.4c.442 0 .8.353.8.79 0 .436-.358.79-.8.79H4.8a.795.795 0 0 1-.8-.79Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.384 2.145a1.302 1.302 0 0 1-.447.32l-.005.001c-1.63.716-2.67 2.318-2.67 4.329 0 .436-.34.316-.758.316-.42 0-.759.12-.759-.316 0-2.582 1.343-4.744 3.493-5.737.027-.092.078-.234.18-.38.226-.32.564-.472.922-.555.358-.084.848-.123 1.522-.123.677 0 1.174.04 1.543.12.368.081.694.22.933.487a1.337 1.337 0 0 1 .268.46c2.158 1.006 3.373 3.18 3.373 5.728 0 .436-.44.316-.86.316-.418 0-.656.12-.656-.316 0-2.039-.963-3.624-2.57-4.329a1.266 1.266 0 0 1-.656-.708l-.023-.059a1.199 1.199 0 0 0-.12-.032c-.219-.048-.594-.087-1.232-.087-.64 0-.997.04-1.192.085a1.278 1.278 0 0 0-.025.006 1.226 1.226 0 0 1-.261.474Zm2.887-.423Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--wrench": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.325.064a7.697 7.697 0 0 1 4.68.877.75.75 0 0 1 .17 1.19l-3.6 3.6a.752.752 0 0 0 0 1.06l.8.8a.75.75 0 0 0 1.061 0l3.55-3.546a.75.75 0 0 1 1.2.195 7.7 7.7 0 0 1-9.704 10.613l-8.475 8.475a2.295 2.295 0 0 1-3.244 0l-1.09-1.092a2.294 2.294 0 0 1 0-3.243l8.481-8.476A7.697 7.697 0 0 1 15.325.064Zm5.361 12.01a6.2 6.2 0 0 0 1.556-6.164l-2.745 2.742a2.25 2.25 0 0 1-3.182 0l-.8-.8a2.25 2.25 0 0 1 0-3.183l2.828-2.828a6.197 6.197 0 0 0-7.62 8.523.75.75 0 0 1-.148.853l-8.843 8.837a.794.794 0 0 0 0 1.121l1.092 1.093a.793.793 0 0 0 1.122 0l8.836-8.837a.75.75 0 0 1 .853-.146 6.196 6.196 0 0 0 7.051-1.212Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>', "e-icon--wrench-color": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.485.281a7.496 7.496 0 0 1 4.592.87.747.747 0 0 1 .168 1.177l-3.533 3.565a.744.744 0 0 0 0 1.05l.785.793a.733.733 0 0 0 1.04 0l3.485-3.512a.732.732 0 0 1 1.178.193 7.687 7.687 0 0 1 .703 4.635 7.65 7.65 0 0 1-2.116 4.173 7.53 7.53 0 0 1-4.063 2.124 7.488 7.488 0 0 1-4.049-.421L5.358 23.32a2.251 2.251 0 0 1-1.592.666 2.233 2.233 0 0 1-1.592-.666l-1.07-1.08a2.273 2.273 0 0 1-.66-1.607 2.287 2.287 0 0 1 .66-1.606l8.324-8.394a7.688 7.688 0 0 1-.397-4.188 7.643 7.643 0 0 1 2.233-4.141A7.525 7.525 0 0 1 15.484.28Zm5.26 11.894a6.16 6.16 0 0 0 1.705-3.36 6.192 6.192 0 0 0-.178-2.744l-2.694 2.716a2.198 2.198 0 0 1-3.122 0l-.785-.793a2.23 2.23 0 0 1-.647-1.576 2.245 2.245 0 0 1 .647-1.576l2.775-2.801a6.03 6.03 0 0 0-2.772-.287 6.06 6.06 0 0 0-3.398 1.63 6.154 6.154 0 0 0-1.798 3.334 6.188 6.188 0 0 0 .49 3.764.748.748 0 0 1-.145.845L2.145 20.08a.786.786 0 0 0-.17.855c.04.096.097.182.17.255l1.07 1.082a.778.778 0 0 0 .85.17.778.778 0 0 0 .252-.17l8.671-8.751a.731.731 0 0 1 .838-.145 6.031 6.031 0 0 0 3.649.51 6.064 6.064 0 0 0 3.27-1.71Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.682 3.238a.647.647 0 0 1-.275.867 2.25 2.25 0 0 0-.112.062C6.723 4.508 6.207 5.15 5.956 6c-.278.943-.143 1.845.23 2.455a2.088 2.088 0 0 0 .073.113.648.648 0 0 1-.16.889.634.634 0 0 1-.89-.157l-.005-.008a3.397 3.397 0 0 1-.093-.143c-.597-.962-.748-2.262-.377-3.517.335-1.136 1.045-2.062 1.93-2.582.05-.03.1-.057.15-.084l.009-.004a.635.635 0 0 1 .86.277ZM14.434 18.151a.648.648 0 0 0 .131.893l.009.007c.043.031.086.062.13.091.86.574 2.008.803 3.172.594 1.284-.23 2.37-.956 2.953-1.932a3.34 3.34 0 0 0 .081-.144l.005-.01a.647.647 0 0 0-.265-.861.635.635 0 0 0-.864.262l-.005.01c-.021.04-.044.079-.069.118-.377.601-1.11 1.119-2.06 1.29-.857.153-1.65-.02-2.207-.377a2.316 2.316 0 0 1-.111-.076l-.01-.006a.634.634 0 0 0-.89.141ZM4.974 1.907c-1.002.567-1.887 1.657-2.309 3.087-.467 1.583-.233 3.124.438 4.169a3.56 3.56 0 0 0 .078.117.648.648 0 0 1-.16.889.634.634 0 0 1-.889-.157l-.005-.008a4.873 4.873 0 0 1-.091-.136c-.904-1.402-1.153-3.345-.593-5.24.506-1.719 1.588-3.099 2.91-3.846a5.113 5.113 0 0 1 .155-.084.635.635 0 0 1 .86.277.647.647 0 0 1-.276.867 3.8 3.8 0 0 0-.118.065ZM13.468 21.254a.648.648 0 0 0 .14.9l.126.089c1.257.866 2.972 1.227 4.73.911 1.934-.348 3.547-1.45 4.38-2.899.027-.046.053-.093.078-.14l.005-.01a.647.647 0 0 0-.265-.861.635.635 0 0 0-.864.262l-.005.01a3.645 3.645 0 0 1-.071.126c-.628 1.065-1.882 1.957-3.482 2.244-1.448.26-2.803-.043-3.755-.685a3.788 3.788 0 0 1-.117-.082l-.009-.006a.634.634 0 0 0-.89.141Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/></svg>', "e-icon--zoom_in": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.813 1.499a8.313 8.313 0 1 0-.002 16.626A8.313 8.313 0 0 0 9.813 1.5Zm-5.452.153a9.813 9.813 0 1 1 10.902 16.32A9.813 9.813 0 0 1 4.361 1.652Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 9.749a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 4.499a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 .75-.75ZM15.69 15.689a.75.75 0 0 1 1.061 0l7.03 7.03a.75.75 0 0 1-1.061 1.06l-7.03-7.03a.75.75 0 0 1 0-1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>', "e-icon--zoom_out": '<svg viewBox="0 0 24 24" aria-hidden="true" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.812 1.499a8.313 8.313 0 1 0 0 16.626 8.313 8.313 0 0 0 0-16.626Zm-5.452.154A9.813 9.813 0 1 1 15.264 17.97 9.813 9.813 0 0 1 4.36 1.653Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 9.749a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75ZM15.69 15.689a.75.75 0 0 1 1.061 0l7.03 7.03a.75.75 0 0 1-1.061 1.06l-7.03-7.03a.75.75 0 0 1 0-1.06Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>' }, o = [{ name: "e-icon--arrow_circle-color", version: "4.7.0", newIconName: "e-icon--arrow_right_circle-color" }, { name: "e-icon--arrow_circle-filled-color", version: "4.7.0", newIconName: "e-icon--arrow_right_circle-filled-color" }, { name: "e-icon--arrow_external", version: "7.4.0", newIconName: "e-icon--new_tab-bold" }, { name: "e-icon--arrow_external-bold", version: "7.4.0", newIconName: "e-icon--new_tab-bold" }, { name: "e-icon--arrow_long", version: "6.2.0", newIconName: "e-icon--arrow_long_right" }, { name: "e-icon--arrow_long-bold", version: "6.2.0", newIconName: "e-icon--arrow_long_right-bold" }, { name: "e-icon--check", version: "7.5.0", newIconName: "e-icon--check-bold" }, { name: "e-icon--close", version: "7.5.0", newIconName: "e-icon--close-bold" }, { name: "e-icon--design_process-color", version: "7.5.0", newIconName: "e-icon--bookshelf" }, { name: "e-icon--list_color", version: "12.3.0", newIconName: "e-icon--list-color" }, { name: "e-icon--minus", version: "7.5.0", newIconName: "e-icon--minus-bold" }, { name: "e-icon--movie", version: "10.6.0", newIconName: "e-icon--media-color" }, { name: "e-icon--paper_plane_speed_color", version: "11.4.0", newIconName: "e-icon--paper_plane_flying-color" }, { name: "e-icon--plus", version: "7.5.0", newIconName: "e-icon--plus-bold" }, { name: "e-icon--profile-2", version: "7.5.0", newIconName: "e-icon--profile" }, { name: "e-icon--profile-2-color", version: "7.5.0", newIconName: "e-icon--profile" }, { name: "e-icon--settings_vertical", version: "7.14.1", newIconName: "e-icon--configurations" }, { name: "e-icon--sorting_alfabetical_a_to_z", version: "7.5.0", newIconName: "e-icon--sorting_ascending-bold" }, { name: "e-icon--sorting_alfabetical_z_to_a", version: "7.5.0", newIconName: "e-icon--sorting_descending-bold" }, { name: "e-icon--sorting_date_earliest_to_latest", version: "7.5.0", newIconName: "e-icon--sorting_ascending-bold" }, { name: "e-icon--sorting_date_latest_to_earliest", version: "7.5.0", newIconName: "e-icon--sorting_descending-bold" }, { name: "e-icon--sorting_number_high_to_low", version: "7.5.0", newIconName: "e-icon--sorting_descending-bold" }, { name: "e-icon--sorting_number_low_to_high", version: "7.5.0", newIconName: "e-icon--sorting_ascending-bold" }, { name: "e-icon--sorting_time_earliest_to_latest", version: "7.5.0", newIconName: "e-icon--sorting_ascending-bold" }, { name: "e-icon--sorting_time_latest_to_earliest", version: "7.5.0", newIconName: "e-icon--sorting_descending-bold" }, { name: "e-icon--tag_add", version: "7.5.0", newIconName: "e-icon--add_circle" }], l = [{ name: "e-text", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-bg-", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-yellow", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-orange", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-warning", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-red", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-error", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-green-apple", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-violet-grape", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-blue-berry", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-purple-plum", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-orange-mango", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-red-tomato", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-green", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-elvia-charge", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-90", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-80", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-font-grey", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-text-light", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-70", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-placeholder", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-60", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-50", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-40", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-30", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-disabled", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-light-inverted", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-20", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-10", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-05", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-disabled-light", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey-02", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-white", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-elvis-on", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-elvia-on", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-font-color-light", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-elvia-inverted", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-black", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-elvis-off", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-elvia-off", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-font-color", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-text", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-grey", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-text-elvia-dark", version: "12.7.0", replacement: { name: "CSS variables tokens and class tokens", type: "class", documentation: "https://design.elvia.io/brand/colors" }, sunset: "April 2024" }, { name: "e-autocomplete", version: "12.5.0", replacement: { name: "Autocomplete", type: "component", documentation: "https://design.elvia.io/components/autocomplete" }, sunset: "April 2024" }, { name: "e-autocomplete__item", version: "12.5.0", replacement: { name: "Autocomplete", type: "component", documentation: "https://design.elvia.io/components/autocomplete" }, sunset: "April 2024" }, { name: "e-stepper", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__steps", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step-number", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step-line", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step-lines", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__title", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__content", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__actions", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper--vertical", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step-header", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step-title", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step--active", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper--forced", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step--active-done", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step-number--hover", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step--done", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-stepper__step--error", version: "12.4.0", replacement: { name: "Stepper", type: "component", documentation: "https://design.elvia.io/components/stepper" }, sunset: "April 2024" }, { name: "e-form-field--combined", version: "12.0.0", sunset: "April 2024" }, { name: "e-form-field--medium", version: "12.0.0", sunset: "April 2024" }, { name: "e-input--medium", version: "12.0.0", requiredAncestor: "e-form-field--combined", replacement: { name: "e-input--", type: "class", documentation: "https://design.elvia.io/components/input" }, sunset: "April 2024" }, { name: "e-input--small", version: "12.0.0", requiredAncestor: "e-form-field--combined", replacement: { name: "e-input--short", type: "class", documentation: "https://design.elvia.io/components/input" }, sunset: "April 2024" }, { name: "e-toggle--compact", version: "12.0.0", replacement: { name: "e-toggle--small", type: "class", documentation: "https://design.elvia.io/components/toggle" }, sunset: "April 2024" }, { name: "e-input--compact", version: "12.0.0", replacement: { name: "e-input--small", type: "class", documentation: "https://design.elvia.io/components/input" }, sunset: "April 2024" }, { name: "e-checkbox--compact", version: "12.0.0", replacement: { name: "e-checkbox--small", type: "class", documentation: "https://design.elvia.io/components/checkbox" }, sunset: "April 2024" }, { name: "e-checkbox--sm", version: "12.0.0", replacement: { name: "e-checkbox--small", type: "class", documentation: "https://design.elvia.io/components/checkbox" }, sunset: "April 2024" }, { name: "e-table__footnote--compact", version: "12.0.0", replacement: { name: "e-table__footnote--small", type: "class", documentation: "https://design.elvia.io/components/table" }, sunset: "April 2024" }, { name: "e-table__cell--multiline-sm", version: "12.0.0", replacement: { name: "e-table__cell--multiline-small", type: "class", documentation: "https://design.elvia.io/components/table" }, sunset: "April 2024" }, { name: "e-table-mobile--compact", version: "12.0.0", replacement: { name: "e-table-mobile--small", type: "class", documentation: "https://design.elvia.io/components/table" }, sunset: "April 2024" }, { name: "e-table--compact", version: "12.0.0", replacement: { name: "e-table--small", type: "class", documentation: "https://design.elvia.io/components/table" }, sunset: "April 2024" }, { name: "e-form-field--compact", version: "12.0.0", replacement: { name: "e-form-field--small", type: "class", documentation: "https://design.elvia.io/components/input" }, sunset: "April 2024" }, { name: "e-radio--compact", version: "12.0.0", replacement: { name: "e-radio--small", type: "class", documentation: "https://design.elvia.io/components/radiobutton" }, sunset: "April 2024" }, { name: "e-radio--sm", version: "12.0.0", replacement: { name: "e-radio--small", type: "class", documentation: "https://design.elvia.io/components/radiobutton" }, sunset: "April 2024" }, { name: "e-content-loader--grey", version: "10.6.0", replacement: { name: "e-content-loader", type: "class", documentation: "https://design.elvia.io/components/content-loader" }, sunset: "April 2024" }], a = false;
  window.location.href.indexOf("#debug") > -1 && (a = true);
  let r = window.location.href.indexOf("localhost") > -1;
  function c(e2, o2) {
    if (o2.addedNodes.length > 0)
      for (let e3 = 0; e3 < o2.addedNodes.length; e3++) {
        let l2 = o2.addedNodes[e3];
        if ("i" === l2.localName && i(l2), l2.querySelectorAll) {
          let e4 = l2.querySelectorAll("i");
          for (let o3 = 0; o3 < e4.length; o3++)
            i(e4[o3]);
        }
      }
    i(e2);
  }
  function i(o2) {
    if (o2 && o2.classList)
      for (let l2 = 0; l2 < o2.classList.length; l2++)
        e[o2.classList[l2]] && n(o2) && (o2.innerHTML = v(o2.classList), o2.setAttribute("e-id", t(o2.classList)));
  }
  function n(e2) {
    let o2 = e2.getAttribute("e-id"), l2 = t(e2.classList) + "";
    return !o2 || o2 + "" !== l2;
  }
  function t(e2) {
    let o2 = "";
    for (let l2 = 0; l2 < e2.length; l2++)
      o2 += e2[l2];
    return o2;
  }
  function v(o2) {
    for (let l2 = 0; l2 < o2.length; l2++) {
      if (!e[o2[l2]])
        continue;
      let a2 = e[o2[l2]];
      return d(o2[l2]), a2;
    }
    return r && console.error("Elvis - No icon found for classes: ", o2), "No icon found!";
  }
  function d(e2) {
    if (r)
      for (let l2 = 0; l2 < o.length; l2++)
        e2 === o[l2].name && console.warn("WARNING: The icon " + o[l2].name + " is deprecated from version : " + o[l2].version + ". " + o[l2].name + " now refers to the icon: " + o[l2].newIconName);
  }
  a || (document.body.classList.add("e-no-outline"), document.documentElement.addEventListener("keydown", function(e2) {
    9 === e2.keyCode && document.body.classList.remove("e-no-outline");
  }), document.documentElement.addEventListener("mousedown", function(e2) {
    document.body.classList.add("e-no-outline");
  }, false)), new MutationObserver(function(e2) {
    for (let o2 = 0; o2 < e2.length; o2++)
      c(e2[o2].target, e2[o2]), o2 === e2.length - 1 && s();
  }).observe(document.documentElement, { childList: true, attributes: true, characterData: true, subtree: true });
  const h = [];
  function s() {
    if (r) {
      const e2 = [...new Set([...document.querySelectorAll('[class^="e-"]')].flatMap((e3) => [...e3.classList]))].sort(), o2 = [];
      e2.forEach((e3) => {
        const a2 = l.find((o3) => o3.name === e3);
        if (a2 && !h.includes(a2.name)) {
          if (a2.requiredAncestor && !function({ requiredAncestor: e4, name: o3 }) {
            return document.querySelector(`.${e4} .${o3}`);
          }(a2))
            return;
          h.push(a2.name), o2.push(function({ name: e4, version: o3, replacement: l2, sunset: a3, requiredAncestor: r2 }) {
            let c2 = a3 ? `The sunset date is set for ${a3}.` : "", i2 = l2 ? `
 
It has been replaced with the ${l2.type} '${l2.name}'. See ${l2.documentation}.` : "";
            return `Deprecation warning: The Elvis ${r2 ? `descendant combination (.${r2} .${e4})` : `class ${e4}`} has been deprecated since version ${o3}. ${c2} ${i2}`;
          }(a2));
        }
      }), o2.length && (console.group("Elvis Deprecations"), o2.forEach((e3) => console.warn(e3)), console.groupEnd());
    }
  }
  let w = 0;
  !function() {
    let e2 = (/* @__PURE__ */ new Date()).getTime();
    if (w > e2 - 500)
      return;
    let o2 = window.document.querySelectorAll('[class*="e-icon"]');
    for (let e3 = 0; e3 < o2.length; e3++) {
      let l2 = o2[e3];
      n(l2) && (l2.innerHTML = v(l2.classList), l2.setAttribute("e-id", t(l2.classList)));
    }
    w = e2;
  }();
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var react$1 = {exports: {}};

var react_production_min = {};

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p$1 = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k = null, h = null;
  if (null != b)
    for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)
      J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g)
    c.children = e;
  else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++)
      f[m] = arguments[m + 2];
    c.children = f;
  }
  if (a && a.defaultProps)
    for (d in g = a.defaultProps, g)
      void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k)
    a = null;
  var h = false;
  if (null === a)
    h = true;
  else
    switch (k) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l:
          case n:
            h = true;
        }
    }
  if (h)
    return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a))
    for (var g = 0; g < a.length; g++) {
      k = a[g];
      var f = d + Q$1(k, g);
      h += R$1(k, b, e, f, c);
    }
  else if (f = A$1(a), "function" === typeof f)
    for (a = f.call(a), g = 0; !(k = a.next()).done; )
      k = k.value, f = d + Q$1(k, g++), h += R$1(k, b, e, f, c);
  else if ("object" === k)
    throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a)
    return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status)
    return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
var Children = react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
var Component = react_production_min.Component = E$1;
var Fragment = react_production_min.Fragment = p$1;
var Profiler = react_production_min.Profiler = r;
var PureComponent = react_production_min.PureComponent = G$1;
var StrictMode = react_production_min.StrictMode = q;
var Suspense = react_production_min.Suspense = w;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED$1 = react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
var cloneElement = react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g = a.type.defaultProps;
    for (f in b)
      J.call(b, f) && !L$1.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }
  var f = arguments.length - 2;
  if (1 === f)
    d.children = e;
  else if (1 < f) {
    g = Array(f);
    for (var m = 0; m < f; m++)
      g[m] = arguments[m + 2];
    d.children = g;
  }
  return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
};
var createContext = react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
var createElement = react_production_min.createElement = M$1;
var createFactory = react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
var createRef = react_production_min.createRef = function() {
  return { current: null };
};
var forwardRef = react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
var isValidElement = react_production_min.isValidElement = O$1;
var lazy = react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
var memo = react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
var startTransition = react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
var unstable_act = react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
var useCallback = react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
var useContext = react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
var useDebugValue = react_production_min.useDebugValue = function() {
};
var useDeferredValue = react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
var useEffect = react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
var useId = react_production_min.useId = function() {
  return U$1.current.useId();
};
var useImperativeHandle = react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
var useInsertionEffect = react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
var useLayoutEffect = react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
var useMemo = react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
var useReducer = react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
var useRef = react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
var useState = react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
var useSyncExternalStore = react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
var useTransition = react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
var version$1 = react_production_min.version = "18.2.0";

var react = react$1.exports;

"use strict";
if ("production" === "production") {
  react$1.exports = react_production_min;
} else {
  module.exports = require("./cjs/react.development.js");
}

var reactExports = react$1.exports;
const React = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

var client = {};

var reactDom$1 = {exports: {}};

var reactDom_production_min = {};

var scheduler$1 = {exports: {}};

var scheduler_production_min$1 = {};

(function (exports) {
	"use strict";
	/**
	 * @license React
	 * scheduler.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	function f(a, b) {
	  var c = a.length;
	  a.push(b);
	  a:
	    for (; 0 < c; ) {
	      var d = c - 1 >>> 1, e = a[d];
	      if (0 < g(e, b))
	        a[d] = b, a[c] = e, c = d;
	      else
	        break a;
	    }
	}
	function h(a) {
	  return 0 === a.length ? null : a[0];
	}
	function k(a) {
	  if (0 === a.length)
	    return null;
	  var b = a[0], c = a.pop();
	  if (c !== b) {
	    a[0] = c;
	    a:
	      for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
	        var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
	        if (0 > g(C, c))
	          n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
	        else if (n < e && 0 > g(x, c))
	          a[d] = x, a[n] = c, d = n;
	        else
	          break a;
	      }
	  }
	  return b;
	}
	function g(a, b) {
	  var c = a.sortIndex - b.sortIndex;
	  return 0 !== c ? c : a.id - b.id;
	}
	if ("object" === typeof performance && "function" === typeof performance.now) {
	  var l = performance;
	  exports.unstable_now = function() {
	    return l.now();
	  };
	} else {
	  var p = Date, q = p.now();
	  exports.unstable_now = function() {
	    return p.now() - q;
	  };
	}
	var r = [], t = [], u = 1, v = null, y = 3, z = false, A = false, B = false, D = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F = "undefined" !== typeof setImmediate ? setImmediate : null;
	"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function G(a) {
	  for (var b = h(t); null !== b; ) {
	    if (null === b.callback)
	      k(t);
	    else if (b.startTime <= a)
	      k(t), b.sortIndex = b.expirationTime, f(r, b);
	    else
	      break;
	    b = h(t);
	  }
	}
	function H(a) {
	  B = false;
	  G(a);
	  if (!A)
	    if (null !== h(r))
	      A = true, I(J);
	    else {
	      var b = h(t);
	      null !== b && K(H, b.startTime - a);
	    }
	}
	function J(a, b) {
	  A = false;
	  B && (B = false, E(L), L = -1);
	  z = true;
	  var c = y;
	  try {
	    G(b);
	    for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
	      var d = v.callback;
	      if ("function" === typeof d) {
	        v.callback = null;
	        y = v.priorityLevel;
	        var e = d(v.expirationTime <= b);
	        b = exports.unstable_now();
	        "function" === typeof e ? v.callback = e : v === h(r) && k(r);
	        G(b);
	      } else
	        k(r);
	      v = h(r);
	    }
	    if (null !== v)
	      var w = true;
	    else {
	      var m = h(t);
	      null !== m && K(H, m.startTime - b);
	      w = false;
	    }
	    return w;
	  } finally {
	    v = null, y = c, z = false;
	  }
	}
	var N = false, O = null, L = -1, P = 5, Q = -1;
	function M() {
	  return exports.unstable_now() - Q < P ? false : true;
	}
	function R() {
	  if (null !== O) {
	    var a = exports.unstable_now();
	    Q = a;
	    var b = true;
	    try {
	      b = O(true, a);
	    } finally {
	      b ? S() : (N = false, O = null);
	    }
	  } else
	    N = false;
	}
	var S;
	if ("function" === typeof F)
	  S = function() {
	    F(R);
	  };
	else if ("undefined" !== typeof MessageChannel) {
	  var T = new MessageChannel(), U = T.port2;
	  T.port1.onmessage = R;
	  S = function() {
	    U.postMessage(null);
	  };
	} else
	  S = function() {
	    D(R, 0);
	  };
	function I(a) {
	  O = a;
	  N || (N = true, S());
	}
	function K(a, b) {
	  L = D(function() {
	    a(exports.unstable_now());
	  }, b);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(a) {
	  a.callback = null;
	};
	exports.unstable_continueExecution = function() {
	  A || z || (A = true, I(J));
	};
	exports.unstable_forceFrameRate = function(a) {
	  0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
	  return y;
	};
	exports.unstable_getFirstCallbackNode = function() {
	  return h(r);
	};
	exports.unstable_next = function(a) {
	  switch (y) {
	    case 1:
	    case 2:
	    case 3:
	      var b = 3;
	      break;
	    default:
	      b = y;
	  }
	  var c = y;
	  y = b;
	  try {
	    return a();
	  } finally {
	    y = c;
	  }
	};
	exports.unstable_pauseExecution = function() {
	};
	exports.unstable_requestPaint = function() {
	};
	exports.unstable_runWithPriority = function(a, b) {
	  switch (a) {
	    case 1:
	    case 2:
	    case 3:
	    case 4:
	    case 5:
	      break;
	    default:
	      a = 3;
	  }
	  var c = y;
	  y = a;
	  try {
	    return b();
	  } finally {
	    y = c;
	  }
	};
	exports.unstable_scheduleCallback = function(a, b, c) {
	  var d = exports.unstable_now();
	  "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
	  switch (a) {
	    case 1:
	      var e = -1;
	      break;
	    case 2:
	      e = 250;
	      break;
	    case 5:
	      e = 1073741823;
	      break;
	    case 4:
	      e = 1e4;
	      break;
	    default:
	      e = 5e3;
	  }
	  e = c + e;
	  a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
	  c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
	  return a;
	};
	exports.unstable_shouldYield = M;
	exports.unstable_wrapCallback = function(a) {
	  var b = y;
	  return function() {
	    var c = y;
	    y = b;
	    try {
	      return a.apply(this, arguments);
	    } finally {
	      y = c;
	    }
	  };
	}; 
} (scheduler_production_min$1));

const scheduler_production_min = /*@__PURE__*/getDefaultExportFromCjs(scheduler_production_min$1);

var scheduler = scheduler$1.exports;

"use strict";
if ("production" === "production") {
  scheduler$1.exports = scheduler_production_min$1;
} else {
  module.exports = require("./cjs/scheduler.development.js");
}

var schedulerExports = scheduler$1.exports;
const index$1 = /*@__PURE__*/getDefaultExportFromCjs(schedulerExports);

"use strict";
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++)
    da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a))
    return true;
  if (ja.call(la, a))
    return false;
  if (ka.test(a))
    return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type)
    return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (null !== c)
        return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d))
    return true;
  if (d)
    return false;
  if (null !== c)
    switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
  return false;
}
function v(a, b, c, d, e, f, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1])
    qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
Symbol.for("react.scope");
Symbol.for("react.debug_trace_mode");
var Ia = Symbol.for("react.offscreen");
Symbol.for("react.legacy_hidden");
Symbol.for("react.cache");
Symbol.for("react.tracing_marker");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La)
    try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na)
    return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b)
      if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l) {
          var d = l;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l) {
          d = l;
        }
        a.call(b.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l) {
        d = l;
      }
      a();
    }
  } catch (l) {
    if (l && d && "string" === typeof l.stack) {
      for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
        h--;
      for (; 1 <= g && 0 <= h; g--, h--)
        if (e[g] !== f[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f[h]) {
                var k = "\n" + e[g].replace(" at new ", " at ");
                a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                return k;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a)
    return null;
  if ("function" === typeof a)
    return a.displayName || a.name || null;
  if ("string" === typeof a)
    return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a)
    switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
      case Ha:
        b = a._payload;
        a = a._init;
        try {
          return Qa(a(b));
        } catch (c) {
        }
    }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b)
        return b.displayName || b.name || null;
      if ("string" === typeof b)
        return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a)
    return false;
  var b = a._valueTracker;
  if (!b)
    return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a)
    return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c)
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c)
        a.value = "" + c;
    } else
      a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
      return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a)
    null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++)
      b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++)
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML)
    throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b)
        throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length)
          throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a)
    a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; )
      a.removeChild(a.firstChild);
    for (; b.firstChild; )
      a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b)
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
      throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children)
        throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML))
        throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style)
      throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-"))
    return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb)
      throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b)
      for (a = 0; a < b.length; a++)
        Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib)
    return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab)
      Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c)
    return null;
  var d = Db(c);
  if (null === d)
    return null;
  c = d[b];
  a:
    switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
  if (a)
    return null;
  if (c && "function" !== typeof c)
    throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
function Nb(a, b, c, d, e, f, g, h, k) {
  var l = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l);
  } catch (m) {
    this.onError(m);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f, g, h, k) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f, g, h, k) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l = Pb;
      Ob = false;
      Pb = null;
    } else
      throw Error(p(198));
    Qb || (Qb = true, Rb = l);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate)
    for (; b.return; )
      b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b)
      return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a)
    throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b)
      throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e)
      break;
    var f = e.alternate;
    if (null === f) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f.child) {
      for (f = e.child; f; ) {
        if (f === c)
          return Xb(e), a;
        if (f === d)
          return Xb(e), b;
        f = f.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return)
      c = e, d = f;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f.child; h; ) {
          if (h === c) {
            g = true;
            c = f;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g)
          throw Error(p(189));
      }
    }
    if (c.alternate !== d)
      throw Error(p(190));
  }
  if (3 !== c.tag)
    throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag)
    return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b)
      return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot)
    try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c)
    return 0;
  var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
  } else
    g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
  if (0 === d)
    return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240)))
    return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b)
    for (a = a.entanglements, b &= d; 0 < b; )
      c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
    var g = 31 - oc(f), h = 1 << g, k = e[g];
    if (-1 === k) {
      if (0 === (h & c) || 0 !== (h & d))
        e[g] = vc(h, b);
    } else
      k <= b && (a.expiredLanes |= h);
    f &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++)
    b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f) {
  if (null === a || a.nativeEvent !== f)
    return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f = e.pointerId;
      Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn)
    return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else
      return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++)
    d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); )
    Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f;
  }
}
function gd(a, b, c, d) {
  var e = C, f = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e)
      hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d))
      d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f = Cb(e);
        null !== f && Ec(f);
        f = Yc(a, b, c, d);
        null === f && hd(a, b, d, id, c);
        if (f === e)
          break;
        e = f;
      }
      null !== e && d.stopPropagation();
    } else
      hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a)
    if (b = Vb(a), null === b)
      a = null;
    else if (c = b.tag, 13 === c) {
      a = Wb(b);
      if (null !== a)
        return a;
      a = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated)
        return 3 === b.tag ? b.stateNode.containerInfo : null;
      a = null;
    } else
      b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++)
    ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
    ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f;
    this.target = g;
    this.currentTarget = null;
    for (var c in a)
      a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
    this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a)
    return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b)
      return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie)
    return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length)
          return b.char;
        if (b.which)
          return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b))
    return a;
}
function ve(a, b) {
  if ("change" === a)
    return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a)
    return te(qe);
}
function Ee(a, b) {
  if ("click" === a)
    return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a)
    return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b))
    return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
    return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length)
    return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e]))
      return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; )
    a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b)
        return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c)
      a = b.contentWindow;
    else
      break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c)
        c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f = Math.min(d.start, e);
        d = void 0 === d.end ? f : Math.min(d.end, e);
        !a.extend && f > d && (e = d, d = f, f = e);
        e = Ke(c, f);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; )
      1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++)
      a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a])
    return Xe[a];
  if (!We[a])
    return a;
  var b = We[a], c;
  for (c in b)
    if (b.hasOwnProperty(c) && c in Ye)
      return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f = void 0;
      if (b)
        for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k = h.instance, l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped())
            break a;
          nf(e, h, l);
          f = k;
        }
      else
        for (g = 0; g < d.length; g++) {
          h = d[g];
          k = h.instance;
          l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped())
            break a;
          nf(e, h, l);
          f = k;
        }
    }
  }
  if (Qb)
    throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d)
    a:
      for (; ; ) {
        if (null === d)
          return;
        var g = d.tag;
        if (3 === g || 4 === g) {
          var h = d.stateNode.containerInfo;
          if (h === e || 8 === h.nodeType && h.parentNode === e)
            break;
          if (4 === g)
            for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e)
                  return;
              }
              g = g.return;
            }
          for (; null !== h; ) {
            g = Wc(h);
            if (null === g)
              return;
            k = g.tag;
            if (5 === k || 6 === k) {
              d = f = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
  Jb(function() {
    var d2 = f, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k2 = td, n = a;
        switch (a) {
          case "keypress":
            if (0 === od(c))
              break a;
          case "keydown":
          case "keyup":
            k2 = Rd;
            break;
          case "focusin":
            n = "focus";
            k2 = Fd;
            break;
          case "focusout":
            n = "blur";
            k2 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k2 = Fd;
            break;
          case "click":
            if (2 === c.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k2 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k2 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k2 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k2 = Hd;
            break;
          case cf:
            k2 = Xd;
            break;
          case "scroll":
            k2 = vd;
            break;
          case "wheel":
            k2 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k2 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k2 = Td;
        }
        var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
        t = [];
        for (var w = d2, u; null !== w; ) {
          u = w;
          var F = u.stateNode;
          5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
          if (J)
            break;
          w = w.return;
        }
        0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k2 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf]))
          break a;
        if (k2 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k2) {
            if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag))
              n = null;
          } else
            k2 = null, n = d2;
          if (k2 !== n) {
            t = Bd;
            F = "onMouseLeave";
            x = "onMouseEnter";
            w = "mouse";
            if ("pointerout" === a || "pointerover" === a)
              t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
            J = null == k2 ? h2 : ue(k2);
            u = null == n ? h2 : ue(n);
            h2 = new t(F, w + "leave", k2, c, e2);
            h2.target = J;
            h2.relatedTarget = u;
            F = null;
            Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
            J = F;
            if (k2 && n)
              b: {
                t = k2;
                x = n;
                w = 0;
                for (u = t; u; u = vf(u))
                  w++;
                u = 0;
                for (F = x; F; F = vf(F))
                  u++;
                for (; 0 < w - u; )
                  t = vf(t), w--;
                for (; 0 < u - w; )
                  x = vf(x), u--;
                for (; w--; ) {
                  if (t === x || null !== x && t === x.alternate)
                    break b;
                  t = vf(t);
                  x = vf(x);
                }
                t = null;
              }
            else
              t = null;
            null !== k2 && wf(g2, h2, k2, t, false);
            null !== n && null !== J && wf(g2, J, n, t, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k2 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k2 || "input" === k2 && "file" === h2.type)
          var na = ve;
        else if (me(h2))
          if (we)
            na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
        else
          (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable)
            Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae)
        b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
      else
        ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c))
        d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f = e.stateNode;
    5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a)
    return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k = h.alternate, l = h.stateNode;
    if (null !== k && k === d)
      break;
    5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c)
    throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType)
      if (c = e.data, "/$" === c) {
        if (0 === d) {
          a.removeChild(e);
          bd(b);
          return;
        }
        d--;
      } else
        "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b)
      break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b)
        break;
      if ("/$" === b)
        return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b)
          return a;
        b--;
      } else
        "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b)
    return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child)
        for (a = Mf(a); null !== a; ) {
          if (c = a[Of])
            return c;
          a = Mf(a);
        }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag)
    return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c)
    return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f;
  for (f in c)
    e[f] = b[f];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf)
    throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext)
    return c;
  d = d.getChildContext();
  for (var e in d)
    if (!(e in b))
      throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d)
    throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f = 32 - oc(b) + e;
  if (30 < f) {
    var g = e - e % 5;
    f = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f + a;
  } else
    rg = 1 << f | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a))
          throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a))
        throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
    a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg)
    return false;
  if (!I)
    return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a))
      throw Hg(), Error(p(418));
    for (; b; )
      Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a)
      throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else
            "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; )
    a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a)
      void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
var Mg = Uf(null), Ng = null, Og = null, Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a) {
  var b = Mg.current;
  E(Mg);
  a._currentValue = b;
}
function Sg(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c)
      break;
    a = a.return;
  }
}
function Tg(a, b) {
  Ng = a;
  Pg = Og = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (Ug = true), a.firstContext = null);
}
function Vg(a) {
  var b = a._currentValue;
  if (Pg !== a)
    if (a = { context: a, memoizedValue: b, next: null }, null === Og) {
      if (null === Ng)
        throw Error(p(308));
      Og = a;
      Ng.dependencies = { lanes: 0, firstContext: a };
    } else
      Og = Og.next = a;
  return b;
}
var Wg = null;
function Xg(a) {
  null === Wg ? Wg = [a] : Wg.push(a);
}
function Yg(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, Xg(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return Zg(a, d);
}
function Zg(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; )
    a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var $g = false;
function ah(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function ch(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function dh(a, b, c) {
  var d = a.updateQueue;
  if (null === d)
    return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return Zg(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, Xg(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return Zg(a, c);
}
function eh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function fh(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f ? e = f = g : f = f.next = g;
        c = c.next;
      } while (null !== c);
      null === f ? e = f = b : f = f.next = b;
    } else
      e = f = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function gh(a, b, c, d) {
  var e = a.updateQueue;
  $g = false;
  var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k = h, l = k.next;
    k.next = null;
    null === g ? f = l : g.next = l;
    g = k;
    var m = a.alternate;
    null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
  }
  if (null !== f) {
    var q = e.baseState;
    g = 0;
    m = l = k = null;
    h = f;
    do {
      var r = h.lane, y = h.eventTime;
      if ((d & r) === r) {
        null !== m && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n = a, t = h;
          r = b;
          y = c;
          switch (t.tag) {
            case 1:
              n = t.payload;
              if ("function" === typeof n) {
                q = n.call(y, q, r);
                break a;
              }
              q = n;
              break a;
            case 3:
              n.flags = n.flags & -65537 | 128;
            case 0:
              n = t.payload;
              r = "function" === typeof n ? n.call(y, q, r) : n;
              if (null === r || void 0 === r)
                break a;
              q = A({}, q, r);
              break a;
            case 2:
              $g = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
      } else
        y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
      h = h.next;
      if (null === h)
        if (h = e.shared.pending, null === h)
          break;
        else
          r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
    } while (1);
    null === m && (k = q);
    e.baseState = k;
    e.firstBaseUpdate = l;
    e.lastBaseUpdate = m;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else
      null === f && (e.shared.lanes = 0);
    hh |= g;
    a.lanes = g;
    a.memoizedState = q;
  }
}
function ih(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a)
    for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e)
          throw Error(p(191, e));
        e.call(d);
      }
    }
}
var jh = new aa.Component().refs;
function kh(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var nh = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = L(), e = lh(a), f = ch(d, e);
  f.payload = b;
  void 0 !== c && null !== c && (f.callback = c);
  b = dh(a, f, e);
  null !== b && (mh(b, a, e, d), eh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = L(), e = lh(a), f = ch(d, e);
  f.tag = 1;
  f.payload = b;
  void 0 !== c && null !== c && (f.callback = c);
  b = dh(a, f, e);
  null !== b && (mh(b, a, e, d), eh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = L(), d = lh(a), e = ch(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = dh(a, e, d);
  null !== b && (mh(b, a, d, c), eh(b, a, d));
} };
function oh(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
}
function ph(a, b, c) {
  var d = false, e = Vf;
  var f = b.contextType;
  "object" === typeof f && null !== f ? f = Vg(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = nh;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}
function qh(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && nh.enqueueReplaceState(b, b.state, null);
}
function rh(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = jh;
  ah(a);
  var f = b.contextType;
  "object" === typeof f && null !== f ? e.context = Vg(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
  e.state = a.memoizedState;
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (kh(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function sh(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag)
          throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d)
        throw Error(p(147, a));
      var e = d, f = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f)
        return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        b2 === jh && (b2 = e.refs = {});
        null === a2 ? delete b2[f] : b2[f] = a2;
      };
      b._stringRef = f;
      return b;
    }
    if ("string" !== typeof a)
      throw Error(p(284));
    if (!c._owner)
      throw Error(p(290, a));
  }
  return a;
}
function th(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function uh(a) {
  var b = a._init;
  return b(a._payload);
}
function vh(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a)
      return null;
    for (; null !== d2; )
      b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
      null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = wh(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f(b2, c2, d2) {
    b2.index = d2;
    if (!a)
      return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2)
      return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag)
      return b2 = xh(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k(a2, b2, c2, d2) {
    var f2 = c2.type;
    if (f2 === ya)
      return m(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && uh(f2) === b2.type))
      return d2 = e(b2, c2.props), d2.ref = sh(a2, b2, c2), d2.return = a2, d2;
    d2 = yh(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = sh(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
      return b2 = zh(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m(a2, b2, c2, d2, f2) {
    if (null === b2 || 7 !== b2.tag)
      return b2 = Ah(c2, a2.mode, d2, f2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2)
      return b2 = xh("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = yh(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = sh(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = zh(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2))
        return b2 = Ah(b2, a2.mode, c2, null), b2.return = a2, b2;
      th(a2, b2);
    }
    return null;
  }
  function r(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2)
      return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2))
        return null !== e2 ? null : m(a2, b2, c2, d2, null);
      th(a2, c2);
    }
    return null;
  }
  function y(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
      return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
        case Ha:
          var f2 = d2._init;
          return y(a2, b2, c2, f2(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2))
        return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
      th(b2, d2);
    }
    return null;
  }
  function n(e2, g2, h2, k2) {
    for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
      u.index > w ? (x = u, u = null) : x = u.sibling;
      var n2 = r(e2, u, h2[w], k2);
      if (null === n2) {
        null === u && (u = x);
        break;
      }
      a && u && null === n2.alternate && b(e2, u);
      g2 = f(n2, g2, w);
      null === m2 ? l2 = n2 : m2.sibling = n2;
      m2 = n2;
      u = x;
    }
    if (w === h2.length)
      return c(e2, u), I && tg(e2, w), l2;
    if (null === u) {
      for (; w < h2.length; w++)
        u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
      I && tg(e2, w);
      return l2;
    }
    for (u = d(e2, u); w < h2.length; w++)
      x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
    a && u.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w);
    return l2;
  }
  function t(e2, g2, h2, k2) {
    var l2 = Ka(h2);
    if ("function" !== typeof l2)
      throw Error(p(150));
    h2 = l2.call(h2);
    if (null == h2)
      throw Error(p(151));
    for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
      m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
      var t2 = r(e2, m2, n2.value, k2);
      if (null === t2) {
        null === m2 && (m2 = x);
        break;
      }
      a && m2 && null === t2.alternate && b(e2, m2);
      g2 = f(t2, g2, w);
      null === u ? l2 = t2 : u.sibling = t2;
      u = t2;
      m2 = x;
    }
    if (n2.done)
      return c(
        e2,
        m2
      ), I && tg(e2, w), l2;
    if (null === m2) {
      for (; !n2.done; w++, n2 = h2.next())
        n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
      I && tg(e2, w);
      return l2;
    }
    for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next())
      n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
    a && m2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w);
    return l2;
  }
  function J(a2, d2, f2, h2) {
    "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
    if ("object" === typeof f2 && null !== f2) {
      switch (f2.$$typeof) {
        case va:
          a: {
            for (var k2 = f2.key, l2 = d2; null !== l2; ) {
              if (l2.key === k2) {
                k2 = f2.type;
                if (k2 === ya) {
                  if (7 === l2.tag) {
                    c(a2, l2.sibling);
                    d2 = e(l2, f2.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && uh(k2) === l2.type) {
                  c(a2, l2.sibling);
                  d2 = e(l2, f2.props);
                  d2.ref = sh(a2, l2, f2);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l2);
                break;
              } else
                b(a2, l2);
              l2 = l2.sibling;
            }
            f2.type === ya ? (d2 = Ah(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = yh(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = sh(a2, d2, f2), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l2 = f2.key; null !== d2; ) {
              if (d2.key === l2)
                if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f2.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
              else
                b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = zh(f2, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
      }
      if (eb(f2))
        return n(a2, d2, f2, h2);
      if (Ka(f2))
        return t(a2, d2, f2, h2);
      th(a2, f2);
    }
    return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = xh(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J;
}
var Bh = vh(true), Ch = vh(false), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
function Hh(a) {
  if (a === Dh)
    throw Error(p(174));
  return a;
}
function Ih(a, b) {
  G(Gh, b);
  G(Fh, a);
  G(Eh, Dh);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(Eh);
  G(Eh, b);
}
function Jh() {
  E(Eh);
  E(Fh);
  E(Gh);
}
function Kh(a) {
  Hh(Gh.current);
  var b = Hh(Eh.current);
  var c = lb(b, a.type);
  b !== c && (G(Fh, a), G(Eh, c));
}
function Lh(a) {
  Fh.current === a && (E(Eh), E(Fh));
}
var M = Uf(0);
function Mh(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
        return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128))
        return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a)
      break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a)
        return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a = 0; a < Nh.length; a++)
    Nh[a]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher, Qh = ua.ReactCurrentBatchConfig, Rh = 0, N = null, O = null, P = null, Sh = false, Th = false, Uh = 0, Vh = 0;
function Q() {
  throw Error(p(321));
}
function Wh(a, b) {
  if (null === b)
    return false;
  for (var c = 0; c < b.length && c < a.length; c++)
    if (!He(a[c], b[c]))
      return false;
  return true;
}
function Xh(a, b, c, d, e, f) {
  Rh = f;
  N = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Ph.current = null === a || null === a.memoizedState ? Yh : Zh;
  a = c(d, e);
  if (Th) {
    f = 0;
    do {
      Th = false;
      Uh = 0;
      if (25 <= f)
        throw Error(p(301));
      f += 1;
      P = O = null;
      b.updateQueue = null;
      Ph.current = $h;
      a = c(d, e);
    } while (Th);
  }
  Ph.current = ai;
  b = null !== O && null !== O.next;
  Rh = 0;
  P = O = N = null;
  Sh = false;
  if (b)
    throw Error(p(300));
  return a;
}
function bi() {
  var a = 0 !== Uh;
  Uh = 0;
  return a;
}
function ci() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === P ? N.memoizedState = P = a : P = P.next = a;
  return P;
}
function di() {
  if (null === O) {
    var a = N.alternate;
    a = null !== a ? a.memoizedState : null;
  } else
    a = O.next;
  var b = null === P ? N.memoizedState : P.next;
  if (null !== b)
    P = b, O = a;
  else {
    if (null === a)
      throw Error(p(310));
    O = a;
    a = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null };
    null === P ? N.memoizedState = P = a : P = P.next = a;
  }
  return P;
}
function ei(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function fi(a) {
  var b = di(), c = b.queue;
  if (null === c)
    throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = O, e = d.baseQueue, f = c.pending;
  if (null !== f) {
    if (null !== e) {
      var g = e.next;
      e.next = f.next;
      f.next = g;
    }
    d.baseQueue = e = f;
    c.pending = null;
  }
  if (null !== e) {
    f = e.next;
    d = d.baseState;
    var h = g = null, k = null, l = f;
    do {
      var m = l.lane;
      if ((Rh & m) === m)
        null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
      else {
        var q = {
          lane: m,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null
        };
        null === k ? (h = k = q, g = d) : k = k.next = q;
        N.lanes |= m;
        hh |= m;
      }
      l = l.next;
    } while (null !== l && l !== f);
    null === k ? g = d : k.next = h;
    He(d, b.memoizedState) || (Ug = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f = e.lane, N.lanes |= f, hh |= f, e = e.next;
    while (e !== a);
  } else
    null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function gi(a) {
  var b = di(), c = b.queue;
  if (null === c)
    throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f = a(f, g.action), g = g.next;
    while (g !== e);
    He(f, b.memoizedState) || (Ug = true);
    b.memoizedState = f;
    null === b.baseQueue && (b.baseState = f);
    c.lastRenderedState = f;
  }
  return [f, d];
}
function hi() {
}
function ii(a, b) {
  var c = N, d = di(), e = b(), f = !He(d.memoizedState, e);
  f && (d.memoizedState = e, Ug = true);
  d = d.queue;
  ji(ki.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f || null !== P && P.memoizedState.tag & 1) {
    c.flags |= 2048;
    li(9, mi.bind(null, c, d, e, b), void 0, null);
    if (null === R)
      throw Error(p(349));
    0 !== (Rh & 30) || ni(c, b, e);
  }
  return e;
}
function ni(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = N.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function mi(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  oi(b) && pi(a);
}
function ki(a, b, c) {
  return c(function() {
    oi(b) && pi(a);
  });
}
function oi(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function pi(a) {
  var b = Zg(a, 1);
  null !== b && mh(b, a, 1, -1);
}
function qi(a) {
  var b = ci();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ri.bind(null, N, a);
  return [b.memoizedState, a];
}
function li(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = N.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function si() {
  return di().memoizedState;
}
function ti(a, b, c, d) {
  var e = ci();
  N.flags |= a;
  e.memoizedState = li(1 | b, c, void 0, void 0 === d ? null : d);
}
function ui(a, b, c, d) {
  var e = di();
  d = void 0 === d ? null : d;
  var f = void 0;
  if (null !== O) {
    var g = O.memoizedState;
    f = g.destroy;
    if (null !== d && Wh(d, g.deps)) {
      e.memoizedState = li(b, c, f, d);
      return;
    }
  }
  N.flags |= a;
  e.memoizedState = li(1 | b, c, f, d);
}
function vi(a, b) {
  return ti(8390656, 8, a, b);
}
function ji(a, b) {
  return ui(2048, 8, a, b);
}
function wi(a, b) {
  return ui(4, 2, a, b);
}
function xi(a, b) {
  return ui(4, 4, a, b);
}
function yi(a, b) {
  if ("function" === typeof b)
    return a = a(), b(a), function() {
      b(null);
    };
  if (null !== b && void 0 !== b)
    return a = a(), b.current = a, function() {
      b.current = null;
    };
}
function zi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ui(4, 4, yi.bind(null, b, a), c);
}
function Ai() {
}
function Bi(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1]))
    return d[0];
  c.memoizedState = [a, b];
  return a;
}
function Ci(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1]))
    return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function Di(a, b, c) {
  if (0 === (Rh & 21))
    return a.baseState && (a.baseState = false, Ug = true), a.memoizedState = c;
  He(c, b) || (c = yc(), N.lanes |= c, hh |= c, a.baseState = true);
  return b;
}
function Ei(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Qh.transition;
  Qh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Qh.transition = d;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a, b, c) {
  var d = lh(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a))
    Ii(b, c);
  else if (c = Yg(a, b, c, d), null !== c) {
    var e = L();
    mh(c, a, d, e);
    Ji(c, b, d);
  }
}
function ri(a, b, c) {
  var d = lh(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a))
    Ii(b, e);
  else {
    var f = a.alternate;
    if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f))
      try {
        var g = b.lastRenderedState, h = f(g, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g)) {
          var k = b.interleaved;
          null === k ? (e.next = e, Xg(b)) : (e.next = k.next, k.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l) {
      } finally {
      }
    c = Yg(a, b, e, d);
    null !== c && (e = L(), mh(c, a, d, e), Ji(c, b, d));
  }
}
function Hi(a) {
  var b = a.alternate;
  return a === N || null !== b && b === N;
}
function Ii(a, b) {
  Th = Sh = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Ji(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var ai = { readContext: Vg, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useInsertionEffect: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useSyncExternalStore: Q, useId: Q, unstable_isNewReconciler: false }, Yh = { readContext: Vg, useCallback: function(a, b) {
  ci().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: Vg, useEffect: vi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ti(
    4194308,
    4,
    yi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ti(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ti(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = ci();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = ci();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = Gi.bind(null, N, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = ci();
  a = { current: a };
  return b.memoizedState = a;
}, useState: qi, useDebugValue: Ai, useDeferredValue: function(a) {
  return ci().memoizedState = a;
}, useTransition: function() {
  var a = qi(false), b = a[0];
  a = Ei.bind(null, a[1]);
  ci().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = N, e = ci();
  if (I) {
    if (void 0 === c)
      throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === R)
      throw Error(p(349));
    0 !== (Rh & 30) || ni(d, b, c);
  }
  e.memoizedState = c;
  var f = { value: c, getSnapshot: b };
  e.queue = f;
  vi(ki.bind(
    null,
    d,
    f,
    a
  ), [a]);
  d.flags |= 2048;
  li(9, mi.bind(null, d, f, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = ci(), b = R.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Uh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else
    c = Vh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Zh = {
  readContext: Vg,
  useCallback: Bi,
  useContext: Vg,
  useEffect: ji,
  useImperativeHandle: zi,
  useInsertionEffect: wi,
  useLayoutEffect: xi,
  useMemo: Ci,
  useReducer: fi,
  useRef: si,
  useState: function() {
    return fi(ei);
  },
  useDebugValue: Ai,
  useDeferredValue: function(a) {
    var b = di();
    return Di(b, O.memoizedState, a);
  },
  useTransition: function() {
    var a = fi(ei)[0], b = di().memoizedState;
    return [a, b];
  },
  useMutableSource: hi,
  useSyncExternalStore: ii,
  useId: Fi,
  unstable_isNewReconciler: false
}, $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
  return gi(ei);
}, useDebugValue: Ai, useDeferredValue: function(a) {
  var b = di();
  return null === O ? b.memoizedState = a : Di(b, O.memoizedState, a);
}, useTransition: function() {
  var a = gi(ei)[0], b = di().memoizedState;
  return [a, b];
}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: false };
function Ki(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f) {
    e = "\nError generating stack: " + f.message + "\n" + f.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Li(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Mi(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Ni = "function" === typeof WeakMap ? WeakMap : Map;
function Oi(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Pi || (Pi = true, Qi = d);
    Mi(a, b);
  };
  return c;
}
function Ri(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Mi(a, b);
    };
  }
  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
    Mi(a, b);
    "function" !== typeof d && (null === Si ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Ti(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Ni();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else
    e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ui.bind(null, a, b, c), b.then(a, a));
}
function Vi(a) {
  do {
    var b;
    if (b = 13 === a.tag)
      b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b)
      return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Wi(a, b, c, d, e) {
  if (0 === (a.mode & 1))
    return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ch(-1, 1), b.tag = 2, dh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Xi = ua.ReactCurrentOwner, Ug = false;
function Yi(a, b, c, d) {
  b.child = null === a ? Ch(b, null, c, d) : Bh(b, a.child, c, d);
}
function Zi(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  Tg(b, e);
  d = Xh(a, b, c, d, f, e);
  c = bi();
  if (null !== a && !Ug)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Yi(a, b, d, e);
  return b.child;
}
function aj(a, b, c, d, e) {
  if (null === a) {
    var f = c.type;
    if ("function" === typeof f && !bj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps)
      return b.tag = 15, b.type = f, cj(a, b, f, d, e);
    a = yh(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f = a.child;
  if (0 === (a.lanes & e)) {
    var g = f.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref)
      return $i(a, b, e);
  }
  b.flags |= 1;
  a = wh(f, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function cj(a, b, c, d, e) {
  if (null !== a) {
    var f = a.memoizedProps;
    if (Ie(f, d) && a.ref === b.ref)
      if (Ug = false, b.pendingProps = d = f, 0 !== (a.lanes & e))
        0 !== (a.flags & 131072) && (Ug = true);
      else
        return b.lanes = a.lanes, $i(a, b, e);
  }
  return dj(a, b, c, d, e);
}
function ej(a, b, c) {
  var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode)
    if (0 === (b.mode & 1))
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(fj, gj), gj |= c;
    else {
      if (0 === (c & 1073741824))
        return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(fj, gj), gj |= a, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f ? f.baseLanes : c;
      G(fj, gj);
      gj |= d;
    }
  else
    null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(fj, gj), gj |= d;
  Yi(a, b, e, c);
  return b.child;
}
function hj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c)
    b.flags |= 512, b.flags |= 2097152;
}
function dj(a, b, c, d, e) {
  var f = Zf(c) ? Xf : H.current;
  f = Yf(b, f);
  Tg(b, e);
  c = Xh(a, b, c, d, f, e);
  d = bi();
  if (null !== a && !Ug)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Yi(a, b, c, e);
  return b.child;
}
function ij(a, b, c, d, e) {
  if (Zf(c)) {
    var f = true;
    cg(b);
  } else
    f = false;
  Tg(b, e);
  if (null === b.stateNode)
    jj(a, b), ph(b, c, d), rh(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k = g.context, l = c.contextType;
    "object" === typeof l && null !== l ? l = Vg(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
    var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
    q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && qh(b, g, d, l);
    $g = false;
    var r = b.memoizedState;
    g.state = r;
    gh(b, d, g, e);
    k = b.memoizedState;
    h !== d || r !== k || Wf.current || $g ? ("function" === typeof m && (kh(b, c, m, d), k = b.memoizedState), (h = $g || oh(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    bh(a, b);
    h = b.memoizedProps;
    l = b.type === b.elementType ? h : Lg(b.type, h);
    g.props = l;
    q = b.pendingProps;
    r = g.context;
    k = c.contextType;
    "object" === typeof k && null !== k ? k = Vg(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
    var y = c.getDerivedStateFromProps;
    (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && qh(b, g, d, k);
    $g = false;
    r = b.memoizedState;
    g.state = r;
    gh(b, d, g, e);
    var n = b.memoizedState;
    h !== q || r !== n || Wf.current || $g ? ("function" === typeof y && (kh(b, c, y, d), n = b.memoizedState), (l = $g || oh(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return kj(a, b, c, d, f, e);
}
function kj(a, b, c, d, e, f) {
  hj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g)
    return e && dg(b, c, false), $i(a, b, f);
  d = b.stateNode;
  Xi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Bh(b, a.child, null, f), b.child = Bh(b, null, h, f)) : Yi(a, b, h, f);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function lj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  Ih(a, b.containerInfo);
}
function mj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Yi(a, b, c, d);
  return b.child;
}
var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
function oj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function pj(a, b, c) {
  var d = b.pendingProps, e = M.current, f = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h)
    f = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState)
    e |= 1;
  G(M, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a))
      return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = qj(g, d, 0, null), a = Ah(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = oj(c), b.memoizedState = nj, a) : rj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h))
    return sj(a, b, g, d, h, e, c);
  if (f) {
    f = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = wh(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f = wh(h, f) : (f = Ah(f, g, c, null), f.flags |= 2);
    f.return = b;
    d.return = b;
    d.sibling = f;
    b.child = d;
    d = f;
    f = b.child;
    g = a.child.memoizedState;
    g = null === g ? oj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f.memoizedState = g;
    f.childLanes = a.childLanes & ~c;
    b.memoizedState = nj;
    return d;
  }
  f = a.child;
  a = f.sibling;
  d = wh(f, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function rj(a, b) {
  b = qj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function tj(a, b, c, d) {
  null !== d && Jg(d);
  Bh(b, a.child, null, c);
  a = rj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function sj(a, b, c, d, e, f, g) {
  if (c) {
    if (b.flags & 256)
      return b.flags &= -257, d = Li(Error(p(422))), tj(a, b, g, d);
    if (null !== b.memoizedState)
      return b.child = a.child, b.flags |= 128, null;
    f = d.fallback;
    e = b.mode;
    d = qj({ mode: "visible", children: d.children }, e, 0, null);
    f = Ah(f, e, g, null);
    f.flags |= 2;
    d.return = b;
    f.return = b;
    d.sibling = f;
    b.child = d;
    0 !== (b.mode & 1) && Bh(b, a.child, null, g);
    b.child.memoizedState = oj(g);
    b.memoizedState = nj;
    return f;
  }
  if (0 === (b.mode & 1))
    return tj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d)
      var h = d.dgst;
    d = h;
    f = Error(p(419));
    d = Li(f, d, void 0);
    return tj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (Ug || h) {
    d = R;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f.retryLane && (f.retryLane = e, Zg(a, e), mh(d, a, e, -1));
    }
    uj();
    d = Li(Error(p(421)));
    return tj(a, b, g, d);
  }
  if ("$?" === e.data)
    return b.flags |= 128, b.child = a.child, b = vj.bind(null, a), e._reactRetry = b, null;
  a = f.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = rj(b, d.children);
  b.flags |= 4096;
  return b;
}
function wj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  Sg(a.return, b, c);
}
function xj(a, b, c, d, e) {
  var f = a.memoizedState;
  null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
}
function yj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f = d.tail;
  Yi(a, b, d.children, c);
  d = M.current;
  if (0 !== (d & 2))
    d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128))
      a:
        for (a = b.child; null !== a; ) {
          if (13 === a.tag)
            null !== a.memoizedState && wj(a, c, b);
          else if (19 === a.tag)
            wj(a, c, b);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b)
            break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b)
              break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
    d &= 1;
  }
  G(M, d);
  if (0 === (b.mode & 1))
    b.memoizedState = null;
  else
    switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; )
          a = c.alternate, null !== a && null === Mh(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        xj(b, false, e, c, f);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Mh(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        xj(b, true, c, null, f);
        break;
      case "together":
        xj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
  return b.child;
}
function jj(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function $i(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  hh |= b.lanes;
  if (0 === (c & b.childLanes))
    return null;
  if (null !== a && b.child !== a.child)
    throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = wh(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; )
      a = a.sibling, c = c.sibling = wh(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function zj(a, b, c) {
  switch (b.tag) {
    case 3:
      lj(b);
      Ig();
      break;
    case 5:
      Kh(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      Ih(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Mg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated)
          return G(M, M.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes))
          return pj(a, b, c);
        G(M, M.current & 1);
        a = $i(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(M, M.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d)
          return yj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(M, M.current);
      if (d)
        break;
      else
        return null;
    case 22:
    case 23:
      return b.lanes = 0, ej(a, b, c);
  }
  return $i(a, b, c);
}
var Aj, Bj, Cj, Dj;
Aj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag)
      a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Bj = function() {
};
Cj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    Hh(Eh.current);
    var f = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l in e)
      if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l])
        if ("style" === l) {
          var h = e[l];
          for (g in h)
            h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
        } else
          "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
    for (l in d) {
      var k = d[l];
      h = null != e ? e[l] : void 0;
      if (d.hasOwnProperty(l) && k !== h && (null != k || null != h))
        if ("style" === l)
          if (h) {
            for (g in h)
              !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
            for (g in k)
              k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
          } else
            c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
        else
          "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
    }
    c && (f = f || []).push("style", c);
    var l = f;
    if (b.updateQueue = l)
      b.flags |= 4;
  }
};
Dj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Ej(a, b) {
  if (!I)
    switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; )
          null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; )
          null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b)
    for (var e = a.child; null !== e; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else
    for (e = a.child; null !== e; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Fj(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      Jh();
      E(Wf);
      E(H);
      Oh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child)
        Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Gj(zg), zg = null));
      Bj(a, b);
      S(b);
      return null;
    case 5:
      Lh(b);
      var e = Hh(Gh.current);
      c = b.type;
      if (null !== a && null != b.stateNode)
        Cj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode)
            throw Error(p(166));
          S(b);
          return null;
        }
        a = Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++)
                D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f), D("invalid", d);
          }
          ub(c, f);
          e = null;
          for (var g in f)
            if (f.hasOwnProperty(g)) {
              var h = f[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
            }
          switch (c) {
            case "input":
              Va(d);
              db(d, f, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          Aj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++)
                  D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f in h)
              if (h.hasOwnProperty(f)) {
                var k = h[f];
                "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
              }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f = d.value;
                null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode)
        Dj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode)
          throw Error(p(166));
        c = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f = d.nodeValue !== c) {
            if (a = xg, null !== a)
              switch (a.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
              }
          }
          f && (b.flags |= 4);
        } else
          d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(M);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128))
          Hg(), Ig(), b.flags |= 98560, f = false;
        else if (f = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f)
              throw Error(p(318));
            f = b.memoizedState;
            f = null !== f ? f.dehydrated : null;
            if (!f)
              throw Error(p(317));
            f[Of] = b;
          } else
            Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f = false;
        } else
          null !== zg && (Gj(zg), zg = null), f = true;
        if (!f)
          return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128))
        return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (M.current & 1) ? 0 === T && (T = 3) : uj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return Jh(), Bj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return Rg(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(M);
      f = b.memoizedState;
      if (null === f)
        return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f.rendering;
      if (null === g)
        if (d)
          Ej(f, false);
        else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128))
            for (a = b.child; null !== a; ) {
              g = Mh(a);
              if (null !== g) {
                b.flags |= 128;
                Ej(f, false);
                d = g.updateQueue;
                null !== d && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c;
                for (c = b.child; null !== c; )
                  f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                G(M, M.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
          null !== f.tail && B() > Hj && (b.flags |= 128, d = true, Ej(f, false), b.lanes = 4194304);
        }
      else {
        if (!d)
          if (a = Mh(g), null !== a) {
            if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Ej(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I)
              return S(b), null;
          } else
            2 * B() - f.renderingStartTime > Hj && 1073741824 !== c && (b.flags |= 128, d = true, Ej(f, false), b.lanes = 4194304);
        f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
      }
      if (null !== f.tail)
        return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = M.current, G(M, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Ij(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (gj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Jj(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return Jh(), E(Wf), E(H), Oh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Lh(b), null;
    case 13:
      E(M);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate)
          throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(M), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = false, U = false, Lj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Mj(a, b) {
  var c = a.ref;
  if (null !== c)
    if ("function" === typeof c)
      try {
        c(null);
      } catch (d) {
        W(a, b, d);
      }
    else
      c.current = null;
}
function Nj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Oj = false;
function Pj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a)
      var c = { start: a.selectionStart, end: a.selectionEnd };
    else
      a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e = d.anchorOffset, f = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f.nodeType;
          } catch (F) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
          b:
            for (; ; ) {
              for (var y; ; ) {
                q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                3 === q.nodeType && (g += q.nodeValue.length);
                if (null === (y = q.firstChild))
                  break;
                r = q;
                q = y;
              }
              for (; ; ) {
                if (q === a)
                  break b;
                r === c && ++l === e && (h = g);
                r === f && ++m === d && (k = g);
                if (null !== (y = q.nextSibling))
                  break;
                q = r;
                r = q.parentNode;
              }
              q = y;
            }
          c = -1 === h || -1 === k ? null : { start: h, end: k };
        } else
          c = null;
      }
    c = c || { start: 0, end: 0 };
  } else
    c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; )
    if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a)
      a.return = b, V = a;
    else
      for (; null !== V; ) {
        b = V;
        try {
          var n = b.alternate;
          if (0 !== (b.flags & 1024))
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Lg(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
        } catch (F) {
          W(b, b.return, F);
        }
        a = b.sibling;
        if (null !== a) {
          a.return = b.return;
          V = a;
          break;
        }
        V = b.return;
      }
  n = Oj;
  Oj = false;
  return n;
}
function Qj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f = e.destroy;
        e.destroy = void 0;
        void 0 !== f && Nj(b, c, f);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Rj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Sj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Tj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Tj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Uj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Vj(a) {
  a:
    for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Uj(a.return))
          return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2)
          continue a;
        if (null === a.child || 4 === a.tag)
          continue a;
        else
          a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2))
        return a.stateNode;
    }
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d)
    a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a))
    for (Wj(a, b, c), a = a.sibling; null !== a; )
      Wj(a, b, c), a = a.sibling;
}
function Xj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d)
    a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a))
    for (Xj(a, b, c), a = a.sibling; null !== a; )
      Xj(a, b, c), a = a.sibling;
}
var X = null, Yj = false;
function Zj(a, b, c) {
  for (c = c.child; null !== c; )
    ak(a, b, c), c = c.sibling;
}
function ak(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount)
    try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
  switch (c.tag) {
    case 5:
      U || Mj(c, b);
    case 6:
      var d = X, e = Yj;
      X = null;
      Zj(a, b, c);
      X = d;
      Yj = e;
      null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Yj;
      X = c.stateNode.containerInfo;
      Yj = true;
      Zj(a, b, c);
      X = d;
      Yj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f = e, g = f.destroy;
          f = f.tag;
          void 0 !== g && (0 !== (f & 2) ? Nj(c, b, g) : 0 !== (f & 4) && Nj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Zj(a, b, c);
      break;
    case 1:
      if (!U && (Mj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount))
        try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W(c, b, h);
        }
      Zj(a, b, c);
      break;
    case 21:
      Zj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Zj(a, b, c), U = d) : Zj(a, b, c);
      break;
    default:
      Zj(a, b, c);
  }
}
function bk(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Lj());
    b.forEach(function(b2) {
      var d = ck.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function dk(a, b) {
  var c = b.deletions;
  if (null !== c)
    for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f = a, g = b, h = g;
        a:
          for (; null !== h; ) {
            switch (h.tag) {
              case 5:
                X = h.stateNode;
                Yj = false;
                break a;
              case 3:
                X = h.stateNode.containerInfo;
                Yj = true;
                break a;
              case 4:
                X = h.stateNode.containerInfo;
                Yj = true;
                break a;
            }
            h = h.return;
          }
        if (null === X)
          throw Error(p(160));
        ak(f, g, e);
        X = null;
        Yj = false;
        var k = e.alternate;
        null !== k && (k.return = null);
        e.return = null;
      } catch (l) {
        W(e, b, l);
      }
    }
  if (b.subtreeFlags & 12854)
    for (b = b.child; null !== b; )
      ek(b, a), b = b.sibling;
}
function ek(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b, a);
      fk(a);
      if (d & 4) {
        try {
          Qj(3, a, a.return), Rj(3, a);
        } catch (t) {
          W(a, a.return, t);
        }
        try {
          Qj(5, a, a.return);
        } catch (t) {
          W(a, a.return, t);
        }
      }
      break;
    case 1:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      break;
    case 5:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t) {
          W(a, a.return, t);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
        a.updateQueue = null;
        if (null !== k)
          try {
            "input" === h && "radio" === f.type && null != f.name && ab(e, f);
            vb(h, g);
            var l = vb(h, f);
            for (g = 0; g < k.length; g += 2) {
              var m = k[g], q = k[g + 1];
              "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
            }
            switch (h) {
              case "input":
                bb(e, f);
                break;
              case "textarea":
                ib(e, f);
                break;
              case "select":
                var r = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f.multiple;
                var y = f.value;
                null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                  e,
                  !!f.multiple,
                  f.defaultValue,
                  true
                ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
            }
            e[Pf] = f;
          } catch (t) {
            W(a, a.return, t);
          }
      }
      break;
    case 6:
      dk(b, a);
      fk(a);
      if (d & 4) {
        if (null === a.stateNode)
          throw Error(p(162));
        e = a.stateNode;
        f = a.memoizedProps;
        try {
          e.nodeValue = f;
        } catch (t) {
          W(a, a.return, t);
        }
      }
      break;
    case 3:
      dk(b, a);
      fk(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated)
        try {
          bd(b.containerInfo);
        } catch (t) {
          W(a, a.return, t);
        }
      break;
    case 4:
      dk(b, a);
      fk(a);
      break;
    case 13:
      dk(b, a);
      fk(a);
      e = a.child;
      e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (gk = B()));
      d & 4 && bk(a);
      break;
    case 22:
      m = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l = U) || m, dk(b, a), U = l) : dk(b, a);
      fk(a);
      if (d & 8192) {
        l = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1))
          for (V = a, m = a.child; null !== m; ) {
            for (q = V = m; null !== V; ) {
              r = V;
              y = r.child;
              switch (r.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qj(4, r, r.return);
                  break;
                case 1:
                  Mj(r, r.return);
                  var n = r.stateNode;
                  if ("function" === typeof n.componentWillUnmount) {
                    d = r;
                    c = r.return;
                    try {
                      b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                    } catch (t) {
                      W(d, c, t);
                    }
                  }
                  break;
                case 5:
                  Mj(r, r.return);
                  break;
                case 22:
                  if (null !== r.memoizedState) {
                    hk(q);
                    continue;
                  }
              }
              null !== y ? (y.return = r, V = y) : hk(q);
            }
            m = m.sibling;
          }
        a:
          for (m = null, q = a; ; ) {
            if (5 === q.tag) {
              if (null === m) {
                m = q;
                try {
                  e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                } catch (t) {
                  W(a, a.return, t);
                }
              }
            } else if (6 === q.tag) {
              if (null === m)
                try {
                  q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                } catch (t) {
                  W(a, a.return, t);
                }
            } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
              q.child.return = q;
              q = q.child;
              continue;
            }
            if (q === a)
              break a;
            for (; null === q.sibling; ) {
              if (null === q.return || q.return === a)
                break a;
              m === q && (m = null);
              q = q.return;
            }
            m === q && (m = null);
            q.sibling.return = q.return;
            q = q.sibling;
          }
      }
      break;
    case 19:
      dk(b, a);
      fk(a);
      d & 4 && bk(a);
      break;
    case 21:
      break;
    default:
      dk(
        b,
        a
      ), fk(a);
  }
}
function fk(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Uj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f = Vj(a);
          Xj(a, f, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Vj(a);
          Wj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k) {
      W(a, a.return, k);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function ik(a, b, c) {
  V = a;
  jk(a, b, c);
}
function jk(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Kj;
      if (!g) {
        var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
        h = Kj;
        var l = U;
        Kj = g;
        if ((U = k) && !l)
          for (V = e; null !== V; )
            g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? kk(e) : null !== k ? (k.return = g, V = k) : kk(e);
        for (; null !== f; )
          V = f, jk(f, b, c), f = f.sibling;
        V = e;
        Kj = h;
        U = l;
      }
      lk(a, b, c);
    } else
      0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : lk(a, b, c);
  }
}
function lk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772))
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Rj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U)
                if (null === c)
                  d.componentDidMount();
                else {
                  var e = b.elementType === b.type ? c.memoizedProps : Lg(b.type, c.memoizedProps);
                  d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
              var f = b.updateQueue;
              null !== f && ih(b, f, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child)
                  switch (b.child.tag) {
                    case 5:
                      c = b.child.stateNode;
                      break;
                    case 1:
                      c = b.child.stateNode;
                  }
                ih(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k.autoFocus && c.focus();
                    break;
                  case "img":
                    k.src && (c.src = k.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l = b.alternate;
                if (null !== l) {
                  var m = l.memoizedState;
                  if (null !== m) {
                    var q = m.dehydrated;
                    null !== q && bd(q);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
        U || b.flags & 512 && Sj(b);
      } catch (r) {
        W(b, b.return, r);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function hk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Rj(4, b);
          } catch (k) {
            W(b, c, k);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k) {
              W(b, e, k);
            }
          }
          var f = b.return;
          try {
            Sj(b);
          } catch (k) {
            W(b, f, k);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Sj(b);
          } catch (k) {
            W(b, g, k);
          }
      }
    } catch (k) {
      W(b, b.return, k);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var mk = Math.ceil, nk = ua.ReactCurrentDispatcher, ok = ua.ReactCurrentOwner, pk = ua.ReactCurrentBatchConfig, K = 0, R = null, Y = null, Z = 0, gj = 0, fj = Uf(0), T = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = Infinity, vk = null, Pi = false, Qi = null, Si = null, wk = false, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
function L() {
  return 0 !== (K & 6) ? B() : -1 !== Bk ? Bk : Bk = B();
}
function lh(a) {
  if (0 === (a.mode & 1))
    return 1;
  if (0 !== (K & 2) && 0 !== Z)
    return Z & -Z;
  if (null !== Kg.transition)
    return 0 === Ck && (Ck = yc()), Ck;
  a = C;
  if (0 !== a)
    return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function mh(a, b, c, d) {
  if (50 < zk)
    throw zk = 0, Ak = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== R)
    a === R && (0 === (K & 2) && (rk |= c), 4 === T && Dk(a, Z)), Ek(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Hj = B() + 500, fg && jg());
}
function Ek(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === R ? Z : 0);
  if (0 === d)
    null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b)
      0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf(function() {
        0 === (K & 6) && jg();
      }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Gk(c, Hk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Hk(a, b) {
  Bk = -1;
  Ck = 0;
  if (0 !== (K & 6))
    throw Error(p(327));
  var c = a.callbackNode;
  if (Ik() && a.callbackNode !== c)
    return null;
  var d = uc(a, a === R ? Z : 0);
  if (0 === d)
    return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b)
    b = Jk(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f = Kk();
    if (R !== a || Z !== b)
      vk = null, Hj = B() + 500, Lk(a, b);
    do
      try {
        Mk();
        break;
      } catch (h) {
        Nk(a, h);
      }
    while (1);
    Qg();
    nk.current = f;
    K = e;
    null !== Y ? b = 0 : (R = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Ok(a, e)));
    if (1 === b)
      throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
    if (6 === b)
      Dk(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Pk(e) && (b = Jk(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Ok(a, f))), 1 === b))
        throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Qk(a, uk, vk);
          break;
        case 3:
          Dk(a, d);
          if ((d & 130023424) === d && (b = gk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0))
              break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              L();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 4:
          Dk(a, d);
          if ((d & 4194240) === d)
            break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 5:
          Qk(a, uk, vk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Ek(a, B());
  return a.callbackNode === c ? Hk.bind(null, a) : null;
}
function Ok(a, b) {
  var c = tk;
  a.current.memoizedState.isDehydrated && (Lk(a, b).flags |= 256);
  a = Jk(a, b);
  2 !== a && (b = uk, uk = c, null !== b && Gj(b));
  return a;
}
function Gj(a) {
  null === uk ? uk = a : uk.push.apply(uk, a);
}
function Pk(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c))
        for (var d = 0; d < c.length; d++) {
          var e = c[d], f = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f(), e))
              return false;
          } catch (g) {
            return false;
          }
        }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c)
      c.return = b, b = c;
    else {
      if (b === a)
        break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a)
          return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Dk(a, b) {
  b &= ~sk;
  b &= ~rk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Fk(a) {
  if (0 !== (K & 6))
    throw Error(p(327));
  Ik();
  var b = uc(a, 0);
  if (0 === (b & 1))
    return Ek(a, B()), null;
  var c = Jk(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Ok(a, d));
  }
  if (1 === c)
    throw c = qk, Lk(a, 0), Dk(a, b), Ek(a, B()), c;
  if (6 === c)
    throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Qk(a, uk, vk);
  Ek(a, B());
  return null;
}
function Rk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Hj = B() + 500, fg && jg());
  }
}
function Sk(a) {
  null !== xk && 0 === xk.tag && 0 === (K & 6) && Ik();
  var b = K;
  K |= 1;
  var c = pk.transition, d = C;
  try {
    if (pk.transition = null, C = 1, a)
      return a();
  } finally {
    C = d, pk.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Ij() {
  gj = fj.current;
  E(fj);
}
function Lk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y)
    for (c = Y.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          Jh();
          E(Wf);
          E(H);
          Oh();
          break;
        case 5:
          Lh(d);
          break;
        case 4:
          Jh();
          break;
        case 13:
          E(M);
          break;
        case 19:
          E(M);
          break;
        case 10:
          Rg(d.type._context);
          break;
        case 22:
        case 23:
          Ij();
      }
      c = c.return;
    }
  R = a;
  Y = a = wh(a.current, null);
  Z = gj = b;
  T = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (null !== Wg) {
    for (b = 0; b < Wg.length; b++)
      if (c = Wg[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e = d.next, f = c.pending;
        if (null !== f) {
          var g = f.next;
          f.next = e;
          d.next = g;
        }
        c.pending = d;
      }
    Wg = null;
  }
  return a;
}
function Nk(a, b) {
  do {
    var c = Y;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d = N.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Sh = false;
      }
      Rh = 0;
      P = O = N = null;
      Th = false;
      Uh = 0;
      ok.current = null;
      if (null === c || null === c.return) {
        T = 1;
        qk = b;
        Y = null;
        break;
      }
      a: {
        var f = a, g = c.return, h = c, k = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k && "object" === typeof k && "function" === typeof k.then) {
          var l = k, m = h, q = m.tag;
          if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
            var r = m.alternate;
            r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Vi(g);
          if (null !== y) {
            y.flags &= -257;
            Wi(y, g, h, f, b);
            y.mode & 1 && Ti(f, l, b);
            b = y;
            k = l;
            var n = b.updateQueue;
            if (null === n) {
              var t =  new Set();
              t.add(k);
              b.updateQueue = t;
            } else
              n.add(k);
            break a;
          } else {
            if (0 === (b & 1)) {
              Ti(f, l, b);
              uj();
              break a;
            }
            k = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J = Vi(g);
          if (null !== J) {
            0 === (J.flags & 65536) && (J.flags |= 256);
            Wi(J, g, h, f, b);
            Jg(Ki(k, h));
            break a;
          }
        }
        f = k = Ki(k, h);
        4 !== T && (T = 2);
        null === tk ? tk = [f] : tk.push(f);
        f = g;
        do {
          switch (f.tag) {
            case 3:
              f.flags |= 65536;
              b &= -b;
              f.lanes |= b;
              var x = Oi(f, k, b);
              fh(f, x);
              break a;
            case 1:
              h = k;
              var w = f.type, u = f.stateNode;
              if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Si || !Si.has(u)))) {
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var F = Ri(f, h, b);
                fh(f, F);
                break a;
              }
          }
          f = f.return;
        } while (null !== f);
      }
      Tk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a = nk.current;
  nk.current = ai;
  return null === a ? ai : a;
}
function uj() {
  if (0 === T || 3 === T || 2 === T)
    T = 4;
  null === R || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R, Z);
}
function Jk(a, b) {
  var c = K;
  K |= 2;
  var d = Kk();
  if (R !== a || Z !== b)
    vk = null, Lk(a, b);
  do
    try {
      Uk();
      break;
    } catch (e) {
      Nk(a, e);
    }
  while (1);
  Qg();
  K = c;
  nk.current = d;
  if (null !== Y)
    throw Error(p(261));
  R = null;
  Z = 0;
  return T;
}
function Uk() {
  for (; null !== Y; )
    Vk(Y);
}
function Mk() {
  for (; null !== Y && !cc(); )
    Vk(Y);
}
function Vk(a) {
  var b = Wk(a.alternate, a, gj);
  a.memoizedProps = a.pendingProps;
  null === b ? Tk(a) : Y = b;
  ok.current = null;
}
function Tk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Fj(c, b, gj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Jj(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a)
        a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Qk(a, b, c) {
  var d = C, e = pk.transition;
  try {
    pk.transition = null, C = 1, Xk(a, b, c, d);
  } finally {
    pk.transition = e, C = d;
  }
  return null;
}
function Xk(a, b, c, d) {
  do
    Ik();
  while (null !== xk);
  if (0 !== (K & 6))
    throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c)
    return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current)
    throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f = c.lanes | c.childLanes;
  Bc(a, f);
  a === R && (Y = R = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || wk || (wk = true, Gk(hc, function() {
    Ik();
    return null;
  }));
  f = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f) {
    f = pk.transition;
    pk.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    ok.current = null;
    Pj(a, c);
    ek(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    ik(c, a, e);
    dc();
    K = h;
    C = g;
    pk.transition = f;
  } else
    a.current = c;
  wk && (wk = false, xk = a, yk = e);
  f = a.pendingLanes;
  0 === f && (Si = null);
  mc(c.stateNode, d);
  Ek(a, B());
  if (null !== b)
    for (d = a.onRecoverableError, c = 0; c < b.length; c++)
      e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Pi)
    throw Pi = false, a = Qi, Qi = null, a;
  0 !== (yk & 1) && 0 !== a.tag && Ik();
  f = a.pendingLanes;
  0 !== (f & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (null !== xk) {
    var a = Dc(yk), b = pk.transition, c = C;
    try {
      pk.transition = null;
      C = 16 > a ? 16 : a;
      if (null === xk)
        var d = false;
      else {
        a = xk;
        xk = null;
        yk = 0;
        if (0 !== (K & 6))
          throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f = V, g = f.child;
          if (0 !== (V.flags & 16)) {
            var h = f.deletions;
            if (null !== h) {
              for (var k = 0; k < h.length; k++) {
                var l = h[k];
                for (V = l; null !== V; ) {
                  var m = V;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m, f);
                  }
                  var q = m.child;
                  if (null !== q)
                    q.return = m, V = q;
                  else
                    for (; null !== V; ) {
                      m = V;
                      var r = m.sibling, y = m.return;
                      Tj(m);
                      if (m === l) {
                        V = null;
                        break;
                      }
                      if (null !== r) {
                        r.return = y;
                        V = r;
                        break;
                      }
                      V = y;
                    }
                }
              }
              var n = f.alternate;
              if (null !== n) {
                var t = n.child;
                if (null !== t) {
                  n.child = null;
                  do {
                    var J = t.sibling;
                    t.sibling = null;
                    t = J;
                  } while (null !== t);
                }
              }
              V = f;
            }
          }
          if (0 !== (f.subtreeFlags & 2064) && null !== g)
            g.return = f, V = g;
          else
            b:
              for (; null !== V; ) {
                f = V;
                if (0 !== (f.flags & 2048))
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, f, f.return);
                  }
                var x = f.sibling;
                if (null !== x) {
                  x.return = f.return;
                  V = x;
                  break b;
                }
                V = f.return;
              }
        }
        var w = a.current;
        for (V = w; null !== V; ) {
          g = V;
          var u = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u)
            u.return = g, V = u;
          else
            b:
              for (g = w; null !== V; ) {
                h = V;
                if (0 !== (h.flags & 2048))
                  try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                if (h === g) {
                  V = null;
                  break b;
                }
                var F = h.sibling;
                if (null !== F) {
                  F.return = h.return;
                  V = F;
                  break b;
                }
                V = h.return;
              }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot)
          try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
        d = true;
      }
      return d;
    } finally {
      C = c, pk.transition = b;
    }
  }
  return false;
}
function Yk(a, b, c) {
  b = Ki(c, b);
  b = Oi(a, b, 1);
  a = dh(a, b, 1);
  b = L();
  null !== a && (Ac(a, 1, b), Ek(a, b));
}
function W(a, b, c) {
  if (3 === a.tag)
    Yk(a, a, c);
  else
    for (; null !== b; ) {
      if (3 === b.tag) {
        Yk(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {
          a = Ki(c, a);
          a = Ri(b, a, 1);
          b = dh(b, a, 1);
          a = L();
          null !== b && (Ac(b, 1, a), Ek(b, a));
          break;
        }
      }
      b = b.return;
    }
}
function Ui(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = L();
  a.pingedLanes |= a.suspendedLanes & c;
  R === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - gk ? Lk(a, 0) : sk |= c);
  Ek(a, b);
}
function Zk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = L();
  a = Zg(a, b);
  null !== a && (Ac(a, b, c), Ek(a, c));
}
function vj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Zk(a, c);
}
function ck(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Zk(a, c);
}
var Wk;
Wk = function(a, b, c) {
  if (null !== a)
    if (a.memoizedProps !== b.pendingProps || Wf.current)
      Ug = true;
    else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128))
        return Ug = false, zj(a, b, c);
      Ug = 0 !== (a.flags & 131072) ? true : false;
    }
  else
    Ug = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      jj(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      Tg(b, c);
      e = Xh(null, b, d, a, e, c);
      var f = bi();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b), e.updater = nh, b.stateNode = e, e._reactInternals = b, rh(b, d, a, c), b = kj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Yi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        jj(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = $k(d);
        a = Lg(d, a);
        switch (e) {
          case 0:
            b = dj(null, b, d, a, c);
            break a;
          case 1:
            b = ij(null, b, d, a, c);
            break a;
          case 11:
            b = Zi(null, b, d, a, c);
            break a;
          case 14:
            b = aj(null, b, d, Lg(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), dj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), ij(a, b, d, e, c);
    case 3:
      a: {
        lj(b);
        if (null === a)
          throw Error(p(387));
        d = b.pendingProps;
        f = b.memoizedState;
        e = f.element;
        bh(a, b);
        gh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f.isDehydrated)
          if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
            e = Ki(Error(p(423)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ki(Error(p(424)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else
            for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Ch(b, null, d, c), b.child = c; c; )
              c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = $i(a, b, c);
            break a;
          }
          Yi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Kh(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), hj(a, b), Yi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return pj(a, b, c);
    case 4:
      return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Bh(b, null, d, c) : Yi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), Zi(a, b, d, e, c);
    case 7:
      return Yi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f = b.memoizedProps;
        g = e.value;
        G(Mg, d._currentValue);
        d._currentValue = g;
        if (null !== f)
          if (He(f.value, g)) {
            if (f.children === e.children && !Wf.current) {
              b = $i(a, b, c);
              break a;
            }
          } else
            for (f = b.child, null !== f && (f.return = b); null !== f; ) {
              var h = f.dependencies;
              if (null !== h) {
                g = f.child;
                for (var k = h.firstContext; null !== k; ) {
                  if (k.context === d) {
                    if (1 === f.tag) {
                      k = ch(-1, c & -c);
                      k.tag = 2;
                      var l = f.updateQueue;
                      if (null !== l) {
                        l = l.shared;
                        var m = l.pending;
                        null === m ? k.next = k : (k.next = m.next, m.next = k);
                        l.pending = k;
                      }
                    }
                    f.lanes |= c;
                    k = f.alternate;
                    null !== k && (k.lanes |= c);
                    Sg(
                      f.return,
                      c,
                      b
                    );
                    h.lanes |= c;
                    break;
                  }
                  k = k.next;
                }
              } else if (10 === f.tag)
                g = f.type === b.type ? null : f.child;
              else if (18 === f.tag) {
                g = f.return;
                if (null === g)
                  throw Error(p(341));
                g.lanes |= c;
                h = g.alternate;
                null !== h && (h.lanes |= c);
                Sg(g, c, b);
                g = f.sibling;
              } else
                g = f.child;
              if (null !== g)
                g.return = f;
              else
                for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
              f = g;
            }
        Yi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, Tg(b, c), e = Vg(e), d = d(e), b.flags |= 1, Yi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Lg(d, b.pendingProps), e = Lg(d.type, e), aj(a, b, d, e, c);
    case 15:
      return cj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), jj(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, Tg(b, c), ph(b, d, e), rh(b, d, e, c), kj(null, b, d, true, a, c);
    case 19:
      return yj(a, b, c);
    case 22:
      return ej(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Gk(a, b) {
  return ac(a, b);
}
function al(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new al(a, b, c, d);
}
function bj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function $k(a) {
  if ("function" === typeof a)
    return bj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da)
      return 11;
    if (a === Ga)
      return 14;
  }
  return 2;
}
function wh(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function yh(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a)
    bj(a) && (g = 1);
  else if ("string" === typeof a)
    g = 5;
  else
    a:
      switch (a) {
        case ya:
          return Ah(c.children, e, f, b);
        case za:
          g = 8;
          e |= 8;
          break;
        case Aa:
          return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
        case Ea:
          return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
        case Fa:
          return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
        case Ia:
          return qj(c, e, f, b);
        default:
          if ("object" === typeof a && null !== a)
            switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
          throw Error(p(130, null == a ? a : typeof a, ""));
      }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f;
  return b;
}
function Ah(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function qj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function xh(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function zh(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function bl(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a, b, c, d, e, f, g, h, k) {
  a = new bl(a, b, c, h, k);
  1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
  f = Bg(3, null, null, b);
  a.current = f;
  f.stateNode = a;
  f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  ah(f);
  return a;
}
function dl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function el(a) {
  if (!a)
    return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag)
      throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c))
      return bg(a, c, b);
  }
  return b;
}
function fl(a, b, c, d, e, f, g, h, k) {
  a = cl(c, d, true, a, e, f, g, h, k);
  a.context = el(null);
  c = a.current;
  d = L();
  e = lh(c);
  f = ch(d, e);
  f.callback = void 0 !== b && null !== b ? b : null;
  dh(c, f, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Ek(a, d);
  return a;
}
function gl(a, b, c, d) {
  var e = b.current, f = L(), g = lh(e);
  c = el(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = ch(f, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = dh(e, b, g);
  null !== a && (mh(a, e, g, f), eh(a, e, g));
  return g;
}
function hl(a) {
  a = a.current;
  if (!a.child)
    return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function il(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function jl(a, b) {
  il(a, b);
  (a = a.alternate) && il(a, b);
}
function kl() {
  return null;
}
var ll = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ml(a) {
  this._internalRoot = a;
}
nl.prototype.render = ml.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b)
    throw Error(p(409));
  gl(a, b, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Sk(function() {
      gl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function nl(a) {
  this._internalRoot = a;
}
nl.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++)
      ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function pl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function ql() {
}
function rl(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f = d;
      d = function() {
        var a2 = hl(g);
        f.call(a2);
      };
    }
    var g = fl(b, d, a, 0, null, false, false, "", ql);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Sk();
    return g;
  }
  for (; e = a.lastChild; )
    a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = hl(k);
      h.call(a2);
    };
  }
  var k = cl(a, 0, false, null, null, false, false, "", ql);
  a._reactRootContainer = k;
  a[uf] = k.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Sk(function() {
    gl(b, k, c, d);
  });
  return k;
}
function sl(a, b, c, d, e) {
  var f = c._reactRootContainer;
  if (f) {
    var g = f;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = hl(g);
        h.call(a2);
      };
    }
    gl(b, g, a, e);
  } else
    g = rl(c, b, a, e, d);
  return hl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Ek(b, B()), 0 === (K & 6) && (Hj = B() + 500, jg()));
      }
      break;
    case 13:
      Sk(function() {
        var b2 = Zg(a, 1);
        if (null !== b2) {
          var c2 = L();
          mh(b2, a, 1, c2);
        }
      }), jl(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = Zg(a, 134217728);
    if (null !== b) {
      var c = L();
      mh(b, a, 134217728, c);
    }
    jl(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = lh(a), c = Zg(a, b);
    if (null !== c) {
      var d = L();
      mh(c, a, b, d);
    }
    jl(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; )
          c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e)
              throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Rk;
Hb = Sk;
var tl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Rk] }, ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber)
    try {
      kc = wl.inject(vl), lc = wl;
    } catch (a) {
    }
}
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
var createPortal = reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!ol(b))
    throw Error(p(200));
  return dl(a, b, null, c);
};
var createRoot$1 = reactDom_production_min.createRoot = function(a, b) {
  if (!ol(a))
    throw Error(p(299));
  var c = false, d = "", e = ll;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = cl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ml(b);
};
var findDOMNode = reactDom_production_min.findDOMNode = function(a) {
  if (null == a)
    return null;
  if (1 === a.nodeType)
    return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render)
      throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
var flushSync = reactDom_production_min.flushSync = function(a) {
  return Sk(a);
};
var hydrate = reactDom_production_min.hydrate = function(a, b, c) {
  if (!pl(b))
    throw Error(p(200));
  return sl(null, a, b, true, c);
};
var hydrateRoot$1 = reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!ol(a))
    throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f = "", g = ll;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = fl(b, null, a, 1, null != c ? c : null, e, false, f, g);
  a[uf] = b.current;
  sf(a);
  if (d)
    for (a = 0; a < d.length; a++)
      c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
        c,
        e
      );
  return new nl(b);
};
var render = reactDom_production_min.render = function(a, b, c) {
  if (!pl(b))
    throw Error(p(200));
  return sl(null, a, b, false, c);
};
var unmountComponentAtNode = reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!pl(a))
    throw Error(p(40));
  return a._reactRootContainer ? (Sk(function() {
    sl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
var unstable_batchedUpdates = reactDom_production_min.unstable_batchedUpdates = Rk;
var unstable_renderSubtreeIntoContainer = reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!pl(c))
    throw Error(p(200));
  if (null == a || void 0 === a._reactInternals)
    throw Error(p(38));
  return sl(a, b, c, false, d);
};
var version = reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";

var reactDom = reactDom$1.exports;

"use strict";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  if ("production" !== "production") {
    throw new Error("^_^");
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
if ("production" === "production") {
  checkDCE();
  reactDom$1.exports = reactDom_production_min;
} else {
  module.exports = require("./cjs/react-dom.development.js");
}

var reactDomExports = reactDom$1.exports;
const index = /*@__PURE__*/getDefaultExportFromCjs(reactDomExports);

var hydrateRoot;
var createRoot;
"use strict";
var m = reactDomExports;
if ("production" === "production") {
  createRoot = client.createRoot = m.createRoot;
  hydrateRoot = client.hydrateRoot = m.hydrateRoot;
} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}

/** @typedef {import('../playwright-ct-core/types/component').Component} Component */
/** @typedef {import('../playwright-ct-core/types/component').JsxComponent} JsxComponent */
/** @typedef {import('../playwright-ct-core/types/component').ObjectComponent} ObjectComponent */
/** @typedef {import('react').FunctionComponent} FrameworkComponent */

/** @type {Map<string, () => Promise<FrameworkComponent>>} */
const __pwLoaderRegistry = new Map();
/** @type {Map<string, FrameworkComponent>} */
const __pwRegistry = new Map();
/** @type {Map<Element, import('react-dom/client').Root>} */
const __pwRootRegistry = new Map();

/**
 * @param {{[key: string]: () => Promise<FrameworkComponent>}} components
 */
function pwRegister(components) {
  for (const [name, value] of Object.entries(components))
    __pwLoaderRegistry.set(name, value);
}

/**
 * @param {Component} component
 * @returns {component is JsxComponent | ObjectComponent}
 */
function isComponent(component) {
  return !(typeof component !== 'object' || Array.isArray(component));
}

/**
 * @param {Component} component
 */
async function __pwResolveComponent(component) {
  if (!isComponent(component))
    return;

  let componentFactory = __pwLoaderRegistry.get(component.type);
  if (!componentFactory) {
    // Lookup by shorthand.
    for (const [name, value] of __pwLoaderRegistry) {
      if (component.type.endsWith(`_${name}`)) {
        componentFactory = value;
        break;
      }
    }
  }

  if (!componentFactory && component.type[0].toUpperCase() === component.type[0])
    throw new Error(`Unregistered component: ${component.type}. Following components are registered: ${[...__pwRegistry.keys()]}`);

  if (componentFactory)
    __pwRegistry.set(component.type, await componentFactory());

  if ('children' in component)
    await Promise.all(component.children.map(child => __pwResolveComponent(child)));
}

/**
 * @param {Component} component
 */
function __pwRender(component) {
  if (!isComponent(component))
    return component;

  const componentFunc = __pwRegistry.get(component.type);

  if (component.kind !== 'jsx')
    throw new Error('Object mount notation is not supported');

  return reactExports.createElement(componentFunc || component.type, component.props, ...component.children.map(child => {
    if (typeof child === 'string')
      return child;
    return __pwRender(child);
  }).filter(child => {
    if (typeof child === 'string')
      return !!child.trim();
    return true;
  }));
}

window.playwrightMount = async (component, rootElement, hooksConfig) => {
  await __pwResolveComponent(component);
  let App = () => __pwRender(component);
  for (const hook of window.__pw_hooks_before_mount || []) {
    const wrapper = await hook({ App, hooksConfig });
    if (wrapper)
      App = () => wrapper;
  }

  if (__pwRootRegistry.has(rootElement)) {
    throw new Error(
        'Attempting to mount a component into an container that already has a React root'
    );
  }

  const root = createRoot(rootElement);
  __pwRootRegistry.set(rootElement, root);
  root.render(App());

  for (const hook of window.__pw_hooks_after_mount || [])
    await hook({ hooksConfig });
};

window.playwrightUnmount = async rootElement => {
  const root = __pwRootRegistry.get(rootElement);
  if (root === undefined)
    throw new Error('Component was not mounted');

  root.unmount();
  __pwRootRegistry.delete(rootElement);
};

window.playwrightUpdate = async (rootElement, component) => {
  await __pwResolveComponent(component);
  const root = __pwRootRegistry.get(rootElement);
  if (root === undefined)
    throw new Error('Component was not mounted');

  root.render(__pwRender(/** @type {Component} */ (component)));
};

const _Users_frideskarseth_Documents_Kode_designsystem_packages_components_components_elvis_accordion_react_js_Accordion = () => __vitePreload(() => import('./react-59d0e111.js'),true?["assets/react-59d0e111.js","assets/index-ff053e39.js"]:void 0).then((mod) => mod.Accordion);
const _Users_frideskarseth_Documents_Kode_designsystem_packages_components_components_elvis_chip_react_js_Chip = () => __vitePreload(() => import('./react-cbebdb8c.js'),true?["assets/react-cbebdb8c.js","assets/index-ff053e39.js"]:void 0).then((mod) => mod.Chip);
const _Users_frideskarseth_Documents_Kode_designsystem_packages_components_components_elvis_datepicker_react_js_Datepicker = () => __vitePreload(() => import('./react-b750fe8c.js'),true?["assets/react-b750fe8c.js","assets/index-ff053e39.js"]:void 0).then((mod) => mod.Datepicker);
pwRegister({ _Users_frideskarseth_Documents_Kode_designsystem_packages_components_components_elvis_accordion_react_js_Accordion,
  _Users_frideskarseth_Documents_Kode_designsystem_packages_components_components_elvis_chip_react_js_Chip,
  _Users_frideskarseth_Documents_Kode_designsystem_packages_components_components_elvis_datepicker_react_js_Datepicker });

export { React as R, reactDomExports as a, getDefaultExportFromCjs as g, reactExports as r };
//# sourceMappingURL=index-c3e2bc00.js.map
