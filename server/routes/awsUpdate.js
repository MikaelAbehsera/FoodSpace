var multer = require('multer');
var AWS = require('aws-sdk');
var upload = multer({ dest: 'uploads/' })
const fs = require('file-system')

AWS.config.update({
    accessKeyId: process.env.DO_KEY,
    secretAccessKey: process.env.DO_SECRETKEY
});

var s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com')
});

  
  
  app.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will contain the text fields, if there were any
    console.log(req.file)

    var bodystream = fs.createReadStream(req.file.path);
    
    var params = {
      Body: bodystream,
      Bucket: process.env.DO_BUCKET,
      Key: 'uploads/'+req.file.filename,
      ACL: 'public-read',
      Metadata: {
        'Content-Type': 'image/jpeg'
      }
    }
    
    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        console.log(data)
        const storedImage = `https://${process.env.DO_BUCKET}.nyc3.digitaloceanspaces.com/${params.Key}`;
        console.log(storedImage)
      } 
    })

    // return storedImage to be stored in knex, if failed - returns nulls = returned should check if null/valid
})
