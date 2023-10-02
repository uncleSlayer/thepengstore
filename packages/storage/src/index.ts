import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import multer from 'multer'
import multers3 from 'multer-s3'
import { v4 as uuid } from 'uuid'


export const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAU4PZPBNNIDAI6UGU',
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