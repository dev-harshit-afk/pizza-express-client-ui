import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product as ProductType } from "@/lib/types";
import Product from "./Product";

const ProductList = async () => {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories?perPage=100`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  );

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = await categoryResponse.json();

  const productResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=4`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: { data: ProductType[] } = await productResponse.json();

  return (
    <div className=" mx-auto container py-12">
      <Tabs defaultValue={categories.data[0]?._id} className="">
        <TabsList>
          {categories.data.map((category: Category) => (
            <TabsTrigger
              key={category._id}
              value={category._id}
              className="text-lg"
            >
              {category.name}
            </TabsTrigger>
          ))}
          {/* <TabsTrigger value="pizza" className="text-lg">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-lg">
                Beverage
              </TabsTrigger> */}
        </TabsList>
        {categories.data.map((category: Category) => (
          <TabsContent key={category._id} value={category._id}>
            <div className="grid grid-cols-4 gap-6 mt-6">
              {products.data
                .filter((product) => product.category._id === category._id)
                .map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductList;
