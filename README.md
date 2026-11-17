# Entre páginas · Desarrollo Frontend II

**Estudiante:** Verioska Ramírez  
**Asignatura:** Desarrollo Frontend II (PFY2202)  
**Actividad:** Semana 4 · Utilizando tecnologías de integración entre frontend y backend  
**Nombre solicitado para el repositorio:** `hospital-verioska-ramirez-pfy2202`

Librería desarrollada con HTML, CSS, JavaScript y React. Los usuarios pueden explorar seis categorías, buscar libros por título o autor, ordenar los resultados, ver detalles y guardar favoritos. El frontend se comunica por HTTP con una **API REST mock real**, ejecutada con JSON Server en un proceso separado.

> El enunciado solicita el prefijo `hospital` para el repositorio, aunque la aplicación es una tienda de libros. Se conserva ese nombre para cumplir la instrucción de entrega.

## Ejecutar el proyecto

Requisito: **Node.js 22.12 o superior**. Se incluye `.nvmrc` para Node 24. Si tienes NVM instalado:

```bash
nvm install
nvm use
```

Desde esta carpeta:

```bash
npm install
npm run dev
```

Abrir **[http://localhost:5173](http://localhost:5173)**.

Este comando inicia ambos procesos: React/Vite en el puerto **5173** y la API REST en el puerto **3001**. `Ctrl+C` detiene ambos. No se necesitan cuentas, claves ni servicios externos para cargar los datos. Las fuentes de Google son opcionales: si no hay conexión se usan las fuentes de respaldo del sistema.

También se pueden iniciar por separado, en dos terminales:

```bash
# Terminal 1: backend mock
npm run api

# Terminal 2: frontend React
npm run client
```

## Requisitos de la actividad

| Requisito | Implementación |
| --- | --- |
| HTML, CSS, JavaScript y React | Documento HTML, estilos propios, módulos JavaScript y componentes React. |
| Tienda de libros con categorías | 12 libros en Ficción, Ciencia ficción, Fantasía, Misterio, Poesía y No ficción. |
| API REST mock para listar categorías | `fetch()` consulta `GET /categories` del servidor JSON Server. |
| Comunicación entre frontend y backend | Servicio HTTP en `src/services/api.js`; carga inicial de categorías y libros, y consulta de detalle por id. |
| React Router | `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams` y `useSearchParams`. |
| Entrega en GitHub | Publicar en `hospital-verioska-ramirez-pfy2202` y compartir la URL con el docente. |

## Navegación

| Ruta | Vista |
| --- | --- |
| `/` | Inicio y catálogo. |
| `/catalogo` | Catálogo completo, búsqueda y orden. |
| `/categorias/:categoryId` | Libros de una categoría. Ejemplo: `/categorias/ciencia-ficcion`. |
| `/libros/:bookId` | Detalle del libro consultado mediante REST. Ejemplo: `/libros/1`. |
| `/favoritos` | Favoritos guardados en `localStorage` de este navegador. |
| `/nosotros` | Presentación de la librería e información académica. |
| Cualquier otra ruta | Página 404 con enlace de regreso. |

La búsqueda y el orden se conservan en la URL. Ejemplo: `/catalogo?q=allende&orden=price-asc`. El filtrado se realiza en React después de obtener los datos de la API.

## API REST mock

Los datos están en `server/db.json`. JSON Server los expone en:

| Método | Endpoint | Resultado |
| --- | --- | --- |
| GET | `http://localhost:3001/categories` | Lista de categorías. |
| GET | `http://localhost:3001/books` | Lista de libros. |
| GET | `http://localhost:3001/books?categoryId=ficcion` | Libros de una categoría. |
| GET | `http://localhost:3001/books/1` | Detalle de un libro. |

Ejemplo de categoría:

```json
{
  "id": "ciencia-ficcion",
  "name": "Ciencia ficción",
  "icon": "planet",
  "description": "Otros mundos, futuros posibles y preguntas que nos invitan a mirar más allá."
}
```

Vite redirige `/api` hacia `http://127.0.0.1:3001` usando un proxy. Para usar otra API, copia `.env.example` a `.env.local`, configura `VITE_API_URL` y reinicia Vite. El backend alternativo debe exponer los mismos endpoints y permitir CORS cuando tenga un origen diferente.

El frontend muestra estados de carga, error con reintento, categoría inexistente, libro inexistente y búsqueda sin resultados. Las solicitudes usan `AbortController` para cancelar cargas al desmontar componentes.

## Verificar y compilar

```bash
npm test
npm run build
```

Las pruebas verifican búsqueda sin tildes, combinación de filtros, orden de resultados e integridad de los datos. Las pruebas de integración levantan un servidor mock temporal y verifican sus endpoints por HTTP, incluidos los errores 404.

Para revisar la compilación, mantener la API encendida en una terminal y ejecutar lo siguiente en otra:

```bash
npm run preview
```

Abrir [http://localhost:4173](http://localhost:4173). **El build no incluye un backend desplegado**: tanto desarrollo como preview requieren JSON Server. Publicar el código en GitHub cumple con la entrega solicitada; habilitar GitHub Pages por sí solo no ejecutaría esta API.

## Estructura

```text
public/                   Favicon local
server/db.json            Datos del backend mock
src/
  components/             Iconos, portadas, tarjetas y estados de carga/error
  context/StoreContext.jsx Datos de la API y favoritos
  pages/                  Catálogo, detalle y presentación
  services/api.js         Peticiones REST con fetch
  utils/catalog.js        Búsqueda, filtros, orden y precios
  App.jsx                 Navegación y rutas
  main.jsx                Entrada y BrowserRouter
  styles.css              Diseño responsive
tests/                    Pruebas del catálogo y la API
vite.config.js            Vite y proxy al backend
```

## Entrega en GitHub

1. Crear un repositorio vacío llamado **`hospital-verioska-ramirez-pfy2202`**. Si será público, el docente podrá consultarlo sin invitación. No agregar README, licencia ni `.gitignore` remotos, ya que el proyecto incluye los archivos necesarios.
2. Desde **esta carpeta**, ejecutar los siguientes comandos. Si ya se inicializó un repositorio local propio en esta carpeta, omitir `git init`.

```bash
git init -b main
git add .
git commit -m "Implementa librería con React Router y API REST mock"
git remote add origin https://github.com/TU_USUARIO/hospital-verioska-ramirez-pfy2202.git
git push -u origin main
```

3. Reemplazar `TU_USUARIO` por tu usuario real de GitHub. Si Git solicita autenticación, utilizar tu método habitual de GitHub (SSH o token; no la contraseña de la cuenta).
4. Compartir con el docente la URL: `https://github.com/TU_USUARIO/hospital-verioska-ramirez-pfy2202`.

**Importante:** inicializar el repositorio dentro de esta carpeta para que la entrega incluya solamente esta actividad. No ejecutar `git add .` desde una carpeta superior con otros trabajos.

## Recorrido sugerido para demostrar la actividad

1. Ejecutar `npm run dev` y abrir el inicio.
2. Seleccionar **Ciencia ficción** y observar el cambio de ruta y los libros filtrados.
3. Buscar **García Márquez**, probar el orden por precio y abrir un detalle.
4. Guardar un libro con el corazón, ir a **Mis favoritos** y recargar para verificar su persistencia.
5. Abrir las herramientas de desarrollo del navegador, pestaña **Network**, y comprobar las respuestas JSON de `/api/categories`, `/api/books` y `/api/books/:id`.
6. Para comprobar la recuperación ante errores, detener la API, recargar, volver a iniciar `npm run api` y presionar **Volver a intentar**.

## Datos y recursos

Los precios, las valoraciones y las ediciones son **datos de demostración**, sin disponibilidad comercial real. Los textos descriptivos y las portadas gráficas se prepararon para la actividad; las portadas no reproducen ediciones comerciales. Los favoritos se guardan localmente, sin autenticación.

Documentación de referencia: [React](https://react.dev/learn), [React Router](https://reactrouter.com/start/declarative/installation), [Vite](https://vite.dev/guide/) y [JSON Server 0.17](https://github.com/typicode/json-server/tree/v0.17.4).
