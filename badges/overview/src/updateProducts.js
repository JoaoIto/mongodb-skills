use("shop");

const enrichmentColl = "enrichment";
const targetColl = "products";

const lookupEnrichment = {
  $lookup: {
    from: enrichmentColl,
    localField: "_id",
    foreignField: "product_id",
    pipeline: [{ $project: { _id: 0, product_id: 0 } }],
    as: "enrich",
  },
};

const replaceRoot = {
  $replaceRoot: {
    newRoot: { $mergeObjects: ["$$ROOT", { $arrayElemAt: ["$enrich", 0] }] },
  },
};

const projectStage = {
  $project: {
    enrich: 0,
  },
};

const mergeStage = {
  $merge: {
    into: targetColl,
    whenMatched: "merge",
    whenNotMatched: "discard",
  },
};

const pipeline = [lookupEnrichment, replaceRoot, projectStage, mergeStage];

db.products.aggregate(pipeline);
