export interface RegisterItemDto {
  group: {
    _id: string;
    category_name: string;
    code: number;
    segment: string;
  };
  class: {
    _id: string;
    code: number;
    description: string;
  };
  pdm: {
    _id: string;
    code: number;
    name: string;
    unitList: string[];
  };
  code: number;
  name: string;
  propertyListValue: {
    property: string;
    value: string;
  }[];
}
