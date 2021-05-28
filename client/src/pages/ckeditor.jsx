import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FETCH_ALL_APPS } from '../store/actions'

export default function Editor () {
    const dispatch = useDispatch()
    let state_app = useSelector(state => state.apps)
    console.log(state_app, '<<<< state app');
    
    useEffect( () => {
        dispatch(FETCH_ALL_APPS())
    }, [])

    if (state_app.length > 0) {
        ClassicEditor
            .create( document.querySelector( '#editor' ))
            .then( editor => {
                window.editor = editor;
            } )
            .catch( error => {
                console.error( 'There was a problem initializing the editor.', error );
            } );
    }

    if (state_app.length === 0) {
        return (
            <body>
                <div id="editor" style={{height: '100vh'}}>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>loading...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        )
    }
    else {
        return (
            <body>
                <div id="editor" style={{height: '100vh'}}>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Aplikasi</th>
                                <th>Keterangan</th>
                                <th>Jumlah Pengguna</th>
                                <th>Pendiri</th>
                                <th>Tanggal Didirikan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state_app.map((app, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{app.nama_aplikasi}</td>
                                    <td>{app.keterangan}</td>
                                    <td>{app.jumlah_pengguna}</td>
                                    <td>{app.pendiri}</td>
                                    <td>{app.tanggal_didirikan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </body>
        )
    }
}