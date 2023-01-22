INSERT INTO usuario (id_usuario, nombre, estado, clave, username) VALUES (1, 'admin', true, '$2a$10$/Se8jFFS45fT2uiJ8qq9kOL6afdgTcg70RYc.4C/NWvxKH7exjZFa', 'admin') on conflict (id_usuario) do nothing;

INSERT INTO menu (id_menu, nombre, icono, url) VALUES (2, 'Stock', 'home', '/pages/stock') on conflict (id_menu) do nothing;
INSERT INTO menu (id_menu, nombre, icono, url) VALUES (3, 'Usuarios', 'person', '/pages/usuario') on conflict (id_menu) do nothing;
INSERT INTO menu (id_menu, nombre, icono, url) VALUES (1, 'Venta', 'shopping_cart_checkout', '/pages/venta') on conflict (id_menu) do nothing;
INSERT INTO menu (id_menu, nombre, icono, url) VALUES (4, 'Estadistica', 'bar_chart', '/pages/estadistica') on conflict (id_menu) do nothing;
INSERT INTO menu (id_menu, nombre, icono, url) VALUES (5, 'Dashboard', 'bar_chart', '/pages/dashboard') on conflict (id_menu) do nothing;

INSERT INTO Rol (id_rol, nombre, descripcion) VALUES (1, 'administrador', 'administrador') on conflict (id_rol) do nothing;

INSERT INTO menu_rol (id_menu, id_rol) VALUES (1, 1);
INSERT INTO menu_rol (id_menu, id_rol) VALUES (2, 1);
INSERT INTO menu_rol (id_menu, id_rol) VALUES (3, 1);
INSERT INTO menu_rol (id_menu, id_rol) VALUES (4, 1);
INSERT INTO menu_rol (id_menu, id_rol) VALUES (5, 1);


insert into producto (id_producto, nombre, stock, precio, bard_code) values (1, 'arroz', 10, 100, 1) on conflict (id_producto) do nothing;
insert into producto (id_producto, nombre, stock, precio, bard_code) values (2, 'queso', 15, 150, 2) on conflict (id_producto) do nothing;
insert into producto (id_producto, nombre, stock, precio, bard_code) values (3, 'fideos', 5, 75, 3) on conflict (id_producto) do nothing;

insert into venta (id_venta, id_usuario) values (1, 1);

INSERT INTO detalle_venta (id_detalle_venta, cantidad, id_producto, id_venta) VALUES (1, 15, 1, 1);
INSERT INTO detalle_venta (id_detalle_venta, cantidad, id_producto, id_venta) VALUES (2, 10, 2, 1);


INSERT INTO usuario_rol (id_usuario, id_rol) VALUES (1, 1)




