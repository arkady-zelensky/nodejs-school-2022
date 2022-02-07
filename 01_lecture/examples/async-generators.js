const aws = require('aws-sdk');

function chunkify(array, size) {
  const chunks = [];
  let begin = 0;
  const step = size;
  let end = size;
  while (begin < array.length) {
    const chunk = array.slice(begin, end);
    chunks.push(chunk);
    begin += step;
    end += step;
  }
  return chunks;
}

async function deleteObjects(bucket, keys) {
  const s3 = new aws.S3({ apiVersion: '2010-12-01' });
  const chunks = chunkify(keys.map((key) => ({ Key: key })), 1000);
  let params;
  for (const chunk of chunks) {
    try {
      params = {
        Bucket: bucket,
        Delete: {
          Objects: chunk,
        },
      };
      await s3.deleteObjects(params).promise();
    } catch (e) {
      console.log('Failed to delete s3 keys');
      console.log(e);
      throw e;
    }
  }
}


async function* deleteObjectsV2(bucket, keys) {
  const s3 = new aws.S3({ apiVersion: '2010-12-01' });
  let start = 0;
  const size = 3;
  while (start < keys.length) {
    const chunk = keys.slice(start, start + size);
    start += size;
    const params = {
      Bucket: bucket,
      Delete: {
        Objects: chunk.map((key) => ({ Key: key })),
      },
    };
    const result = await s3.deleteObjects(params).promise();
    for (const error of result.Errors) {
      yield error;
    }
  }
}

(async () => {
  for await (const deletedObject of deleteObjectsV2('bucket-name', ['1', '2', '3', '4', '5', '6', '7', '8'])) {
    console.log(deletedObject)
  }
})();
