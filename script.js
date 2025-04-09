// Глобальная переменная для хранения данных
const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetQuoteButton = document.getElementById("tweet-quote");
const body = document.querySelector("body");

//Переменная для хранения данных с сервера
let quotesData = [];

//1 функция для получения и сохранения данных в переменную
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Ждем завершения загрузки данных с сервера
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );

    // Преобразуем ответ в JSON
    const data = await response.json();

    // Присваиваем полученные данные переменной для дальнейшего использования, чтобы каждый не запрашивать данные с сервера
    quotesData = data;

    // Вызываем функцию для отображения данных на странице
    displayQuote(quotesData);
  } catch (error) {
    // Обработка ошибок
    console.error("Ошибка при загрузке данных:", error);
  }
});

//2. Получаем случайную цитату из полученных данных
function getRandomQuote(myData) {
  return myData.quotes[Math.floor(Math.random() * myData.quotes.length)];
}

// 3 Функция для отображения данных на странице
function displayQuote() {
  const quote = getRandomQuote(quotesData);
  // Проверяем, есть ли текст и автор у цитаты
  if (quote && quote.quote && quote.author) {
    quoteText.textContent = `"${quote.quote}"`; // Используем quote, если это поле существует
    quoteAuthor.textContent = `- ${quote.author}`; // Используем author, если это поле существует
  } else {
    quoteText.textContent = "Цитата не доступна";
    quoteAuthor.textContent = "";
  }

  // Обновляем ссылку для твита
  tweetQuoteButton.href = `https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`;
}

//4 Функция, которая меняет задний фон на случайный цвет
function changeColor() {
  body.style.backgroundColor = "#" + Math.round(Math.random() * 1000000);
}

//5 Функция для финального изменения фона и текст на странице
function showNewQuote() {
  displayQuote();
  changeColor();
}
// Назначем функцию для кнопки
newQuoteButton.addEventListener("click", showNewQuote);
