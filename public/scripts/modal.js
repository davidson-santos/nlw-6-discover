export default function Modal(){

    const modalwrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel')

    cancelButton.addEventListener("click", close)

    function open(){
        //adiciona a classe active
        modalwrapper.classList.add("active")
    }
    function close(){
        //remove a classe active
        modalwrapper.classList.remove("active")
    }

    return{
        open,close
    }
}