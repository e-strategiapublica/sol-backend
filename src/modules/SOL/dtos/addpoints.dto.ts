import { ApiProperty } from '@nestjs/swagger';

export class AddPointsDto {
  @ApiProperty({ description: 'ID of the user', example: '12345' })
  userId: string;

  @ApiProperty({ description: 'Points to add', example: 50 })
  points: number;

  @ApiProperty({
    description: 'List of rewards associated with the points added',
    example: [
      { description: 'Completed registration', date: '2024-11-04' },
      { description: 'Uploaded document', date: '2024-11-05' },
    ],
  })
  rewards: { description: string; date: string }[];
}
