var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core4 = require("@keystone-6/core");

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionSecret = "vbsdkblasmnc;jkcpk;,m;k[edjdjnndnleee";
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// Schemas/User.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_access = require("@keystone-6/core/access");
var User_default = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: (0, import_fields.password)({ validation: { isRequired: true } })
  }
});

// Schemas/Product.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_access2 = require("@keystone-6/core/access");
var dotenv = __toESM(require("dotenv"));
dotenv.config();
var Product_default = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    slug: (0, import_fields2.text)({ validation: { isRequired: true } }),
    image: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
        apiKey: process.env.CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINARY_API_SECRET || "",
        folder: process.env.CLOUDINARY_API_FOLDER || ""
      }
    }),
    price: (0, import_fields2.integer)({ validation: { isRequired: true }, defaultValue: 0 }),
    description: (0, import_fields2.text)({ validation: { isRequired: true } }),
    quantityInStock: (0, import_fields2.integer)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields2.timestamp)({ validation: { isRequired: true } })
  },
  ui: {}
});

// Schemas/Cart.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Cart_default = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    product: (0, import_fields3.relationship)({ ref: "Product", many: true, ui: { hideCreate: true } }),
    sum: (0, import_fields3.integer)({ validation: { isRequired: true } }),
    quantity: (0, import_fields3.integer)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields3.timestamp)({ validation: { isRequired: true } })
  }
});

// keystone.ts
var dotenv2 = __toESM(require("dotenv"));
dotenv2.config({ path: ".env" });
var keystone_default = (0, import_core4.config)(
  withAuth({
    server: {
      cors: { origin: ["http://localhost:3001"], credentials: true }
    },
    db: {
      provider: "postgresql",
      url: "postgres://postgres:Vikalp@99@localhost:5432/firstproject"
    },
    lists: {
      User: User_default,
      Product: Product_default,
      Cart: Cart_default
    },
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    }
  })
);
