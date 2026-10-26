# Animedoro PRO

Plataforma integral basada en la metodologia Animedoro:
- 30 minutos de trabajo o estudio concentrado con musica Lo-Fi automatica.
- 1 episodio de anime (20 minutos) de descanso.
- Catalogo interactivo conectado con AniList GraphQL API con filtros por popularidad, accion, romance y busqueda.
- Guias de episodios canon y relleno integradas con Animedatos.com.
- Companeros de enfoque legendarios: Monkey D. Luffy, Asta, Naruto Uzumaki, Meliodas e Ippo Makunouchi.

---

## Arquitectura del Proyecto

El codigo fuente esta organizado de manera modular en dos capas principales dentro de `src/`:

```
.
├── src/
│   ├── client/                  # Frontend (React 18 + TypeScript + Vite + Tailwind)
│   │   ├── components/          # Componentes de UI (Timer, AnimeCatalog, LofiPlayer, Navbar, etc.)
│   │   ├── constants/           # Pistas Lo-Fi, categorias y sagas legendarias
│   │   ├── hooks/               # Logica de temporizador (useTimer) y audio (useLofiAudio)
│   │   ├── services/            # Cliente GraphQL de AniList y motor de audio Web Audio
│   │   ├── types/               # Definiciones e interfaces de TypeScript
│   │   ├── App.tsx              # Componente raiz del frontend
│   │   ├── main.tsx             # Punto de entrada de React
│   │   └── index.css            # Directivas de Tailwind y estilos globales
│   │
│   └── server/                  # Backend (Node.js + Express + TypeScript)
│       └── index.ts             # API REST (salud, pistas lofi, sagas legendarias)
│
├── .agents/                     # Configuraciones y skills de diseno para Antigravity
│   ├── rules/                   # Reglas de interfaz y ausencia de emojis
│   └── skills/                  # Skills de diseno UI/UX anime
│
├── index.html                   # Documento HTML principal
├── package.json                 # Dependencias y scripts de ejecucion
├── tailwind.config.js           # Configuracion de tema y paletas de color
├── tsconfig.json                # Configuracion del compilador TypeScript
└── vite.config.ts               # Configuracion del empaquetador Vite
```

---

## Tecnologias Empleadas

### Cliente
- **React 18 & TypeScript**: Arquitectura basada en componentes reactivos y tipado estricto.
- **Vite**: Entorno de desarrollo ultrarrapido con recarga de modulos en caliente (HMR).
- **Tailwind CSS**: Diseno responsivo con soporte nativo de modo claro y modo oscuro.
- **Lucide Icons**: Sistema vectorial de iconografia profesional sin emojis unicode.
- **HTML5 Audio & Web Audio API**: Reproduccion de streams Lo-Fi 24/7 y campanas armonicas zen.

### Servidor
- **Express 5**: Servidor backend ligero para gestion de endpoints de catalogo y musica.
- **TypeScript & TSX**: Ejecucion directa con tipado seguro en tiempo real.
- **CORS**: Compatibilidad multiplataforma para consumo seguro de APIs.

---

## Instalacion y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/gorkarmz/animedoro-pro.git
cd animedoro-pro
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar el Cliente (Frontend)
```bash
npm run dev
```
Abre en tu navegador: `http://localhost:5173`

### 4. Ejecutar el Servidor (Backend)
```bash
npm run server
```
El servidor estara disponible en: `http://localhost:3001`

### 5. Compilar para Produccion
```bash
npm run build
```
Genera la version optimizada lista para despliegue en la carpeta `dist/`.

---

## Caracteristicas Principales

### 1. Temporizador Inteligente con Musica Lo-Fi Sincronizada
- Al pulsar **Iniciar** (o la barra espaciadora), la musica Lo-Fi arranca automaticamente para facilitar el estado de concentracion profunda (*flow state*).
- Al pulsar **Pausar**, la musica se detiene inmediatamente.
- Barra de control flotante con selector de emisoras en directo:
  - Chillhop Beats 24/7
  - Anime Aesthetic Lo-Fi
  - Deep Focus Lo-Fi Hip Hop
- Ecualizador de ondas activas, control de volumen y modo silencio rapido (tecla M).

### 2. Catalogo de Anime en Vivo (AniList API)
- Filtros rapidos por genero:
  - Accion (Shingeki no Kyojin, Demon Slayer, Jujutsu Kaisen, etc.)
  - Romance (Kaguya-sama: Love is War, Horimiya, Toradora, etc.)
  - Aventura, Comedia, Fantasia, Ciencia Ficcion, Misterio, Drama, Vida Cotidiana y Sobrenatural.
- Ordenacion por **Popularidad**, **Mejor Puntuados** y **Tendencia**.
- Buscador interactivo en tiempo real con filtrado continuo.
- Modal con sinopsis completa, datos de emision, trailer oficial y enlace directo a **Animedatos.com** para verificar episodios de relleno.
- Boton para vincular la serie directamente a tu descanso actual.

### 3. Sagas Legendarias y Mentores de Concentracion
Selecciona a tu mentor para acompanarte durante cada bloque de trabajo:
- **Monkey D. Luffy** (*One Piece*): Determinacion inquebrantable hasta alcanzar tu meta.
- **Asta** (*Black Clover*): Tu magia es no rendirte jamas.
- **Naruto Uzumaki** (*Naruto Shippuden*): Camino ninja sin retroceder en tu esfuerzo.
- **Meliodas** (*Nanatsu no Taizai*): Contraataque total frente a las distracciones.
- **Ippo Makunouchi** (*Hajime no Ippo*): Disciplina del cuadrilatero paso a paso.

---

## Atajos de Teclado

- **Espacio**: Iniciar o pausar la sesion de concentracion y la musica Lo-Fi.
- **R**: Reiniciar la cuenta atras actual.
- **S**: Saltar inmediatamente de fase (Trabajo / Descanso).
- **M**: Silenciar o reactivar el sonido Lo-Fi.

---

## Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para mas informacion.
