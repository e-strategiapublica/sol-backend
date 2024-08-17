import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
export declare abstract class CostItemsUpdateRequestDto {
    code: string;
    name: string;
    unitMeasure: string;
    categoryId: string;
    productId: string;
    product: ProductModel;
    category: CategoryModel;
    specification: string;
    sustainable: boolean;
    product_relation: string;
}
