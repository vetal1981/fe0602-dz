	
  //Корзина

var itemBox = document.querySelectorAll('.item_box'), // блок каждого товара
    cartCont = document.getElementById('cart_content'); // блок вывода данных корзины

// Функция кроссбраузерная установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

// Получаем данные из LocalStorage
function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}
// Добавляем товар в корзину
function addToCart(e){
  this.disabled = true; // блокируем кнопку на время операции с корзиной
  var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
      itemId = this.getAttribute('data-id'), // ID товара
      itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
      itemPrice = parentBox.querySelector('.item_price').innerHTML; // стоимость товара
  if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
    cartData[itemId][2] += 1;
  } else { // если товара в корзине еще нет, то добавляем в объект
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  // Обновляем данные в LocalStorage
  if(!setCartData(cartData)){ 
    this.disabled = false; // разблокируем кнопку после обновления LS
    alert('Товар додано до кошика');
    // cartCont.innerHTML = 'Товар додано до кошика';
    setTimeout(function(){
      cartCont.innerHTML = 'Продовжити покупки...';
    }, 500);
  }
  return false;
}

// Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
for(var i = 0; i < itemBox.length; i++){
  addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}

// Открываем корзину со списком добавленных товаров
function openCart(e){
    var cartData = getCartData(), // вытаскиваем все данные корзины
      totalItems = '',
      totalCount = 0,
      totalSum = 0;
  // если что-то в корзине уже есть, начинаем формировать данные для вывода
  if(cartData !== null){
    totalItems = '<table class="shopping_list"><tr><td>Назва</td><td>Вартість</td><td>Кількість</td><td></td></tr>' + '<button id="send">Замовити</button>';
    for(var items in cartData){
      totalItems += '<tr>';
      for(var i = 0; i < cartData[items].length; i++){
        totalItems += '<td>' + cartData[items][i] + '</td>'; 
      }
      totalSum += cartData[items][1] * cartData[items][2];
      totalCount += cartData[items][2];
      totalItems += '<td><span class="del_item" data-id="'+ items +'">Х</span></td>';
      totalItems += '</tr>';
    }
    totalItems += '<tr><td><strong>Всього</strong></td><td><span id="total_sum">'+ totalSum +'</span> грн</td><td><span id="total_count">'+ totalCount +'</span> шт.</td><td></td></tr>';
    totalItems += '<table>';
    cartCont.innerHTML = totalItems;
  } else {
    // если в корзине пусто, то сигнализируем об этом
    alert('Кошик порожній!')
    // cartCont.innerHTML = 'Кошик порожній!';
  }
  return false;
}

// функция для нахождения необходимого ближайшего родительского элемента
function closest(el, sel) {
  if (el !== null)
  return el.matches(sel) ? el : (el.querySelector(sel) || closest(el.parentNode, sel));
}

/* Открыть корзину */
addEvent(document.getElementById('checkout'), 'click', openCart);
/* Удаление из корзины */
addEvent(document.body, 'click', function(e){
  if(e.target.className === 'del_item') {
    var itemId = e.target.getAttribute('data-id'),
    cartData = getCartData();
    if(cartData.hasOwnProperty(itemId)){
      var tr = closest(e.target, 'tr');
      tr.parentNode.removeChild(tr); /* Удаляем строку товара из таблицы */
      // пересчитываем общую сумму и цену
      var totalSumOutput = document.getElementById('total_sum'),
      totalCountOutput = document.getElementById('total_count');
      totalSumOutput.textContent = +totalSumOutput.textContent - cartData[itemId][1] * cartData[itemId][2];
      totalCountOutput.textContent = +totalCountOutput.textContent - cartData[itemId][2];
      delete cartData[itemId]; // удаляем товар из объекта
      setCartData(cartData); // перезаписываем измененные данные в localStorage
    }
  }
}, false);
/* Очистить корзину */
addEvent(document.getElementById('clear_cart'), 'click', function(e){
  localStorage.removeItem('cart');
  cartCont.innerHTML = 'Кошик порожній.';  
});

    //Карусель

    $('.carousel[data-type="multi"] .item').each(function(){
		var next = $(this).next();
		if (!next.length) {
			next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));
	  
		for (var i=0;i<2;i++) {
			next=next.next();
			if (!next.length) {
				next = $(this).siblings(':first');
			}
			next.children(':first-child').clone().appendTo($(this));
		}
	});

//Поиск по странице

// function searchTextOnPage(inputId) {
//   var obj = window.document.getElementById(inputId);
//   var textToFind;
//     if (obj) {
//         textToFind = obj.value
//   } 
//     else {
//         alert("Текст не знайдено = " + inputId);
//         return;
//   }
//     if (textToFind == "") {
//         alert("Нічого не введено");
//         return;
//   }
//   document.body.innerHTML = document.body.innerHTML.replace(eval("/"+textToFind+"/g"),"<b style='background: yellow'>"+textToFind+"</b>");
//   var obj = window.document.getElementById(inputId);
//   obj.value = textToFind;
// }

// Валідація

function validate(){
   //Считаем значения из полей name и email в переменные x и y
   var x=document.forms['form']['forename'].value;
   var y=document.forms['form']['sign'].value;
   //Если поле name пустое выведем сообщение и предотвратим отправку формы
   if (x.length==0){
    alert("форма Логін та Пароль обов'язкові для заповнення");
      return false;
   }
   //Если поле email пустое выведем сообщение и предотвратим отправку формы
   if (y.length==0){
    alert("форма Логін та Пароль обов'язкові для заповнення");
      return false;
   }
}

// Дата та час

function clock() {
var d = new Date();
var month_num = d.getMonth()
var day = d.getDate();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

month=new Array("січня", "лютого", "березня", "квітня", "травня", "червня",
"липня", "серпня", "вересня", "жовтня", "листопада", "грудня");

if (day <= 9) day = "0" + day;
if (hours <= 9) hours = "0" + hours;
if (minutes <= 9) minutes = "0" + minutes;
if (seconds <= 9) seconds = "0" + seconds;

date_time = "Сьогодні - " + day + " " + month[month_num] + " " + d.getFullYear() +
" г.&nbsp;&nbsp;&nbsp; Поточний час - "+ hours + ":" + minutes + ":" + seconds;
if (document.layers) {
 document.layers.doc_time.document.write(date_time);
 document.layers.doc_time.document.close();
}
else document.getElementById("doc_time").innerHTML = date_time;
 setTimeout("clock()", 1000);
}
clock();
