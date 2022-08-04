let inputDateInicial
let inputDateFinal
let InputCurrentDate
let nome = []
let viewState
const loader = document.querySelector("#_viewRoot\\:status\\.start")
const state = {
    active: null
}

async function ajax(payload) {

    return new Promise(
        (resolve, reject) => {
            // uso da API para fornecer acesso a realizar requests ao servidor
            let xhttp = new XMLHttpRequest();
            // esta função é chamado sempre que o atributo readyState sofre alteração
            xhttp.onreadystatechange = function() {
                // readyState = 4   - referente a request concluida
                // status     = 200 - referente ao status code http 'OK'
                if (this.readyState == 4 && this.status == 200) {
                // responsável por coletar a resposta. 
                let response  = this.responseText
                // preenchimento do resultado no HTML
                let parser = new DOMParser()
                let doc = parser.parseFromString(response,'text/html')
                resolve(doc)
                }

                // Responsável por tratar o retorno que não for bem sucedido
                if (this.readyState == 4 && this.status !== 200){
                    console.log('Data not found!')  
                }
            };
            // URL
            let url = window.location.href

            // configuração para request
            xhttp.open("POST", url, true),
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

            // envio da request
            xhttp.send(payload)
        }
    )
}

async function requestSend(page) {
    try {
        const payload = `AJAXREQUEST=conteudoAbaExpedientes&formExpedientes%3AnumeroProcesso%3AnumeroSequencial=&formExpedientes%3AnumeroProcesso%3AnumeroDigitoVerificador=&formExpedientes%3AnumeroProcesso%3AAno=&formExpedientes%3AnumeroProcesso%3AramoJustica=&formExpedientes%3AnumeroProcesso%3ArespectivoTribunal=&formExpedientes%3AnumeroProcesso%3ANumeroOrgaoJustica=&formExpedientes%3AitNE=&formExpedientes%3AitCL=&formExpedientes%3AitAS=&formExpedientes%3Aj_id455InputDate=${inputDateInicial}&formExpedientes%3Aj_id455InputCurrentDate=${InputCurrentDate}&formExpedientes%3Aj_id457InputDate=${inputDateFinal}&formExpedientes%3Aj_id457InputCurrentDate=${InputCurrentDate}&formExpedientes%3AitDestPend=&formExpedientes%3AitIMF=&formExpedientes%3AitOAB=&formExpedientes%3AsoOrd=org.jboss.seam.ui.NoSelectionConverter.noSelectionValue&formExpedientes%3AitPR=org.jboss.seam.ui.NoSelectionConverter.noSelectionValue&${nome[0].name.replaceAll(':','%3A')}=${nome[0].name.replaceAll(':','%3A')}&autoScroll=&${nome[1].name.replaceAll(':','%3A')}=&${nome[2].name.replaceAll(':','%3A')}=&javax.faces.ViewState=${viewState}&javax.faces.ViewState=${viewState}&formExpedientes=formExpedientes&formExpedientes%3AtbExpedientes%3AscPendentes=${page}&ajaxSingle=formExpedientes%3AtbExpedientes%3AscPendentes&AJAX%3AEVENTS_COUNT=1&`

        return await ajax(payload)
    }
    catch (error) {
        console.log(error.message)
    }
}

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.type == "attributes" && mutation.attributeName == "style") {
            let title = document.querySelector('#formExpedientes\\:Filtros > div > div.col-xs-8.col-md-8')
            if (title != null) {
                createInputDateAndInsertDates()
            }
        }
    })
})

function PDFGen (array) {
    let content = [[],[]]
    let cont = 0

    for (let index = 0; index < array.length; index++) {
        if (cont < 16) {
            content[0].push(array[index])
            cont++
        }
        else
            if (cont <= 32) {
                content[1].push(array[index])
                cont++
            }
            else
                cont = 1
    }                        


    var docDefinition = {
        content: [
            {
                columns: [
                    {
                        width: '50%',
                        stack: content[0]
                    },
                    {
                        width: '50%',
                        stack: content[1]
                    }
                ] 
            }
        ],
    }

    pdfMake.createPdf(docDefinition).open()
}


