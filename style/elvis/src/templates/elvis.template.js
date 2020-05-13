document.addEventListener("DOMContentLoaded", function(){
    let DEBUG = false;
    if(window.location.href.indexOf('#debug') > -1) {
      DEBUG = true;
    }
    
    function outlineFix() {
      if(DEBUG){
        return;
      }
      document.body.classList.add('e-no-outline');
      document.documentElement.addEventListener('keyup', function(e) {
        if (e.keyCode === 9) {
          document.body.classList.remove('e-no-outline');
        }
      });

      document.documentElement.addEventListener('click', function (event) {
          document.body.classList.add('e-no-outline');
      }, false);
    }
    outlineFix();
    


    let mo = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation) {            
            injectIconIfEligible(mutation.target, mutation);
        });
    });


    function injectIconIfEligible(node, mutation) {
        if(!node || !node.className || node.className.indexOf('e-icon') === -1) {
            return; 
        }

        if(mutation.type === 'attributes') {
            node.innerHTML = '';
            node.appendChild(getIcon(node.classList));
        }
    }

    mo.observe(document.documentElement, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
    });

    function getUniqueIdentifier(classList) {
      let id = '';
      for(let i = 0; i < classList.length; i++ ) {
        id += classList[i];
      }
      return id;
    }

    function getIcon(classList) {
        for(let i = 0; i < classList.length; i++) {
            if(!icons[classList[i]]) {
                continue;
            }
            
            let icon = icons[classList[i]];                
            
            if(icon.indexOf('viewBox') === -1){
                icon.replace("%3csvg ", "%3csvg viewBox='0 0 64 64' ");
            }
              
            icon = setCorrectColor(classList, icon);

            let imgNode = document.createElement('IMG');
            imgNode.width = '100%';
            imgNode.height = '100%';
            imgNode.setAttribute('aria-hidden', 'true');
            imgNode.src = icon;
            imgNode.setAttribute('e-id', getUniqueIdentifier(classList));
            return imgNode;
            
        }
        console.error("Elvis - No icon found for classes: ", classList);
        return 'No icon found!';
    } 

    function setCorrectColor(classList, icon) {
        let fill;   

        if(classList.contains('e-icon--inverted')) {
          for(let i = 0; i < classList.length; i++) {
              // -full-color check can be removed when new icons have been added
              if((classList[i].indexOf("-filled-color") > -1) || (classList[i].indexOf("-full-color") > -1)) {
                  icon = icon.replace("fill='black'", "fillReplace");
              }
          };
          icon = icon.replace("fill='white'", "fillReplace");
          icon = icon.replace(/fill='([^']*)'/g, "fill='white'");
          icon = icon.replace(/fillReplace/g, "fill='black'");
          return icon;
        }

        if(classList.contains('e-icon--color-disabled')) {
            fill = colors['grey-30'].color;
        }

        if(classList.contains('e-icon--color-disabled-light')) {
            fill = colors['grey-05'].color;
        }
        
        if(JSON.stringify(classList).indexOf('e-icon--color-') > -1) {
              for(let i = 0; i < classList.length; i++) {
                  let color = classList[i].replace('e-icon--color-', '');
                  if(colors[color]){
                      fill = colors[color].color;
                  }
              }
        }

        if(fill) {
            fill = fill.replace('#', '%23');
            icon = icon.replace(/fill='([^']*)'/g, "fill='"+ fill +"'");
        }

        return icon;
    }

    colors = {
        'white': {
          color: '#FFF',
          contrastText: '#000',
        },  
        'black': {
          color: '#000',
          contrastText: '#fff',
        },  
        'grey': {
          color: '#262626',
          contrastText: '#fff',
        },  
        'grey-90': {
          color: '#3B3B3B',
          contrastText: '#fff',
        },  
        'grey-80': {
          color: '#515151',
          contrastText: '#fff',
        },  
        'grey-70': {
          color: '#676767',
          contrastText: '#fff',
        },  
        'grey-60': {
          color: '#7C7C7C',
          contrastText: '#000',
        },  
        'grey-50': {
          color: '#929292',
          contrastText: '#000',
        },  
        'grey-40': {
          color: '#A8A8A8',
          contrastText: '#000',
        },  
        'grey-30': {
          color: '#BDBDBD',
          contrastText: '#000',
        },  
        'grey-20': {
          color: '#D3D3D3',
          contrastText: '#000',
        },  
        'grey-10': {
          color: '#E9E9E9',
          contrastText: '#000',
        },  
        'grey-05': {
          color: '#F4F4F4',
          contrastText: '#000',
        },  
        'grey-02': {
          color: '#FAFAFA',
          contrastText: '#000',
        },  
        'green': {
          color: '#29D305',
          contrastText: '#000',
        }, 
        'yellow': {
          color: '#FFFF00',
          contrastText: '#000',
        },  
        'orange': {
          color: '#FFA000',
          contrastText: '#000',
        },  
        'red': {
          color: '#FF0000',
          contrastText: '#000',
        },  
        'green-apple': {
          color: '#21AC04',
          contrastText: '#000',
        },  
        'violet-grape': {
          color: '#490192',
          contrastText: '#fff',
        },  
        'blue-berry': {
          color: '#006DDB',
          contrastText: '#fff',
        },  
        'purple-plum': {
          color: '#B66DFF',
          contrastText: '#000',
        },  
        'orange-mango': {
          color: '#DB6D00',
          contrastText: '#000',
        },  
        'red-tomato': {
          color: '#B90202',
          contrastText: '#fff',
        },   
    }; 

    //[[INJECT_ICONS]]

    function replaceIcons() {
        window.document.querySelectorAll('[class*="e-icon"]').forEach(function(element){
            if(element.innerHTML) {
                // Uses e-id to avoid unnessesary changes to the DOM
                id = element.firstChild.getAttribute('e-id');
                let icon = getIcon(element.classList);
                if(!id || id + '' !== icon.getAttribute('e-id')){
                    element.innerHTML = '';
                    element.appendChild(icon);
                }
            }
            else {
                element.innerHTML = '';
                element.appendChild(getIcon(element.classList));
            }
            
            
        });
    }
    
    replaceIcons();

    // TODO: Remove this temporary fallback
    window.setInterval(function(){
        replaceIcons();
    }, 3000)
});