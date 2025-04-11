import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import {
  GamificationService,
  UserRanking,
} from "../services/gamification.service";
import { AddPointsDto } from "../dtos/addpoints.dto";
import { Gamification } from "../schemas/gamification.schema";

@ApiTags("gamification")
@Controller("gamification")
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all gamification data" })
  @ApiResponse({
    status: 200,
    description: "All gamification data retrieved successfully",
  })
  async getAllGamification(): Promise<Gamification[]> {
    return this.gamificationService.getAllGamification();
  }

  @Get(":userId")
  @ApiOperation({ summary: "Retrieve gamification data for a user" })
  @ApiResponse({
    status: 200,
    description: "Gamification data retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  async getGamification(
    @Param("userId") userId: string,
  ): Promise<Gamification[]> {
    return this.gamificationService.getUserGamification(userId);
  }

  // @Post('add-points')
  // @ApiOperation({ summary: 'Add points to a user\'s gamification profile' })
  // @ApiBody({ type: AddPointsDto })
  // @ApiResponse({ status: 201, description: 'Points added successfully' })
  // @ApiResponse({ status: 400, description: 'Invalid data' })
  // async addPoints(@Body() addPointsDto: AddPointsDto) {
  //   return this.gamificationService.addPoints(addPointsDto);
  // }

  @Post("add-points")
  @ApiOperation({
    summary: "Add points to a user's gamification profile along with rewards",
  })
  @ApiBody({ type: AddPointsDto })
  @ApiResponse({
    status: 201,
    description: "Points and rewards added successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid data" })
  async addPoints(@Body() addPointsDto: AddPointsDto): Promise<Gamification> {
    return this.gamificationService.addPoints(addPointsDto);
  }

  @Get("ranking")
  @ApiOperation({ summary: "Get users ranking" })
  @ApiResponse({
    status: 200,
    description: "User ranking retrieved successfully",
  })
  async getRanking(): Promise<UserRanking[]> {
    return this.gamificationService.getRanking();
  }
}
