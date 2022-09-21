export class UserBuilder {
    id;
    parentId;
    name;
    email;
    userGroups;
    message;

    withName(name) {
        this.name = name;
        return this;
    }

    withEmail(email) {
        this.email = email;
        return this;
    }

    withUserGroup(userGroups) {
        this.userGroups = userGroups;
        return this;
    }

    build() {
        return {
            id: this.id || -1,
            parentId: this.parentId || -1,
            name: this.name,
            email: this.email,
            userGroups: this.userGroups || ["editor"],
            message: this.message || ""
        };
    }
}