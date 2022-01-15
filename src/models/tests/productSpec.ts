import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product: Model functionality', () => {
  let testId = 2;

  it('should have an index model', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show model', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a delete model', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a create model', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update model', () => {
    expect(store.update).toBeDefined();
  });

  it('should return a list of products', async () => {
    const result: Product[] = await store.index();
    expect(result).not.toBeFalsy();
  });

  it('should return a single product by id', async () => {
    const result: Product = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: "Test NFT",
      price: 1.5,
      category: "Super NFT"
    });
  });

  it('should create a product', async () => {
    const product: Product = {
      name: "Gorrilla NFT",
      category: "Super NFT",
      price: 2.0
    };

    const result = await store.create(product);
    testId = result.id as number;

    expect(result.name).toEqual("Gorrilla NFT");
    expect(result.category).toEqual("Super NFT");
    expect(result.price).toEqual(2.0);
  });

  it('should update a product', async () => {
    const result = await store.update({
      id: testId,
      name: "Gorrilla NFT",
      category: "Super NFT",
      price: 2.0
    });

    expect(result.name).toEqual("Gorrilla NFT");
    expect(result.category).toEqual("Super NFT");
    expect(result.price).toEqual(2.0);
  });

  it('should delete a product by id', async () => {
    const result = await store.delete(testId);
    expect(result.name).toEqual("Gorrilla NFT");
    expect(result.category).toEqual("Super NFT");
    expect(result.price).toEqual(2.0);
  });


});