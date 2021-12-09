<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

//Тело письма
$subject = 'проект euroflex';
$body = '<h1>Проект euroflex</h1>';
if (trim(!empty($_POST['user']))) {
  $body .= '<p><strong>Имя: </strong> ' . $_POST['user'] . '</p>';
}
if (trim(!empty($_POST['user_phone']))) {
  $body .= '<p><strong>Телефон: </strong> ' . $_POST['user_phone'] . '</p>';
}
if (!empty($_POST['check'])) {  
  $checkItems = $_POST['check'];
  $body .= '<p><strong>Выбор категорий: </strong>' . '</p>';
  foreach ($checkItems as $checkItem) {
     $body .= $checkItem . '<br>';
  }
}

// Настройки PHPMailer
$mail = new PHPMailer();
try {
  $mail->isSMTP();   
  $mail->CharSet = "UTF-8";
  $mail->setLanguage('ru', 'PHPMailer/language/');
  $mail->SMTPAuth   = true;
  //$mail->SMTPDebug = 2;
  $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

  // Настройки почты
  $mail->Host       = 'smtp.yandex.ru';
  $mail->Username   = 'glaz-nad'; 
  $mail->Password   = 'hvkiorgjvipzojro'; 
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->setFrom('glaz-nad@yandex.ru', 'euroflex'); //отправитель письма  
  $mail->addAddress('glaznad75@gmail.com');  // Получатель письма

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $subject;
  $mail->Body = $body;  

  // Проверяем отправление сообщения
  if ($mail->send()) {
    $message = "Данные отправлены";
    $status = "ok";
  } 
  else {
    $message = "Ошибка при отправлении данных. Сообщение не было отправлено.";
    $status = "{$mail->ErrorInfo}";
  }

} catch (Exception $e) {
    $message = "Ошибка при отправлении данных";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
echo json_encode(["message" => $message, "status" => $status]);
