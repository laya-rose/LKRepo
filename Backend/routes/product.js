const express=require('express');
const router=express.Router();

const {getProducts,newProduct,getSingleProduct,updateProduct,deleteProduct}=require('../controllers/ProductController.js');

const {isAuthenticatedUser, authorizeRoles}=require('../middlewares/auth.js');

router.route('/products').get(getProducts);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

module.exports = router;
