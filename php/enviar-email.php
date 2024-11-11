<?php
//Variáveis
$nome = $_POST['nome'];
$sobrenome = $_POST['sobrenome'];
$email = $_POST['email'];
$contribuicao = $_POST['contribuicaoArea'];
$cidade = $_POST['cidade'];
$telefone = $_POST['telefone'];
$comentarios = $_POST['comentarios'];
$data_envio = date('d/m/Y');
$hora_envio = date('H:i:s');

//Compo E-mail
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

//Emails para quem será enviado o formulário
$destino = "igorgalindo950@gmail.com";
$assunto = "Contato pelo Site";

//Este sempre deverá existir para garantir a exibição correta dos caracteres
$headers = "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\n";
$headers .= "From: $nome <$email>";

//Enviar
mail($destino, $assunto, $arquivo, $headers);

echo "<meta http-equiv='refresh' content='10;URL=./index.html'>";
?>