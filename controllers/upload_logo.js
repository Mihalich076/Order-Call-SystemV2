

module.exports = {
  upload_logo: function (req, res) {
    console.log(req.files);
    var file = req.files.upload,
      name = file.name,
      type = file.mimetype;
      name="logo.png";
    if (type == 'image/jpeg' || type == "image/jpg" || type == "image/png" || type == "image/gif") {
      var uploadpath = './media/' + name;
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