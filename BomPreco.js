class Pedido {
    constructor(idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada) {
        this.idPedido = idPedido;
        this.idCliente = idCliente;
        this.status = status;
        this.dataPedido = dataPedido;
        this.nomeProduto = nomeProduto;
        this.qtdComprada = qtdComprada;
    }
}

class Funcionario {
    constructor(id, nome, cpf, email, senha) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente {
    constructor(id, nome, dataNascimento, cpf, email, senha, listaPedidos) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.listaPedidos = listaPedidos;
    }
}

class Produtos {
    constructor(dataValidade, preco, qtdEstoque, nome, descricao) {
        this.dataValidade = dataValidade;
        this.preco = preco;
        this.qtdEstoque = qtdEstoque;
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Avaliacao {
    constructor(nomeCliente, nomeProduto, textoAvaliacao) {
        this.nomeCliente = nomeCliente;
        this.nomeProduto = nomeProduto;
        this.textoAvaliacao = textoAvaliacao;
    }
}

class Sistema {
    constructor() {
        this.funcionariosLogados = [];
        this.clientesLogados = [];
        this.listaProdutos = [];
        this.listaPedidos = [];
        this.listaAvaliacoes = [];
        this.lerOpcao = require('readline-sync');
        this.idPedido = 0;
        this.idClientes = 0;
        this.idFuncionarios = 0;
    }

    //Metodos Auxiliares Gerais
    MensagemSucesso() {
        console.log("Dados Alterados Com sucesso!");
    }

    TelaInicial() {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo a Tela Inicial!"
        this.MensagemInicial(MensagemInicial);

        //Interface do Usuario
        let listaOpcoesValidas = [1, 2, 3];
        let mensagemUsuario = "\n1 - Login \n2 - Cadastrar \n3 - Sair \n\nEscolha uma opcao: "
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        //Validacao de Entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acoes:
        switch (opcao) {
            case 1:
                this.Login();
                break;

            case 2:
                this.Cadastrar();
                break;

            default:
                this.Sair();
                break;
        }

    }

    ValidacaoEntrada(listaOpcoesValidas, opcaoUsuario, mensagem) {
        /*Valida Entradas do Usuario recebendo: "listaOpcoesValidas: lista com as opcoes de entradas validas", "opcaoUsuario = a opcao que o usuario digitou",
        "mensagem: mensagem que voce quer que apareca para o usuario caso ele digite uma opcao Invalida"*/
        while (!listaOpcoesValidas.includes(opcaoUsuario)) {
            console.log("\nPor favor digite uma opcao valida: ")
            opcaoUsuario = parseInt(this.lerOpcao.question(mensagem));
        }

        return opcaoUsuario;
    }

    MensagemInicial(MensagemInicial) {
        /*Cria uma mensagem inicial ao entrar nos métodos*/
        console.log("*".repeat(20));
        console.log(MensagemInicial);
        console.log("*".repeat(20));
    }

    VerificarInt(numero) {
        let numeroVerificado = numero;

        while (!Number.isInteger(numeroVerificado)) {
            numeroVerificado = parseInt(this.lerOpcao.question("\n Digite apenas numeros: "));
        }

        return numeroVerificado;

    }

    //Metodos Auxiliares Cadastros
    MensagemFinalCadastros(nome) {
        //Cria uma mensagem personalizada ao final dos cadastros
        console.log(nome + "," + "cadastrado com sucesso!");
    }

    CadastrarFuncionario() {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Funcionario Novo!"
        this.MensagemInicial(MensagemInicial);

        //Solicitar dados Funcionario;
        let nome = this.lerOpcao.question("\nInforme seu nome de Usuario: ") //nome = this.VerificarString(nome)?;

        let cpf = parseInt(this.lerOpcao.question("\nInforme seu CPF: "));
        cpf = this.VerificarInt(cpf);

        let email = this.lerOpcao.question("\nInforme seu email: ");
        let senha = this.lerOpcao.question("\nInforme sua senha: ");

        let id = this.idFuncionarios;
        this.idFuncionarios++; //Atualiza IdFuncionarios no Sistema

        //Cadastrar Funcionario
        let funcionario = new Funcionario(id, nome, cpf, email, senha);
        this.funcionariosLogados.push(funcionario);

        //Mensagem Final e Voltar ao Menu Inicial
        this.MensagemFinalCadastros(nome);
        this.TelaInicial();


    }

    CadastrarCliente() {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Cliente Novo!"
        this.MensagemInicial(MensagemInicial);

        //Solicitar dados Cliente;
        let nome = this.lerOpcao.question("\nInforme seu nome: ")
        let dataNascimento = this.lerOpcao.question("\nInforme sua Data de Nascimento: ") //Fazer Funcao Verificar Datas --

        let cpf = parseInt(this.lerOpcao.question("\nInforme seu CPF: "));
        cpf = this.VerificarInt(cpf);

        let email = this.lerOpcao.question("\nInforme seu email: ");
        let senha = this.lerOpcao.question("\nInforme sua senha: ");
        let pedidos = [];

        let id = this.idClientes;
        this.idClientes++; //Atualiza o Id de clientes no sistema;

        //Cadastrar o Cliente
        let cliente = new Cliente(id, nome, dataNascimento, cpf, email, senha, pedidos);
        this.clientesLogados.push(cliente);

        //Mensagem Final e Voltar ao Menu Inicial
        this.MensagemFinalCadastros(nome);
        this.TelaInicial();
    }

    //Funcionario e Clientes Logados
    FuncionarioLogado(funcionario) {
        let listaOpcoesValidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let isFuncionario = funcionario;

        console.log("Ola," + isFuncionario.nome + "!");

        let mensagemUsuario = `
            1. Ver Meus Dados
            2. Modificar Meus Dados
            3. Ver Lista de Pedidos
            4. Ver Lista de Produtos
            5. Ver Lista de Clientes
            6. Mudar Status do pedido
            7. Adicionar produto
            8. Editar produto
            9. Excluir produto
            10. Voltar ao Menu Inicial
            
            Escolha uma opcao: `;

        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        // Validação de Entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acao
        switch (opcao) {
            case 1:
                this.VerDados('funcionario', isFuncionario);
                break;
            case 2:
                this.ModificarDados('funcionario', isFuncionario);
                break;
            case 3:
                this.VerListaPedidos(isFuncionario);
                break;
            case 4:
                this.VerListaProdutos('funcionario', isFuncionario);
                break;
            case 5:
                this.VerListaClientes(isFuncionario);
                break;
            case 6:
                this.MudarStatusPedido(isFuncionario);
                break;
            case 7:
                this.AdicionarProduto(isFuncionario);
                break;
            case 8:
                this.EditarProduto(isFuncionario);
                break;
            case 9:
                this.ExcluirProduto(isFuncionario);
                break;
            case 10:
                this.TelaInicial();
                break;
        }

    }

    ClienteLogado(cliente) {
        let listaOpcoesValidas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let isCliente = cliente;

        //Mensagem Inicial
        let MensagemInicial = "Area Cliente:"
        this.MensagemInicial(MensagemInicial);
        console.log("Ola," + isCliente.nome + "!");

        //Interface Usuario
        let mensagemUsuario = `
            
            1. Ver Meus Dados
            2. Modificar Meus Dados
            3. Ver Lista de Produtos
            4. Fazer Pedido
            5. Cancelar Pedido
            6. Ver Meus Pedidos
            7. Avaliar Pedido
            8. Visualizar Avaliacoes
            9. Retornar ao Menu Inicial
            
            Escolha uma opcao: `;

        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        // Validação de Entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acao
        switch (opcao) {
            case 1:
                this.VerDados('cliente', isCliente);
                break;
            case 2:
                this.ModificarDados('cliente', isCliente);
                break;
            case 3:
                this.VerListaProdutos('cliente', isCliente);
                break;
            case 4:
                this.FazerPedido(isCliente);
                break;
            case 5:
                this.CancelarPedido(isCliente);
                break;
            case 6:
                this.VerMeusPedidos(isCliente);
                break;
            case 7:
                this.AvaliarPedido(isCliente);
                break;
            case 8:
                this.VisualizarAvaliacoes(isCliente);
                break;
            case 9:
                this.TelaInicial();
                break;
        }
    }

    LoginCliente() {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Cliente:"
        this.MensagemInicial(MensagemInicial);

        //Solicitar Informacoes de Login
        let email = this.lerOpcao.question("\nInforme seu email: ");
        let senha = this.lerOpcao.question("\nInforme sua senha: ");

        //verificar Login
        let isCliente = this.clientesLogados.find(cliente => cliente.email == email && cliente.senha == senha);

        //Acoes
        if (isCliente) {
            this.ClienteLogado(isCliente);
        }

        else {

            let listaOpcoesValidas = [1, 2];
            let mensagemUsuario = "\nCliente Nao Cadastrado:\n\n1 - Tentar Novamente\n2 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            //Validacao de Entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            switch (opcao) {
                case 1:
                    this.LoginCliente();
                    break;

                case 2:
                    this.TelaInicial();
                    break;
            }

        }

    }

    LoginFuncionario() {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Funcionario:"
        this.MensagemInicial(MensagemInicial);

        //Solicitar Informacoes de Login
        let email = this.lerOpcao.question("\nInforme seu email: ");
        let senha = this.lerOpcao.question("\nInforme sua senha: ");

        //verificar Login
        let isFuncionario = this.funcionariosLogados.find(funcionario => funcionario.email == email && funcionario.senha == senha);

        //Acoes
        if (isFuncionario) {
            this.FuncionarioLogado(isFuncionario);

        }

        else {

            let listaOpcoesValidas = [1, 2];
            let mensagemUsuario = "\nFuncionario Nao Cadastrado:\n\n1 - Tentar Novamente\n2 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            //Validacao de Entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            switch (opcao) {
                case 1:
                    this.LoginFuncionario();
                    break;

                case 2:
                    this.TelaInicial();
                    break;
            }

        }
    }

