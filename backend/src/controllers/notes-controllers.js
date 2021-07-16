const notesCtrl = {},
    NoteModel = require("../models/note");

notesCtrl.getAllNotes = async(req, res) =>  {
    const notes = await NoteModel.find();
    res.json(notes);
    res.send( {status: "All notes"} );
};

notesCtrl.getNote = async(req, res) =>  {
    const noteId = await NoteModel.findById(req.params.id);
    res.json(noteId);
};

notesCtrl.postNotes = async(req, res) =>  {
    const {title, content, author} = req.body,
        newNote = new NoteModel({
        title,
        content,
        author
    });

    await newNote.save();
    res.send( {status : "Note Saved!"} );
};

notesCtrl.putNotes = async(req, res) =>  {
    const {title, content, author} = req.body;
    await NoteModel.findOneAndUpdate({_id: req.params.id}, {
        title,
        content,
        author
    });

    res.send( {status: "Updated!"} );
};

notesCtrl.deleteNotes = async(req, res) =>  {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.json( {status: "Deleted"} ); 
};

module.exports = notesCtrl;