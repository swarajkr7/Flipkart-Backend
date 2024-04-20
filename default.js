import { products } from "./constants/data.js";
import Product from "./model/product_schema.js";

// Function to insert data while handling duplicates
const DefaultData = async() => {
    try {
        // Define options for insertMany
        const options = { ordered: false };
        
        // Find existing product IDs in the collection
        const existingProductIds = new Set(await Product.find().distinct('id'));
        
        // Filter out products with duplicate IDs
        const uniqueProducts = products.filter(product => !existingProductIds.has(product.id));
        
        // Insert filtered data
        await Product.insertMany(uniqueProducts, options);
        
        console.log("Data imported successfully");
    } catch (error) {
        console.log("Error while inserting default data", error.message);
    }
}

// Export the DefaultData function as default
export default DefaultData;
