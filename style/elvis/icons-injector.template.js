(function(){
    replaceIcons();
    let mo = new MutationObserver(function(mutations){
        for(let i = 0; i < mutations.length; i++) {
            if(mutations[i].target.className && mutations[i].target.className.indexOf('e-icon' > -1)) {
                replaceIcons();
                break;
            }
        }
    });
    
    mo.observe(document.body, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
    });



    function replaceIcons() {
        window.document.querySelectorAll('[class*="e-icon"]').forEach(function(element){
            if(!element.innerHTML) { 
                element.innerHTML = getIcon(element.classList);
            }
        });
    }



    function getIcon(classList) {
        for(let i = 0; i < classList.length; i++) {
            if(icons[classList[i]]) {
                let icon = '<img width="100%" height="100%" aria-hidden="true" src="' + icons[classList[i]]  + '"></img>';
                if(icon.indexOf('viewBox') > -1){
                    return icon;
                }
                return icon.replace("%3csvg ", "%3csvg viewBox='0 0 24 24' ");
            }
        }
        console.error("Elvis - No icon found for classes: ", classList);
        return 'No icon found!';
    }

    //[[INJECT_ICONS]]
})();