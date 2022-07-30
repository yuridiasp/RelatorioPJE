let inputDateInicial
let inputDateFinal
let InputCurrentDate
let nome = []
const pje2x1g = 'https://pje1g.trf5.jus.br/pje/Painel/painel_usuario/advogado.seam'
const input = document.querySelector("#_viewRoot\\:status\\.start")
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
            let url = '/pje/Painel/painel_usuario/advogado.seam'

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
        const abas = document.querySelectorAll("#formExpedientes\\:tbExpedientes\\:scPendentes_table > tbody > tr > tb")

        const payload1 = [`esso%3AnumeroSequencial=&formExpedientes%3AnumeroProcesso%3AnumeroDigitoVerificador=&formExpedientes%3AnumeroProcesso%3AAno=&formExpedientes%3AnumeroProcesso%3AramoJustica=&formExpedientes%3AnumeroProcesso%3ArespectivoTribunal=&formExpedientes%3AnumeroProcesso%3ANumeroOrgaoJustica=&formExpedientes%3AitNE=&formExpedientes%3AitCL=&formExpedientes%3AitAS=&formExpedientes%3Aj_id455InputDate=${inputDateInicial}&formExpedientes%3Aj_id455InputCurrentDate=${InputCurrentDate[0]}%2F${InputCurrentDate[1]}&formExpedientes%3Aj_id457InputDate=${inputDateFinal}&formExpedientes%3Aj_id457InputCurrentDate=${InputCurrentDate[0]}%2F${InputCurrentDate[1]}&formExpedientes%3AitDestPend=&formExpedientes%3AitIMF=&formExpedientes%3AitOAB=&formExpedientes%3AsoOrd=org.jboss.seam.ui.NoSelectionConverter.noSelectionValue&formExpedientes%3AitPR=org.jboss.seam.ui.NoSelectionConverter.noSelectionValue&${nome[0]}=${nome[0]}&autoScroll=&${nome[1]}=&${nome[2]}=&javax.faces.ViewState=j_id3&javax.faces.ViewState=j_id3&formExpedientes=formExpedientes&formExpedientes%3AbtPesq=formExpedientes%3AbtPesq&AJAX%3AEVENTS_COUNT=1&`]
        const payload2 = `AJAXREQUEST=conteudoAbaExpedientes&formExpedientes%3AnumeroProcesso%3AnumeroSequencial=&formExpedientes%3AnumeroProcesso%3AnumeroDigitoVerificador=&formExpedientes%3AnumeroProcesso%3AAno=&formExpedientes%3AnumeroProcesso%3AramoJustica=&formExpedientes%3AnumeroProcesso%3ArespectivoTribunal=&formExpedientes%3AnumeroProcesso%3ANumeroOrgaoJustica=&formExpedientes%3AitNE=&formExpedientes%3AitCL=&formExpedientes%3AitAS=&formExpedientes%3Aj_id455InputDate=${inputDateInicial}&formExpedientes%3Aj_id455InputCurrentDate=${InputCurrentDate[0]}%2F${InputCurrentDate[1]}&formExpedientes%3Aj_id457InputDate=${inputDateFinal}&formExpedientes%3Aj_id457InputCurrentDate=${InputCurrentDate[0]}%2F${InputCurrentDate[1]}&formExpedientes%3AitDestPend=&formExpedientes%3AitIMF=&formExpedientes%3AitOAB=&formExpedientes%3AsoOrd=org.jboss.seam.ui.NoSelectionConverter.noSelectionValue&formExpedientes%3AitPR=org.jboss.seam.ui.NoSelectionConverter.noSelectionValue&${nome[0]}=${nome[0]}&autoScroll=&${nome[1]}=&${nome[2]}=&javax.faces.ViewState=j_id38&javax.faces.ViewState=j_id38&formExpedientes=formExpedientes&formExpedientes%3AtbExpedientes%3AscPendentes=${page}&ajaxSingle=formExpedientes%3AtbExpedientes%3AscPendentes&AJAX%3AEVENTS_COUNT=1&`

        if (abas.length > 0)
            return await ajax(payload2)
        return await ajax(payload1)
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
    let column = [[],[]]
    let cont = 0

    for (let index = 0; index < array.length; index++) {
        ++cont
        if (cont <= 65)
            column[0].push(array[index])
        else
            column[1].push(array[index])
        if (cont == 65*2)
            cont = 0
    }

    var docDefinition = {
        content: [
            {
            columns: [
                {
                // auto-sized columns have their widths based on their content
                width: '50%',
                text: column[0]
                },
                {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: '50%',
                text: column[1]
                }
            ],
            // optional space between columns
            columnGap: 10
            },
        ],
        pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
         }
        }
            
    pdfMake.createPdf(docDefinition).open()
}

