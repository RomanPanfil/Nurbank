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

        document.querySelectorAll('.application-form').forEach(el => {
          el.scrollIntoView({behavior: "smooth"})
        })

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

        tabs.forEach(el => {
          if(el.getAttribute('data-tab') === tabId) {
            el.classList.add('active');
          }
        })

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
    const phoneInputs = document.querySelectorAll('.ux-phonemask');
    const iinInputs = document.querySelectorAll('.ux-iin');
  
    if (phoneInputs.length) {
      phoneInputs.forEach(element => {
        IMask(element, {
          mask: '+{7} (000) 000-00-00',
          lazy: false,
          placeholderChar: '_'
        });
      });
    }
  
    if (iinInputs.length) {
      iinInputs.forEach(element => {
        IMask(element, {
          mask: '000000000000',
          lazy: false,
          placeholderChar: '_',  
        });
      });
    }
  }
  
  initMask();

  // Открытие попапа
  $(document).on("click", ".mfp-link", function () {
    var a = $(this);
    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in',
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function(){
            $('.mfp-wrap').addClass('not_delay');
            $('.mfp-popup').addClass('not_delay');
          },700);
  
          document.documentElement.style.overflow = 'hidden'
        },
  
        close: function() {
          document.documentElement.style.overflow = ''
        }
      }
    });
    return false;
  });

  $('.header .lang .active').click(function(){
    if($(this).closest('.lang').hasClass('open')){
      $(this).closest('.lang').removeClass('open');
    }
    else{
      $(this).closest('.lang').addClass('open');
    }
    return false;
  });

  // переключение табов контента
  (function() {
    const tabs = document.querySelectorAll('.content-tab');
    const tabContents = document.querySelectorAll('.tab-content');     

    function switchTab(event) {
      tabs.forEach(tab => tab.classList.remove('active'));
      event.currentTarget.classList.add('active');

      const tabValue = event.currentTarget.dataset.tab;
      // window.location.hash = tabValue; // добавляем якорь в URL

      tabContents.forEach(content => content.classList.remove('active'));

      const targetContent = document.querySelectorAll(`.tab-content[data-content="${tabValue}"]`);
      targetContent.forEach((content) => {
        content.classList.add('active');
      })
    }

    tabs.forEach(tab => tab.addEventListener('click', switchTab));

    // проверяем, есть ли якорь в URL при загрузке страницы
    window.onload = function() {
      const hash = window.location.hash.substring(1); // получаем якорь без '#'
      if (hash) {
        const tabToActivate = document.querySelector(`.content-tab[data-tab="${hash}"]`);
        if (tabToActivate) {
          tabToActivate.click(); // имитируем клик по табу
        }
      }
    };
})();


  // калькулятор
  $(function() {
    if (!document.querySelector('.lang .active a')) return
    
    let activeLanguage = document.querySelector('.lang .active a').textContent;
      
    var sliders = {
      zalog: {
        kzt: {
          sum: { val: 600000, step: 10000, min: 600000, max: 70000000 },
          period: { val: 6, step: 1, min: 6, max: 120 },
          add: { val: 30000, step: 5000, min: 0, max: 100000 },
          rates: {           
            with: { 12 : 0.25, 60: 0.216, 120: 0.22 },
            without: { 120: 0.29 },
          },
        },
      },
      bezzalogov: {
        kzt: {
          sum: { val: 150000, step: 10000, min: 150000, max: 7000000 },
          period: { val: 12, step: 6, min: 12, max: 60 },
          add: { val: 30000, step: 5000, min: 0, max: 100000 },
          rates: {          
            with: { 12 : 0.218, 60: 0.24 },
            without: { 60: 0.33 },
          },
        },
      },
      refinance: {
        kzt: {
          sum: { val: 150000, step: 10000, min: 150000, max: 7000000 },
          period: { val: 3, step: 3, min: 3, max: 60 },
          add: { val: 30000, step: 5000, min: 0, max: 100000 },
          rates: {           
            with: { 12 : 0.218, 60: 0.24 },
            without: { 60: 0.33 },
          },
        },
      },
    };
  
    function applyCalculator(formId) {
      function calculate() {
        var data = {},
          result = {},
          periods = [],
          withTax = data.rate = $('#' + formId + ' #credit-commission').prop('checked'),
          sumSettings = sliders[$('#' + formId + ' #city-service').val()]['kzt']['sum'],
          periodSettings = sliders[$('#' + formId + ' #city-service').val()]['kzt']['period'];
      
        $.each(sliders[$('#' + formId + ' #city-service').val()]['kzt']['rates'][withTax ? 'with' : 'without'], function(index, rates) {
          periods.push(index);
        });
      
        data.sum = parseInt(removeSpaces($('#' + formId + ' #data-sum').val()));
      
        // Проверка на минимальную и максимальную сумму
        if (data.sum < sumSettings.min) {
          $('#' + formId + ' #result-total-no-valid').text('');
          $('#' + formId + ' #result-sum-no-valid').text('');

          // $('#' + formId + ' #result-min').html(`Минимальная сумма кредита <span class="bold">${addSpaces(sumSettings.min)} тг</span>`);
          if (activeLanguage === 'KZ') {
            $('#' + formId + ' #result-min').html(`Ең аз кредит сомасы <span class="bold">${addSpaces(sumSettings.min)} тг</span>`);
          } else {
            $('#' + formId + ' #result-min').html(`Минимальная сумма кредита <span class="bold">${addSpaces(sumSettings.min)} тг</span>`);
          }
          $('#' + formId + ' #result-max').text('');
          // $('#' + formId + ' #result-mine').text('');
          $('#' + formId + ' #result-mine').addClass('hidden');
          // $('#' + formId + ' #result-total').text('');
          $('#' + formId + ' #result-total').addClass('hidden');
          $('#' + formId + ' #result-total-no-valid').text('—');
          $('#' + formId + ' #result-period-min').html('');
          $('#' + formId + ' #result-period-max').html('');
        } else if (data.sum > sumSettings.max) {
          $('#' + formId + ' #result-total-no-valid').text('');
          $('#' + formId + ' #result-sum-no-valid').text('');

          // $('#' + formId + ' #result-max').html(`Максимальная сумма кредита <span class="bold">${addSpaces(sumSettings.max)} тг</span>`);
          if (activeLanguage === 'KZ') {
            $('#' + formId + ' #result-max').html(`Кредиттің максималды сомасы <span class="bold">${addSpaces(sumSettings.max)} тг</span>`);
          } else {
            $('#' + formId + ' #result-max').html(`Максимальная сумма кредита <span class="bold">${addSpaces(sumSettings.max)} тг</span>`);
          }
          $('#' + formId + ' #result-min').text('');
          // $('#' + formId + ' #result-mine').text('');
          $('#' + formId + ' #result-mine').addClass('hidden');
          // $('#' + formId + ' #result-total').text('');
          $('#' + formId + ' #result-total').addClass('hidden');
          $('#' + formId + ' #result-total-no-valid').text('—');
          $('#' + formId + ' #result-period-min').html('');
          $('#' + formId + ' #result-period-max').html('');
        } else {
          $('#' + formId + ' #result-min').text('');
          $('#' + formId + ' #result-max').text('');
          $('#' + formId + ' #result-mine').removeClass('hidden');
          $('#' + formId + ' #result-mine').html(`<span class="bold">${addSpaces(data.sum)} тг</span>`);
          $('#' + formId + ' #result-total-no-valid').text('');
      
          data.period = parseInt($('#' + formId + ' #data-period').val());
      
          // Проверка на минимальный и максимальный период
          if (data.period < periodSettings.min) {
            $('#' + formId + ' #result-total-no-valid').text('');
            $('#' + formId + ' #result-sum-no-valid').text('');
            
            if (activeLanguage === 'KZ') {
              $('#' + formId + ' #result-period-min').html(`Ең аз кредит мерзімі <span class="bold">${addSpaces(periodSettings.min)} ай</span>`);
            } else {
              $('#' + formId + ' #result-period-min').html(`Минимальный срок кредита <span class="bold">${periodSettings.min} месяцев</span>`);
            }
            $('#' + formId + ' #result-period-max').html('');
            // $('#' + formId + ' #result-total').text('');
            $('#' + formId + ' #result-total').addClass('hidden');
          } else if (data.period > periodSettings.max) {
            $('#' + formId + ' #result-total-no-valid').text('');
            $('#' + formId + ' #result-sum-no-valid').text('');
           
            if (activeLanguage === 'KZ') {
              $('#' + formId + ' #result-period-max').html(`Кредиттің максималды мерзімі <span class="bold">${addSpaces(periodSettings.max)} ай</span>`);
            } else {
              $('#' + formId + ' #result-period-max').html(`Максимальный срок кредита <span class="bold">${periodSettings.max} месяцев</span>`);
            }
            $('#' + formId + ' #result-period-min').html('');
            // $('#' + formId + ' #result-total').text('');
            $('#' + formId + ' #result-total').addClass('hidden');
          } else {
            $('#' + formId + ' #result-period-min').html('');
            $('#' + formId + ' #result-period-max').html('');
      
            data.rate = getRate(data.period, sliders[$('#' + formId + ' #city-service').val()]['kzt']['rates'][withTax ? 'with' : 'without']);
            result.total = Math.round(PMT(data.rate / 12, data.period, data.sum));
      
            // Проверка на NaN
            if (isNaN(data.sum) || isNaN(result.total)) {  
              // $('#' + formId + ' #result-mine').html('');      
              // $('#' + formId + ' #result-total').text('');
              $('#' + formId + ' #result-mine').addClass('hidden');
              $('#' + formId + ' #result-total').addClass('hidden');

              $('#' + formId + ' #result-total-no-valid').text('—');
              $('#' + formId + ' #result-sum-no-valid').text('—');
            } else {
              $('#' + formId + ' #result-mine').removeClass('hidden');
              $('#' + formId + ' #result-total').removeClass('hidden');
              $('#' + formId + ' #result-mine').html(`<span class="bold">${addSpaces(data.sum)} тг</span>`);
              $('#' + formId + ' #result-total').html(`<span class="bold">${addSpaces(result.total)} тг</span>`);
              $('#' + formId + ' #result-total-no-valid').text('');
              $('#' + formId + ' #result-sum-no-valid').text('');
            }
          }
        }
      }

      function getRate(period, rates) {
        const availableTerms = Object.keys(rates).map(Number);
        for (let i = availableTerms.length - 1; i >= 0; i--) {
          if (period >= availableTerms[i]) {
            return rates[availableTerms[i]];
          }
        }
        return rates[availableTerms[0]];
      }
  
      function addSpaces(sum) {
        sum = sum + '';
        var s = sum.split('').reverse(),
          n = [];
        for (var i = 0; i < s.length; i++) {
          if (i > 0 && i % 3 == 0) {
            n.push(' ');
          }
          n.push(s[i]);
        }
        return n.reverse().join('');
      }
  
      function removeSpaces(sum) {
        var reg = / /g;
        return sum.replace(reg, '');
      }
  
      function PMT(ir, np, pv, fv, type) {
        var pmt, pvif;
        fv || (fv = 0);
        type || (type = 0);
        if (ir === 0) return -(pv + fv) / np;
        pvif = Math.pow(1 + ir, np);
        pmt = (ir * pv * (pvif + fv)) / (pvif - 1);
        if (type === 1) pmt /= 1 + ir;
        return pmt;
      }
  
      $('#' + formId + ' #data-sum').keyup(function() {
        let input = $(this);
        let value = input.val();
        let regex = /^[1-9]\d*$/;
      
        if (!regex.test(value)) {
          input.val(value.replace(/[^1-9]/g, ''));
        } else if (parseInt(value) === 0) {
          input.val('1');
        }

        calculate();
      });

      $('#' + formId + ' #data-period').keyup(function() {
        let input = $(this);
        let value = input.val();
        let regex = /^[1-9]\d*$/;
      
        if (!regex.test(value)) {
          input.val(value.replace(/[^1-9]/g, ''));
        } else if (parseInt(value) === 0) {
          input.val('1');
        }

        calculate();
      });

      $('#' + formId + ' #city-service').on('change', function() {
        calculate();
      });

      $('#' + formId + ' #credit-commission').on('change', function() {
        calculate();
      });

      calculate();
    }
  
    // Применяем функцию applyCalculator для каждой формы
    applyCalculator('form1');
    applyCalculator('form2');
    applyCalculator('form3');
  });

  // раскрытие списка
  (function() {
    if (!document.querySelector('.lang .active a')) return

    let activeLanguage = document.querySelector('.lang .active a').textContent;  
  
    const descriptionTextMains = document.querySelectorAll('.description-text-main');
    const descriptionToggleBtns = document.querySelectorAll('.description-more');
  
    if (!descriptionTextMains || !descriptionToggleBtns) return;
  
    descriptionTextMains.forEach((descriptionTextMain, index) => {
      const descriptionTextMainLong = descriptionTextMain.querySelector('.description-text-main-long');
      const btn = descriptionToggleBtns[index];
      const span = btn.querySelector('span');
      const icon = btn.querySelector('.ui-btn-icon');
  
      btn.addEventListener('click', () => {
        descriptionTextMainLong.classList.toggle('show-full');
  
        if (descriptionTextMainLong.classList.contains('show-full')) {
          if (activeLanguage === 'KZ') {
            span.textContent = 'жасыру';
          } else {
            span.textContent = 'Скрыть';
          }
          icon.classList.add('opened');
        } else {
          if (activeLanguage === 'KZ') {
            span.textContent = 'Толығырақ оқу';
          } else {
            span.textContent = 'Читать подробнее';
          }
          icon.classList.remove('opened');
        }
      });
    });
  })();
  
  
  

})