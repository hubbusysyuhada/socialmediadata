import { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_ALL_APPS, DELETE_APP } from '../store/actions'
import Swal from 'sweetalert2'

export default function Home () {
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const state_apps = useSelector(state => state.apps)
    const [filtered, setFiltered] = useState(null)
    const [searchBar, setSearchBar] = useState(null)
    const [refresh, setRefresh] = useState(false)

    console.log(state_apps, '<<< state app');

    useEffect(() => {
        dispatch(FETCH_ALL_APPS())
    }, [])

    useEffect(() => {
        if (location.search) {
            let temp = (location.search.slice(1)).split('=')
            const tempFiltered = state_apps.filter(app => app.pendiri.toLowerCase().includes(temp[1]))
            setFiltered(tempFiltered)
        } else setFiltered(null)
    }, [state_apps, refresh])

    function search (e) {
        e.preventDefault()
        if (searchBar) history.push(`/aplikasi?pendiri=${searchBar}`)
        else history.push('/aplikasi')
        setRefresh(!refresh)
    }

    function deleteApp (payload) {
        Swal.fire({
            title: 'Warning!',
            text: `Delete ${payload.nama_aplikasi} dari data?`,
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(DELETE_APP(payload
                    ))
                Swal.fire(
                    'Deleted!',
                    '',
                    'success'
                )
            }
          })
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" onClick={e => e.preventDefault()}>Informasi Sosial Media</a>
                    <form class="d-flex">
                        <input class="form-control me-sm-2" type="text" placeholder="Cari Nama Pendiri" onChange={e => setSearchBar(e.target.value)}/>
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit" onClick={search}>Search</button>
                    </form>
                </div>
            </nav>
            <div style={{marginTop: '2%', marginLeft: '1%', marginRight: '1%'}}>
                <button class="btn btn-success" onClick={e => {
                    e.preventDefault()
                    history.push('/aplikasi/add')
                }}>Tambah Aplikasi</button>
                <p>or <a href="#" onClick={e => {
                    e.preventDefault()
                    window.open('/aplikasi/doc', '_blank')
                }}>View as Document</a></p>
                <table class="table table-hover my-2">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: '5%'}}>No.</th>
                            <th scope="col" style={{width: '15%'}}>Nama Aplikasi</th>
                            <th scope="col" style={{width: '25%'}}>Keterangan</th>
                            <th scope="col" style={{width: '15%'}}>Jumlah Pengguna</th>
                            <th scope="col" style={{width: '10%'}}>Pendiri</th>
                            <th scope="col" style={{width: '15%'}}>Tanggal Didirikan</th>
                            <th scope="col" style={{width: '15%'}}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered
                            ?
                            filtered.map((app, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{app.nama_aplikasi}</td>
                                        <td>{app.keterangan}</td>
                                        <td>{app.jumlah_pengguna}</td>
                                        <td>{app.pendiri}</td>
                                        <td>{app.tanggal_didirikan}</td>
                                        <td>
                                            <button class="btn btn-warning mx-1" onClick={e => {
                                                e.preventDefault()
                                                history.push({
                                                    pathname: `/aplikasi/${app.id}`,
                                                    state: app
                                                })
                                            }}>Edit</button>
                                            <button class="btn btn-danger mx-1" onClick={e => {
                                                e.preventDefault()
                                                deleteApp(app)
                                            }}>Hapus</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            state_apps.map((app, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{app.nama_aplikasi}</td>
                                        <td>{app.keterangan}</td>
                                        <td>{app.jumlah_pengguna}</td>
                                        <td>{app.pendiri}</td>
                                        <td>{app.tanggal_didirikan}</td>
                                        <td>
                                            <button class="btn btn-warning mx-1" onClick={e => {
                                                e.preventDefault()
                                                history.push({
                                                    pathname: `/aplikasi/${app.id}`,
                                                    state: app
                                                })
                                            }}>Edit</button>
                                            <button class="btn btn-danger mx-1" onClick={(e) => {
                                                e.preventDefault()
                                                deleteApp(app)
                                            }}>Hapus</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}