import axios from '../helpers/axios'

export function FETCH_ALL_APPS () {
    return async (dispatch) => {
        const { data } = await axios.get('/aplikasi')
        dispatch({type: 'apps/fetch', payload: data})
    }
}

export function DELETE_APP (payload) {
    return (dispatch) => {
        axios.delete(`/aplikasi/${payload.id}`)
        dispatch({type: 'apps/delete', payload})
    }
}

export function FETCH_APP (payload) {
    return async (dispatch) => {
        let { data } = await axios.get(`/aplikasi/${payload.id}`)
        data.tanggal_didirikan = new Date(data.tanggal_didirikan).toISOString().split('T')[0]
        dispatch({type: 'app/fetch', payload: data})
    }
}

export function EDIT_APP (payload) {
    return async (dispatch) => {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        let bulan = payload.tanggal_didirikan.split('-')[1]
        bulan = months[bulan - 1]
        payload.tanggal_didirikan = `${payload.tanggal_didirikan.split('-')[2]} ${bulan} ${payload.tanggal_didirikan.split('-')[0]}`
        await axios.put(`/aplikasi/${payload.id}`, payload)
        dispatch({type: 'apps/edit', payload})
    }
}

export function ADD_APP (payload) {
    return async (dispatch) => {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        let bulan = payload.tanggal_didirikan.split('-')[1]
        bulan = months[bulan - 1]
        payload.tanggal_didirikan = `${payload.tanggal_didirikan.split('-')[2]} ${bulan} ${payload.tanggal_didirikan.split('-')[0]}`
        const { data } = await axios.post('/aplikasi', payload)
        dispatch({type: 'apps/add', payload: data})
    }
}