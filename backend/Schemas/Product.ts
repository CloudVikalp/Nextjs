import { list } from '@keystone-6/core';
import { text, timestamp, integer } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { allowAll } from '@keystone-6/core/access';
import * as dotenv from 'dotenv';
dotenv.config()
  
export default list({
    access:allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true }}),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
        folder: process.env.CLOUDINARY_API_FOLDER || '',
      },
    }),
    price: integer({ validation: { isRequired: true }, defaultValue: 0}),
    description: text({ validation: { isRequired: true }}),
    quantityInStock: integer({ validation: { isRequired: true } }),
    createdAt: timestamp({ validation: { isRequired: true }}),
  },
  ui: {},
});