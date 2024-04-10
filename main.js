fetch('http://localhost:3000/credenciais' ).then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    data.map((pessoa) => {
        var bottonSide = document.getElementById("bottonSide");

        var newUserSquare = document.createElement("div");
        newUserSquare.classList.add("userSquare");

        var credContainer = document.createElement("div");
        credContainer.classList.add("credContainer");

        credContainer.innerText = "Usuário: " + pessoa.usuario + "\nNome: " + pessoa.nome + "\nSexo: " + pessoa.sexo;
        newUserSquare.appendChild(credContainer)

        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer")

        // BUT DE ATUALIZAR USUÁRIO
        var butUpdate = document.createElement("button");
        butUpdate.innerText = "?";
        butUpdate.classList.add("boxBut");
        butUpdate.onclick = function() {
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
            location.reload();
        };

        buttonContainer.appendChild(butUpdate);
        buttonContainer.appendChild(butDelete);

        newUserSquare.appendChild(buttonContainer);
        bottonSide.appendChild(newUserSquare);
    })
}).catch(function (err) {   
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
                location.reload();
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
            location.reload();
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
