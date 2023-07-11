document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("change-message");

  function injectScript() {
    const arr = Array.from(document.querySelectorAll("p"));
    const resultado = arr.map((article) => article.textContent);
    const resultadoFiltrado = resultado.slice(0, -2).join("\n");
    return resultadoFiltrado;
  }

  boton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      chrome.tabs.reload(currentTab.id, function () {
        setTimeout(() => {
          chrome.scripting.executeScript(
            {
              target: { tabId: currentTab.id },
              function: injectScript,
            },
            function (results) {
              const resultadoDiv = document.getElementById("resultado");
              resultadoDiv.textContent = results[0].result;
            }
          );
        }, 300);
      });
    });
  });
});
