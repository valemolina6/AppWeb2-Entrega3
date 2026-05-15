export const handlealert = (text)=>{
    const alert = document.getElementById('alert')
    const txtAlert = document.getElementById('txtAlert')

    alert.classList.remove('hidden')
    txtAlert.textContent = text
}

export const handleCloseAlert = ()=>{
    const alert = document.getElementById('alert')
     alert.classList.add('hidden')
}

export const alert = ()=>{
    return `<div class="bg-red-600 mt-5 rounded-2xl p-4 hidden" id="alert">
                <div class="flex justify-between items-center">
                    <p class="txt-sm font-semibold text-red-50" id="txtAlert"></p>
                    <button class="bg-red-600 p-2 w-1/12 rounded-full text-red-50 hover:bg-red-700" id="btnCloseAlert">
                        x
                    </button>
                </div>
            </div>`
}