import cartModel from "../../../db/models/cart.model.js";
import productModel from "../../../db/models/product.model.js";
import catchErrors from "../middleWare/handleErrors.js";

const addToCart = catchErrors(async function (req, res) {

  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const cartItem = await cartModel.findOne({ userId, productId });
  if (!cartItem) {
    const newCartItem = new cartModel({ userId, productId, quantity });
    await newCartItem.save();

    return res.json({ id: newCartItem._id });
  }

  res.json({ message: "Item already in cart" });
});

const getCartCount = catchErrors(async function (req, res) {
  const userId = req.user.id;
  const cartItems = await cartModel.find({ userId });
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  res.json(cartCount);
});

const removeFromCart = catchErrors(async function (req, res) {
  let productId = req.params.productId;
  let userId = req.user.id;
  let product = await productModel.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await cartModel.findOneAndDelete({ userId, productId });
  res.json({ message: "success" });
});

const updateCart = catchErrors(async function (req, res) {
  let quantity = req.body.quantity;
  let productId = req.body.productId;
  let userId = req.user.id;
  let cart = await cartModel.findOne({ productId: productId, userId: userId });
  if (cart) {
    cart.quantity = quantity;
    await cart.save();
    res.json({ id: cart._id });
  } else {
    return res.status(404).json({ message: "Cart item not found" });
  }
});


const getCartItems = catchErrors(async function (req, res) {
  const userId = req.user.id;
  const cartItems = await cartModel.find({ userId }).populate("productId");
  res.json(cartItems);
});

export { addToCart, removeFromCart, updateCart, getCartCount, getCartItems };

