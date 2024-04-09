fetch('http://localhost:3000/credenciais' ).then(function (response) {
// The API call was successful!
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    // This is the JSON from our response
    data.map((pessoa) => {
        // Seleciona o elemento onde os quadrados de usuário serão adicionados
        var bottonSide = document.getElementById("bottonSide");

        // Cria um novo elemento div para representar o quadrado do usuário
        var newUserSquare = document.createElement("div");
        //Adiciona a classe ao elemento
        newUserSquare.classList.add("userSquare");

        //Div para credenciais
        var credContainer = document.createElement("div");
        credContainer.classList.add("credContainer");

        // Adiciona o nome e a idade como texto dentro do quadrado
        credContainer.innerText = "Usuário: " + pessoa.usuario + "\nNome: " + pessoa.nome + "\nSexo: " + pessoa.sexo;
        newUserSquare.appendChild(credContainer)

        // Cria uma div para os botões
        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer")

        // Cria os botões
        var button1 = document.createElement("button");
        button1.innerText = "?";
        button1.classList.add("boxBut");
        button1.onclick = function() {
            document.getElementById("userInput").value = pessoa.usuario;
            document.getElementById("nameInput").value = pessoa.nome;
            document.getElementById("sexoInput").value = pessoa.sexo;
            window.scrollTo(0, 0);
        };

        // DELETANDO USUÁRIO
        var butDelete = document.createElement("button");
        butDelete.innerText = "X";
        butDelete.classList.add("boxBut");
        butDelete.onclick = function() {
            usuario  = pessoa.usuario;
            fetch(`http://localhost:3000/credenciais?usuario=${usuario}`)
            .then(response => response.json())
            .then(data => {
                const idUsuario = data[0].id;
                return fetch(`http://localhost:3000/credenciais/${idUsuario}`, {
                  method: 'DELETE',
                });
            })
            alert(`Usuário ${usuario} deletado!`);
        };

        // Adiciona os botões à div dos botões
        buttonContainer.appendChild(button1);
        buttonContainer.appendChild(butDelete);

        // Adiciona a div dos botões ao quadrado do usuário
        newUserSquare.appendChild(buttonContainer);
        
        
        // Adiciona o novo quadrado do usuário ao elemento "bottonSide"
        bottonSide.appendChild(newUserSquare);
    })
}).catch(function (err) {
// There was an error
    console.warn('Something went wrong.' , err);
});

// CADASTRANDO USUÁRIO
document.getElementById("cadastrarInput").onclick = () => {
    let usuario = document.getElementById("userInput").value;
    let nome = document.getElementById("nameInput").value;
    let sexo = document.getElementById("sexoInput").value;
    
    const dados = {
        usuario: usuario,
        nome: nome,
        sexo: sexo
      };

    fetch(`http://localhost:3000/credenciais?usuario=${usuario}`)
      .then(response => response.json())
      .then(data => {
            if (data.length <= 0) {
                fetch('http://localhost:3000/credenciais', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                });
                alert("Cadastro enviado!");
            } else {
                alert(`O usuário ${usuario} já existe!`);
            }
        })
}

document.getElementById("AtualizarInput").onclick = () => {
    let usuario = document.getElementById("userInput").value;
    let novoNome = document.getElementById("nameInput").value;
    let novoSexo = document.getElementById("sexoInput").value;

    const novosDados = {
        nome: novoNome,
        sexo: novoSexo
      };

    fetch(`http://localhost:3000/credenciais?usuario=${usuario}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            alert("Dados atualizados!");
            const idUsuario = data[0].id;
            // Atualiza os dados do usuário
            return fetch(`http://localhost:3000/credenciais/${idUsuario}`, {
                method: 'PATCH', // Ou 'PUT' se deseja substituir todos os dados
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novosDados)
            });
        } else {
            alert("Não altere o usuário!");
          }
    })
}