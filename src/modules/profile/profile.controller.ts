import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, AuthUserDto } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

@Controller('profile')
@ApiTags('Thông tin cá nhân')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân của user đăng nhập', deprecated: false })
  async getCurrentUser(@AuthUser() user: AuthUserDto) {
    return await this.profileService.getCurrentUser(user);
  }

  @Patch('update')
  @ApiOperation({ summary: 'Cập nhật thông tin của một user', deprecated: false })
  update(@AuthUser() authUser: AuthUserDto, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(authUser.userId, updateProfileDto);
  }
}
