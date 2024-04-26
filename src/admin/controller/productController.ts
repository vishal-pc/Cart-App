import { Request, Response } from "express";
import * as productServices from "../services/productServices";
import { StatusCodes, ErrorMessages } from "../../validation/responseMessages";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const file = req.file as Express.Multer.File | undefined;

  try {
    const createdProduct = await productServices.createProduct(
      productData,
      file as Express.Multer.File
    );

    return res.status(createdProduct.status).json(createdProduct);
  } catch (error) {
    console.error("Error in creating product", error);
    return {
      message: ErrorMessages.ProductError,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    };
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const allProducts = await productServices.getAllProducts(page, limit);
    return res.status(allProducts.status).json(allProducts);
  } catch (error) {
    console.error("Error in getting all products", error);
    return {
      message: ErrorMessages.ProductError,
      success: false,
      status: StatusCodes.ServerError.InternalServerError,
    };
  }
};
