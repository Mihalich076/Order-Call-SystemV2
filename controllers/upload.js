

module.exports = {
  upload_files: function (req, res) {
    console.log(req.files);
    var file = req.files.upload,
      name = file.name,
      type = file.mimetype;
    if (type == 'image/jpeg' || type == "image/jpg" || type == "image/png" || type == "image/gif") {
      var uploadpath = './uploads/images/' + name;
      file.mv(uploadpath, function (err) {
        if (err) {
          console.log("File Upload Failed", name, err);
          res.send("Error Occured!")
        }
        else {
          console.log("File Uploaded", name);
          res.send('Done! Uploading files')
        }
      });
    }
    if (type == 'audio/mp3') {
      var uploadpath = './uploads/sounds/' + name;
      file.mv(uploadpath, function (err) {
        if (err) {
          console.log("File Upload Failed", name, err);
          res.send("Error Occured!")
        }
        else {
          console.log("File Uploaded", name);
          res.send('Done! Uploading files')
        }
      });
    }
    if (type == 'video/mp4' || type == 'video/avi') {
      var uploadpath = './uploads/videos/' + name;
      file.mv(uploadpath, function (err) {
        if (err) {
          console.log("File Upload Failed", name, err);
          res.send("Error Occured!")
        }
        else {
          console.log("File Uploaded", name);
          res.send('Done! Uploading files')
        }
      });
    }
  }
};