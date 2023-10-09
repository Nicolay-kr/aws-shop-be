'use strict';

import products from '../constants/products.js';

export default async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(products, null, 2),
  };

};
