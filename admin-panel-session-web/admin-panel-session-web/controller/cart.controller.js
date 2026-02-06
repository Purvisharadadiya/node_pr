const Cart = require("../model/cart.model");


//     try {
//         const { productId } = req.body;

      
//         const sessionId = req.session.id;

//         let cartItem = await Cart.findOne({ sessionId, productId });

//         if (cartItem) {
//             cartItem.quantity += 1;
//             await cartItem.save();
//         } else {
//             cartItem = await Cart.create({
//                 sessionId,
//                 productId,
//                 quantity: 1
//             });
//         }

//         res.json({
//             success: true,
//             message: "Product added to cart",
//             cartItem
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };




// exports.addToCart = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const sessionId = req.sessionID; // ✅ FIX

//     let cartItem = await Cart.findOne({ sessionId, productId });

//     if (cartItem) {
//       cartItem.quantity += 1;
//       await cartItem.save();
//     } else {
//       await Cart.create({
//         sessionId,
//         productId,
//         quantity: 1
//       });
//     }

//     res.redirect("/cart-single");

//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// };




// exports.cartSingleView = async (req, res) => {
//   try {
//     const sessionId = req.sessionID; 

//     const cartItems = await Cart.find({ sessionId }) 
//       .populate("productId");

//     res.render("websitepage/cart-single", {
//       items: cartItems  
//     });

//   } catch (err) {
//     console.log(err);
//     res.send("Error");
//   }
// };



// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const sessionId = req.sessionID;

    let cartItem = await Cart.findOne({ sessionId, productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      await Cart.create({
        sessionId,
        productId,
        quantity: 1
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};


exports.cartSingleView = async (req, res) => {
  try {
    const sessionId = req.sessionID;

    const cartItems = await Cart.find({ sessionId })
      .populate("productId");

    res.render("websitepage/cart-single", {
      items: cartItems
    });
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
};


exports.getCartJson = async (req, res) => {
  try {
    const sessionId = req.sessionID;

    const cartItems = await Cart.find({ sessionId })
      .populate("productId");

    res.json(cartItems);
  } catch (err) {
    res.json([]);
  }
};


exports.updateQuantity = async (req, res) => {
  try {
    const { cartId, action } = req.body;

    const item = await Cart.findById(cartId);
    if (!item) return res.json({});

    if (action === "plus") item.quantity += 1;

    if (action === "minus") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        await Cart.findByIdAndDelete(cartId);
        return res.json({});
      }
    }

    await item.save();
    res.json({});
  } catch (err) {
    res.json({});
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.body;
    await Cart.findByIdAndDelete(cartId);
    res.json({});
  } catch (err) {
    res.json({});
  }
};
