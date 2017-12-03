## Buscador de imágenes

Puedes ver el resultado de este proyecto en la url: [Web proyecto](https://dasorey.github.io/buscador_imagenes/)

### Estructura de archivos

El proyecto está basado en AngularJS y el plugin AngularGrid con Infinite Scroll. Además utiliza los estilos Material de Google para los componentes.

1. index.html
2. js
  * app.js
  * angulargrid.js
  * ng-infinite-scroll.js
3. templates
  * promp1.html
4. css
  * style.css
  * normalize.css
  
### Funcionamiento

La página carga de forma inicial unas imagénes aleatorias. El usuario introduce la palabra o palabras que desea buscar en el input y pulsa enter. A la derecha aparecerá el número de imágenes disponibles con esos criterios de búsqueda y debajo las primeras 30 imágenes, a medida que el usuario haga scroll de forma automática irá cargando nuevas imágenes hasta cargar el total de las imágenes.

El usuario puede hacer click en las imágenes para verlas a tamaño completo, en la ventana emergente tendrá la opción de ver más fotos del mismo fotógrafo o también la podrá descargar. La plantilla de la ventana emergente está en templates/promp1.html.
