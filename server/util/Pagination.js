export const Pagination = (
  model,
  filter,
  defaultPage = 1,
  defaultLimit = 5
) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || defaultPage;

      const limit = parseInt(req.query.limit) || defaultLimit;

      const skip = (page - 1) * limit;

      const items = await model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Count the total number of documents that match the filter
      const count = await model.countDocuments(filter);

      // Attach the items and the count to the response object
      res.paginatedData = { items, count };
    } catch (error) {
      // Handle the error
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };
};
