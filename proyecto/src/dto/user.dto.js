export class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
        this.lastLogin = user.lastLogin;
    }
}

export class PublicUserDTO {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.role = user.role;
    }
}
