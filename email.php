<?php
use google\appengine\api\mail\Message;

$from ="andresalonsomart@gmail.com";
$to = "";
$to_copia = "";
$mensaje = "";
$subjet = "";
$mensaje_tipos = "";

if(isset($_GET['to']))
{
    $to_copia = $_GET['to'];
}

if(isset($_GET['mensaje']))
{

    $mensaje_tipos = $_GET['mensaje'];
    $mensaje = "Un tipos de la web quiere algo, se hace llamar: ".$to_copia." :";
    $mensaje .= $_GET['mensaje'];

    
}

if(isset($_GET['subjet']))
{
    $subjet = $_GET['subjet'];
}



// Notice that $image_content_id is the optional Content-ID header value of the
// attachment. Must be enclosed by angle brackets (<>)
$image_content_id = '<image-content-id>';

// Pull in the raw file data of the image file to attach it to the message.
$image_data = file_get_contents('image.jpg');

try {
    $message = new Message();
    $message->setSender($from);
    $message->addTo($from);
    $message->setSubject($subjet);
    $message->setTextBody($mensaje);
    $message->addAttachment('image.jpg', $image_data, $image_content_id);
    $message->send();
} catch (InvalidArgumentException $e) {
    echo 'Error al enviar el Email, contacta con andresalonsomart@gmail.com: ';
}

$mensaje = "Hola! Hemos recibido tu email, recibirás una respuesta pronto!";
$mensaje .= "\n Mensaje:".$mensaje_tipos;
$subjet = "Confirmacion de consulta retroshop.com";


// Notice that $image_content_id is the optional Content-ID header value of the
// attachment. Must be enclosed by angle brackets (<>)
$image_content_id = '<image-content-id>';

// Pull in the raw file data of the image file to attach it to the message.
$image_data = file_get_contents('image.jpg');

try {
    $message = new Message();
    $message->setSender($from);
    $message->addTo($to_copia);
    $message->setSubject($subjet);
    $message->setTextBody($mensaje);
    $message->addAttachment('image.jpg', $image_data, $image_content_id);
    $message->send();
    echo "Email enviado!";
} catch (InvalidArgumentException $e) {
    echo 'Error al enviar el Email, contacta con andresalonsomart@gmail.com: ';
}

?>