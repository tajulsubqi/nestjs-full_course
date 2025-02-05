import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Bob Doe',
      email: 'bobdoe@mail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Alice Doe',
      email: 'alice@mail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Mark Doe',
      email: 'markdoe@mail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: ' INTERN' | 'ADMIN' | 'ENGINEER';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: ' INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }

      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
