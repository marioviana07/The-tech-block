const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// POST /api/users
router.post("/", (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password,
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.userId = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    console.log("login")
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({ message: "No user found" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "The password you enter is Incorrect"});
            return;
        }
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are Logged in!!!"});

    });
});

});


//logout

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
});

router.delete("/id:", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({ message: "No user found with this ID" });
            return;
        }
        res.json(dbUserData);
    })
.catch((err) => {
    console.log(err);
    res.status(500).json(err);
    
    });

});

module.exports = router;