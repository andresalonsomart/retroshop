<?php
$ch = curl_init();

$url = "https://www.tecviajuegos.com/productos/playstation/juegos-nuevos-precintados/";


$cliente = curl_init();
curl_setopt($cliente, CURLOPT_URL, $url);
curl_setopt($cliente, CURLOPT_HEADER, 0);
curl_setopt($cliente, CURLOPT_RETURNTRANSFER, true); 

$contenido = curl_exec($cliente);
curl_close($cliente);


$filtro1 = 'thumb_pro1';
$contenido = explode($filtro1,$contenido);

$rows = array();
$productos = array();

for($i = 1; $i < count($contenido); $i++)
{
        $titulo = $contenido;
        $titulo[$i] = substr($titulo[$i], 257);
        $titulo[$i] = substr($titulo[$i], 0, -34);
        $titulo[$i] = explode('€',$titulo[$i]);
        $titulo = $titulo[$i][0];

        $nombre = $contenido;
        $nombre[$i] = explode('alt',$nombre[$i]);
        $nombre = $nombre[$i][1];
        $nombre = substr($nombre, 2);
        $nombre = substr($nombre, 0, -40);


        if($i == count($contenido)-1)
        {
            $nombre = substr($nombre, 0, -12321);
        }


        $titulo = explode('Precio',$titulo);
        $titulo = $titulo[1];

        array_push($rows,$titulo." - ".$nombre);
}


for($i = 0; $i < count($rows); $i++)
{
    $productos[$i]['precio'] = explode('-',$rows[$i])[0];
    $productos[$i]['nombre'] = explode('-',$rows[$i])[1];
    $productos[$i]['condicion'] = 'nuevo con precinto';
    $productos[$i]['consola'] = 'PS1';
    $productos[$i]['tienda'] = 'tecviajuegos';
}

for($i = 0; $i < count($productos); $i++)
{
    $conn = new mysqli("localhost", "admin", "admin,666", "avoga");
    $sql = "INSERT INTO articulos (nombre, precio,condicion,consola,tienda) 
    VALUES (
    '".$productos[$i]['nombre']."', 
    '".$productos[$i]['precio']."',
    '".$productos[$i]['condicion']."', 
    '".$productos[$i]['consola']."',
    '".$productos[$i]['tienda']."', 
    )";
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}






echo $productos[0]['nombre'];
echo $productos[0]['precio'];


//print_r($ch);



?>