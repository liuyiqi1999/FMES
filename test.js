const a = {a1: 'a1'};
const b = {
    "type": "Code Error",
    "data": {
        "time": 1649160632807,
        "url": "http://localhost:5500/",
        "name": "TypeError",
        "level": "normal",
        "message": "a.split is not a function",
        "stack": [
            {
                "url": "http://localhost:5500/src/App.vue",
                "func": "codeError",
                "args": [],
                "line": 7,
                "column": 5
            },
            {
                "url": "http://localhost:5500/node_modules/.vite/vue.js?v=f72ef081",
                "func": "callWithErrorHandling",
                "args": [],
                "line": 1363,
                "column": 18
            },
            {
                "url": "http://localhost:5500/node_modules/.vite/vue.js?v=f72ef081",
                "func": "callWithAsyncErrorHandling",
                "args": [],
                "line": 1371,
                "column": 17
            },
            {
                "url": "http://localhost:5500/node_modules/.vite/vue.js?v=f72ef081",
                "func": "HTMLButtonElement.invoker",
                "args": [],
                "line": 7352,
                "column": 7
            }
        ],
        "type": "JAVASCRIPT",
        "errorId": 229498545
    },
    "category": "exception",
    "level": "error",
    "time": 1649160632808
};
const obj = b;

const set = new Set()
const str = JSON.stringify(obj, function (_key, value) {
if (set.has(value)) {
    return 'Circular'
}
typeof value === 'object' && set.add(value)
return value
})
set.clear()
console.log(str);