const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
            username: req.body.username,
            password: req.body.password,
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.userId = dbUserData.id;
            })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});