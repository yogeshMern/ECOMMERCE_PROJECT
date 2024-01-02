const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Product = require("../Model/Product");

exports.createProduct = catchAsync(async (req, res, next) => {
  const { productName, newPrice, oldPrice, category, description } = req.body;
  const productImage = req.file.filename;
  if (!productName || !newPrice || !oldPrice || !category || !description) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  if (!productImage) {
    return res.status(400).json({ message: "Product Image missing!" });
  }

  // const existingProduct = await Product.findOne({ productName });
  // if (existingProduct) {
  //   next(new AppError("Product already exist!"), 400);
  // }

  const data = await Product.create({
    productName,
    newPrice,
    oldPrice,
    category,
    description,
    productImage,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfuly!",
    data,
  });
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  if (products.length === 0) {
    return res.status(404).json({ message: "Products not found!" });
  }

  const imgUrl = `${req.protocol}://${req.get("host")}/products_images/`;
  const productsWithImage = products.map((product) => ({
    ...product.toObject(),
    productImage: `${imgUrl}${product.productImage}`,
  }));

  res.status(200).json({
    success: true,
    message: "Product List",
    data: productsWithImage,
  });
});

exports.updateProductDetails = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const body = req.body;
  if (!_id) {
    next(new AppError("Id is not defined!"), 400);
  }

  const data = await Product.findByIdAndUpdate({ _id }, body, {
    new: true,
    runValidator: true,
  });

  if (!data) {
    next(new AppError("Data not found!"), 404);
  }

  res.status(200).json({
    success: true,
    message: "Updation successfuly!",
    data,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  if (!_id) {
    next(new AppError("Id is not defined!"), 400);
  }

  const data = await Product.findByIdAndDelete({ _id });
  if (!data) {
    next(new AppError("Data not found!"), 404);
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted successfuly!",
  });
});

exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    next(new AppError("Id is not defined!"), 400);
  }

  const data = await Product.findById(id);
  if (!data) {
    next(new AppError("Product not found!"), 404);
  }

  res.status(200).json({
    success: true,
    message: "Single product!",
    data,
  });
});

exports.popularInWomens = catchAsync(async (req, res, next) => {
  // const data = await Product.find({ category: "women" }).limit(4);

  const imgUrl = `${req.protocol}://${req.get("host")}/products_images/`;

  const data = await Product.aggregate([
    {
      $match: { category: "women" },
    },
    {
      $project: {
        _id: 1,
        productName: 1,
        newPrice: 1,
        oldPrice: 1,
        category: 1,
        productImage: {
          $concat: [imgUrl, "$productImage"],
        },
        description: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $limit: 4,
    },
  ]);

  if (!data) {
    return res.status(200).json({ message: "data not found!", data: [] });
  }

  res.status(200).json({
    success: true,
    messgae: "Womens Category Product!",
    data,
  });
});

// exports.newCollections = catchAsync(async (req, res, next) => {
//   const categories = ["women", "men", "kid"];
//   const products = [];

//   for (const category of categories) {
//     const categoryProducts = await Product.find({ category }).limit(2);
//     products.push(...categoryProducts);
//   }

//   if (products.length === 0) {
//     return res.status(200).json({ message: "data not found!", data: [] });
//   }

//   res.status(200).json({
//     success: true,
//     message: "New Collections!",
//     data: products,
//   });
// });

exports.newCollections = catchAsync(async (req, res, next) => {
  const categories = ["women", "men", "kid"];
  const products = [];

  for (const category of categories) {
    const imgUrl = `${req.protocol}://${req.get("host")}/products_images/`;
    const categoryProducts = await Product.find({ category }).limit(4);

    const productsWithImage = categoryProducts.map((product) => ({
      ...product.toObject(),
      productImage: `${imgUrl}${product.productImage}`,
    }));

    products.push(...productsWithImage);
  }

  if (products.length === 0) {
    return res.status(404).json({ message: "Data not found!", data: [] });
  }

  res.status(200).json({
    success: true,
    message: "New Collections!",
    data: products,
  });
});

exports.moreProducts = catchAsync(async (req, res, next) => {
  const imgUrl = `${req.protocol}://${req.get("host")}/products_images/`;

  const data = await Product.aggregate([
    { $sample: { size: 8 } },
    {
      $project: {
        _id: 1,
        productName: 1,
        newPrice: 1,
        oldPrice: 1,
        category: 1,
        productImage: {
          $concat: [imgUrl, "$productImage"],
        },
        description: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  if (data.length === 0) {
    return res.status(404).json({ message: "Data not found!", data: [] });
  }

  res.status(200).json({
    success: true,
    message: "More Products!",
    data,
  });
});
