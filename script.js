// Получаем ссылки на элементы
const quoteText = document.getElementById('text');
const quoteAuthor = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const tweetQuoteButton = document.getElementById('tweet-quote');
const body = document.querySelector("body");


function changeColor() {
  body.style.backgroundColor = "#" + Math.round(Math.random() * 1000000);
}

// Функция для загрузки цитаты
function fetchQuote() {
  fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Сетевой запрос не удался');
      }
      return response.json();
    })
    .then(data => {
      // Выводим всю структуру данных в консоль для проверки
      console.log('Полученные данные:', data);
      
      // Проверка структуры данных
      if (data && Array.isArray(data.quotes)) {
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        console.log('Случайная цитата:', randomQuote);  // Выводим выбранную цитату
        displayQuote(randomQuote);
        changeColor()
      } else {
        throw new Error('Неверная структура данных');
      }
    })
    .catch(error => {
      console.error('Ошибка при загрузке цитаты:', error);
      quoteText.textContent = "Произошла ошибка при загрузке цитаты.";
      quoteAuthor.textContent = "";
    });
}

// Функция для отображения цитаты
function displayQuote(quote) {
  // Проверяем, есть ли текст и автор у цитаты
  if (quote && quote.quote && quote.author) {
    quoteText.textContent = `"${quote.quote}"`;  // Используем quote, если это поле существует
    quoteAuthor.textContent = `- ${quote.author}`;  // Используем author, если это поле существует
  } else {
    quoteText.textContent = "Цитата не доступна";
    quoteAuthor.textContent = "";
  }

  // Обновляем ссылку для твита
  tweetQuoteButton.href = `https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`;
}

// Обработчик клика по кнопке "Новая цитата"
newQuoteButton.addEventListener('click', fetchQuote);

// Загружаем цитату при загрузке страницы
// document.addEventListener('DOMContentLoaded', fetchQuote);
