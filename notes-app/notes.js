const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return "Your Notes.."
}

const addNote = (arg) => {
    const notes = loadNotes()
    const duplicates = notes.find(n => n.title === arg.title)

    debugger

    if (!duplicates) {
        notes.push({
            title: arg.title,
            body: arg.body
        })

        saveNote(notes)

        console.log(chalk.green("Note added!"))
    } else {
        console.log(chalk.red("Title already Exist!"))
    }




}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter(n => n.title == title)
    if (filteredNotes.length == 0) {
        console.log(chalk.red.inverse("doesn't exist!"))
    } else {
        const newN = notes.filter(n => n.title != title)
        saveNote(newN)
        console.log(chalk.green.inverse(`Note with '${title.toUpperCase()}' deleted!`))
    }

}

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach(element => {
        console.log(element.title)
    });
}


const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(n => n.title == title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red("No note found!"))
    }
}

// UTILITES
const loadNotes = () => {
    try {
        const file = fs.readFileSync('notes.json')
        return JSON.parse(file.toString())
    } catch (e) {
        return []
    }


}

const saveNote = (payload) => {
    const data = JSON.stringify(payload)
    const save = fs.writeFileSync('notes.json', data)
}

module.exports = { getNotes: getNotes, addNote: addNote, removeNote, listNotes, readNote }