

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

USE itekilasystem;

CREATE TABLE `clientes` (
  `nome` text NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `compras` text NOT NULL,
  `telefone` decimal(10,0) NOT NULL,
  `email` text DEFAULT NULL,
  `bairro` text NOT NULL,
  `endereco` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `clientes` (`nome`, `cpf`, `compras`, `telefone`, `email`, `bairro`, `endereco`) VALUES
('Lucas Alves Pereira', '00898334122', 'x', '9999999999', 'cartoonbr494@gmail.com', 'Vila America', 'Rua Filinto Muller 1329');



CREATE TABLE `funcionarios` (
  `nome` text NOT NULL,
  `cargo` text NOT NULL,
  `cpf` text NOT NULL,
  `salario` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `funcionarios` (`nome`, `cargo`, `cpf`, `salario`) VALUES
('Victor', 'Dono', '99999999999', '15');



CREATE TABLE `log_vendas` (
  `operador` text DEFAULT NULL,
  `itens` longtext NOT NULL,
  `total` text NOT NULL,
  `cliente - cpf` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `notasconfirmadas` (
  `operantecaixa` text NOT NULL,
  `nfe` text NOT NULL,
  `cpf` text NOT NULL,
  `valortotal` text NOT NULL,
  `produtos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `notasconfirmadas` (`operantecaixa`, `nfe`, `cpf`, `valortotal`, `produtos`) VALUES
('op1', '0.o16ch487cdnd', '00898334122', '13090.00', 'CiAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIAogICAgICAgICAgICBLYW1pa2F6ZSAgMTEwLjkwIFIkICA1MCBVbiAgMSAgNTU0NS4wMCBSJAogIFNheSBTZXZlbiAgMTUwLjkwIFIkICA1MCBVbiAgMiAgNzU0NS4wMCBSJAogIA==');



CREATE TABLE `produtosavaria` (
  `nome` text DEFAULT NULL,
  `ean` text DEFAULT NULL,
  `estoque` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `produtosavaria` (`nome`, `ean`, `estoque`) VALUES
('Kamikaze', '789000754444', '50');



CREATE TABLE `produtoscad` (
  `id` int(11) NOT NULL,
  `nome` text DEFAULT NULL,
  `ean` text DEFAULT NULL,
  `estoque` int(11) DEFAULT NULL,
  `avaria` int(11) DEFAULT NULL,
  `troca` int(11) DEFAULT NULL,
  `enquadramento` int(5) NOT NULL,
  `valor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `produtoscad` (`id`, `nome`, `ean`, `estoque`, `avaria`, `troca`, `enquadramento`, `valor`) VALUES
(6, 'Kamikaze', '789000754444', 550, 0, 0, 1, '110.90'),
(7, 'Say Seven', '789000754445', 3436, 0, 0, 1, '150.90');



CREATE TABLE `produtostroca` (
  `nome` text DEFAULT NULL,
  `ean` int(11) DEFAULT NULL,
  `troca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` text DEFAULT NULL,
  `authlevel` int(5) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `passwd` text DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `usuarios` (`id`, `nome`, `authlevel`, `email`, `passwd`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 2, 'admin', 'admin', NULL, NULL),
(2, 'Victor', 2, 'jHUns988NJSKmjJj', '123456', '2022-05-10', '2022-05-10'),
(4, 'op1', 3, 'IJIJJIS98jikjmkas9J', 'admin', '2022-05-11', '2022-05-11');


ALTER TABLE `produtoscad`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtoscad`
--
ALTER TABLE `produtoscad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
