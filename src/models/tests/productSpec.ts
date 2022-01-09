import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product: Model functionality', () => {
  it('should have an index model', async () => {
      expect(store.index);
  });

  it('should have a show model',async () => {
      expect(store.show);
  });
});