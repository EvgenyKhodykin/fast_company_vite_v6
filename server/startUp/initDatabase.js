// import professionsMock from '../mockData/professions.json' assert { type: 'json' }
// import qualitiesMock from '../mockData/qualities.json' assert { type: 'json' }
// import Profession from '../models/Profession.js'
// import Quality from '../models/Quality.js '

async function initDatabase() {
    //     const professions = await Profession.find()
    //     if (professions.length !== professionsMock.length) {
    //         await createInitialEntity(Profession, professionsMock)
    //     }
    //     const qualities = await Quality.find()
    //     if (qualities.length !== qualitiesMock.length) {
    //         await createInitialEntity(Quality, qualitiesMock)
    //     }
    // }
    // async function createInitialEntity(Model, data) {
    //     await Model.collection.drop()
    //     return Promise.all(
    //         data.map(async item => {
    //             try {
    //                 delete item._id
    //                 const newItem = new Model(item)
    //                 await newItem.save()
    //                 return newItem
    //             } catch (error) {
    //                 return error
    //             }
    //         })
    //     )
}

export default initDatabase
