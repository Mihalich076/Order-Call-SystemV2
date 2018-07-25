
var socket = io.connect("s2.formulapro.com:3000");
var socket2 = io.connect("http://localhost:3000");

var timer;

function remove_item(id) {
    setTimeout(
        function () {
            $$("mylist").remove(id);
        }, timer[0].value*1000);
}

var output = document.getElementById('output');
var list_id = 0;


document.getElementById("audio1").play();

socket.on('chat', function (data) {
    $$("marqueess").load("/marque/data");
    $$("order_timer").load("/delete_order_timer/data");
    timer = $$("order_timer").serialize();

    list_id = list_id + 1;
    webix.ajax().get("/sounds/order",function(text, data,){
        data = data.json();  
            console.log(parseInt(data.value)/100);
   document.getElementById("audio1").volume = parseInt(data.value)/100;
  
  });
  document.getElementById("audio1").load();
    document.getElementById("audio1").play();
   // document.getElementById("audio1").volume = 1;
    if (data.win !=0 && data.win!=null){
    order = (data.win + "-" + data.message).toString();}
    else {  order = (data.message).toString();}
    if(order!=""){
    $$("mylist").add({
        id: list_id,  // adding  an item with two properties
        title: order.toString()
    }, 0);
    remove_item(list_id);}
});
socket2.on('chat', function (data) {
    $$("marqueess").load("/marque/data");
    $$("order_timer").load("/delete_order_timer/data");
    timer = $$("order_timer").serialize();

    list_id = list_id + 1;
    webix.ajax().get("/sounds/order",function(text, data,){
        data = data.json();  
            console.log(parseInt(data.value)/100);
   document.getElementById("audio1").volume = parseInt(data.value)/100;
  
  });
  document.getElementById("audio1").load();
   document.getElementById("audio1").play();
    //document.getElementById("audio1").volume = 1;
    if (data.win !=0 && data.win!=null){
        order = (data.win + "-" + data.message).toString();}
        else {  order = (data.message).toString();}
    if(order!=""){
    $$("mylist").add({
        id: list_id.toString(),  // adding  an item with two properties
        title: order.toString()
    }, 0);
    remove_item(list_id);}
});