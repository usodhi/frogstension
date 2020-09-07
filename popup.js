document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById("checkPage");
    button.onclick = () => {
        chrome.tabs.executeScript({
            code: "document.body.innerText"
        },
            result => {
                if (chrome.runtime.lastError) {
                    const val = "Woah. Can't read this page so definitely no frogs here :("
                    const text = document.createElement("div");
                    text.innerText = val;
                    text.style.cssText = "font-size:10px;font-weight:bold;";
                    document.getElementById("god").appendChild(text);
                    return;
                }
                let num = 0;
                innerText = result[0];
                innerText = innerText.replace(/\s/g, " ").replace(/[^a-zA-Z ]/gmi, "");
                for (const word of innerText.split(" ")) {
                    num = word.toLowerCase().includes("frog") ? num + 1 : num;
                }
                const val = num === 0 ? "There are no frogs here :(" : `Frog was mentioned ${num} time${num !== 1 ? "s" : ""} :)`
                console.log(val);
                const text = document.createElement("div");
                text.innerText = val;
                text.style.cssText = "font-size:15px;font-weight:bold;"
                document.getElementById("god").appendChild(text);
            });
    }
});