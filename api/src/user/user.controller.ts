import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}

@Get(":id")
getUser(
    @Param("id") id: string
){
return this.userService.findOneById(id);
}

}
