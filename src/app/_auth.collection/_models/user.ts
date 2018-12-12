/*export interface UserDtoResponses
{
    Id: string;
    firstame: string;
    lastname: string;
    username: string;
    email: string;

    password: string;
    token: string;

    userFriends: UserFriend[];
    invitationcode: string;
}
*/

export class UserDto
{
    /**The users Id */
    Id?: string;

    /**The users first name */
    FirstName?: string;

    /**The users last name */
    LastName?: string;

    /**The users username */
    UserName?: string;

    /**The users email */
    Email?: string;

    password?: string;

    /**The users role */
    role?: string;

    /**
     * The authentication token used to stay authenticated through future requests
     * @remarks  The Token is only provided when called from the login methods
     */
    token?: string;

    userFriends?: UserFriend[];
    
    invitationcode?: string;
}

export class UserFriend
{
    id?: number;
    friendUsername?: string;
    friendUserId?: string;
    friendEncryptedCode?: string;
    AreFriends?: boolean;

    //Foreign Key
    ApplicationUserId?: string;
}

export class FriendRequestDto
{
    invetationCode: string;
    userId: string;
}

export class UpdatePasswordDto
{
    id?:string;
    oldpassword:string;
    newpassword:string;
}

export class LoginUserDto
{
    /**the login username or email */
    usernameOrEmail: string;

    /**the login password */
    password: string;
}

export enum MyRoles {
    admin = "admin",
    manager = "manager",
    client = "client",
    restricted = "restricted",
    unverfied = "unverfied"
}