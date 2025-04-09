import { ApiProperty } from "@nestjs/swagger";
import { UnitMeasureEnum } from "../enums/unit-measure.enum";
import { Category } from "../schemas/category.schema";
import { Products } from "../schemas/product.schema";
import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";

export abstract class CostItemsRegisterRequestDto {
  @ApiProperty({ type: String })
  code: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  unitMeasure: string;

  @ApiProperty({ type: String })
  categoryId: string;

  @ApiProperty({ type: String })
  productId: string;

  product: ProductModel;

  category: CategoryModel;

  @ApiProperty({ type: String })
  specification: string;

  @ApiProperty({ type: Boolean })
  sustainable: boolean;

  @ApiProperty({ type: String })
  product_relation: string;
}
