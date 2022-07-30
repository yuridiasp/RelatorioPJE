

onExtensionInstalled(setInitial)

function setInitial() {
    setInitialActive()
}

async function setInitialActive() {
    let active = await getActive()
    if (active == null || active == undefined)
        await setActive("Ativado")
}
