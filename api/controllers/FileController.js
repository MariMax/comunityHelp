var AWS = require('aws-sdk');

// Create a bucket using bound parameters and put something in it.
// Make sure to change the bucket name from "myBucket" to something unique.
function getFileList(originName, next){
  var s3bucket = new AWS.S3();
  s3bucket.listObjects({Bucket:process.env.AWSS3BUCKET,Prefix: originName}, function(err, data){
    if (err){
      next(err);
    } else {
      console.log(data);
      next(null, originName);
    }
  });
}


/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  /**
   * `FileController.upload()`
   *
   * Upload file(s) to the server's disk.
   */
  //upload: function (req, res) {
  //
  //  // e.g.
  //  // 0 => infinite
  //  // 240000 => 4 minutes (240,000 miliseconds)
  //  // etc.
  //  //
  //  // Node defaults to 2 minutes.
  //  res.setTimeout(0);
  //
  //  req.file('avatar')
  //    .upload({
  //
  //      // You can apply a file upload limit (in bytes)
  //      maxBytes: 1000000
  //
  //    }, function whenDone(err, uploadedFiles) {
  //      if (err) return res.serverError(err);
  //      else return res.json({
  //        files: uploadedFiles,
  //        textParams: req.params.all()
  //      });
  //    });
  //},

  /**
   * `FileController.s3upload()`
   *
   * Upload file(s) to an S3 bucket.
   *
   * NOTE:
   * If this is a really big file, you'll want to change
   * the TCP connection timeout.  This is demonstrated as the
   * first line of the action below.
   */
  s3upload: function (req, res) {
    // e.g.
    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    // etc.
    //
    // Node defaults to 2 minutes.
    res.setTimeout(0);
      req.file('file').upload({
        acl:'public-read',
        saveAs: undefined,
        adapter: require('skipper-s3'),
        bucket: process.env.AWSS3BUCKET,
        key: process.env.AWSS3KEY,
        secret: process.env.AWSS3SECRET
      }, function whenDone(err, uploadedFiles) {
        if (err) return res.serverError(err);
        else return res.json({
          files: uploadedFiles,
          bucket:process.env.AWSS3BUCKET,
          prefix:process.env.PREFIX
        });
      });
  }


  /**
   * FileController.download()
   *
   * Download a file from the server's disk.
   */
  //download: function (req, res) {
  //  require('fs').createReadStream(req.param('path'))
  //    .on('error', function (err) {
  //      return res.serverError(err);
  //    })
  //    .pipe(res);
  //}
};
