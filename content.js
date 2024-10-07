console.log("Контентный скрипт загружен.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Сообщение получено:", request);

    if (request.action === "getSelectedText") {
        const selectedText = window.getSelection().toString();
        console.log("Выделенный текст:", selectedText);

        if (selectedText) {
            sendResponse({ text: selectedText });
        } else {
            sendResponse({ text: null });
        }
    }
    return true; // Асинхронный ответ
});