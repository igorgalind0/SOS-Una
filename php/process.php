<?php
session_start();

// Verificar se os campos estão preenchidos corretamente
if (isset($_POST['nome'], $_POST['sobrenome'], $_POST['email'], $_POST['contribuicao'], $_POST['cidade'], $_POST['telefone'], $_POST['comentarios'])) {

  // Armazenar dados na sessão para uso posterior (como confirmação)
  $_SESSION['formData'] = [
    'nome' => $_POST['nome'],
    'sobrenome' => $_POST['sobrenome'],
    'email' => $_POST['email'],
    'contribuicao' => $_POST['contribuicao'],
    'cidade' => $_POST['cidade'],
    'telefone' => $_POST['telefone'],
    'comentarios' => $_POST['comentarios'],
    'data_envio' => date('d/m/Y'),
    'hora_envio' => date('H:i:s')
  ];

  // Campo E-mail
  $nome = $_POST['nome'];
  $sobrenome = $_POST['sobrenome'];
  $email = $_POST['email'];
  $contribuicao = $_POST['contribuicao'];
  $cidade = $_POST['cidade'];
  $telefone = $_POST['telefone'];
  $comentarios = $_POST['comentarios'];
  $data_envio = date('d/m/Y');
  $hora_envio = date('H:i:s');

  $arquivo = "
    <html>
      <p><b>Nome: </b>$nome $sobrenome</p>
      <p><b>E-mail: </b>$email</p>
      <p><b>Contribuição: </b>$contribuicao</p>
      <p><b>Cidade: </b>$cidade</p>
      <p><b>Telefone: </b>$telefone</p>
      <p><b>Comentários: </b>$comentarios</p>
      <p>Este e-mail foi enviado em <b>$data_envio</b> às <b>$hora_envio</b></p>
    </html>
    ";

  // Destino do e-mail
  $destino = "igorgalindo950@gmail.com";
  $assunto = "Contato pelo Site";

  // Cabeçalhos para envio de email HTML
  $headers = "MIME-Version: 1.0\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1\n";
  $headers .= "From: $nome <$email>";

  // Enviar e-mail
  if (mail($destino, $assunto, $arquivo, $headers)) {
    // Redirecionar para a página de confirmação
    header("Location: ./php/confirmation.php");
    exit();
  } else {
    echo "Erro ao enviar o e-mail.";
  }
} else {
  echo "Por favor, preencha todos os campos.";
}
?>