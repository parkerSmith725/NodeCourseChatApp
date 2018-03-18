class Users {
    constructor () {
        this.users = [];
    }

    addUser (id,name,room) {
        var user = {id,name,room};

        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var userToRemove = this.users.filter((user) => {
            return user.id === id;
        });

        this.users = this.users.filter((user) => {
            return user.id !== id;
        });

        return userToRemove[0];
    }

    getUser (id) {
        var user = this.users.filter((user) => {
            return user.id === id;
        });

        return user[0];
    }

    getUserList (room) {
        var users = this.users.filter((user) => {
            return user.room === room
        });

        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {Users};