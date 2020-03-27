const fs = require('fs')
const chalk = require('chalk')


// GET NOTES FUNCTION
const getNotes = () => {
    const notes = loadNotes()

    console.log(chalk.bgMagenta.italic.inverse('Your Notes...'))

    notes.forEach((note) => {
        console.log(note.title)
    })
};


// ADD NOTE FUNCTION
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })

        saveNotes(notes)
    } else {
        console.log('Note title already in use')
    }
}


// SAVE NOTES TO FILE
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


// LIST ALL NOTES
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}


// REMOVE A SPECIFIC NOTE
const removeNote = (title) => {
    const notes = loadNotes()
    const filterNotes = notes.filter((note) => {
        return note.title !== title
    })

    if (notes.length > filterNotes.length) {
        console.log(chalk.green.inverse('Removing Note'))
        saveNotes(filterNotes);
    } else {
        console.log(chalk.red.inverse('No Note found'))
    }

}


// READ A SPEIFIC NOTE
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No note was found'))
    }
}


// EXPORT ALL FUNCTIONS TO APP.JS
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
};