import bookModel from "../models/bookModel.js";

export const createBook = async (req, res) => {
    try {
        const book = new bookModel(req.body);
        const savedBook = await book.save();
        res.status(200).json(savedBook);
    } catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message || "An error occurred"});
    }
};

export const getBooks = async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(200).json(books);
    } catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message || "An error occurred"});
    }
};

export const updateBooks = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await bookModel.findByIdAndUpdate(
            id, 
            req.body,
            {new: true}
            );
        if(!updatedBook){
            return res.status(404).json({message: 'Book not found'});
        }
        res.status(200).json(updatedBook);
    } catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message || "An error occurred"});
    }
};

export const deleteBooks = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await bookModel.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json({message: "Book deleted successfully"}); 
    } catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message || "An error occurred"});
    }
}

export const getBookByAuthor = async (req, res) => {
    try {
        const {name} = req.params;
        if(!name){
            return res.status(400).json("Author name missing from params");
        }
        const books = await bookModel.find({author: name});
        if(!books.length>0){
            return res.status(404).json({message:`No books found written by ${name}`});
        }
        res.status(200).json(books);
    } catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message || "An error occurred"});
    }
}

export const getBookByPublicationYear = async (req, res) => {
    try {
        const {year} = req.params;
        if(!year){
            return res.status(400).json("Publication Year missing from params");
        }
        const books = await bookModel.find({publicationYear: year});
        if(!books.length>0){
            return res.status(404).json({message:`No books found published in ${year} `});
        }
        res.status(200).json(books);
    } catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message || "An error occurred"});
    }
}