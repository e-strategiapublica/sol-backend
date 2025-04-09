import { ApiProperty } from "@nestjs/swagger";

export abstract class WorkPlanRegisterRequestDto {
  @ApiProperty({ required: true, type: String })
  name: string;

  @ApiProperty({
    required: true,
    type: "array",
    items: {
      type: "object",
      properties: {
        quantity: { type: "number" },
        unitValue: { type: "number" },
        items: { type: "string" },
      },
    },
  })
  product: Array<{ quantity: number; unitValue: number; items: string }>;
}
