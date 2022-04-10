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
    eventId: 'number',
    data: 'string', // TODO: 定义类型
    time: 'number',
    level: 'string',
    uid: 'number' // 用于鸭式辨形区分事件，不是唯一区分
}

const user = {
    trackerId: 'string',
    apikey: 'string',
    sdkName: 'string',
    sdkVersion: 'string'
}
