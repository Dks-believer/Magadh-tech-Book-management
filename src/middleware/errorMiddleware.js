const errorHandler = (err, req, res, next) => {
    console.log(
      "name :-",
      err.name,
      "\ncode :-",
      err.code,
      "\npath :-",
      err.path,
      "\nmessage :-",
      err.message,
      "\nstack :-",
      err.stack
    );
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
  
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
  
  export { errorHandler };
  