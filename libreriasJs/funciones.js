
function juegosMostrar(tipo)
{

    var consulta = 0;

    if(tipo == 'Accion')
    {
        consulta = 3;
    }
    else if(tipo == 'Populares')
    {
        consulta=1
    }
    else if(tipo == 'Deportes')
    {
        consulta=4
    }
    else if(tipo == 'Ps1')
    {
        consulta=5
    }


  var options = {
  valueNames: [ 'name', 'born','imagen','condicion','consola','id','precio','descripcion' ],


item:'<div class="card" style="width: 12rem; display:inline-block"><div class="row">'

  + '<div class="col-md-4">'

       +'<div class="card" style="width: 12rem; display:inline-block; text-align: left;">'
    +'<img  src="" class="card-img-top imagen'+tipo+'" alt="..." value="">'
        + '<div class="card-body" style="padding:0.6rem">'
        + '<h5 class="card-title name" style="height: 60px;margin-bottom: 0px;"></h5>'
        + '<p class="card-text born" style="margin-bottom: 0px;"></p> '     
        + '<p class="card-text " style="margin-bottom: 0px;"><small class="text-muted consola_'+tipo+'"></small></p>'
        + '<p class="card-text " style="margin-bottom: 0px;"><small class="text-muted condicion_'+tipo+'"></small></p>'

        + '<button type="button" class="btn btn-primary botonCustom1_'+tipo+'" style="width:100%;" data-toggle="modal" data-target="#product_view_1"><i class="fa fa-search"></i> Detalles</button>'

        + '<div class="id" style="display:none"></div>'
        + '<div class="imagen" style="display: none"></div>'

        + '</div>'
        + '</div>'

+'<div class="modal fade product_view botonCustom2_'+tipo+'" id="product_view_1">'

+'<div  class="modal-dialog">'

+'<div class="modal-content">'

+'<div class="modal-header">'

+'<a href="#" data-dismiss="modal" class="class pull-right"><span class="glyphicon glyphicon-remove"></span></a>'

+'<h3 style="margin-right: auto;" class="modal-title nombre2_'+tipo+'"></h3>'

+'</div>'

+'<div class="modal-body">'

+'<div class="row">'

  +'<div class="col-md-4 product_img">'
    +'<img style=\"width:100%; margin-bottom: 20px;\" class=\"imagen'+tipo+'Details\" src="http://img.bbystatic.com/BestBuy_US/images/products/5613/5613060_sd.jpg" class="img-responsive">'

    +'<p id="condicion2" class="condicion2_'+tipo+'"></p> '
+'<p id="consola" class="consola2_'+tipo+'"></p> '
+'<h3 class="cost precio_'+tipo+'"><span class="glyphicon glyphicon-usd"></span> <small class="pre-cost"><span class="glyphicon glyphicon-usd"></span> 60.00</small></h3> '


    +'</div>'


+'<div class="col-md-8 product_content">'

+'<h4 style="display:none" >Product Id: <span class="id2_'+tipo+'"></span></h4>'

+'<p class="descripcion2_'+tipo+'" style="height: 78%;">Descripcion</p>'

+'<div class="row">'
+'<!-- end col -->'
+'<div class="col-md-4 col-sm-6 col-xs-12">'
+'</div>'
+'<!-- end col -->'
+'</div>'
+'<div class="space-ten"></div>'
+'<div class="btn-ground">'
+'<button style="width:100%;     background-color: #61d631;" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-shopping-cart"></span>Añadir al carrito</button>'
+'</div>'
+'</div>'
+'</div>'
+'</div>'
+'</div>'
+'</div>'
+'</div>'
+ '</div>'
+ '</div>'           

};




var Httpreq = new XMLHttpRequest(); 
Httpreq.open("GET","data.php?id="+consulta,false);
Httpreq.send(null);
var values2 = Httpreq.responseText;   



var values = [];

var userList = new List('juegos'+tipo, options, values);

var costeEnvio = 2.4;
var costeEmpaque = 1;
var comisionVenta = 5;
var comisionTienda = 10;

var costes = costeEnvio+costeEmpaque+comisionVenta;


$.each(JSON.parse(values2), function( index, value ) {
  //console.log( index + ": " + value.imagen );



  var x = document.getElementsByClassName("imagen"+tipo);
  var y = document.getElementsByClassName("imagen"+tipo+"Details");
  var botonCustom1 = document.getElementsByClassName("botonCustom1_"+tipo);
  var botonCustom2 = document.getElementsByClassName("botonCustom2_"+tipo);
  var precio = document.getElementsByClassName("precio_"+tipo);
  var condicion2 = document.getElementsByClassName("condicion2_"+tipo);
  var consola2 = document.getElementsByClassName("consola2_"+tipo);
  var nombre2 = document.getElementsByClassName("nombre2_"+tipo);
  var id2 = document.getElementsByClassName("id2_"+tipo);
  var descripcion2 = document.getElementsByClassName("descripcion2_"+tipo);




  var comis = +costes+(value.precio*comisionTienda/100);
  //comis = 0;
  var pvp = parseInt(value.precio)+comis;

  userList.add({
    id: value.id,
    name: value.nombre,
    born: 'Precio: '+(pvp.toFixed(2))+'€',
    imagen: value.imagen,
    condicion: 'Estado: '+value.condicion,
    consola: 'Consola: '+value.consola,
    precio: (pvp.toFixed(2))
    });


    $(x[index]).attr("src", value.imagen);
    $(y[index]).attr("src", value.imagen);


    $(botonCustom1[index]).attr("data-target", "#product_view_"+value.id);

    $(botonCustom2[index]).attr("id", "product_view_"+value.id);

    $(precio[index]).attr("id", "precio_"+value.id);
    $(condicion2[index]).attr("id", "condicion2_"+value.id);
    $(consola2[index]).attr("id", "consola2_"+value.id);
    $(nombre2[index]).attr("id", "nombre2_"+value.id);
    $(id2[index]).attr("id", "id2_"+value.id);
    $(descripcion2[index]).attr("id", "descripcion2_"+value.id);




    $("#precio_"+value.id).html('Precio: '+(pvp.toFixed(2))+'€');
    $("#condicion2_"+value.id).html('Condicion: '+value.condicion);
    $("#consola2_"+value.id).html('Consola: '+value.consola);
    $("#nombre2_"+value.id).html(value.nombre);
    $("#id2_"+value.id).html(value.id);
    $("#descripcion2_"+value.id).html(value.descripcion);





    if(value.imagen == 'data:image\/png;base64,')
    {
      $(x[index]).attr("src", "./img/nodisponible.png");
      $(y[index]).attr("src", "./img/nodisponible.png");

    }

});

}