function createInputDateAndInsertDates() {
    if (document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3] == undefined) {
        nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[0].children[0].children[0].children[4].children[0])
    }
    else {
        nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3].children[1].children[2])
    }

    if (document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3] == undefined) {
        nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[0].children[0].children[0].children[4].children[4])
    }
    else {
        nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3].children[1].children[4])
    }

    if (document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3] == undefined) {
        nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[0].children[0].children[0].children[4].children[5])
    }
    else {
        nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3].children[1].children[5])
    }
    
    viewState = document.querySelector("#javax\\.faces\\.ViewState").value
    inputDateInicial = document.querySelector("#divCampos > div:nth-child(2) > div.form-group.col-xs-4.col-sm-4 > div").children[0].children[0]
    inputDateFinal = document.querySelector("#divCampos > div:nth-child(2) > div.form-group.col-xs-4.col-sm-4 > div").children[4].children[0]
    InputCurrentDateInicial = document.querySelector("#divCampos > div:nth-child(2) > div.form-group.col-xs-4.col-sm-4 > div").children[0].children[2]
    InputCurrentDateFinal = document.querySelector("#divCampos > div:nth-child(2) > div.form-group.col-xs-4.col-sm-4 > div").children[4].children[2]

    if (inputDateInicial.value.length == 0 && inputDateFinal.value.length == 0)
        return
    if (document.getElementById('gerarPDF') != null)
        return
    const title = document.querySelector("#formExpedientes\\:Filtros > div > div.col-xs-8.col-md-8")
    let button = document.createElement('input')
    
    button.setAttribute('type','button')
    title.after(button)
    button.value = 'Gerar PDF'
    button.setAttribute('id','gerarPDF')


    button.addEventListener('click', async function formatIntimacoes () {
        let array_intimacoes = []
        let intimacoes = []
        let params
        let tamanho
        let colunas

        const abas = document.querySelectorAll("#formExpedientes\\:tbExpedientes\\:scPendentes_table > tbody > tr > td")
        if (loader != null)
            loader.style.display = 'block'
        if (abas.length == 0) {
            params = document.querySelector("#formExpedientes\\:tbExpedientes\\:tb").children
            for (let index = 0; index < params.length; index++) 
                intimacoes.push(params[index].children[1])

            intimacoes.forEach(e => {
                tamanho = intimacoes.length
                colunas = e.children[0].children
    
                array_intimacoes.push({text: colunas[0].children[0].innerText + '\n' + colunas[0].children[1].innerText + '\n' + colunas[0].children[2].innerText + '\n' + colunas[0].children[3].innerText + '\n' + colunas[0].children[4].innerText + '\n' + colunas[0].children[7].innerText.substring(0,50) + '\n' + colunas[1].children[0].children[0].innerText.split(' ')[1] + '\n',fontSize: 10,unbreakable: true},{text: '\n',fontSize: 10})
    
                //array_intimacoes.push({text: colunas[1].children[0].children[1].innerText + '\n',fontSize: 8})
                //array_intimacoes.push({text: colunas[1].children[0].children[2].innerText + '\n',fontSize: 10})
                //array_intimacoes.push({text: colunas[1].children[0].children[3].innerText + '\n',fontSize: 10})          
            })
        }
        else {
                for (let index = 0; index < abas.length; index++) {
                    if (abas[index].className == 'rich-datascr-act' || abas[index].className == 'rich-datascr-inact') {
                        params = await requestSend(abas[index].innerText)
                        intimacoes.push(params)
                    }
                }
                intimacoes.forEach(e => {
                    tamanho = e.documentElement.querySelector("#formExpedientes\\:tbExpedientes\\:tb").children.length
                    for (let index = 0; index < tamanho; index++) {
                        colunas = e.documentElement.querySelector("#formExpedientes\\:tbExpedientes\\:tb").children[index].children[1].children[0].children

                        array_intimacoes.push({text: colunas[0].children[0].innerText + '\n' + colunas[0].children[1].innerText + '\n' + colunas[0].children[2].innerText + '\n' + colunas[0].children[3].innerText + '\n' + colunas[0].children[4].innerText + '\n' + colunas[0].children[7].innerText.substring(0,50) + '\n' + colunas[1].children[0].children[0].innerText.split(' ')[1] + '\n',fontSize: 10,unbreakable: true},{text: '\n',fontSize: 10})
                        //array_intimacoes.push({text: colunas[1].children[0].children[1].innerText + '\n',fontSize: 8})
                        //array_intimacoes.push({text: colunas[1].children[0].children[2].innerText + '\n',fontSize: 10})
                        //array_intimacoes.push({text: colunas[1].children[0].children[3].innerText + '\n',fontSize: 10})
                    }
                })
            }

            PDFGen(array_intimacoes)
            if (loader != null)
                loader.style.display = 'none'
    })
}

async function activate() {
    
    state.active = await getActive()
    if (state.active == "Desativado") {
        observer.observe(loader, {attributes: true})
        return
    }
}


function enviarIntimaçõesParaPDF (msg) {
    chrome.runtime.sendMessage({greeting: msg}, function(response) {
        console.log(response.farewell);
      })
}

function send(params) {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            activate()
            sendResponse({params: params})
        }
    )
}

function updateEvent() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            activate()
            sendResponse({validation: "Atualizado"})
        }
    )
}

(function () {
    updateEvent()
    activate()
    //testeGen()
})()