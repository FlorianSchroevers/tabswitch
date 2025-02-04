function saveOptions(e) {
    e.preventDefault();

    console.log(document.querySelector("#overflowBehaviour").value);

    browser.storage.local.set({
        overflowBehaviour: document.querySelector("#overflowBehaviour").value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#overflowBehaviour").value = result.overflowBehaviour || "nothing";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.local.get("overflowBehaviour");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
