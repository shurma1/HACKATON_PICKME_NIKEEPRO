percentage = 0;
percentageText = document.getElementById('percentageText');
circularProgress = document.querySelector('.circle-progress');
buttonText = getTextButton.textContent;

document.addEventListener('DOMContentLoaded', () => {
  const getTextButton = document.getElementById('getTextButton');
  const telegramToken = '7690353642:AAFlzj0fQVitd8eZtG27utBsBDGxZYTbKjE'; // Ваш токен Telegram
  const chatId = '1902200487'; // Ваш chat_id

  if (getTextButton) {
      getTextButton.addEventListener('click', () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs.length > 0) {
                  chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, (response) => {
                      if (chrome.runtime.lastError) {
                          console.error("Ошибка при отправке сообщения: ", chrome.runtime.lastError);
                      } else if (response && response.text) {
                          console.log("Выделенный текст:", response.text);
                          // Отправляем выделенный текст боту
                          sendTextToTelegramBot(response.text, telegramToken, chatId);
                      } else {
                          console.log("Текст не выделен или не удалось получить выделенный текст.");
                      }
                  });
              } else {
                  console.error("Активная вкладка не найдена.");
              }
          });
      });
  } else {
      console.error("Кнопка не найдена. Убедитесь, что ID кнопки совпадает с 'getTextButton'.");
  }
});

// Функция для отправки сообщения через Telegram Bot API
function sendTextToTelegramBot(text, token, chatId) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  // Проверка на повторное выполнение запроса
  if (!sendTextToTelegramBot.locked) {
      sendTextToTelegramBot.locked = true;

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              chat_id: chatId,
              text: text
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log("Сообщение отправлено:", data);
          // Сбрасываем блокировку после отправки
          sendTextToTelegramBot.locked = false;
          // Проверяем, есть ли в ответе сообщение и текст
          if (data && data.result && data.result.text) {
              // Ищем первое число от 0.00 до 1.00 в тексте сообщения
              const numberMatch = data.result.text.match(/(\b0?\.\d{1,2}\b|\b1\.00\b)/);
              if (numberMatch) {
                  const extractedNumber = parseFloat(numberMatch[0]);
                  console.log("Найденное число:", extractedNumber);
                  // Здесь вы можете сохранить это число в переменной или использовать его дальше
              } else {
                  console.log("Число от 0.00 до 1.00 не найдено в сообщении.");
              }
          } else {
              console.error("Некорректный ответ от бота или отсутствует текст.");
          }
      })
      .catch(error => {
          console.error("Ошибка при отправке сообщения боту:", error);
          // Сбрасываем блокировку в случае ошибки
          sendTextToTelegramBot.locked = false;
      });
  }
}


// document.addEventListener('DOMContentLoaded', () => {
//   const getTextButton = document.getElementById('getTextButton');

//   if (getTextButton) {
//       getTextButton.addEventListener('click', () => {
//           chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//               if (tabs.length > 0) {
//                   chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, (response) => {
//                       if (chrome.runtime.lastError) {
//                           console.error("Ошибка при отправке сообщения: ", chrome.runtime.lastError);
//                       } else if (response && response.text) {
//                           console.log("Выделенный текст:", response.text);
//                           // Отправляем POST-запрос с выделенным текстом
//                           sendTextForAnalysis(response.text);
//                       } else {
//                           console.log("Текст не выделен или не удалось получить выделенный текст.");
//                       }
//                   });
//               } else {
//                   console.error("Активная вкладка не найдена.");
//               }
//           });
//       });
//   } else {
//       console.error("Кнопка не найдена. Убедитесь, что ID кнопки совпадает с 'getTextButton'.");
//   }
// });

// Функция для отправки POST-запроса
// function sendTextForAnalysis(text) {
//   fetch('http://79.174.82.165/api/reliability/check', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ text: text })
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log("Ответ от сервера:", data); // присваеваем значени 
//   })
//   .catch(error => {
//       console.error("Ошибка при отправке POST-запроса:", error);
//   });
// }


// Максимальный процент
a = 100;

// Функция для обновления границы круга
function updateCircle(percentage) {
  if (percentage > a) percentage = a; // Ограничение максимального процента

  percentageText.textContent = `${percentage}%`;

  // Рассчитываем длину обводки
  const circumference = 283; // Длина окружности для r=45
  const offset = circumference - (percentage / 100) * circumference;

  // Изменяем offset для обводки прогресса
  circularProgress.style.strokeDashoffset = offset;

  // Изменение цвета в зависимости от прогресса
  if (percentage <= 33) {
    // От чёрного к красному
    circularProgress.style.stroke = `rgb(${Math.floor(percentage * 7.65)}, 0, 0,0.5)`; 
  } else if (percentage <= 66) {
    // Плавный переход от красного к жёлтому
    let greenValue = Math.floor((percentage - 33) * 7.65); 
    circularProgress.style.stroke = `rgb(255, ${greenValue}, 0,0.5)`; 
  } else {
    // Переход от жёлтого к зелёному
    let redValue = Math.floor(255 - ((percentage - 66) * 7.65)); // Плавное уменьшение красного
    circularProgress.style.stroke = `rgb(${redValue}, 255, 0,0.5)`; // Переход от жёлтого (255, 255, 0) к зелёному (0, 255, 0)
  }
}

// Функция для отображения статуса на кнопке
function updateButtonStatus() {
  if (percentage <= 33) {
    getTextButton.className = 'error';
    getTextButton.textContent = "Информация недостоверна или противоречивая.";
  } else if (percentage <= 66) {
    getTextButton.className = 'warning';
    getTextButton.textContent = "Есть частичные совпадения, требует внимательности.";
  } else {
    getTextButton.className = 'success';
    getTextButton.textContent = "Ресурс проверен, информация достоверна.";
  }

  // Возврат исходного состояния кнопки через 3 секунды
  setTimeout(() => {
    getTextButton.className = '';
    getTextButton.textContent = buttonText;
    percentage = 0; // Сброс процента
    percentageText.textContent = '0%';
    circularProgress.style.strokeDashoffset = 283; // Сброс прогресса
    circularProgress.style.stroke = 'rgb(255, 0, 0)'; // Сброс цвета
  }, 3000);
}

// Функция для плавного увеличения процента
function increasePercentage() {
  if (percentage < a) {
    percentage += 1;
    updateCircle(percentage);
    setTimeout(increasePercentage, 50); // Скорость анимации
  } else {
    updateButtonStatus(); // Обновление кнопки после достижения максимального процента
  }
}

// Обработка клика по кнопке
getTextButton.addEventListener('click', () => {
  getTextButton.className = 'loading'; // Кнопка в состоянии загрузки
  getTextButton.textContent = "Загрузка...";
  increasePercentage(); // Запуск анимации
});
  