export class UserDto {
    id?:number;
    username?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    token?:string;

    userFriends?:UserFriend[];
    invitationcode?:string;
}

export class FriendRequestDto
{
    invetationCode:string;
    userId :number;  
}

export class UserFriend
{
    id:number;
    friendUsername:string;
    friendUserId:number;
    friendEncryptedCode:string;
    AreFriends:boolean;
    Userid:number;
}

export class ChangePassword
{
    id:number;
    oldpassword:string;
    newpassword:string;
}