    //Metodos Funcionario e Clientes Nao Logados
    Login() {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo a tela de Login:"
        this.MensagemInicial(MensagemInicial);

        //Interface do Usuario
        let listaOpcoesValidas = [1, 2, 3];
        let mensagemUsuario = "\n1 - Login Cliente\n2 - Login Funcionario\n3 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        //Validacao de Entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acoes
        switch (opcao) {
            case 1:
                this.LoginCliente();
                break;
            case 2:
                this.LoginFuncionario();
                break;

            default:
                this.TelaInicial();
                break;
        }

    }

    Cadastrar() {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo a tela de Cadastro:"
        this.MensagemInicial(MensagemInicial);

        //Interface do Usuario
        let listaOpcoesValidas = [1, 2, 3];
        let mensagemUsuario = "\n1 - Cadastrar Cliente\n2 - Cadastrar Funcionario\n3 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        //Validacao de Entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acoes
        switch (opcao) {
            case 1:
                this.CadastrarCliente();
                break;
            case 2:
                this.CadastrarFuncionario();
                break;

            default:
                this.TelaInicial();
                break;
        }

    }

    Sair() {
        console.log("Obrigado Volte Sempre!");
    }


    /*Metodos Clientes Logados (Fazer Pedido, Cancelar Pedido, Ver Pedido, Avaliar Pedido, Visualizar Pedido)*/
    VisualizarAvaliacoes(cliente) {
        // Mensagem Inicial
        let MensagemInicial = "Avliacoes dos Nossos Clientes!";
        this.MensagemInicial(MensagemInicial);

        //Verificar Se ha avaliacoes
        if (this.listaAvaliacoes.length == 0) {
            console.log("Ainda nao temos nenhuma avaliacao :/")
            this.ClienteLogado(cliente);
            return;
        }

        //Mostrar Avaliacoes 
        for (let i = 0; i < this.listaAvaliacoes.length; i++) //constructor (nomeCliente, nomeProduto, textoAvaliacao)
        {
            console.log("Produto: " + this.listaAvaliacoes[i].nomeProduto);
            console.log("Avaliacao: " + this.listaAvaliacoes[i].textoAvaliacao);
            console.log("Cliente: " + this.listaAvaliacoes[i].nomeCliente + "\n");
        }

        //Esperar Tempo de Leitura
        let listaOpcoesValidas = [0];
        let mensagemUsuario = "Pressione 0 para Voltar ao Menu: ";
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Voltar Home Cliente
        this.ClienteLogado(cliente);
    }


