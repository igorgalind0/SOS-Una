<?php
session_start(); // Inicia a sessão para armazenar dados do formulário

// Verificar se os campos estão preenchidos corretamente
if (isset($_POST['nome'], $_POST['sobrenome'], $_POST['email'], $_POST['contribuicao'], $_POST['cidade'], $_POST['telefone'], $_POST['comentarios'])) {

  // Armazenar dados na sessão para uso posterior (como confirmação)
  $_SESSION['formData'] = [
    'nome' => $_POST['nome'], // Armazena o nome do usuário
    'sobrenome' => $_POST['sobrenome'], // Armazena o sobrenome do usuário
    'email' => $_POST['email'], // Armazena o e-mail do usuário
    'contribuicao' => $_POST['contribuicao'], // Armazena a contribuição do usuário
    'cidade' => $_POST['cidade'], // Armazena a cidade do usuário
    'telefone' => $_POST['telefone'], // Armazena o telefone do usuário
    'comentarios' => $_POST['comentarios'], // Armazena os comentários do usuário
    'data_envio' => date('d/m/Y'), // Armazena a data de envio do formulário
    'hora_envio' => date('H:i:s') // Armazena a hora de envio do formulário
  ];

  // Definir variáveis com os dados do formulário para o e-mail
  $nome = $_POST['nome']; // Armazena o nome
  $sobrenome = $_POST['sobrenome']; // Armazena o sobrenome
  $email = $_POST['email']; // Armazena o e-mail
  $contribuicao = $_POST['contribuicao']; // Armazena a contribuição
  $cidade = $_POST['cidade']; // Armazena a cidade
  $telefone = $_POST['telefone']; // Armazena o telefone
  $comentarios = $_POST['comentarios']; // Armazena os comentários
  $data_envio = date('d/m/Y'); // Define a data de envio atual
  $hora_envio = date('H:i:s'); // Define a hora de envio atual

  // Monta o conteúdo do e-mail em formato HTML
  $arquivo = "
    <html>
      <p><b>Nome: </b>$nome $sobrenome</p> <!-- Exibe nome completo -->
      <p><b>E-mail: </b>$email</p> <!-- Exibe o e-mail -->
      <p><b>Contribuição: </b>$contribuicao</p> <!-- Exibe a contribuição -->
      <p><b>Cidade: </b>$cidade</p> <!-- Exibe a cidade -->
      <p><b>Telefone: </b>$telefone</p> <!-- Exibe o telefone -->
      <p><b>Comentários: </b>$comentarios</p> <!-- Exibe os comentários -->
      <p>Este e-mail foi enviado em <b>$data_envio</b> às <b>$hora_envio</b></p> <!-- Exibe data e hora de envio -->
    </html>
    ";

  // Destino do e-mail
  $destino = "igorgalindo950@gmail.com"; // Define o e-mail de destino
  $assunto = "Contato pelo Site"; // Define o assunto do e-mail

  // Cabeçalhos para envio de email HTML
  $headers = "MIME-Version: 1.0\n"; // Define a versão do MIME
  $headers .= "Content-type: text/html; charset=iso-8859-1\n"; // Define o tipo de conteúdo como HTML
  $headers .= "From: $nome <$email>"; // Define o remetente do e-mail

  // Enviar e-mail
  if (mail($destino, $assunto, $arquivo, $headers)) { // Envia o e-mail e verifica se foi bem-sucedido
    header("Location: ./php/confirmation.php"); // Redireciona para a página de confirmação em caso de sucesso
    exit(); // Encerra o script para garantir o redirecionamento
  } else {
    echo "Erro ao enviar o e-mail."; // Exibe mensagem de erro se o e-mail não for enviado
  }
} else {
  echo "Por favor, preencha todos os campos."; // Exibe mensagem de erro se os campos obrigatórios estiverem faltando
}
?>