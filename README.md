# ProyectoFinalGomez - E-commerce SPA

## Descripción
Aplicación web de e-commerce desarrollada como Single Page Application (SPA) usando React. La aplicación permite navegar por un catálogo de productos artesanales argentinos, agregar productos al carrito y realizar compras.

## Características principales
- **SPA con React Router**: Navegación sin recarga de página
- **Context API**: Manejo del estado global del carrito
- **Firebase Firestore**: Base de datos para productos y órdenes
- **Diseño responsive**: Optimizado para dispositivos móviles y desktop
- **Interfaz moderna**: Diseño profesional con Tailwind CSS

## Funcionalidades
- ✅ Listado dinámico de productos desde Firestore
- ✅ Filtrado por categorías
- ✅ Vista detallada de productos
- ✅ Selector de cantidad con validación de stock
- ✅ Carrito de compras persistente
- ✅ Proceso de checkout completo
- ✅ Generación de órdenes en Firestore
- ✅ Estados de carga y manejo de errores

## Componentes principales

### Contenedores
- **App**: Componente principal con routing
- **ItemListContainer**: Maneja la lista de productos
- **ItemDetailContainer**: Maneja el detalle del producto

### Presentacionales
- **NavBar**: Navegación principal con CartWidget
- **ItemList**: Lista de productos
- **Item**: Tarjeta individual de producto
- **ItemDetail**: Vista detallada del producto
- **ItemCount**: Selector de cantidad
- **Cart**: Vista del carrito
- **CartItem**: Item individual del carrito
- **CheckoutForm**: Formulario de compra

## Tecnologías utilizadas
- **React 18**: Framework principal
- **React Router DOM**: Navegación SPA
- **Firebase/Firestore**: Base de datos
- **Tailwind CSS**: Estilos
- **Lucide React**: Iconografía
- **Vite**: Build tool

## Configuración de Firebase

1. Crear proyecto en Firebase Console
2. Habilitar Firestore Database
3. Configurar las credenciales en `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-project-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

## Estructura de datos en Firestore

### Colección: products
```javascript
{
  name: "Nombre del producto",
  description: "Descripción del producto",
  price: 1500,
  category: "dulces",
  stock: 10,
  img: "url-de-la-imagen"
}
```

### Colección: orders
```javascript
{
  buyer: {
    name: "Nombre del comprador",
    phone: "Teléfono",
    email: "email@ejemplo.com"
  },
  items: [
    {
      id: "product-id",
      name: "Producto",
      price: 1500,
      quantity: 2
    }
  ],
  total: 3000,
  date: timestamp,
  status: "generated"
}
```

## Instalación y uso

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar Firebase (ver sección anterior)
4. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
5. Build para producción:
   ```bash
   npm run build
   ```

## Deploy
La aplicación está configurada para deploy en Netlify o Vercel.

## Autor
Desarrollado por Gomez como proyecto final del curso de React.

## Licencia
MIT License