const wsUri = "wss://echo-ws-service.herokuapp.com/";

/*Кнопка отправки сообщения*/
const btn = document.querySelector('.send_mess');
/*Кнопка отправки координат*/
const btnGeo = document.querySelector('.show_geo');
/*Окно с сообщениями*/
const mas_wind = document.querySelector('.massage_wind');

const mapLink = document.querySelector('#map-link');

let websocket;
let timerId;


// Вывод контейнера с сообщенями
function text_div_user (user) {
    mas_wind.innerHTML += `
        <div class = "mes_position_user">
            <p class = "mes_decor">${user}</p>
    </div>`;
}

function text_div_serv (serv) {
    mas_wind.innerHTML += `
        <div class = "mes_position_server">
            <p class = "mes_decor">${serv}</p>
    </div>`;
}


/*Открытие вебсокета*/
websocket = new WebSocket(wsUri);     

websocket.onopen = function(evt) {
    console.log("CONNECTED");
};
websocket.onclose = function(evt) {
    console.log("DISCONNECTED");
};
websocket.onmessage = function(evt) {
    console.log(evt.data);
    text_div_serv(evt.data);
};
websocket.onerror = function(evt) {
    console.log(evt.data);
};


/*Событие - отправление сообщения*/
btn.addEventListener('click', () => {
    /*Получение сообщения из поля ввода и вывод его на html*/
    let user_mes = document.querySelector('.input_user').value;
    text_div_user(user_mes);
    
    /*Проверка открыт ли вебсокет. Если да, то отправяется сообщение, если нет - создаётся новое подключение*/
    if (websocket === null) {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function(evt) {
            console.log("RE-CONNECTED");
            websocket.send(user_mes);
        }
        websocket.onclose = function(evt) {
            console.log("DISCONNECTED");
        };
        websocket.onmessage = function(evt) {
            text_div_serv(evt.data);
        };
        websocket.onerror = function(evt) {
            console.log("evt.data");
        };
    } else {
        /*Отправка сообщения, если вебсокет ещё открыт*/
        websocket.send(user_mes);
    }; 

    /*Очистка инпута от старого сообщения*/
    document.querySelector('.input_user').value = "";

    /*Обновление счётчика закрытия соединения после отправки сообщения */
    clearTimeout(timerId);
    timerId = setTimeout(websClose, 10000);
});

/*Запуск таймеры отключения соединения от сервера после открытия страницы*/
timerId = setTimeout(websClose, 10000);

function websClose () {
    websocket.close();
    websocket = null;
}


/*Получение геоданных */
btnGeo.addEventListener('click', () => {
    
    if (!navigator.geolocation) {
        text_div_serv('Geolocation не поддерживается вашим браузером');
    } else {
        text_div_serv('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
  });

// Функция, выводящая текст об ошибке
const error = () => {
    text_div_serv('Невозможно получить ваше местоположение');
}
  
// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    mas_wind.innerHTML += `
        <div class = "mes_position_server">
            <div class = "mes_decor" style = 'color: rgb(35, 170, 248)'>
                <p style = "margin: 0px">'Широта: ${latitude} °, Долгота: ${longitude} °'</p>
                <br><a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}'>Ссылка</a>
            </div>
    </div>`;
}






