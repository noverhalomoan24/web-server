const { params } = require("@hapi/hapi/lib/validation");
const { nanoid } = require("nanoid");
const notes = require("./notes");

const addnoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createDate = new Date().toISOString();
    const updateAt = createDate;

    const newNotes = {
        title,
        tags,
        body,
        id,
        createDate,
        updateAt,
    };

    notes.push(newNotes);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil ditambah',
            data: {
                noteId: id,
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal menambah',
    })
    response.code(500);
    return response;


}


const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
})

const getNotebyIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'Success Get Data',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Data tidak ditemukan',
    });
    response.code(404);
    return response;


}

const editNoteByHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    console.log(id)
    const index = notes.findIndex((note) => note.id === id);
    console.log(notes);
    console.log(index)
    if (index !== -1) {
        console.log("Masuk sini");
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        }
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal Update Data',
    });
    response.code(404);
    return response;
}


const DeleteNotesByhandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((node) => node.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil dihapus',
        });
        respond.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal',
    });
    response.code(404);
    return response;
}


module.exports = { addnoteHandler, getAllNotesHandler, getNotebyIdHandler, editNoteByHandler, DeleteNotesByhandler };