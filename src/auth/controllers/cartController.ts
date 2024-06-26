import { Request, Response } from "express";
import { userType, CustomRequest } from "../../middleware/token/authMiddleware";
import Cart from "../models/cartModel";
import Product from "../../admin/models/productModel";
import {
  StatusCodes,
  SuccessMessages,
  ErrorMessages,
} from "../../validation/responseMessages";
import Auth from "../models/authModel";

// Add product to cart
export const addToCart = async (req: CustomRequest, res: Response) => {
  try {
    const user = req.user as userType;
    if (!user) {
      return res.json({
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
    const userId = user.userId;
    const foundUser = await Auth.findById({ _id: userId });

    const { productId, productName } = req.body;

    const product = await Product.findOne({
      _id: productId,
      productName: productName,
    });
    if (!product) {
      return res.json({
        message: ErrorMessages.ProductNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }

    if (foundUser?.userLogin === true) {
      const existingCartItem = await Cart.findOne({
        buyerUserId: foundUser,
        productId: product._id,
      });
      if (existingCartItem) {
        // Increase the quantity of the existing cart item
        existingCartItem.quantity += 1;
        const updatedCartItem = await existingCartItem.save();
        return res.json({
          message: SuccessMessages.CartAlreadySuccess,
          success: true,
          status: StatusCodes.Success.Ok,
          data: {
            _id: updatedCartItem._id,
            buyerUserId: {
              fullName: foundUser?.fullName,
              email: foundUser?.email,
            },
            productId: {
              _id: product?._id,
              productName: product?.productName,
              productPrice: product?.productPrice,
              productDescription: product?.productDescription,
              productImg: product?.productImg,
            },
            quantity: updatedCartItem.quantity,
            createdAt: updatedCartItem.createdAt,
            updatedAt: updatedCartItem.updatedAt,
          },
        });
      } else {
        const newCartItem = new Cart({
          buyerUserId: foundUser,
          productId: product._id,
          quantity: 1,
        });
        const savedCartItem = await newCartItem.save();
        if (savedCartItem) {
          return res.json({
            message: SuccessMessages.CartSuccess,
            success: true,
            status: StatusCodes.Success.Created,
            data: {
              _id: savedCartItem._id,
              buyerUserId: {
                fullName: foundUser?.fullName,
                email: foundUser?.email,
              },
              productId: {
                _id: product?._id,
                productName: product?.productName,
                productPrice: product?.productPrice,
                productDescription: product?.productDescription,
                productImg: product?.productImg,
              },
              quantity: savedCartItem.quantity,
              createdAt: savedCartItem.createdAt,
              updatedAt: savedCartItem.updatedAt,
            },
          });
        } else {
          return res.json({
            message: ErrorMessages.CartError,
            success: false,
            status: StatusCodes.ClientError.NotFound,
          });
        }
      }
    } else {
      return res.json({
        message: ErrorMessages.UserLoginCheck,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
  } catch (error) {
    console.error("Error in creating cart", error);
    return res.json({
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    });
  }
};

// Get user all cart items
export const getAllCartItems = async (req: CustomRequest, res: Response) => {
  try {
    const user = req.user as userType;
    if (!user) {
      return res.json({
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
    const userId = user.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const totalCount = await Cart.countDocuments({ buyerUserId: userId });

    const skip = (page - 1) * limit;

    const cartItems = await Cart.find({ buyerUserId: userId })
      .skip(skip)
      .limit(limit);

    let totalCartAmount = 0;
    const cartPromises = cartItems.map(async (cartItem) => {
      const product = await Product.findById(cartItem.productId);
      if (!product) {
        return res.json({
          message: ErrorMessages.ProductNotFound,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        });
      }
      if (
        product.productPrice !== null &&
        product.productPrice !== undefined &&
        cartItem.quantity !== null &&
        cartItem.quantity !== undefined
      ) {
        const itemPrice = product.productPrice * cartItem.quantity;
        totalCartAmount += itemPrice;

        const customizedCartItem = {
          _id: cartItem._id,
          buyerUserId: cartItem.buyerUserId,
          productDetails: {
            productId: cartItem.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            productDescription: product.productDescription,
            productImage: product.productImg,
          },
          quantity: cartItem.quantity,
          createdAt: cartItem.createdAt,
          updatedAt: cartItem.updatedAt,
          __v: cartItem.__v,
          itemPrice: itemPrice,
        };

        return customizedCartItem;
      } else {
        return res.json({
          message: ErrorMessages.ProductNotFound,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        });
      }
    });

    const cartResults = await Promise.all(cartPromises);

    return res.json({
      message: SuccessMessages.CartFoundSuccess,
      success: true,
      status: StatusCodes.Success.Ok,
      data: {
        cartItems: cartResults,
        totalCartAmount: totalCartAmount,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Error in getting user cart items", error);
    return res.json({
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    });
  }
};

// Get user cart item by id
export const getUserCartItemById = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { cartId } = req.params;
    const user = req.user as userType;
    if (!user) {
      return res.json({
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
    const userId = user.userId;
    const foundUser = await Auth.findById({ _id: userId });

    const cartItems = await Cart.find({ buyerUserId: userId, _id: cartId });

    let totalCartAmount = 0;
    const cartPromises = cartItems.map(async (cartItem) => {
      const product = await Product.findById(cartItem.productId);
      if (!product) {
        return res.json({
          message: ErrorMessages.ProductNotFound,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        });
      }
      if (
        product.productPrice !== null &&
        product.productPrice !== undefined &&
        cartItem.quantity !== null &&
        cartItem.quantity !== undefined
      ) {
        const itemPrice = product.productPrice * cartItem.quantity;
        totalCartAmount += itemPrice;

        const customizedCartItem = {
          _id: cartItem._id,
          buyerUserId: {
            _id: foundUser?._id,
            fullName: foundUser?.fullName,
            email: foundUser?.email,
          },
          productDetails: {
            productId: cartItem.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            productDescription: product.productDescription,
            productImage: product.productImg,
          },
          quantity: cartItem.quantity,
          createdAt: cartItem.createdAt,
          updatedAt: cartItem.updatedAt,
          __v: cartItem.__v,
          itemPrice: itemPrice,
        };

        return customizedCartItem;
      } else {
        return res.json({
          message: ErrorMessages.ProductNotFound,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        });
      }
    });

    const cartResults = await Promise.all(cartPromises);

    return res.json({
      message: SuccessMessages.CartFoundSuccess,
      success: true,
      status: StatusCodes.Success.Ok,
      data: {
        cartItems: cartResults,
        totalCartAmount: totalCartAmount,
      },
    });
  } catch (error) {
    console.error("Error in getting user cart items", error);
    return res.json({
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    });
  }
};

// Remove product quantity from cart
export const removeProductQuantity = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { cartItemId } = req.params;
    const user = req.user as userType;
    if (!user) {
      return res.json({
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }

    const userId = user.userId;
    const cartItem = await Cart.findOne({
      _id: cartItemId,
      buyerUserId: userId,
    });

    if (!cartItem) {
      return res.json({
        message: ErrorMessages.CartNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      const updatedCartItem = await cartItem.save();
      return res.json({
        message: SuccessMessages.CartItemUpdated,
        success: true,
        status: StatusCodes.Success.Ok,
        data: updatedCartItem,
      });
    } else {
      return res.json({
        message: ErrorMessages.QuantityCannotBeZero,
        success: false,
        status: StatusCodes.ClientError.BadRequest,
      });
    }
  } catch (error) {
    console.error("Error in removing cart item", error);
    return res.json({
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    });
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { cartId } = req.params;
    const user = req.user as userType;
    if (!user) {
      return res.json({
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
    const userId = user.userId;
    const foundUser = await Auth.findById({ _id: userId });

    const { productId, productName, quantity } = req.body;
    const foundProduct = await Product.findOne({
      _id: productId,
      productName: productName,
    });
    if (!foundProduct) {
      return res.json({
        message: ErrorMessages.ProductNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
    const existingCartItem = await Cart.findOne({
      buyerUserId: foundUser,
      _id: cartId,
      productId: foundProduct._id,
    });
    if (existingCartItem) {
      existingCartItem.quantity += parseInt(quantity);
      const updatedCartItem = await existingCartItem.save();
      return res.json({
        message: SuccessMessages.CartItemUpdated,
        success: true,
        status: StatusCodes.Success.Ok,
        data: updatedCartItem,
      });
    } else {
      return res.json({
        message: ErrorMessages.CartUpdateError,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
  } catch (error) {
    console.error("Error in updating cart item", error);
    return res.json({
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    });
  }
};

// Delete cart item
export const deleteCartItem = async (req: CustomRequest, res: Response) => {
  try {
    const { cartId } = req.params;
    const user = req.user as userType;
    if (!user) {
      return res.json({
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      });
    }
    const userId = user.userId;
    const cartItem = await Cart.findOne({
      _id: cartId,
      buyerUserId: userId,
    });
    await cartItem?.deleteOne();
    return res.json({
      message: SuccessMessages.CartRemove,
      success: true,
      status: StatusCodes.Success.Ok,
    });
  } catch (error) {
    console.error("Error in deleting cart item", error);
    return res.json({
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    });
  }
};
