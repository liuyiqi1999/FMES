let instance;
export function getInstance() {
    if (instance) {
        return instance;
    } else {
        instance = require('neode')
            .fromEnv()
            .with({
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

const event = {
    type: 'string',
    category: 'string',
    trackerId: 'string',
    eventId: 'integer',
    data: 'string', // TODO: 定义类型
    time: 'integer',
    level: 'string',
    uid: 'integer' // 用于鸭式辨形区分事件，不是唯一区分
}

const user = {
    trackerId: 'string',
    apikey: 'string',
    sdkName: 'string',
    sdkVersion: 'string'
}
