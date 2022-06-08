const { addnoteHandler, getAllNotesHandler, getNotebyIdHandler, editNoteByHandler, DeleteNotesByhandler, } = require("./handler");

const routes = [{
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addnoteHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotebyIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: DeleteNotesByhandler,
    },

];

module.exports = routes