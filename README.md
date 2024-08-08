[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/67mQsdfI)
# Tarea 2 :construction:

* :pencil2: **Nombre:** Monserrat Díaz Borroni
* :pencil2: **Correo:** mdb@uc.cl

## Código :symbols:

### :computer: Cómo ejecutar este código

Dentro de la consola de Ubuntu, irse a la ruta de la carpeta de la tarea y ejecutar ```yarn``` y ```yarn dev```, luego ir al link que entrega ```yarn dev```.

```bash
user@laptop:~/ruta$ yarn
user@laptop:~/ruta$ yarn dev
```
Luego hacer ```ctrl``` + click en el link que aparecerá en la consola y se abrirá la página. 

### :teacher: Explicación del funcionamiento del código

El código usa React para permitir la gestión de ciertos productos consumidos de una API.
En primer lugar tenemos `ProductForm.jsx` que se encarga de mostrar un formulario para crear o editar un producto. Utiliza ``useState`` y ``useEffect`` para gestionar los estados del formulario y obtener los detalles del producto en caso de que se esté editando. 

Luego tenemos `ProductCard.jsx`, que simplemente nos muestra el producto en la página de inicio con cierto detalle y, además permite Eliminar o Editar el producto que se está observando.

``ProductFormPage.jsx`` es simplemente la página que permite ver el formulario. ``ProductPage.jsx`` permite ver más detalle del visto en `ProductCard` sobre un producto seleccionado. Finalmente ``ProductsPage.jsx`` es la página principal que muestra todos los productos disponibles. 

En última instancia se puede mencionar ``imageUtils.js`` que permite formatear las imágenes según lo explicado en el enunciado.

### :warning: Funcionalidades implementadas y no implementadas

Partiré con las funciones no implementadas: No se logró el manejo de URLs en JSON. Al ebrir el formulario desde ``Editar`` no se ven las imágenes, pero sí sus links. Cuando se publica un producto no se ve la imagen del producto publicado en ProductsPage, pero sí en ProductPage. Además si se edita la categoría no se guardan los cambios.

Puntos implementados:

* Página de productos: muestra los productos disponibles y cuenta con el botón para Publicar productos.

* Página formulario: no permite dejar campos vacíos para enviar el formulario, muestra un mensaje de éxito o error al enviarlo (y especifica el error en caso de tenerlo, sino redirige a la página principal), cuenta con validación y tiene un botón para volver a la página principal.

* Página producto: tiene carrusel de imágenes, muestra toda la información y tiene un botón para volver al menú principal.

* Tarjetas de productos: tiene carrusel de imágenes, el nombre del producto, descripción abreviada y precio del producto, cuenta con botón para Editar y botón para Eliminar y se actualiza según el botón presionado. 


## Reflexión :thought_balloon:

### :scroll: ¿Para que utilizamos *async* y *await* en las funciones?

``async`` y ``await`` se utilizan para manejar operaciones asincrónicas de forma más sencilla, lo que es especialmente útil si se llama a una API mediante ``axios``. ``async`` declara que la función retornará una promesa y ``await`` pausa la ejecución de la función hasta que la promesa se resuelva, lo que permite escribir código como si fuera sincrónico, además evita el anidamiento excesivo de promesas. (Diapos del curso, 2024) (https://leojimzdev.com/guia-completa-de-async-await-en-javascript-aprende-ahora/#:~:text=Async%2Fawait%20se%20basa%20en%20Promesas%20y%20utiliza%20las,antes%20de%20continuar%20con%20la%20ejecuci%C3%B3n%20del%20c%C3%B3digo.)

### :thinking: En cuanto a códigos de error, ¿qué ocurre al intentar enviar valores que no son válidos?

Sale un error 400 (Bad request). Ejemplo real que me pasó a mí:
```bash
PUT https://api.escuelajs.co/api/v1/products/173 400 (Bad Request)
dispatchXhrRequest @ axios.js?v=a61c9ee8:1513
...
```

### :adhesive_bandage: Explica la diferencia entre *props* y *state* dentro de un componente React. ¿En qué situaciones utilizarías cada uno?

``props`` son datos que se pasan de un componente "padre" a uno hijo. Son sólo de lectura dentro del componente hijo y se utilizan para personalizar o configurar el comportamiento y la apariencia del componenete hijo. 

``state`` es un objeto que pertenece a un componente y se utiliza para almacenar datos que pueden cambiar durante la "vida" del componente. El estado es privado y local al componente que lo define, así que sólo puede ser modificado por el componente en cuestión.

``props`` se utilizan para pasar información desde el componente padre al hijo y ``state`` se utiliza para gestionar información dinámica dentro de un componente, así que lo normal sería utilizar ``props`` para pasar datos estáticos, y ``state`` para manejar datos dinámicos que pueden cambiar la representación del componente. (https://es.stackoverflow.com/questions/109433/cual-es-la-diferencia-entre-props-y-state-en-react)


### PD: las partes en que usé o me basé en código de internet o le pedí ayuda a chatgpt están como comentarios dentro del mismo código :)
