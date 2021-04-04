import * as AWS from 'aws-sdk'

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
})

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file
  const readStream = createReadStream()
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'instaclone-uploads9622',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream, // file (stream) blob, binary, stream 이 될 수 있음
    })
    .promise()
  return Location
}
