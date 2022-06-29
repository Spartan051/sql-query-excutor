module.exports = (app)=>{
const queries = require("../controllers/queries")
const router = require("express").Router()

router.get("/", queries.getAll );
router.get("/:id", queries.getOne );
router.post("/", queries.create );
router.delete("/:id", queries.delete );
router.put("/", queries.update );

    app.use( "/api/queries", router)
}