'use strict';

import products from '../constants/products.js';

export default async (event) => {
  const { productId } = event.pathParameters;
  const product = products.find(item => item.id === +productId );
  if( product){
    return {
      statusCode: 200,
      body: JSON.stringify(product, null, 2),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify(
        {
          message: `Product with id ${productId} not found`,
          input: event,
        },
        null,
        2
      ),
    };
  }

};
