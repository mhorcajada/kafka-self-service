
# Kubernetes Helm Values - Renovate Automation

Este repositorio contiene ficheros `values.yaml` utilizados para despliegues de Helm en un clúster Kubernetes. Está configurado para utilizar Renovate con el fin de automatizar la monitorización y actualización de imágenes y charts declarados en dichos archivos.

## 📦 Estructura del repositorio

```
.
├── renovate/
│   └── values.yaml
├── longhorn/
│   └── values.yaml
├── vault/
│   └── standalone/
│       └── custom-values.yaml
├── renovate.json
└── .gitignore
```

## 🤖 Renovate

El fichero `renovate.json` está configurado para revisar exclusivamente los siguientes archivos `values.yaml`:

- `renovate/values.yaml`
- `longhorn/values.yaml`
- `vault/standalone/custom-values.yaml`

### Plataforma

- `platform`: GitHub
- `timezone`: Europe/Madrid
- `labels`: `["dependencies"]`
- Agrupación de imágenes Docker bajo `docker updates`.

## 🚀 Uso

### Inicialización

```bash
git init
git remote add origin git@github.com:usuario/repositorio.git
git checkout -b main
```

### Añadir los archivos iniciales

```bash
git add renovate.json .gitignore README.md
git add renovate/values.yaml
git add longhorn/values.yaml
git add vault/standalone/custom-values.yaml
git commit -m "Inicialización del repo con values.yaml y configuración Renovate"
git push -u origin main
```

---

## ➕ Añadir nuevos archivos `values.yaml` al repositorio

Para incluir nuevos archivos de configuración de Helm en el seguimiento de Renovate:

```bash
# 1. Añadir el nuevo fichero al repositorio
git add <ruta/al/nuevo/values.yaml>

# 2. Editar renovate.json para incluirlo en fileMatch[]
vi renovate.json

# 3. Confirmar que la ruta del nuevo fichero está en el array `fileMatch`

# 4. Realizar commit
git commit -m "Añadir nuevo values.yaml para seguimiento con Renovate"

# 5. Subir los cambios
git push
```

⚠️ **Importante:** El path debe coincidir exactamente con la expresión de `fileMatch` en `renovate.json`. Se recomienda mantener una convención de carpetas por proyecto o aplicación (`longhorn/`, `vault/`, etc.) para facilitar el mantenimiento.

---

## 🛠️ Mantenimiento

- Renovate se despliega como Helm Chart.
- La versión de Renovate utilizada es `39.251.0`.
- Chart oficial: [https://github.com/renovatebot/helm-charts](https://github.com/renovatebot/helm-charts)

