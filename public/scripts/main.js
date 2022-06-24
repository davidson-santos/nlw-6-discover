import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')
//Get buttons com class check
const checkButtons = document.querySelectorAll(".actions a.check")

//adiciona eventlistener aos buttons
checkButtons.forEach(button => {
    button.addEventListener("click", handleClick)
})

const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    event.preventDefault()//usado para desativar o comportamento de link da tag <a>
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    // COLETA DE DADOS DO HTML
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id
    console.log(questionId)
    const form = document.querySelector(".modal form")
    //dados da pergunta a ser enviados com o formulário
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    // APRESENTAÇÃO ADAPTATIVA DA MODAL
    modalTitle.innerHTML = `${text} esta pergunta` //concatena
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}`
    check?modalButton.classList.remove("red") : modalButton.classList.add("red")
    modal.open()
}
