const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const modelTypeDocument = await Model.create(req.body);
    res.status(201).json({ data: modelTypeDocument });
  });

exports.getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const modelTypeDocument = await query;
    if (!modelTypeDocument) {
      return next(new ApiError(`[ ${req.params.id} ]: Not Found!`, 404));
    }
    res.status(200).json({ data: modelTypeDocument });
  });

exports.getAll = (Model, modelName) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) filter = req.filterObject;
    const countDocuments = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(countDocuments)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();
    // Execute Query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const modelTypeDocuments = await mongooseQuery;
    res.status(200).json({
      results: modelTypeDocuments.length,
      paginationResult,
      data: modelTypeDocuments,
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const modelTypeDocument = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!modelTypeDocument) {
      return next(new ApiError(`[ ${req.params.id} ]: Not Found!`, 404));
    }
    modelTypeDocument.save(); // To Trigger Save Event
    res.status(200).json({ data: modelTypeDocument });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const modelTypeDocument = await Model.findByIdAndDelete(id);
    if (!modelTypeDocument) {
      return next(new ApiError(`[ ${id} ]: Not Found!`, 404));
    }
    modelTypeDocument.remove(); // To Trigger Remove Event

    res.status(200).json({
      data: `[ ${modelTypeDocument.name || modelTypeDocument.title} ]: Deleted Successfully `,
    });
  });
