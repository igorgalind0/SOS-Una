<?php
session_start();
// Inicia a sessão para acessar e armazenar dados da sessão do usuário

// Verificar se os dados estão armazenados na sessão
if (isset($_SESSION['formData'])) {
    // Se os dados do formulário estão na sessão, armazena-os na variável $dados
    $dados = $_SESSION['formData'];

    // Exibe o título da página de confirmação
    echo "<h2>Confirmação de Envio</h2>";
    // Exibe o nome completo, formatando com tags HTML
    echo "<p><b>Nome:</b> " . $dados['nome'] . " " . $dados['sobrenome'] . "</p>";
    // Exibe o e-mail
    echo "<p><b>E-mail:</b> " . $dados['email'] . "</p>";
    // Exibe a contribuição do usuário
    echo "<p><b>Contribuição:</b> " . $dados['contribuicao'] . "</p>";
    // Exibe a cidade do usuário
    echo "<p><b>Cidade:</b> " . $dados['cidade'] . "</p>";
    // Exibe o telefone do usuário
    echo "<p><b>Telefone:</b> " . $dados['telefone'] . "</p>";
    // Exibe os comentários do usuário
    echo "<p><b>Comentários:</b> " . $dados['comentarios'] . "</p>";
    // Exibe a data e hora de envio do formulário
    echo "<p><b>Data de Envio:</b> " . $dados['data_envio'] . " às " . $dados['hora_envio'] . "</p>";
    // Exibe um link para retornar ao formulário
    echo '<a href="index.html">Voltar ao Formulário</a>';
} else {
    // Caso não haja dados na sessão, exibe uma mensagem de erro
    echo "Nenhum dado encontrado. Tente enviar novamente.";
}
?>