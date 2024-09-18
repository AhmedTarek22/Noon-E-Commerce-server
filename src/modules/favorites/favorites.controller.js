import FavoriteModel from "../../../db/models/favorite.model.js";
import productModel from "../../../db/models/product.model.js";
import catchErrors from "../middleWare/handleErrors.js";

const getUserFavorites = catchErrors(async function (req, res) {
  let userId = req.user.id;
  let favorites = await FavoriteModel.find({ userId }).populate("productId");

  if (!favorites || favorites.length === 0) {
    return res.status(404).json({ message: "No favorites found" });
  }

  const favoriteProducts = favorites.map((favorite) => favorite.productId);
  res.json({ favoriteProducts });
});
const toggleFavorite = catchErrors(async function (req, res) {
  const { productId } = req.body;
  const userId = req.user.id;

  const product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const favoriteItem = await FavoriteModel.findOne({ userId, productId });
  if (favoriteItem) {
    await FavoriteModel.deleteOne({ userId, productId });
    return res.json({ message: "Product removed from favorites" });
  } else {
    await FavoriteModel.create({ userId, productId });
    return res.json({ message: "Product added to favorites" });
  }
});

const removeFromFavorite = catchErrors(async function (req, res) {
  let productId = req.params.productId;
  console.log("productId", productId);
  console.log("req.params", req.params);
  let userId = req.user.id;
  let product = await productModel.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await FavoriteModel.findOneAndDelete({ userId, productId });
  res.json({ message: "Product removed successfully" });
});

const getWishListCount = catchErrors(async function (req, res) {
  const userId = req.user.id;
  const wishlistItems = await cartModel.find({ userId });
  const wishlistCount = wishlistItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  res.json(wishlistCount);
});

export {
  getUserFavorites,
  toggleFavorite,
  removeFromFavorite,
  getWishListCount,
};
