import { Controller, Get } from '@nestjs/common';
import { getInstance } from './neo4j';

@Controller()
export class AppController {
    constructor() {}

  @Get()
    async getHello(): Promise<any> {
      const instance = getInstance();
      const res = await instance.cypher('MATCH (n) RETURN count(n) AS count');
      return `There are ${res.records[0].get('count')} nodes in the database`;
    }
}
