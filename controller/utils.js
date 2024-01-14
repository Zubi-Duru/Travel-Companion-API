exports.tryCatch = (foo, errorMsg = null, status = 400) => {
  return (req, res, next) => {
    foo(req, res, next).catch((error) => {
      console.log(error, errorMsg);
      res
        .status(status)
        .json(
          error.custom
            ? { error: { customError: error.custom, error: errorMsg } }
            : { error: errorMsg }
        );
    });
  };
};

exports.idExistInArray = (arr, id) => arr.some((_id) => `${_id}` === `${id}`);