function createInputDateAndInsertDates() {
    inputDateInicial = document.querySelector("#formExpedientes\\:j_id455InputDate")
    inputDateFinal = document.querySelector("#formExpedientes\\:j_id457InputDate")
    InputCurrentDate = document.querySelector("#formExpedientes\\:j_id457InputCurrentDate").value.split('/')
    nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3].children[1].children[2].name.replaceAll(':','%3A'))
    nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3].children[1].children[4].name.replaceAll(':','%3A'))
    nome.push(document.querySelector('#formExpedientes\\:tbExpedientes\\:tb').children[0].children[3].children[1].children[5].name.replaceAll(':','%3A'))
    if (inputDateInicial.value.length == 0 && inputDateFinal.value.length == 0)
        return
    if (document.getElementById('gerarPDF') != null)
        return
    const loader = document.querySelector("#_viewRoot\\:status\\.start")
    const title = document.querySelector("#formExpedientes\\:Filtros > div > div.col-xs-8.col-md-8")
    let button = document.createElement('input')
    
    button.setAttribute('type','button')
    title.after(button)
    button.value = 'Gerar PDF'
    button.setAttribute('id','gerarPDF')


    button.addEventListener('click', async function formatIntimacoes () {
        let intimacoes = []
        let array_intimacoes = []
        let tamanho
        let colunas
        let params
        let contador = 0

        let buttons = document.querySelectorAll("#formExpedientes\\:tbExpedientes\\:scPendentes_table > tbody > tr > td")
        loader.style.display = 'block'
        console.log(buttons)
        if (buttons.length == 0) {
            params = document.querySelector("#formExpedientes\\:tbExpedientes\\:tb").children
            for (let index = 0; index < params.length; index++) 
                intimacoes.push(params[index].children[1])

            intimacoes.forEach(e => {
                ++contador
                tamanho = intimacoes.length
                colunas = e.children[0].children
                array_intimacoes.push({text: colunas[0].children[0].innerText + '\n',fontSize: 10, bold:true})
                array_intimacoes.push({text: colunas[0].children[1].innerText + '\n',fontSize: 10})
                array_intimacoes.push({text: colunas[0].children[2].innerText + '\n',fontSize: 10})
                array_intimacoes.push({text: colunas[0].children[3].innerText + '\n',fontSize: 10})
                array_intimacoes.push({text: colunas[0].children[4].innerText + '\n',fontSize: 10})
                array_intimacoes.push({text: colunas[0].children[7].innerText.substring(0,50) + '\n',fontSize: 10})
                array_intimacoes.push({text: colunas[1].children[0].children[0].innerText.split(' ')[1] + '\n',fontSize: 10, bold: true, color: '#058EC4'})
                //array_intimacoes.push({text: colunas[1].children[0].children[1].innerText + '\n',fontSize: 8})
                //array_intimacoes.push({text: colunas[1].children[0].children[2].innerText + '\n',fontSize: 10})
                //array_intimacoes.push({text: colunas[1].children[0].children[3].innerText + '\n',fontSize: 10})
                if (contador == 8) {
                    array_intimacoes.push({text: '.\n',fontSize: 10})
                    array_intimacoes.push({text: '.\n',fontSize: 10})
                    contador = 0
                }
                else {
                    array_intimacoes.push({text: '.\n',fontSize: 10})
                }                
            })
        }
        else {
                for (let index = 0; index < buttons.length; index++) {
                    if (buttons[index].className == 'rich-datascr-act' || buttons[index].className == 'rich-datascr-inact') {
                        params = await requestSend(buttons[index].innerText)
                        intimacoes.push(params)
                    }
                }
                intimacoes.forEach(e => {
                    tamanho = e.documentElement.querySelector("#formExpedientes\\:tbExpedientes\\:tb").children.length
                    for (let index = 0; index < tamanho; index++) {
                        colunas = e.documentElement.querySelector("#formExpedientes\\:tbExpedientes\\:tb").children[index].children[1].children[0].children
                        array_intimacoes.push({text: colunas[0].children[0].innerText + '\n',fontSize: 10, bold:true})
                        array_intimacoes.push({text: colunas[0].children[1].innerText + '\n',fontSize: 10})
                        array_intimacoes.push({text: colunas[0].children[2].innerText + '\n',fontSize: 10})
                        array_intimacoes.push({text: colunas[0].children[3].innerText + '\n',fontSize: 10})
                        array_intimacoes.push({text: colunas[0].children[4].innerText + '\n',fontSize: 10})
                        array_intimacoes.push({text: colunas[0].children[7].innerText.substring(0,50) + '\n',fontSize: 10})
                        array_intimacoes.push({text: colunas[1].children[0].children[0].innerText.split(' ')[1] + '\n',fontSize: 10, bold: true, color: '#058EC4'})
                        //array_intimacoes.push({text: colunas[1].children[0].children[1].innerText + '\n',fontSize: 8})
                        //array_intimacoes.push({text: colunas[1].children[0].children[2].innerText + '\n',fontSize: 10})
                        //array_intimacoes.push({text: colunas[1].children[0].children[3].innerText + '\n',fontSize: 10})
                        if (contador == 8) {
                            array_intimacoes.push({text: '\n',fontSize: 10})
                            array_intimacoes.push({text: '\n',fontSize: 10})
                            array_intimacoes.push({text: '\n',fontSize: 10})
                            contador = 0
                        }
                        else {
                            array_intimacoes.push({text: '\n',fontSize: 10})
                            ++contador
                        }
                    }
                })
            }
            PDFGen(array_intimacoes)
            loader.style.display = 'none'
    })
}

async function activate() {
    
    state.active = await getActive()
    if (state.active == "Desativado") {
        observer.observe(input, {attributes: true})
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
})()