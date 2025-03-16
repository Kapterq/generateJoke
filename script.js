async function generateJoke() {
    const jokeText = document.getElementById("jokeText");
    
    jokeText.value = "...";

    try {
        // Получаем шутку
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode&type=single");
        const data = await response.json();
        const joke = data.joke || "Не удалось получить шутку.";
        
        // Переводим шутку
        const translatedJoke = await translateText(joke, "ru");

        // Отображаем перевод в textarea
        jokeText.value = translatedJoke;
    } catch (error) {
        jokeText.value = "Ошибка загрузки шутки.";
    }
}

async function translateText(text, targetLang = "ru") {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        return "Ошибка перевода.";
    }
}

document.getElementById("jokeText").addEventListener("dblclick", async function () {
    const translatedJoke = await translateText(this.value, "en");
    this.value = translatedJoke;
});
