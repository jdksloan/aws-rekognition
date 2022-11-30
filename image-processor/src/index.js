console.log('Loading function');
        
const aws = require('aws-sdk');
const rekognition = new aws.Rekognition();

exports.handler = async (event) => {
  const imageDetails = event.Records[0].s3;
  const bucketName = imageDetails.bucket.name;
  const objectKey = imageDetails.object.key;
  try {
    const rekognitionResp = await rekognition
    .detectLabels({
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: objectKey,
        },
      },
      MaxLabels: 20,
      MinConfidence: 80,
    })
    .promise();

    console.log('rekognitionResp:', rekognitionResp);
    return rekognitionResp;
  } catch (err) {
      console.log(err);
      const message = `Error getting labes from ${objectKey} from bucket ${bucketName}. Make sure they exist and your bucket is in the same region as this function.`;
      console.log(message);
      throw new Error(message);
  }
};