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
    firstName?: string;

    /**The users last name */
    lastName?: string;

    /**The users username */
    username?: string;

    /**The users email */
    email?: string;

    /**The users role */
    role?: string;

    /**
     * The authentication token used to stay authenticated through future requests
     * @remarks  The Token is only provided when called from the login methods
     */
    token?: string;

    /**The user password, used when editing user */
    password?: string;

    userFriends: UserFriend[];
    
    invitationcode: string;
}

export class UserFriend
{
    id: number;
    friendUsername: string;
    friendUserId: string;
    friendEncryptedCode: string;
    AreFriends: boolean;

    //Foreign Key
    ApplicationUserId: string;
}

export class FriendRequestDto
{
    invetationCode: string;
    userId: string;
}

export class UpdatePasswordDto
{
    id:number;
    oldpassword:string;
    newpassword:string;
}
