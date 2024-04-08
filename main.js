fetch('https://jsonplaceholder.typicode.com/posts' ).then(function (response) {
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
        credContainer.innerText = "Usuário: " + pessoa.title + "\nNome: " + pessoa.userId + "\nSexo: " + pessoa.id;
        newUserSquare.appendChild(credContainer)

        // Cria uma div para os botões
        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer")

        // Cria os botões
        var button1 = document.createElement("button");
        button1.innerText = "?";
        button1.classList.add("boxBut");
        button1.onclick = function() {
            document.getElementById("userInput").value = pessoa.title;
            document.getElementById("nameInput").value = pessoa.userId;
            document.getElementById("sexoInput").value = "feminino";
            window.scrollTo(0, 0);
        };

        var button2 = document.createElement("button");
        button2.innerText = "X";
        button2.classList.add("boxBut");
        button2.onclick = function() {
        alert("Botão X clicado!");
        };

        // Adiciona os botões à div dos botões
        buttonContainer.appendChild(button1);
        buttonContainer.appendChild(button2);

        // Adiciona a div dos botões ao quadrado do usuário
        newUserSquare.appendChild(buttonContainer);
        
        
        // Adiciona o novo quadrado do usuário ao elemento "bottonSide"
        bottonSide.appendChild(newUserSquare);
    })
}).catch(function (err) {
// There was an error
    console.warn('Something went wrong.' , err);
});

document.getElementById("cadastrarInput").onclick = () => {
    alert("Cadastro enviado!");
}

document.getElementById("AtualizarInput").onclick = () => {
    let user = document.getElementById("userInput").value;
    if(user == ""){
        alert("Campo vazio!");
    }

    if(user != ""){
        alert("Dados de " + user + " atualizados!");
    }
}
