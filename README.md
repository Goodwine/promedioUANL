# promedioUANL

Extensión de Chrome para obtener el promedio del Kardex

Para compilar requerirás `npm` y `tsc` instalados.

usa VSCode y ejecuta la tarea dentro de la carpeta `.vscode` o ejecuta el
siguiente comando:

```
tsc src/content_script.ts
```

> **Notas:**
>
> - Promedio **General** es el que cuenta para cuando buscan maestría o cuando
>   mandan a imprimir una "Constancia de Promedio".
> - Promedio **Normal** incluye las materias reprobadas y _creo_ que solo lo
>   usan para trámites de intercambio o Conacyt, pero no me consta.

![Imágen demostrando que el kardex agrega el promedio](https://lh3.googleusercontent.com/RtKV9fWHaOn8VX_Vpqtc0TpSs2TwE7Q9rTir5kNcuXH8MnpGMY_GbeFozNj9mPwSZHmXlvrnNw=w640-h400-e365)

> **Ojo:** La extensión de FireFox ya no está en mantenimiento.
