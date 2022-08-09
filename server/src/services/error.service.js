const errorService = (err,res,concept,action) => {
  if (err.kind === "not_found") {
    console.log("error :" + err);
    res.status(404).send({
      message: `${concept} whit the given id was not found !`,
    });
  } else {
    res.status(500).send({
      message:`some error in ${action} !`,
    });
  }
};

module.exports = errorService;
