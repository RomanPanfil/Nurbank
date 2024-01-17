const FARBA = {
  WH: window.innerHeight,

  WW: document.documentElement.clientWidth,

  isTouch: 'ontouchstart' in window || navigator.msMaxTouchPoints,

  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      domScript.onload = callback;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  $('.ui-select, .ui-checkbox').styler();

  // скролл до формы
  (function () {
    if (!document.querySelector('.request-btn') || !document.querySelector('.application-form')) return
  
    document.querySelectorAll('.request-btn').forEach((el) => {
      el.addEventListener('click', (e) => {      
        e.preventDefault()
        document.querySelector('.application-form').scrollIntoView({behavior: "smooth"})
      })
    })
  
  }());
  
  // переключение табов
  (function() {
    if (!document.querySelector('.ui-tab') || !document.querySelector('.ui-tabs-wrapper')) return

    const tabs = document.querySelectorAll('.ui-tab');
    const tabsPanel = document.querySelectorAll('.ui-tabs-wrapper');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        
        let tabId = this.getAttribute('data-tab');
        
        tabs.forEach(item => {
          item.classList.remove('active');
        });
        
        this.classList.add('active');

        tabsPanel.forEach(panel => {
        if(panel.id === tabId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      });
    });
  })();

  // маска ввода номера телефона
  function initMask() {
    const inputs = document.querySelectorAll('.ux-phonemask'); 
  
    if(!inputs.length) return

    inputs.forEach(element => {
      IMask(element, {
        mask: [          
          {
            mask: '+{7} (000) 000 00 00',
            startsWith: '7',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+0000000000000',
            startsWith: '',
            country: 'unknown'
          }
        ],
        dispatch: (appended, dynamicMasked) => {
          const number = (dynamicMasked.value + appended).replace(/\D/g,'');
      
          return dynamicMasked.compiledMasks.find(m => number.indexOf(m.startsWith) === 0);
        }
      })
    })
  };

  initMask();

})