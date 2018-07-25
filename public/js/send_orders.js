
var socket = io.connect("s2.formulapro.com:3000");
var socket2 = io.connect("http://localhost:3000");

$$("send").attachEvent("onItemClick", function (id, e) {
  //alert($$('text').getValue())
  socket.emit('chat', {
    message: $$('text').getValue(),
    win: win
  });
  socket2.emit('chat', {
    message: $$('text').getValue(),
    win: win
  });
  $$('text').setValue("");
});
