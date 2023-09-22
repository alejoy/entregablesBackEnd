class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Error: Todos los campos son obligatorios.");
        return;
      }
  
      const isCodeRepeated = this.products.some((product) => product.code === code);
      if (isCodeRepeated) {
        console.log(`Error: El código '${code}' ya está en uso.`);
        return;
      }
  
      const product = {
        id: this.nextId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      this.nextId++;
      console.log(`Producto '${title}' agregado con éxito.`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        console.log("Error: Producto no encontrado.");
      }
    }
  }
  
  // Ejemplo de uso

  const manager = new ProductManager();
  const products = manager.getProducts();

  //Lista de productos vacia

  console.log("Lista de productos:");
  products.forEach((product) => console.log(product));

  //Agregamos productos de prueba

  manager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  manager.addProduct("Producto 2", "Descripción 2", 150, "imagen2.jpg", "abc321", 15);
  
  //Lista de productos agregados

  console.log("Lista de productos:");
  products.forEach((product) => console.log(product));
  
  //Buscamos un producto que no esta para mostrar error
  const productIdToFind = 4;
  const foundProduct = manager.getProductById(productIdToFind);
  if (foundProduct) {
    console.log(`Producto con ID ${productIdToFind}:`, foundProduct);
  }
  