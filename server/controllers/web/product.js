import fs from "fs";
import path from "path";
import validator from "validator";
import ProductModel from "../../models/product";
import CategoryModel from "../../models/category";
import { ltrim } from "../../utils/string";

const PRODUCT_ROUTE_MAIN = "products";
const PRODUCT_ROUTE_MAIN_URL = "/" + PRODUCT_ROUTE_MAIN;
const PRODUCT_ROUTE_LIST = PRODUCT_ROUTE_MAIN_URL + "/list";
const PRODUCT_ROUTE_ADD = PRODUCT_ROUTE_MAIN_URL + "/add";
const PRODUCT_ROUTE_EDIT = PRODUCT_ROUTE_MAIN_URL + "/edit";

export default class Product {
  static async list(req, res) {
    try {
      const products = await ProductModel.find({}).sort([["createdAt", -1]]);

      res.render(ltrim(PRODUCT_ROUTE_LIST), {
        title: "Products list",
        currentPath: req.baseUrl,
        products
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    const categories = await CategoryModel.find({}).sort([["createdAt", -1]]);

    res.render(ltrim(PRODUCT_ROUTE_ADD), {
      title: "Add a product",
      currentPath: req.baseUrl,
      categories
    });
  }

  static async store(req, res) {
    const { name, description, price, quantity, category } = req.body;
    const image = req.file;
    let hasError = false;

    if (!image) {
      req.flash("error", "Attached file is not an image.");
      hasError = true;
    }

    if (validator.isEmpty(name) || !name) {
      req.flash("error", "Product's name is mandatory.");
      hasError = true;
    }

    if (!validator.isMongoId(category) || !category) {
      req.flash("error", "Category is not valid.");
      hasError = true;
    }

    if (validator.isEmpty(description) || !description) {
      req.flash("error", "Product's description is mandatory.");
      hasError = true;
    }

    if (!validator.isFloat(price)) {
      req.flash("error", "Product's price is mandatory.");
      hasError = true;
    }

    if (!validator.isNumeric(quantity)) {
      req.flash("error", "Product's quantity is mandatory.");
      hasError = true;
    }

    // return to add page to display errors
    if (hasError) {
      return res.redirect(PRODUCT_ROUTE_ADD);
    }

    try {
      const productObj = new ProductModel({
        name: validator.escape(name.trim().toLowerCase()),
        description: validator.escape(description.trim().toLowerCase()),
        price: price,
        quantity: +quantity,
        image: validator.escape(image.filename),
        category
      });

      const savedProduct = await productObj.save();

      if (savedProduct) {
        req.flash("success", "Product has been successfully added.");
        return res.redirect(PRODUCT_ROUTE_MAIN_URL);
      }

      req.flash("error", "Product could not be added!");
      res.redirect(PRODUCT_ROUTE_ADD);
    } catch (err) {
      // remove any failed product'image
      if (image) {
        if (
          fs.existsSync(
            path.join(
              __dirname,
              `../../public/images/products/${image.filename}`
            )
          )
        ) {
          fs.unlinkSync(
            path.join(
              __dirname,
              `../../public/images/products/${image.filename}`
            )
          );
        }
      }

      req.flash("error", typeof err === Error ? err.message : err);
      res.redirect(PRODUCT_ROUTE_ADD);
    }
  }

  static async edit(req, res) {
    const productId = validator.escape(req.params.id);

    try {
      const product = await ProductModel.findById(productId);
      const categories = await CategoryModel.find({}).sort([["createdAt", -1]]);

      res.render(ltrim(PRODUCT_ROUTE_EDIT), {
        title: "Edit product",
        currentPath: req.baseUrl,
        product,
        categories
      });
    } catch (err) {
      req.flash("error", err);
      res.redirect(PRODUCT_ROUTE_MAIN_URL);
    }
  }

  static async update(req, res) {
    const { id, name, description, price, quantity, category } = req.body;
    const image = req.file;
    let hasError = false;

    if (!id) {
      req.flash("error", "Prodct was not found.");
      return res.redirect(PRODUCT_ROUTE_MAIN_URL);
    }

    if (validator.isEmpty(name) || !name) {
      req.flash("error", "Category name is mandatory.");
      hasError = true;
    }

    if (validator.isEmpty(description) || !description) {
      req.flash("error", "Product's description is mandatory.");
      hasError = true;
    }

    if (!validator.isMongoId(category) || !category) {
      req.flash("error", "Category is not valid.");
      hasError = true;
    }

    if (!validator.isFloat(price)) {
      req.flash("error", "Product's price is mandatory.");
      hasError = true;
    }

    if (!validator.isNumeric(quantity)) {
      req.flash("error", "Product's quantity is mandatory.");
      hasError = true;
    }

    // return to edit page to display errors
    if (hasError) {
      return res.redirect("/" + PRODUCT_ROUTE_EDIT + "/" + id);
    }

    try {
      let sanitizedId = validator.escape(id);
      const product = await ProductModel.findById(sanitizedId);
      const updatedProduct = {
        name: validator.escape(name.trim().toLowerCase()),
        description: validator.escape(description.trim().toLowerCase()),
        price: price,
        quantity: +quantity,
        category
      };
      const oldImage = product.image;
      let hasImage = false;

      if (image) {
        updatedProduct.image = validator.escape(image.filename);
        hasImage = true;
      }

      const productUpdated = await ProductModel.updateOne(
        { _id: sanitizedId },
        { $set: updatedProduct }
      );

      if (productUpdated.n) {
        // check if the image has been uploaded, then remove the old one
        if (hasImage) {
          if (
            fs.existsSync(
              path.join(__dirname, `../../public/images/products/${oldImage}`)
            )
          ) {
            fs.unlinkSync(
              path.join(__dirname, `../../public/images/products/${oldImage}`)
            );
          }
        }

        req.flash("success", "Product has been successfully updated.");
        return res.redirect(PRODUCT_ROUTE_MAIN_URL);
      }

      req.flash("error", "Product has not been updated.");
      res.redirect(PRODUCT_ROUTE_MAIN_URL);
    } catch (err) {
      req.flash("error", err.message);
      res.redirect(PRODUCT_ROUTE_EDIT + "/" + id);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;

    if (!id) {
      req.flash("error", "Product not found!");
      res.redirect(PRODUCT_ROUTE_MAIN_URL);
    }

    try {
      let sanitizedId = validator.escape(id);
      const deletedProduct = await ProductModel.findByIdAndDelete(sanitizedId);

      if (deletedProduct) {
        if (
          fs.existsSync(
            path.join(
              __dirname,
              `../../public/images/products/${deletedProduct.image}`
            )
          )
        ) {
          fs.unlinkSync(
            path.join(
              __dirname,
              `../../public/images/products/${deletedProduct.image}`
            )
          );
        }
      }

      req.flash("success", "Product has been successfully deleted.");
      res.redirect(PRODUCT_ROUTE_MAIN_URL);
    } catch (err) {
      req.flash("error", err);
      res.redirect(PRODUCT_ROUTE_MAIN_URL);
    }
  }
}
