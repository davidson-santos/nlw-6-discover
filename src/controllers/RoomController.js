const Database = require("../db/config")

module.exports = {
    async create(req,res){
        const db = await Database()
        const pass = req.body.password
        let roomId
        let isRoom = true
        
        while (isRoom) {
            
            // CRIA IDENTIFICADOR DE 6 DIGITOS ALEATORIO
            for (let i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            const roomsExitIDs = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExitIDs.some(roomsExits => roomsExitIDs === roomId)

            if(! isRoom){
                // INSERÇÃO DE DADOS
                await db.run(`INSERT INTO rooms (id, pass) VALUES(
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }

        }
        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req,res){
        const db = await Database()
        const roomId = req.params.room

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

        let isQuestions = true

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isQuestions = false
            }
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isQuestions: isQuestions})

    },

    enter(req,res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
    }
}