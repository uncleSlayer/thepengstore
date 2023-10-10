import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import multer from 'multer'
import multers3 from 'multer-s3'
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: '.env' })


export const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAU4PZPBNNF24D2GU7',
        secretAccessKey: '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'
    }
})

export const fileUpload = multer({
    storage: multers3({
        s3: s3,
        bucket: 'koshalfabrics',
        contentType: multers3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname
            })
        },
        key: (req, file, cb) => {
            cb(null, uuid() + '.jpg')
        }
    })
})