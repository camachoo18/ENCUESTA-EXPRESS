# Backend encuestas NDT

Necesitamos crear un backend con las siguientes caracteristicas:
- Servir archivos estaticos(index, login, visualizaciones....)
- SQLite
    - Users
    - Valoraciones
- Poder almacenar reviews
- Poder almacenar users


## Base de datos

Utilizaremos SQLite, con dos tablas, `users` y `Reviews`.

- Users
 - Name
 - Passwords
- Reviews
 - rating
 - message

## api

### POST /api/reviews?rating="good"&message="ta flama"

Endpoint para recibir los datos del usuario, los mandaremos por el body en formato json.

```json
{
    "rating": "good",
    "message": "lo que sea"
}
```

En rating solo pueden llegar tres valores posibles

- good
- neutral
- bad

En message:

Maximo 256 caracteres.