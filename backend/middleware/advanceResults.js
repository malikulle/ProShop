const advanceResults = (model, populate) => async (req, res, next) => {
  let query;

  const reqQuery = {
    ...req.query,
  };

  const removeFields = ["select", "sort", "page", "limit", "filter"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  if (req.query.filter && req.query.filter !== "") {
    const keyword = req.query.filter
      ? {
          name: {
            $regex: req.query.filter,
            $options: "i",
          },
        }
      : {};

    query = query.find({ ...keyword });
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 4) || 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.advanceResults = {
    success: true,
    page: page,
    count: results.length,
    pagination,
    data: results,
    totalPages: Number(Math.ceil(total / limit)),
  };
  next();
};

module.exports = advanceResults;
