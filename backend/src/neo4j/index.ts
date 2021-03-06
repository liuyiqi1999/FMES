let instance;
export function getInstance() {
    if (instance) {
        return instance;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        instance = require('neode')
            .fromEnv()
            .with({
                AbstractEvent: abstractEvent,
                Event: event,
                User: user
            });
        return instance;
    }
}

export function getBuilder() {
    const instance = getInstance();
    return instance.query();
}

const abstractEvent = {
    type: 'string',
    category: 'string',
    data: 'string',
    level: 'string',
    pagerank: 'number'
}

const event = {
    type: 'string',
    category: 'string',
    trackerId: 'string',
    data: 'string',
    time: 'integer',
    level: 'string',
}

const user = {
    trackerId: 'string',
    apikey: 'string',
    sdkName: 'string',
    sdkVersion: 'string'
}
