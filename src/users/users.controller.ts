import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUser } from './DTO/createUser.dto';
import { UpdateUser } from './DTO/updateUser.dto';
import { MyUuidPipe } from 'src/common/pipes/my-uuid/my-uuid.pipe';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { UseGuards } from '@nestjs/common';

@Controller('users')
// @UsePipes(ValidationPipe)
export class UsersController {
  constructor(
    private _UsersService: UsersService,
    private _ConfigService: ConfigService,
    private _AuthService: AuthService,
    
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  find(): Promise<CreateUser[]> {
    console.log(this._ConfigService.get<string>('TEST'));

    return this._UsersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //201
  // @UsePipes(ValidationPipe)
  create(@Body() user: CreateUser): Promise<CreateUser> {
    return this._UsersService.create(user);
  }

  @Get(':id')
  // ,@Query('x',ParseIntPipe) x
  // findOne(@Param('id', MyUuidPipe) id: string):  Promise<CreateUser> {
  findOne(@Param('id') id: string): Promise<CreateUser> {
    return this._UsersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') userId: string,
    @Body() updatedUser: UpdateUser,
  ): Promise<CreateUser> {
    return this._UsersService.update(userId, updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    this._UsersService.delete(id);
  }
  @Post('login')
  async login(@Body() user: CreateUser): Promise<CreateUser> {
    return await this._AuthService.login(user);
  }
}
