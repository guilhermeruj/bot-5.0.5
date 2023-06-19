const venom = require('venom-bot');
const  fs = require("fs");

const contatos = JSON.parse(fs.readFileSync("contatos.json", "utf8"));

venom
  .create({
    session: 'Disparo-A2m' //name of session
  })
  .then((client) => start(client, 0))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client, index) {
  console.log("inciado")

  if (index >= contatos.length) {
    console.log("Todas as mensagens foram enviadas!");
    client.close();
    return;
  }

  const contato = contatos[index];
  const telefone = contato.telefone;
  const nome = contato.nome;
  const id = contato.id;
  const mensagem = "Olá! Tudo bem?";

  const numero = "55" + telefone + "@c.us";

  await client
  .sendText(numero, mensagem)
  .then(() => {
    console.log(
      `Mensagem enviada para ${nome} no número ${numero}, foram disparados ${id}`
    );
    setTimeout(() => {
      start(client, index + 1); // Chamar a função após 30 segundos
    }, 20000); // Aguardar 30 segundos
  })
  .catch((error) => {
    console.error(`Erro ao enviar mensagem para: ${numero}`, error);
    setTimeout(() => {
      start(client, index + 1); // Chamar a função após 30 segundos, mesmo em caso de erro
    }, 20000); // Aguardar 30 segundos
  });
}
