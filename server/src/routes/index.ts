import express from 'express'
import multer from 'multer'

import { FileDocumentController } from "../controller/fileDocumentController"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.put('/', upload.single('file'), FileDocumentController.saveFileDocument)
router.get('/', FileDocumentController.getAllFileDocuments)
router.get('/:id', FileDocumentController.getFileDocumentById)

export default router 