    AvaliarPedido(cliente) //Avaliacao constructor (nomeCliente, nomeProduto, avaliacao)
    {
        // Mensagem Inicial
        let MensagemInicial = "Deixe Sua Avaliacao!";
        this.MensagemInicial(MensagemInicial);

        //Inicializar Variaveis Interface usuario
        let listaOpcoesValidas = [];
        let mensagemUsuario = "Digite o numero do pedido que deseja Avaliar: ";
        let indexPedidoEscolhido;

        //Verificar Se o Cliente Tem Pedidos
        if (cliente.listaPedidos.length == 0) {
            console.log("Voce ainda nao tem Pedidos!")
            this.ClienteLogado(cliente);
            return;
        }

        // Mostrar Pedidos do Cliente
        console.log("Seus Pedidos:\n"); // constructor (idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada)
        for (let i = 0; i < cliente.listaPedidos.length; i++) {
            console.log("Pedido: " + i);
            console.log("Produto: " + cliente.listaPedidos[i].nomeProduto);
            console.log("Data do Pedido: " + cliente.listaPedidos[i].dataPedido);
            console.log("Quantidade Comprada: " + cliente.listaPedidos[i].qtdComprada);
            console.log("Status: " + cliente.listaPedidos[i].status + "\n");
            listaOpcoesValidas.push(i);
        }

        // Escolher Produto Para Avaliar
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        indexPedidoEscolhido = opcao;

        //Pegar Avaliacao do Cliente
        let textoAvaliacao = this.lerOpcao.question("Deixe Sua Avaliacao do pedido: ");
        let nomeProduto = cliente.listaPedidos[indexPedidoEscolhido].nomeProduto;

        //Salvar Avaliacao
        let avaliacao = new Avaliacao(cliente.nome, nomeProduto, textoAvaliacao);
        this.listaAvaliacoes.push(avaliacao);

        //Voltar Home
        console.log("Obrigado pela Avaliacao!");
        this.ClienteLogado(cliente);

    }

