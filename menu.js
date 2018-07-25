module.exports = function (req) {

  var menu = [
    {
      value: "Users", data: [
        { href: '/users', value: "Users" },

      ]
    },
    {
      value: "Keyboard", data: [
        { href: '/gates', value: "Gates" }
      ]
    },
    {
      value: "Display", data: [
        { href: '/delete_order_timer', value: "Order delete timer" },
        { href: '/marque', value: "Margue" },
        { href: '/sounds', value: "Sounds" },
        { href: '/logo', value: "Logo" },
        { href: '/playlist', value: "PlayList" },

      ]
    },
    {
      value: "file", data: [
        { href: '/file-uploading', value: "File Uploading" }
      ]
    },
  ];

  for (var i = 0; i < menu.length; i++)
    for (var j = 0; j < menu[i].data.length; j++) {
      var item = menu[i].data[j];
      if (item.href == req.url)
        item.css = "selected";
    }

  return { menu };
};