# FMES (WIP)
FMES Monitors Events Spectacularly

## What does it do?
FMES is a Frontend Monitoring project of my thesis. It takes all frontend monitoring data (including user events, errors, requests, debugging infos) as events, storing and analyzing it as graph data.
The main part of this project is the **key-event analyzing** feature, which finds the most important events on paths to certain target event(s) among the monitoring data. 

## Contains
- backend: Backend for [MitoJS](https://github.com/mitojs/mitojs) the SDK.
- test-vue: Playground for the system & the **key-event analyzing** feature. 

## Tech Stack
- JavaScript SDK: [MitoJS](https://github.com/mitojs/mitojs)
- Backend: [NestJS](https://github.com/nestjs/nest) / [Neode](https://github.com/adam-cowley/neode)
- Database & Algorithm: [Neo4j](https://github.com/neo4j/neo4j)
- Frontend: [Vue3](https://github.com/vuejs/vue) / [neovis.js](https://github.com/neo4j-contrib/neovis.js)
