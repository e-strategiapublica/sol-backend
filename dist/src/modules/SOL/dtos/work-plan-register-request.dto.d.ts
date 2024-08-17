export declare abstract class WorkPlanRegisterRequestDto {
    name: string;
    product: Array<{
        quantity: number;
        unitValue: number;
        items: string;
    }>;
}
