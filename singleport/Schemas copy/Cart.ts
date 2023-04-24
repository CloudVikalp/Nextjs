import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { timestamp, integer, relationship } from '@keystone-6/core/fields';
export default list({
    access:allowAll, 
  fields: {
    product: relationship({ ref: 'Product', many: true, ui: { hideCreate: true }}),
    sum: integer({ validation: { isRequired: true }}),
    quantity: integer({ validation: { isRequired: true } }),
    createdAt: timestamp({ validation: { isRequired: true }}),
  },
});