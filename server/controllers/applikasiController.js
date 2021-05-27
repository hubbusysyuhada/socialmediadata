const { SocialMedias } = require('../models')

class AppController {

    static async getAll (req, res, next) {
        console.log('masuk get all');
        try {
            const {pendiri} = req.query
            let data = await SocialMedias.findAll()
            if (pendiri) data = data.filter(sosmed => sosmed.pendiri.toLowerCase().includes(pendiri))
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
        }
    }

    static async getOne (req, res, next) {
        try {
            const {id} = req.params
            const data = await SocialMedias.findByPk(id)
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
        }
    }

    static async newApp (req, res, next) {
        try {
            let answer = {
                nama_aplikasi : req.body.nama_aplikasi,
                keterangan : req.body.keterangan,
                jumlah_pengguna : req.body.jumlah_pengguna,
                pendiri : req.body.pendiri,
                tanggal_didirikan : req.body.tanggal_didirikan
            }
            const data = await SocialMedias.create(answer)
            res.status(201).json(data)
        } catch (error) {
            console.error(error);
        }
    }

    static async editApp (req, res, next) {
        try {
            const {id} = req.params
            let answer = {
                nama_aplikasi : req.body.nama_aplikasi,
                keterangan : req.body.keterangan,
                jumlah_pengguna : req.body.jumlah_pengguna,
                pendiri : req.body.pendiri,
                tanggal_didirikan : req.body.tanggal_didirikan
            }
            const data = await SocialMedias.update(answer, {where: {id}, returning: true})
            res.status(201).json(data)
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteApp (req, res, next) {
        try {
            const {id} = req.params
            const data = await SocialMedias.destroy({where: {id}})
            if (data) res.status(201).json({message: 'delete success'})
            else throw 'internal server error'
        } catch (error) {
            res.send({message: error})
            console.error(error);
        }
    }
}

module.exports = AppController