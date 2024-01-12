<?php
 $config = require __DIR__. '/../config/config.php';
require "PHPMailerAutoload.php";
$mail = new PHPMailer;
$Mailconfig = $config['mail'];
//auth

$mail->isSMTP();
$mail->Host= $Mailconfig['host'];

$mail->Port = $Mailconfig['port'];

$mail->SMTPAuth = $Mailconfig['auth'];

$mail->SMTPSecure = $Mailconfig['secure'];

//info

$mail->Username = $Mailconfig['username'];

$mail->Password = $Mailconfig['password'];

$mail->setFrom($Mailconfig['from']['address'],$Mailconfig['from']['name']);
$mail->addAddress($email);

$mail->isHTML(true);
/**
 * $mail->Subject() is excluded , but should be included in the code when sending mail
 * $mail->Body() is excluded , but should be included in the code when sending mail
 * $mail->send() is excluded , but should be included in the code when sending mail
 * 
 */


?>