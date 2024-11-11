<?php
session_start();

// Verificar se os dados estão armazenados na sessão
if (isset($_SESSION['formData'])) {
    $dados = $_SESSION['formData'];
    echo "<h2>Confirmação de Envio</h2>";
    echo "<p><b>Nome:</b> " . $dados['nome'] . " " . $dados['sobrenome'] . "</p>";
    echo "<p><b>E-mail:</b> " . $dados['email'] . "</p>";
    echo "<p><b>Contribuição:</b> " . $dados['contribuicao'] . "</p>";
    echo "<p><b>Cidade:</b> " . $dados['cidade'] . "</p>";
    echo "<p><b>Telefone:</b> " . $dados['telefone'] . "</p>";
    echo "<p><b>Comentários:</b> " . $dados['comentarios'] . "</p>";
    echo "<p><b>Data de Envio:</b> " . $dados['data_envio'] . " às " . $dados['hora_envio'] . "</p>";

    // Botão para voltar ao formulário
    echo '<a href="index.html">Voltar ao Formulário</a>';
} else {
    echo "Nenhum dado encontrado. Tente enviar novamente.";
}
?>