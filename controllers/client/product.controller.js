const Product = require("../../models/product.model");
// [GET]/products
module.exports.index = async (req, res) => {
    const products = await Product.find({
      status: "active",
      deleted: false
    }).sort({ position: "desc"});


    for (const item of products) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
      }

    
    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products
      });
    };

module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status:"active"
    };
    
    const product = await Product.findOne(find);
    
    console.log(product);
    
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("/products");
  }
};
    