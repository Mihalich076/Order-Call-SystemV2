

module.exports = {
  upload_sound: function (req, res) {
    console.log(req.files);
    var file = req.files.upload,
      name = file.name,
      type = file.mimetype;
      name="beep.mp3";
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
};