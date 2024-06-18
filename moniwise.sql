-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3309
-- Tiempo de generación: 18-06-2024 a las 22:24:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `moniwise`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertasgasto`
--

CREATE TABLE `alertasgasto` (
  `id` int(11) NOT NULL,
  `mensaje` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `usuario_id`, `estado`) VALUES
(1, 'Alimentación', 'Alimentos', 2, 1),
(2, 'Gamers', 'Perifericos Pc', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriaspredefinidas`
--

CREATE TABLE `categoriaspredefinidas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categoriaspredefinidas`
--

INSERT INTO `categoriaspredefinidas` (`id`, `nombre`) VALUES
(1, 'Alimentación'),
(3, 'Entretenimiento'),
(4, 'Salud'),
(2, 'Transporte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frecuencias`
--

CREATE TABLE `frecuencias` (
  `id` int(11) NOT NULL,
  `frecuencia` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `frecuencias`
--

INSERT INTO `frecuencias` (`id`, `frecuencia`) VALUES
(1, 'mensual'),
(2, 'quincenal'),
(3, 'semanal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id` int(11) NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `estado_pago` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `id` int(11) NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ingresos`
--

INSERT INTO `ingresos` (`id`, `monto`, `fecha`, `descripcion`, `usuario_id`, `estado`) VALUES
(1, 50.00, '2024-06-18', 'Instalacion de Camaras', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `icono` varchar(50) DEFAULT NULL,
  `pagina` varchar(50) NOT NULL,
  `estado` int(11) DEFAULT 1,
  `tipo_usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id`, `nombre`, `icono`, `pagina`, `estado`, `tipo_usuario_id`) VALUES
(1, 'Home', 'home-outline', '/principal', 1, 1),
(2, 'Categoria', 'cash-outline', '/categorias', 1, 2),
(3, 'Home', 'home-outline', '/principal', 1, 2),
(4, 'usuarios', 'people-outline', '/usuarios', 1, 2),
(5, 'gastos', 'apps-outline', '/gastos', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metasahorro`
--

CREATE TABLE `metasahorro` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `monto_objetivo` decimal(10,2) DEFAULT NULL,
  `frecuencia_id` int(11) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagosahorro`
--

CREATE TABLE `pagosahorro` (
  `id` int(11) NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `meta_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `estado_pago` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sueldofijo`
--

CREATE TABLE `sueldofijo` (
  `id` int(11) NOT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `frecuencia_id` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `sueldofijo`
--

INSERT INTO `sueldofijo` (`id`, `monto`, `frecuencia_id`, `fecha_inicio`, `fecha_final`, `usuario_id`, `estado`) VALUES
(1, 450.00, 1, '2024-06-16', '2024-07-16', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposusuario`
--

CREATE TABLE `tiposusuario` (
  `id` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tiposusuario`
--

INSERT INTO `tiposusuario` (`id`, `tipo`) VALUES
(2, 'Administrador'),
(1, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `tipo_usuario_id` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `cedula`, `telefono`, `correo`, `usuario`, `contraseña`, `tipo_usuario_id`, `estado`, `fecha_creacion`) VALUES
(1, 'Kleber Pillasagua', '0928213727', '0999016890', 'klebermera2020@gmail.com', 'admin', 'admin', 2, 1, '2024-06-16 20:21:59'),
(2, 'Alexis', NULL, NULL, NULL, 'cliente', 'cliente', 1, 1, '2024-06-16 20:26:20'),
(3, 'Alejandro Parrales', NULL, NULL, NULL, 'cliente2', 'cliente2', 1, 1, '2024-06-17 04:37:11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertasgasto`
--
ALTER TABLE `alertasgasto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `categoriaspredefinidas`
--
ALTER TABLE `categoriaspredefinidas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `frecuencias`
--
ALTER TABLE `frecuencias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `frecuencia` (`frecuencia`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_usuario_id` (`tipo_usuario_id`);

--
-- Indices de la tabla `metasahorro`
--
ALTER TABLE `metasahorro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `frecuencia_id` (`frecuencia_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `pagosahorro`
--
ALTER TABLE `pagosahorro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meta_id` (`meta_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `sueldofijo`
--
ALTER TABLE `sueldofijo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `frecuencia_id` (`frecuencia_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `tiposusuario`
--
ALTER TABLE `tiposusuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_usuario_id` (`tipo_usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alertasgasto`
--
ALTER TABLE `alertasgasto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoriaspredefinidas`
--
ALTER TABLE `categoriaspredefinidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `frecuencias`
--
ALTER TABLE `frecuencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `metasahorro`
--
ALTER TABLE `metasahorro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagosahorro`
--
ALTER TABLE `pagosahorro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sueldofijo`
--
ALTER TABLE `sueldofijo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tiposusuario`
--
ALTER TABLE `tiposusuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alertasgasto`
--
ALTER TABLE `alertasgasto`
  ADD CONSTRAINT `AlertasGasto_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `Categorias_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `Gastos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `Gastos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `Ingresos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `Menu_ibfk_1` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tiposusuario` (`id`);

--
-- Filtros para la tabla `metasahorro`
--
ALTER TABLE `metasahorro`
  ADD CONSTRAINT `MetasAhorro_ibfk_1` FOREIGN KEY (`frecuencia_id`) REFERENCES `frecuencias` (`id`),
  ADD CONSTRAINT `MetasAhorro_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `pagosahorro`
--
ALTER TABLE `pagosahorro`
  ADD CONSTRAINT `PagosAhorro_ibfk_1` FOREIGN KEY (`meta_id`) REFERENCES `metasahorro` (`id`),
  ADD CONSTRAINT `PagosAhorro_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `sueldofijo`
--
ALTER TABLE `sueldofijo`
  ADD CONSTRAINT `SueldoFijo_ibfk_1` FOREIGN KEY (`frecuencia_id`) REFERENCES `frecuencias` (`id`),
  ADD CONSTRAINT `SueldoFijo_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tiposusuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
