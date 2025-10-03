import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
  }
}
