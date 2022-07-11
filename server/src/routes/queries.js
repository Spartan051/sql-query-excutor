module.exports = (app)=>{
const queries = require("../controllers/queries")
const router = require("express").Router()

router.get("/queries/:id", queries.getAll );
router.get("/query/:id", queries.getOne );
router.post("/query", queries.create );
router.delete("/query/:id", queries.delete );
router.put("/query", queries.update );

    app.use( "/api", router)
}