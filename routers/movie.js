let mongoose = require ('mongoose');

let Actor = require('../models/actor');
let Movie = require('../models/movie');

module.exports = {
    getAll: function (Req,res) {
        Movie.find({}).populate('actors').exec(function (err,movies) {
            if(err) return res.status(400).json(err);
            res.json(movies);
        });
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },

    
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    addActor: function(req,res){
        Movie.findOne({title : req.params.title}, function (err,movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({name: req.params.name}, function (err, actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                console.log(actor)
                movie.actors.push(actor._id);
                movie.save(function (err){
                    if(err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    //1. Delete a movie by its ID
    deleteOne: function(req, res){
        Movie.findOneAndRemove({_id: req.params.id}, function(err){
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    
    //4. Remove an actor from the list of actors in a movie
    deleteActor: function(req, res){
        Movie.findOne({_id: req.params.id}, function (err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findByIdAndRemove({_id: req.params.id2}, function (err, actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(movie);
            });
        });
    },

     //5. Add an existing actor to the list of actors in a movie
     updateActor: function(req, res){
        Movie.findOne({_id: req.params.id}, function (err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.body.id}, function (err,actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err){
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            });
        });
    },

    //6. Retrieve (Get) all the movies produced between year1 and year2, where year1 > year2
    deleteMoviesByYear: function (req,res){
     Movie.deleteMany({year: {$lte: aYear}},function (err, movie){
        if(err) return res.json(err);
        res.json(movie);
       });
    },

    //8. getAll movies such that it retrieves the details of all actors for each individual movie
    getActors: function(req, res){
        Movie.find().populate('actors').exec(function (err,movie){
            if (err) return res.json(err);
            if (!movie) return res.json();
            res.json(movie);
        });
    },



}