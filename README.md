# App de listas

Esta es una aplicacion de listas con imagenes he aqui imagenes del sistema.
## Imagenes
![1](https://github.com/fideldavid11/Entregaproyect/assets/113791442/74f40ad7-e28f-4ce2-ac3a-e588b09c8c86)
![2](https://github.com/fideldavid11/Entregaproyect/assets/113791442/bc9f4d9d-0789-42d4-a22f-588b2e55039f)
![3](https://github.com/fideldavid11/Entregaproyect/assets/113791442/d4f89709-812c-4e15-b5c6-773bd568cf59)
Antes de comenzar instala el proyecto clonando el siguiente comando: `git clone https://github.com/fideldavid11/Entregaproyect`
## ¿Como instalar el frontend?
1. Una vez descargado el archivo abrir visual estudio y copiar los archivos del Front-End hacia Visual Studio Code:
![1](https://github.com/fideldavid11/Entregaproyect/assets/113791442/6f150787-d9db-464b-92ec-894435aa58f6)
2. Entonces ir a las especificaciones del proyecto y seleccionar una nueva terminal.
![2](https://github.com/fideldavid11/Entregaproyect/assets/113791442/17df88c6-428a-434f-9068-282ae3851f2a)
3. Luego, aparecera una barra de terminal y usted insertara el siguiente comando: `npm install` de esta forma:
![4](https://github.com/fideldavid11/Entregaproyect/assets/113791442/c1fd956d-70cc-46ec-9c1d-3eac0d2268d5)
4. Despues de presionar la tecla `enter` los modules que node tenia integrado en el sistema luego de esto pulsar `npm start` en la misma terminal y el front-end se abrira en un navegador.

## ¿Como instalar el backend?
1. Abrir el proyecto de backend via visual studio, examina la carpeta y busca la solucion del proyecto asi:

![03](https://github.com/fideldavid11/app_rostro_id/assets/113791442/0a4d2f43-47c1-483e-8a22-705872455845)
3. Una vez en el proyecto tienes que configurar la migracion de la base de datos, asi que tienes que ir a la cadena de conexion:

![04](https://github.com/fideldavid11/app_rostro_id/assets/113791442/74680f5b-a017-498f-865f-0f6303a76463)
Aqui tienes que configurar el puerto, el username y el password y sustituyendolo por tus credenciales de Postgresql.

4. Entonces una vez configurado con tus valores necesitas emigrar la base de datos a Postgresql, para eso elimina la carpeta `Migrations` del proyecto:

![5](https://github.com/fideldavid11/app_rostro_id/assets/113791442/cfd3840e-9de5-48df-b5bb-a484c6aabf76)

5. Luego que tengas los datos actualizados procede a poner los comandos para emigrar la base de datos, yendo a la raiz del proyecto, dandole click derecho y encontrar la opcion de la terminal.

![6](https://github.com/fideldavid11/app_rostro_id/assets/113791442/9f18110f-ba26-465b-8de8-d16cbcd8c8ed)

6. Una vez en la terminal agrega los siguientes comandos para que se pueda emigrar a la base datos, presionando la tecla `enter` en cada uno de ellos
1. `dotnet add package Microsoft.EntityFrameworkCore`
2. `dotnet ef migrations add TuMigracion`
3. `dotnet ef database update`

![7](https://github.com/fideldavid11/app_rostro_id/assets/113791442/38d1c494-b2a6-4f06-85f1-f2e8313ff114)

Una vez terminado confirma las migraciones a tu base de datos postgresql.

7. Entonces terminado el proceso puede dar click a iniciar la aplicacion en este icono:
![8](https://github.com/fideldavid11/app_rostro_id/assets/113791442/ed00e8cf-cb1b-4f17-abac-38625bb277d4)

Y listo puedes usar tu aplicacion!

Aqui tienes este video tutorial para que sepas usar la aplicacion y como muestra que esta libre de errores y bugs: 
https://drive.google.com/file/d/12qrVyBZg3PLH4cR9yp_Z4r_Kf-8kh_4M/view?usp=sharing

Muchas gracias por tu atencion!!







