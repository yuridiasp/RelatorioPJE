const btnActive = window.document.querySelector("#botaoAtiva")
const divMensagem = window.document.querySelector("#mensagem")

let initialState, state = {
    active: null
}


function sendMessage(status) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {status: status}, function(response) {
        
        })
    })
}

function update(status) {
    sendMessage(status)
}

function onBtnActive(event) {
    if (state.active == "Desativado" || state.active == null) {
        event.target.value = "Ativado"
    }
    else {
        event.target.value = "Desativado"
    }
    state.active = event.target.value
    saveState(state.active)
    setInitial()
    update(state.active)
}

function addListenerBtnActive() {
    btnActive.addEventListener("click", event => {
        event.stopPropagation()
        onBtnActive(event)
    })
}

function updateBtnActive() {
    btnActive.value = state.active
    addListenerBtnActive()
}

async function saveState(state) {
    setActive(state)
}

async function getInitialState() {
    let value = await getActive()
    if (value == undefined)
        value = "Ativado"
    return {
        active: value
    }
}

(async function () {
    state = await getInitialState()
    initialState = { ...state }
    updateBtnActive()
})()
