<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("remotemysql.com", "aDZc1ZlGD8", "QFeaJEKj3w", "aDZc1ZlGD8");


$limit = 9;


$sql = "";
if(isset($_GET['id']))
{
  if($_GET['id'] == '1')
  {
    $sql = "SELECT id, nombre,imagen,precio,condicion,consola FROM articulos order by ventas desc limit ".$limit;
  }
  else if($_GET['id'] == '2')
  {
    $sql = "SELECT nombreTienda FROM configuracion";
  }
  else if($_GET['id'] == '3')
  {
    $sql = "SELECT id, nombre,imagen,precio,condicion,consola FROM articulos where categoria='accion' order by nombre limit ".$limit;
  }
  else if($_GET['id'] == '4')
  {
    $sql = "SELECT id, nombre,imagen,precio,condicion,consola FROM articulos where categoria='deportes' order by nombre limit ".$limit;
  }
  else if($_GET['id'] == '5')
  {
    $sql = "SELECT id, nombre,imagen,precio,condicion,consola,descripcion FROM articulos where consola='ps1'";
  }


}







$result = $conn->query($sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) 
{
    $rows[] = $r;

}
$conn->close();


for($i = 0; $i < count($rows); $i++)
{
  

  if(isset($rows[0]['imagen']))
  {
    $rows[$i]['imagen'] = "data:image/png;base64,".base64_encode($rows[$i]['imagen']);
  }
}



//print_r($rows[0]['imagen']);

print json_encode($rows);
?>