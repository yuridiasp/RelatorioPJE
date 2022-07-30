

function chromeRuntimeOnInstalledAddListener(listener) {
    chrome.runtime.onInstalled.addListener(listener)
}

function onExtensionInstalled(listener) {
    chromeRuntimeOnInstalledAddListener(listener)
}

function getActive() {
    return chromeStorageLocalGet('active')
}

function setActive(activeValue) {
    return chromeStorageLocalSet({ active: activeValue })
}

function chromeStorageLocalGet(key) {
    return new Promise((resolve) => chrome.storage.local.get([key], (result) => {
        resolve(result[key])
    }))
}

function chromeStorageLocalSet(object) {
    return new Promise((resolve) => chrome.storage.local.set(object, resolve))
}