    VerMeusPedidos(cliente) {
        // Mensagem Inicial
        let MensagemInicial = "Veja Seus Pedidos";
        this.MensagemInicial(MensagemInicial);
        cliente.listaPedidos = [];
        let datasOrdenadas = [];

        //Atualizar Lista de Pedidos do Cliente
        for (let i = 0; i < this.listaPedidos.length; i++)//constructor (idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada)
        {
            if (this.listaPedidos[i].idCliente == cliente.id) {
                cliente.listaPedidos.push(this.listaPedidos[i]);
            }
        }

        //Verificar se Cliente Tem pedidos
        if (cliente.listaPedidos.length == 0) {
            console.log("\nVoce Nao Tem Pedidos: :(");
            this.ClienteLogado(cliente);
            return;
        }

        //Ordenar Datas Pedidos
        for (let i = 0; i < cliente.listaPedidos.length; i++) //constructor (idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada)
        {
            datasOrdenadas.push(cliente.listaPedidos[i].dataPedido);
        }

        datasOrdenadas.sort();

        //Mostrat Pedidos Ordem Cronologica

        let contador1 = cliente.listaPedidos.length;
        let contador2 = 0;
        console.log("Pedidos Realizados:\n")
        while (contador1 > 0) {
            for (let i = 0; i < cliente.listaPedidos.length; i++) {
                if (cliente.listaPedidos[i].dataPedido == datasOrdenadas[contador2]) {

                    console.log("Id Pedido: " + cliente.listaPedidos[i].idPedido);
                    console.log("Status: " + cliente.listaPedidos[i].status);
                    console.log("Data Pedido: " + cliente.listaPedidos[i].dataPedido);
                    console.log("Produto: " + cliente.listaPedidos[i].nomeProduto);
                    console.log("Quantidade Comprada: " + cliente.listaPedidos[i].qtdComprada + "\n");
                    contador1--;
                    contador2++;
                    break;
                }
            }
        }

        //Esperar Tempo de Leitura
        let listaOpcoesValidas = [0];
        let mensagemUsuario = "Pressione 0 para Voltar ao Menu: ";
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Voltar Home Cliente
        this.ClienteLogado(cliente);

    }
    CancelarPedido(cliente) {

        //Verificar se o Cliente Tem Pedidos
        if (cliente.listaPedidos.length == 0) {
            console.log("\nVoce Nao tem Pedidos :/");
            this.ClienteLogado(cliente);
            return;
        }

        // Mensagem Inicial
        let MensagemInicial = "Cancelar Pedido :/";
        this.MensagemInicial(MensagemInicial);

        //Inicializar Variaveis Interface usuario
        let listaOpcoesValidas = [];
        let mensagemUsuario = "Digite o numero do pedido que deseja Cancelar: ";
        let indexPedidoEscolhido;

        // Mostrar Pedidos do Cliente
        console.log("Seus Pedidos:\n"); // constructor (idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada)
        for (let i = 0; i < cliente.listaPedidos.length; i++) {
            console.log("Pedido: " + i);
            console.log("Produto: " + cliente.listaPedidos[i].nomeProduto);
            console.log("Data do Pedido: " + cliente.listaPedidos[i].dataPedido);
            console.log("Quantidade Comprada: " + cliente.listaPedidos[i].qtdComprada);
            console.log("Status: " + cliente.listaPedidos[i].status + "\n");
            listaOpcoesValidas.push(i);
        }

        // Escolher Produto Para Cancelar
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        indexPedidoEscolhido = opcao;

        // Verificar Se o Pedido Ja foi Cancelado
        if (cliente.listaPedidos[indexPedidoEscolhido].status == 'cancelado') {
            console.log("Este pedido ja esta cancelado!");
            this.ClienteLogado(cliente);
            return;
        }

        // Retornar Quantidade Comprada Ao Estoque
        let qtdComprada = cliente.listaPedidos[indexPedidoEscolhido].qtdComprada;
        let nomeProduto = cliente.listaPedidos[indexPedidoEscolhido].nomeProduto;

        for (let i = 0; i < this.listaProdutos.length; i++) {
            if (this.listaProdutos[i].nome == nomeProduto) {
                this.listaProdutos[i].qtdEstoque += qtdComprada;
                break;
            }
        }

        // Cancelar Pedido
        cliente.listaPedidos[indexPedidoEscolhido].status = 'cancelado';
        for (let i = 0; i < this.listaPedidos.length; i++) {
            if (this.listaPedidos[i].id == cliente.listaPedidos[indexPedidoEscolhido].id) {
                this.listaPedidos[i].status = 'cancelado';
                break;
            }
        }

        //Retornar a Area do Cliente
        console.log("Pedido Cancelado Com Sucesso!");
        this.ClienteLogado(cliente);
    }


    FazerPedido(cliente)   //constructor (idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada)
    {
        //Mensagem Inicial
        let usuario = cliente;
        let MensagemInicial = "Fazer Pedido!"
        this.MensagemInicial(MensagemInicial);

        //---
        let listaOpcoesValidas = [];
        let mensagemUsuario = "Digite o numero do item que Deseja Comprar: ";
        let indexProdutoEscolhido;

        //Mostrar Produtos para Compra
        console.log("\nProdutos Bom Preco: ")
        for (let i = 0; i < this.listaProdutos.length; i++) {
            console.log("Numero Item: " + i);
            console.log("Nome: " + this.listaProdutos[i].nome);
            console.log("Validade: " + this.listaProdutos[i].dataValidade);
            console.log("Preco: " + this.listaProdutos[i].preco);
            console.log("Quantidade Disponivel: " + this.listaProdutos[i].qtdEstoque);
            console.log("Descricao: " + this.listaProdutos[i].descricao + "\n");
            listaOpcoesValidas.push(i);
        }

        //Escolher Produto Para Compra
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        indexProdutoEscolhido = opcao;

        //Verificar Quantidade Comprada
        let qtdComprada = parseInt(this.lerOpcao.question("Digite quantos produtos deseja: "));
        qtdComprada = this.VerificarInt(qtdComprada);
        let qtdEstoque = this.listaProdutos[indexProdutoEscolhido].qtdEstoque;

        if (qtdEstoque - qtdComprada < 0 || qtdComprada <= 0) {
            console.log("\nQuantidade Indisponivel Para Venda: ")
            listaOpcoesValidas = [1, 2];
            mensagemUsuario = "Digite Uma Opcao:\n1 - Fazer Outro Pedido\n2 - Voltar Area Cliente";
            opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
            // Validação de entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            switch (opcao) {
                case 1:
                    this.FazerPedido(usuario);
                    break;
                case 2:
                    this.ClienteLogado(usuario);
                    break;
            }

            return;
        }

        //Pegar Dados do Produto Escolhido:
        let idPedido = this.idPedido;
        this.idPedido++;//Alter Id em cada Pedido
        let idCliente = cliente.id;
        let status = 'realizado';
        let data = new Date();
        let nomeProduto = this.listaProdutos[indexProdutoEscolhido].nome;
        this.listaProdutos[indexProdutoEscolhido].qtdEstoque -= qtdComprada;//altera quantidade Estoque do produto

        //Fazer Pedido
        let pedido = new Pedido(idPedido, idCliente, status, data, nomeProduto, qtdComprada);
        this.listaPedidos.push(pedido);
        cliente.listaPedidos.push(pedido);

