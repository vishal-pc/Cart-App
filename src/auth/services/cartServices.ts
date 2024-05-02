import {
  userType,
  CustomRequest,
} from "../../middleware/jwtToken/authMiddleware";
import Cart from "../models/cartModel";
import Product from "../../admin/models/productModel";
import {
  StatusCodes,
  SuccessMessages,
  ErrorMessages,
} from "../../validation/responseMessages";

// Add product to cart
export const addToCart = async (
  req: CustomRequest,
  productId: string,
  quantity: string
) => {
  try {
    const user = req.user as userType;
    if (!user) {
      return {
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      };
    }
    const userId = user.userId;
    const existingCartItem = await Cart.findOne({
      buyerUserId: userId,
      productId,
    });
    if (existingCartItem) {
      if (
        existingCartItem.quantity !== null &&
        existingCartItem.quantity !== undefined
      ) {
        existingCartItem.quantity += parseInt(quantity);
      }
      const updatedCartItem = await existingCartItem.save();
      return {
        message: SuccessMessages.CartSuccess,
        success: true,
        status: StatusCodes.Success.Ok,
        data: updatedCartItem,
      };
    } else {
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        return {
          message: ErrorMessages.ProductNotFound,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        };
      }

      const newCartItem = new Cart({
        buyerUserId: userId,
        productId,
        quantity,
      });
      const savedCartItem = await newCartItem.save();
      if (savedCartItem) {
        return {
          message: SuccessMessages.CartSuccess,
          success: true,
          status: StatusCodes.Success.Created,
          data: savedCartItem,
        };
      } else {
        return {
          message: ErrorMessages.CartError,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        };
      }
    }
  } catch (error) {
    console.error("Error in creating cart", error);
    return {
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    };
  }
};

// Get user all cart items
export const getAllCartIteams = async (req: CustomRequest) => {
  try {
    const user = req.user as userType;
    if (!user) {
      return {
        message: ErrorMessages.UserNotFound,
        success: false,
        status: StatusCodes.ClientError.NotFound,
      };
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
        return {
          message: ErrorMessages.ProductNotFound,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        };
      }
      if (
        product.productPrice !== null &&
        product.productPrice !== undefined &&
        cartItem.quantity !== null &&
        cartItem.quantity !== undefined
      ) {
        const itemPrice = product.productPrice * cartItem.quantity;
        totalCartAmount += itemPrice;
        return {
          cartItem: cartItem,
          itemPrice: itemPrice,
        };
      } else {
        return {
          message: ErrorMessages.ProductNotFound,
          success: false,
          status: StatusCodes.ClientError.NotFound,
        };
      }
    });

    const cartResults = await Promise.all(cartPromises);

    return {
      message: SuccessMessages.CartFoundSuccess,
      success: true,
      status: StatusCodes.DataFound.Found,
      data: {
        cartItems: cartResults,
        totalCartAmount: totalCartAmount,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error in getting user cart items", error);
    return {
      message: ErrorMessages.SomethingWentWrong,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    };
  }
};
