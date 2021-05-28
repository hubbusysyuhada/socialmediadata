const app = {
    apps : [],
    app: null
}

export default function appReducer (state = app, action) {
    const { type, payload } = action
    if (type === 'apps/fetch') {
        return {...state, apps: payload}
    } else if (type === 'app/fetch') {
        return {...state, app: payload}
    } else if (type === 'apps/delete') {
        let temp = JSON.parse(JSON.stringify(state.apps))
        let index = null
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                index = i
                break
            }
        }
        temp.splice(index, 1)
        return {...state, apps: temp}
    } else if (type === 'apps/edit') {
        let temp = JSON.parse(JSON.stringify(state.apps))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                console.log('ketemu');
                temp[i] = payload
            }
        }
        return {...state, apps: temp}
    } else if (type === 'apps/add') {
        let temp = JSON.parse(JSON.stringify(state.apps))
        temp.push(payload)
        return {...state, apps: temp}
    }
    return {...state}
}