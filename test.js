// function safeStringify(obj) {
    

//     const str = JSON.stringify(obj, function (_key, value) {
//         if (set.has(value)) {
//         return 'Circular'
//         }
//         typeof value === 'object' && set.add(value)
//         return value
//     })
//     set.clear()
//     return str
// }

function safeStringify (obj) {
    const set = new Set()
    const _dfs_fix_circular = (v) => {
        if(set.has(v)) {
            return true;
        } else {
            if(typeof v === 'object' && Object.entries(v).length > 0) { // v has children
                set.add(v); // must be a new element in the set
                Object.entries(v).forEach(entry => {
                    const key = entry[0];
                    const value = entry[1];
                    const res = _dfs_fix_circular(value);
                    if(res) { // value is Circular
                        v[key] = 'Circular';
                    } else { // value is NOT Circular
                        // Noop, next value
                    }
                })
            } else { // v is leaf
                // Noop, no need to count leaf
            }
            return false;
        }
    }
    _dfs_fix_circular(obj);
    try {
        return JSON.stringify(obj);
    } catch (error) {
        return 'Parse Error! ';
    }
}
const a = {a1: '1', a2: '1'};
a.a2 = a;
a.a3 = a;
console.log(safeStringify(a));