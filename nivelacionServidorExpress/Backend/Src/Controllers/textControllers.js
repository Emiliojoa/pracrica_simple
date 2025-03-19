import { textModel } from "../Models/modelText.js"

export const sendText = async (req, res) => {
try {
    const {texto} = req.body

   if (!texto) {
        return res.status(400).json({msg: "Usted no ingresó ningún valor para el texto "})
    }

    const injectText = await textModel.insertOne({texto})
        
    return res.status(200).json({msg: `Texto enviado ${injectText}`})

} catch (error) {
    return res.status(400).json("Error al enviar el texto")
}}

export const getText = async(req, res) => {
    try {
        const obtainTexts = await textModel.find()
        
        return await res.status(200).json(obtainTexts)
    
    } catch (error) {
        return res.status(400).json("Error al recibir los textos")
    }}