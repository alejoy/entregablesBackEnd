const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(productData) {
    const products = this.getProductsFromFile();
    const nextId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
    const newProduct = { id: nextId, ...productData };
    products.push(newProduct);
    this.saveProductsToFile(products);

    console.log(`Producto '${newProduct.title}' agregado con éxito.`);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find(product => product.id === id);

    if (!product) {
      console.log(`Producto con ID ${id} no encontrado.`);
    }

    return product;
  }

  updateProduct(id, updatedProductData) {
    let products = this.getProductsFromFile();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.log(`Producto con ID ${id} no encontrado.`);
      return;
    }
    products[productIndex] = { id, ...updatedProductData };
    this.saveProductsToFile(products);

    console.log(`Producto con ID ${id} actualizado con éxito.`);
  }

  deleteProduct(id) {
    let products = this.getProductsFromFile();
    products = products.filter(product => product.id !== id);
    this.saveProductsToFile(products);
    console.log(`Producto con ID ${id} eliminado con éxito.`);
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf8');
  }
}

// Testing de Entregable - Clase 4

const filePath = 'productos.json';
const manager = new ProductManager(filePath);

// Obtener la lista de productos. Debe devolver vacio 
const productsBeforeAdd = manager.getProducts();
console.log("Productos antes de agregar:", productsBeforeAdd);

// Agregar un nuevo producto
manager.addProduct({
  title: "Producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
});

// Obtener la lista de productos después de agregar uno
const productsAfterAdd = manager.getProducts();
console.log("Productos después de agregar:", productsAfterAdd);

// Obtener el producto por ID (debe existir)
const productIdToFind = 1; // El ID generado automáticamente
const foundProduct = manager.getProductById(productIdToFind);
console.log("Producto encontrado por ID:", foundProduct);

// Intentar obtener un producto inexistente por ID (debe arrojar un error)
const nonExistentProductId = 9999;
const nonExistentProduct = manager.getProductById(nonExistentProductId);
console.log("Producto no encontrado por ID:", nonExistentProduct);

// Actualizar un producto existente (cambiando el título)
manager.updateProduct(productIdToFind, {
  title: "Producto actualizado"
});

// Obtener el producto actualizado por ID
const updatedProduct = manager.getProductById(productIdToFind);
console.log("Producto actualizado:", updatedProduct);

// Eliminar un producto existente por ID
manager.deleteProduct(productIdToFind);

// Obtener la lista de productos después de eliminar uno
const productsAfterDelete = manager.getProducts();
console.log("Productos después de eliminar:", productsAfterDelete);