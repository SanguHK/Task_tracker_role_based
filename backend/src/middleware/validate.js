export const validate =
  (schema) =>
  (req, _res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (e) {
      // Send proper validation response
      return next({
        status: 400,
        message: "Validation error",
        details: e.errors,
      });
    }
  }