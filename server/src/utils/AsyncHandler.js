const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // console.log(req);
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
