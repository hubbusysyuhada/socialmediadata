import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_APP, EDIT_APP, ADD_APP } from '../store/actions'
import Swal from 'sweetalert2'

export default function Edit () {
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    // const state_app = useSelector(state => state.app)
    const [form, setForm] = useState({
        nama_aplikasi: null,
        keterangan: null,
        jumlah_pengguna: null,
        pendiri: null,
        tanggal_didirikan: null
    })

    function canceling (e) {
        e.preventDefault()
        setForm({
            nama_aplikasi: null,
            keterangan: null,
            jumlah_pengguna: null,
            pendiri: null,
            tanggal_didirikan: null
        })
        history.push('/aplikasi')
    }

    function submitForm (e) {
        e.preventDefault()
        let flag = true
        for (let keys in form) {
            if (!form[keys]) {
                flag = false
                break
            }
        }
        if (!flag) Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Semua data wajib diisi!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        else {
            dispatch(ADD_APP(form))
            history.push('/aplikasi')
        }
    }

    return (

        <div class="card bg-secondary mb-3" style={{maxWidth: '40rem', width: '100%', margin: 'auto', 'textAlign': 'center', marginTop: '15%'}}>
            <div class="card-header">
                Tambah Aplikasi Baru
            </div>
            <div class="card-body">
                <form style={{width: '80%', textAlign: 'center', margin: 'auto'}}>
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label my-1" style={{textAlign: 'left'}}>Nama Aplikasi</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value={form?.nama_aplikasi} onChange={e => {
                                setForm({
                                    ...form, nama_aplikasi: e.target.value
                                })
                            }}/>
                        </div>
                        <label class="col-sm-4 col-form-label my-1" style={{textAlign: 'left'}}>Keterangan</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="3" value={form?.keterangan} onChange={e => {
                                setForm({
                                    ...form, keterangan: e.target.value
                                })
                            }}/>
                        </div>
                        <label class="col-sm-4 col-form-label my-1" style={{textAlign: 'left'}}>Jumlah Pengguna</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" value={form?.jumlah_pengguna} onChange={e => {
                                setForm({
                                    ...form, jumlah_pengguna: e.target.value
                                })
                            }}/>
                        </div>
                        <label class="col-sm-4 col-form-label my-1" style={{textAlign: 'left'}}>Pendiri</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" value={form?.pendiri} onChange={e => {
                                setForm({
                                    ...form, pendiri: e.target.value
                                })
                            }}/>
                        </div>
                        <label class="col-sm-4 col-form-label my-1" style={{textAlign: 'left'}}>Tanggal Didirikan</label>
                        <div class="col-sm-8">
                            <input type="date" class="form-control" value={form?.tanggal_didirikan} onChange={e => {
                                setForm({
                                    ...form, tanggal_didirikan: e.target.value
                                })
                            }}/>
                        </div>
                        <div>
                            <button class="btn btn-danger mx-1" style={{width: '100px'}} onClick={canceling}>Cancel</button>
                            <button class="btn btn-success mx-1" style={{width: '100px'}} onClick={submitForm}>Tambah</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}