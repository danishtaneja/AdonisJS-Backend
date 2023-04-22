import { v4 as uuid4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Crudapp from '../../Models/Crudapp'
import Application from '@ioc:Adonis/Core/Application'

export default class CrudappsController {
  private validationOptions = {
    type: ['image'],
    size: '10mb',
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const image = request.file('image', this.validationOptions)

    if (image) {
      const imageName = `${uuid4()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      body.image = imageName
    }
    const make = await Crudapp.create(body)
    response.status(201)
    return {
      mess: 'Created Successfully',
      data: make,
    }
  }

  public async index() {
    const GetALL = await Crudapp.all()
    return {
      data: GetALL,
    }
  }

  public async show({ params }: HttpContextContract) {
    const FindData = await Crudapp.findOrFail(params.id)

    return {
      data: FindData,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const FindData = await Crudapp.findOrFail(params.id)

    await FindData.delete()

    return {
      message: 'Deleted Successfully',
      data: FindData,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const UpdateData = await Crudapp.findOrFail(params.id)

    UpdateData.name = body.name
    UpdateData.email = body.email
    UpdateData.position = body.position

    if (UpdateData.image !== body.image || !UpdateData.image) {
      const image = request.file('image', this.validationOptions)
      if (image) {
        const imageName = `${uuid4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        UpdateData.image = imageName
      }
    }
    await UpdateData.save()

    return {
      message: 'Update Successull.',
      data: UpdateData,
    }
  }
}