        //Comprar Outro produto?Voltar Home
        console.log("Pedido Realizado com Sucesso!");
        listaOpcoesValidas = [1, 2];
        mensagemUsuario = "Digite Uma Opcao:\n1 - Fazer Outro Pedido\n2 - Voltar Area Cliente";
        opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        switch (opcao) {
            case 1:
                this.FazerPedido(usuario);
                break;
            case 2:
                this.ClienteLogado(usuario);
                break;
        }

    }


    /*Metodos Funcionarios Logados (Ver Lista Pedidos, Ver Lista Clientes, Mudar Status Pedido, Add Produto, 
        Editar Produto e Excluir Produto)*/

    VerListaPedidos(funcionario) {
        // Mensagem Inicial
        let MensagemInicial = "Veja Os Pedidos";
        this.MensagemInicial(MensagemInicial);
        let datasOrdenadas = [];

        //Verificar se Tem pedidos
        if (this.listaPedidos.length == 0) {
            console.log("\nAinda Nao Temos Pedidos :(");
            this.FuncionarioLogado(funcionario);
            return;
        }

        //Ordenar Datas Pedidos
        for (let i = 0; i < this.listaPedidos.length; i++) //constructor (idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada)
        {
            datasOrdenadas.push(this.listaPedidos[i].dataPedido);
        }

        datasOrdenadas.sort();

        //Mostrat Pedidos Ordem Cronologica

        let contador1 = this.listaPedidos.length;
        let contador2 = 0;
        console.log("Pedidos Realizados:\n")
        while (contador1 > 0) {
            for (let i = 0; i < this.listaPedidos.length; i++) {
                if (this.listaPedidos[i].dataPedido == datasOrdenadas[contador2]) {

                    console.log("Id Pedido: " + this.listaPedidos[i].idPedido);
                    console.log("Id Cliente: " + this.listaPedidos[i].idCliente);
                    console.log("Status: " + this.listaPedidos[i].status);
                    console.log("Data Pedido: " + this.listaPedidos[i].dataPedido);
                    console.log("Produto: " + this.listaPedidos[i].nomeProduto);
                    console.log("Quantidade Comprada: " + this.listaPedidos[i].qtdComprada + "\n");
                    contador1--;
                    contador2++;
                    break;
                }
            }
        }

        //Esperar Tempo de Leitura
        let listaOpcoesValidas = [0];
        let mensagemUsuario = "Pressione 0 para Voltar ao Menu: ";
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Voltar Home Cliente
        this.FuncionarioLogado(funcionario);
    }

    MudarStatusPedido(funcionario) {
        //Mensagem Inicial
        let MensagemInicial = "Mudar Status de Pedido"
        this.MensagemInicial(MensagemInicial);
        let listaOpcoesValidas = [];
        let mensagemUsuario = "Digite o NUMERO DO PEDIDO que Deseja Alterar: ";
        let indexProdutoEscolhido;

        //Verificar Se ha Pedidos
        if (this.listaPedidos.length == 0) {
            console.log("Ainda nao temos nenhum Pedido :/")
            this.FuncionarioLogado(funcionario);
            return;
        }

        //Mostrar Lista de Pedidos
        console.log("Pedidos Realizados:\n")
        for (let i = 0; i < this.listaPedidos.length; i++)  //constructor (idPedido, idCliente, status, dataPedido, nomeProduto, qtdComprada)
        {
            console.log("NUMERO DO PEDIDO: " + i);
            console.log("IdPedido: " + this.listaPedidos[i].idPedido);
            console.log("IdCliente: " + this.listaPedidos[i].idCliente);
            console.log("Status: " + this.listaPedidos[i].status);
            console.log("data Pedido: " + this.listaPedidos[i].dataPedido);
            console.log("Produto: " + this.listaPedidos[i].nomeProduto + "\n");
            listaOpcoesValidas.push(i);
        }

        //Escolher o Pedido Para Alterar Status
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        indexProdutoEscolhido = opcao;


        //Mostrar Status Disponiveis
        listaOpcoesValidas = [];
        let statusEscolhido;
        mensagemUsuario = "\nEscolha uma Status: "
        let listaStatusDisponiveis = ['pendente', 'adiado', 'realizado', 'cancelado'];

        console.log("Status Disponiveis:\n");
        for (let i = 0; i < listaStatusDisponiveis.length; i++) {
            console.log(i + " - " + listaStatusDisponiveis[i]);
            listaOpcoesValidas.push(i);
        }

        opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        let indexStatusEscolhido = opcao;

        //Mudar Status
        this.listaPedidos[indexProdutoEscolhido].status = listaStatusDisponiveis[indexStatusEscolhido];

        //Home
        console.log("\nStatus Alterado com sucesso!");
        this.FuncionarioLogado(funcionario);


    }
    ExcluirProduto(funcionario) {

        //Verificar Se há Produtos Cadastrados
        if (this.listaProdutos.length == 0) {
            console.log("\nNao existem produtos cadastrados\n");
            this.FuncionarioLogado(funcionario);
            return;
        }

        //Mensagem Inicial
        let MensagemInicial = "Exlcuir Produto!"
        this.MensagemInicial(MensagemInicial);
        let listaOpcoesValidas = [];
        let mensagemUsuario = "Digite o numero do Item que Deseja Excluir: ";
        let indexProdutoEscolhido;

        //Mostrar Nome dos Produtos Disponiveis
        console.log("Lista de Produtos Disponiveis: \n")
        for (let i = 0; i < this.listaProdutos.length; i++) {
            console.log(i + "-" + this.listaProdutos[i].nome);
            listaOpcoesValidas.push(i);
        }

        //Escolher o Produto Para Excluir
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        indexProdutoEscolhido = opcao;

        //Mensagem de certeza de Exclusao
        console.log("\nTem Certeza que Deseja EXCLUIR? ");
        console.log("Nome: " + this.listaProdutos[indexProdutoEscolhido].nome);
        console.log("Validade: " + this.listaProdutos[indexProdutoEscolhido].dataValidade);
        console.log("Preco: " + this.listaProdutos[indexProdutoEscolhido].preco);
        console.log("Qtd Estoque: " + this.listaProdutos[indexProdutoEscolhido].qtdEstoque);
        console.log("Descricao: " + this.listaProdutos[indexProdutoEscolhido].descricao);

        //Excluir ou Voltar
        listaOpcoesValidas = [1, 2, 3];
        mensagemUsuario = "\nEscolha Uma Opcao:\n1 - Sim\n2 - Voltar Area Funcionario\n3 - Alterar Produto Escolhido\n";
        opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acao
        switch (opcao) {
            case 1:
                this.listaProdutos.splice(indexProdutoEscolhido, 1);
                console.log("Produto Removido Com Sucesso!");
                this.FuncionarioLogado(funcionario);
                break;
            case 2:
                this.FuncionarioLogado(funcionario);
                break;
            case 3:
                this.ExcluirProduto(funcionario);
                break;
        }

    }

    EditarProduto(funcionario) {

        //Verificar Se há Produtos Cadastrados
        if (this.listaProdutos.length == 0) {
            console.log("\nNao existem produtos cadastrados\n");
            this.FuncionarioLogado(funcionario);
            return;
        }

        //Mensagem Inicial
        let MensagemInicial = "Editar Produto!"
        this.MensagemInicial(MensagemInicial);
        let listaOpcoesValidas = [];
        let mensagemUsuario = "Digite o numero do Item que Deseja Editar: ";
        let indexProdutoEscolhido;

        //Mostrar Nome dos Produtos Disponiveis
        console.log("Lista de Produtos Disponiveis: \n")
        for (let i = 0; i < this.listaProdutos.length; i++) {
            console.log(i + "-" + this.listaProdutos[i].nome);
            listaOpcoesValidas.push(i);
        }

        //Escolher o Produto Para Alterar
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        indexProdutoEscolhido = opcao;

        //Escolher o Que Alterar no Produto
        listaOpcoesValidas = [1, 2, 3, 4, 5, 6]; //constructor (dataValidade, preco, qtdEstoque, nome, descricao)
        mensagemUsuario = `
            Escolha o que quer alterar no produto:
            1 - Alterar Data de Validade
            2 - Alterar Preco
            3 - Alterar Quantidade em Estoque
            4 - Alterar Nome
            5 - Alterar Descricao
            6 - Voltar Area do Funcionario
            \nEscolha uma opcao: `;

        opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        // Alterar Caracteristica "X" do Produto 
        switch (opcao) {
            case 1:
                //ESCOLHER NOVO ATRIBUTO
                let novaDataValidade = this.lerOpcao.question("Digite a nova Data de Validade: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].dataValidade = novaDataValidade;
                this.MensagemSucesso();
                break;

            case 2:
                //ESCOLHER NOVO ATRIBUTO
                let novoPreco = this.lerOpcao.question("Digite o novo preco: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].preco = novoPreco;
                this.MensagemSucesso();
                break;

            case 3:
                //ESCOLHER NOVO ATRIBUTO
                let novaQtdEstoque = this.lerOpcao.question("Digite a nova Qtd em Estoque: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].qtdEstoque = novaQtdEstoque;
                this.MensagemSucesso();
                break;

            case 4: //**constructor (dataValidade, preco, qtdEstoque, nome, descricao)
                //ESCOLHER NOVO ATRIBUTO
                let novoNome = this.lerOpcao.question("Digite o novo Nome: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].nome = novoNome;
                this.MensagemSucesso();
                break;

            case 5: //**constructor (dataValidade, preco, qtdEstoque, nome, descricao)
                //ESCOLHER NOVO ATRIBUTO
                let novaDescricao = this.lerOpcao.question("Digite uma nova Descricao: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].descricao = novaDescricao;
                this.MensagemSucesso();
                break;

            case 6:
                this.FuncionarioLogado(funcionario);
                break;

        }

        //Editar Outro Produto?/Voltar Home
        listaOpcoesValidas = [1, 2];
        mensagemUsuario = "\nEscolha Uma Opcao:\n1 - Editar Novo Produto\n2 - Voltar Area do Funcionario\n";
        opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        switch (opcao) {
            case 1:
                this.EditarProduto(funcionario);
                break;
            case 2:
                this.FuncionarioLogado(funcionario);
                break;
        }

    }

    AdicionarProduto(usuario) {
        let usuarioLogado = usuario;
        //Mensagem Inicial
        let MensagemInicial = "Adicionar Porduto!"
        this.MensagemInicial(MensagemInicial);

        //Solicitar dados do Produto;
        let dataValidade = this.lerOpcao.question("\nInforme a Data de validade Do produto:");

        let preco = parseInt(this.lerOpcao.question("\nInforme Preco do Produto: "));
        preco = this.VerificarInt(preco);

        let qtdEstoque = parseInt(this.lerOpcao.question("\nInforme a quantidade em estoque: "));
        qtdEstoque = this.VerificarInt(qtdEstoque);

        let nome = this.lerOpcao.question("\nInforme nome do produto: ");
        let descricao = this.lerOpcao.question("\nFaca uma breve descricao do produto: ");

        //Cadastrar Produto
        let novoProduto = new Produtos(dataValidade, preco, qtdEstoque, nome, descricao);//constructor (dataValidade, preco, qtdEstoque, nome, descricao)
        this.listaProdutos.push(novoProduto);
        console.log(this.listaProdutos);

        //Mensagem Sucesso
        this.MensagemFinalCadastros(nome);

        //Cadastrar Novo Produto?/Voltar Home
        let listaOpcoesValidas = [1, 2];
        let mensagemUsuario = "\nEscolha Uma Opcao:\n1 - Cadastrar Novo Produto\n2 - Voltar Area do Funcionario\n";
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        switch (opcao) {
            case 1:
                this.AdicionarProduto(usuarioLogado);
                break;
            case 2:
                this.FuncionarioLogado(usuarioLogado);
                break;
        }
    }

    VerListaClientes(usuario) {

        let listaOrdemAlfabetica = [];

        //Verifica se há Clientes Cadastrados
        if (this.clientesLogados.length == 0) {
            console.log("Nao há Clientes Cadastrados: ")
            this.FuncionarioLogado(usuario);
        }

        //Ordenar Nome Clientes Em Ordem Alfabetica
        for (let i = 0; i < this.clientesLogados.length; i++) {
            let nome = this.clientesLogados[i].nome;
            nome = nome.toLowerCase();
            listaOrdemAlfabetica.push(nome);
        }

        listaOrdemAlfabetica.sort();

        //Mostrar Clientes Em Ordem Alfabetica
        let contador1 = this.clientesLogados.length;
        let contador2 = 0;

        while (contador1 > 0) {
            for (let i = 0; i < this.clientesLogados.length; i++) {
                if (this.clientesLogados[i].nome == listaOrdemAlfabetica[contador2])//constructor (id, nome, dataNascimento, cpf, email, senha)
                {

                    console.log("\nNome: " + this.clientesLogados[i].nome);
                    console.log("ID: " + this.clientesLogados[i].id);
                    console.log("Data Nascimento: " + this.clientesLogados[i].dataNascimento);
                    console.log("Email: " + this.clientesLogados[i].email);
                    contador1--;
                    contador2++;
                    break;
                }
            }
        }

        //Voltar a Area do Funcionario
        let listaOpcoesValidas = [0];
        let mensagemUsuario = "\nPressione 0 para voltar: ";
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        this.FuncionarioLogado(usuario);

    }

    //Metodos Clientes e Funcionarios Logados (Ver Dados, Modificar Dados, Ver Lista de Produtos)
    VerDados(tipoUsuario, dados) {
        let dadosUsuario = dados;
        if (tipoUsuario == 'cliente') //constructor (id, nome, dataNascimento, cpf, email, senha)
        {

            //Mostrar Dados 
            console.log("\nDados Cadastrados:");
            console.log("Nome: " + dadosUsuario.nome);
            console.log("Data de nascimento: " + dadosUsuario.dataNascimento);
            console.log("CPF: " + dadosUsuario.cpf);
            console.log("Email: " + dadosUsuario.email);
            console.log("Senha: " + dadosUsuario.senha + '\n');

            //Voltar Login ou AlterarDados
            let listaOpcoesValidas = [1, 2];
            let mensagemUsuario =
                `
            Escolha Uma Opcao:
            1 - Alterar Dados
            2 - Voltar Area do Cliente
            `;
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            // Validação de entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            //Acao
            switch (opcao) {
                case 1:
                    this.ModificarDados('cliente', dadosUsuario);
                    break;
                case 2:
                    this.ClienteLogado(dadosUsuario);
                    break;
            }

        }

        else if (tipoUsuario == 'funcionario') //constructor (id, nome, cpf, email, senha)
        {
            console.log("\n Dados Cadastrados: \n");
            console.log("Id: " + dadosUsuario.id);
            console.log("Nome Usuario: " + dadosUsuario.nome);
            console.log("CPF: " + dadosUsuario.cpf);
            console.log("Email: " + dadosUsuario.email);
            console.log("Senha: " + dadosUsuario.senha + '\n');

            //Voltar Login ou AlterarDados
            let listaOpcoesValidas = [1, 2];
            let mensagemUsuario =
                `
            Escolha Uma Opcao:
            1 - Alterar Dados
            2 - Voltar Area do Funcionario
            `;
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            // Validação de entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            //Acao
            switch (opcao) {
                case 1:
                    this.ModificarDados('funcionario', dadosUsuario);
                    break;
                case 2:
                    this.FuncionarioLogado(dadosUsuario);
                    break;
            }
        }
    }

    VerListaProdutos(tipoUsuario, usuarioLogado) {
        let listaOrdemAlfabetica = [];
        let contador1 = this.listaProdutos.length;
        let contador2 = 0;

        //Verificar Se Há Produtos Disponiveis
        if (this.listaProdutos.length == 0) {
            console.log("Nao Há Produtos Cadastrados: ");

            if (tipoUsuario == 'cliente') {
                this.ClienteLogado(usuarioLogado);
            }

            else if (tipoUsuario == 'funcionario') {
                this.FuncionarioLogado(usuarioLogado);
            }

            return;
        }

        //Ordenar Nome Dos Produtos Em ordem Alfabetica
        for (let i = 0; i < this.listaProdutos.length; i++) {
            let nome = this.listaProdutos[i].nome;
            nome = nome.toLowerCase();
            listaOrdemAlfabetica.push(nome);

        }
        listaOrdemAlfabetica.sort();

        //Mostrar Produtos Em Ordem Alfabetica
        while (contador1 > 0) {
            for (let i = 0; i < this.listaProdutos.length; i++) {
                if (this.listaProdutos[i].nome == listaOrdemAlfabetica[contador2])//constructor (dataValidade, preco, qtdEstoque, nome, descricao)
                {

                    console.log("\nNome: " + this.listaProdutos[i].nome);
                    console.log("Validade: " + this.listaProdutos[i].dataValidade);
                    console.log("Preco: " + this.listaProdutos[i].preco);
                    console.log("Qtd Estoque: " + this.listaProdutos[i].qtdEstoque);
                    console.log("Descricao: " + this.listaProdutos[i].descricao);
                    contador1--;
                    contador2++;
                    break;
                }
            }
        }

        //Voltar Home
        let listaOpcoesValidas = [0];
        let mensagemUsuario = "\nPressione 0 para voltar: ";
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        if (tipoUsuario == 'cliente') {
            this.ClienteLogado(usuarioLogado);
        }

        else if (tipoUsuario == 'funcionario') {
            this.FuncionarioLogado(usuarioLogado);
        }
    }

    ModificarDados(tipoUsuario, dados) {
        //Mensagem Inicial
        let MensagemInicial = "Modificar Dados!"
        this.MensagemInicial(MensagemInicial);

        let dadosUsuario = dados;

        if (tipoUsuario == 'cliente') //constructor (id, nome, dataNascimento, cpf, email, senha)
        {

            // Interface do usuário
            let listaOpcoesValidas = [1, 2, 3, 4, 5, 6];
            let mensagemUsuario = `
                Escolha o dado a ser alterado:
                1 - Alterar Nome
                2 - Alterar Data de Nascimento
                3 - Alterar CPF
                4 - Alterar Email
                5 - Alterar Senha
                6 - Voltar a Area Cliente
                \nEscolha uma opcao: `;
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            // Validação de entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            // Ações
            switch (opcao) {

                case 1:
                    let novoNome = this.lerOpcao.question("Digite o novo nome: ");

                    for (let i = 0; i < this.clientesLogados.length; i++) {
                        if (this.clientesLogados[i].id == dadosUsuario.id) {
                            this.clientesLogados[i].nome = novoNome;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 2:
                    let novaDataNascimento = this.lerOpcao.question("Digite a nova data de nascimento: ");
                    for (let i = 0; i < this.clientesLogados.length; i++) {
                        if (this.clientesLogados[i].id == dadosUsuario.id) {
                            this.clientesLogados[i].dataNascimento = novaDataNascimento;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 3:
                    let novoCPF = parseInt(this.lerOpcao.question("Digite o novo CPF: "));
                    for (let i = 0; i < this.clientesLogados.length; i++) {
                        if (this.clientesLogados[i].id == dadosUsuario.id) {
                            this.clientesLogados[i].cpf = novoCPF;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 4:
                    let novoEmail = this.lerOpcao.question("Digite o novo email: ");
                    for (let i = 0; i < this.clientesLogados.length; i++) {
                        if (this.clientesLogados[i].id == dadosUsuario.id) {
                            this.clientesLogados[i].email = novoEmail;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 5:
                    let novaSenha = this.lerOpcao.question("Digite a nova senha: ");

                    for (let i = 0; i < this.clientesLogados.length; i++) {
                        if (this.clientesLogados[i].id == dadosUsuario.id) {
                            this.clientesLogados[i].senha = novaSenha;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 6:
                    this.ClienteLogado(dadosUsuario);
                    break;
            }

            //voltar Area Do Cliente
            this.ClienteLogado(dadosUsuario);
        }

        //Modificar Dados Do Funcionario
        if (tipoUsuario == 'funcionario') //constructor (id, nome, cpf, email, senha)
        {

            // Interface do usuário
            let listaOpcoesValidas = [1, 2, 3, 4, 5];
            let mensagemUsuario = `
                    Escolha o dado a ser alterado:
                    1 - Alterar Nome Usuario
                    2 - Alterar CPF
                    3 - Alterar Email
                    4 - Alterar Senha
                    5 - Voltar Area do Funcionario
                    \nEscolha uma opcao: `;
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            // Validação de entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            // Ações
            switch (opcao) {

                case 1:
                    let novoNome = this.lerOpcao.question("Digite o novo nome de Usuario: ");

                    for (let i = 0; i < this.funcionariosLogados.length; i++) {
                        if (this.funcionariosLogados[i].id == dadosUsuario.id) {
                            this.funcionariosLogados[i].nome = novoNome;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 2:
                    let novoCPF = parseInt(this.lerOpcao.question("Digite o novo CPF: "));
                    for (let i = 0; i < this.funcionariosLogados.length; i++) {
                        if (this.funcionariosLogados[i].id == dadosUsuario.id) {
                            this.funcionariosLogados[i].cpf = novoCPF;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 3:
                    let novoEmail = this.lerOpcao.question("Digite o novo email: ");
                    for (let i = 0; i < this.funcionariosLogados.length; i++) {
                        if (this.funcionariosLogados[i].id == dadosUsuario.id) {
                            this.funcionariosLogados[i].email = novoEmail;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 4:
                    let novaSenha = this.lerOpcao.question("Digite a nova senha: ");

                    for (let i = 0; i < this.funcionariosLogados.length; i++) {
                        if (this.funcionariosLogados[i].id == dadosUsuario.id) {
                            this.funcionariosLogados[i].senha = novaSenha;
                            break;
                        }
                    }
                    this.MensagemSucesso();
                    break;

                case 5:
                    this.FuncionarioLogado(dadosUsuario);
                    break;
            }

            //voltar Area do Funcionario
            this.FuncionarioLogado(dadosUsuario);
        }
    }
}

const sistema = new Sistema();
sistema.TelaInicial();


