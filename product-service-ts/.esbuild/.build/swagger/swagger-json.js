"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// swagger/swagger.js
var require_swagger = __commonJS({
  "swagger/swagger.js"(exports2, module2) {
    module2.exports = {
      "swagger": "2.0",
      "info": {
        "title": "product-service-ts",
        "version": "1"
      },
      "paths": {
        "/products/{id}": {
          "get": {
            "summary": "getProductsById",
            "description": "",
            "operationId": "getProductsById.get.products/{id}",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "type": "string"
              }
            ],
            "responses": {
              "200": {
                "description": "200 response"
              }
            }
          }
        },
        "/products": {
          "get": {
            "summary": "getProductsList",
            "description": "",
            "operationId": "getProductsList.get./products",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [],
            "responses": {
              "200": {
                "description": "200 response"
              }
            }
          }
        }
      },
      "definitions": {
        "Product": {
          "properties": {
            "id": {
              "title": "Product.id",
              "type": "string"
            },
            "title": {
              "title": "Product.title",
              "type": "string"
            },
            "description": {
              "title": "Product.description",
              "type": "string"
            },
            "price": {
              "title": "Product.price",
              "type": "number"
            }
          },
          "required": [
            "id",
            "title",
            "price"
          ],
          "additionalProperties": false,
          "title": "Product",
          "type": "object"
        },
        "Products": {
          "items": {
            "$ref": "#/definitions/Product",
            "title": "Products.[]"
          },
          "title": "Products.[]",
          "type": "array"
        },
        "ServerError": {
          "properties": {
            "message": {
              "title": "ServerError.message",
              "type": "string"
            }
          },
          "required": [
            "message"
          ],
          "additionalProperties": false,
          "title": "ServerError",
          "type": "object"
        }
      },
      "securityDefinitions": {}
    };
  }
});

// swagger/swagger-json.js
var swagger = require_swagger();
exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(swagger)
  };
};
//# sourceMappingURL=swagger-json.js.map
