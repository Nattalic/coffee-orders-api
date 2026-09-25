## Preguntas de cierre

### 1. ¿Por qué `OrderPriorityService` no necesita un repository?

Porque su responsabilidad únicamente es recibir una orden que ya fue encontrada y clasificar su prioridad según su estado y cantidad. No necesita buscar ni modificar información en la base de datos

### 2. ¿Qué responsabilidad tiene `OrdersService` al consultar la prioridad?

`OrdersService` busca la orden utilizando `findOne(id)`, mantiene el error 404 si no existe y luego envía la orden encontrada a `OrderPriorityService` para obtener su clasificación

### 3. ¿Cuál es la diferencia entre `totalPending` y `showing`?

`totalPending` representa la cantidad total de pedidos pendientes que existen en la base de datos

`showing` representa la cantidad de pedidos que se están mostrando en la respuesta. como la cola tiene un límite de cinco pedidos, `showing` nunca puede ser mayor a 5

### 4. ¿Por qué las pruebas de prioridad pueden ejecutarse sin PostgreSQL?

Porque `OrderPriorityService` no consulta la base de datos. las pruebas crean una orden directamente y la envían al método `classify()`, por lo que solo se está comprobando la lógica de clasificación

### 5. ¿Qué problema de diseño aparecería si la prioridad se calculara en el controller?

El controller tendría una responsabilidad que no le corresponde. su función debe ser manejar las peticiones HTTP y delegar la lógica a los servicios. si la prioridad se calculara allí, se mezclaría la lógica de negocio con la lógica HTTP y sería más difícil mantener y probar el código

---

## Uso de Inteligencia Artificial

Durante el desarrollo del taller utilicé **ChatGPT** únicamente para resolver dudas puntuales relacionadas con la estructura y comprensión del código

### Consulta 1

**Herramienta:** ChatGPT

**Pregunta realizada:**  
¿Dónde debe ir el método `classify(order: OrderEntity)` dentro de `OrderPriorityService`?

**Resumen de la explicación:**  
Se explicó que `@Injectable()` corresponde al decorador de la clase y que `classify()` debía declararse como un método dentro de `OrderPriorityService`

**Decisión tomada:**  
Creé el método `classify()` dentro de la clase e implementé las reglas de prioridad solicitadas en el taller

### Consulta 2

**Herramienta:** ChatGPT

**Pregunta realizada:**  
¿Por qué aparecía un error al retornar `orderId` desde el método `getPriority()`?

**Resumen de la explicación:**  
Se explicó que el método estaba declarado con `Promise<OrderEntity>`, pero la respuesta que estaba construyendo no era una entidad completa, sino un objeto con propiedades diferentes como `orderId`, `priority` y `message`

**Decisión tomada:**  
Cambié el tipo de retorno del método para representar las propiedades que realmente devuelve la respuesta

### Consulta 3

**Herramienta:** ChatGPT

**Pregunta realizada:**  
¿Qué nombres podía utilizar en las pruebas de `OrderPriorityService`?

**Resumen de la explicación:**  
Se propusieron nombres descriptivos para cada escenario de prueba, indicando el estado, la cantidad y la prioridad esperada

**Decisión tomada:**  
Utilicé nombres que describen claramente los cuatro comportamientos evaluados: prioridad `normal`, `medium`, `high` y `completed`
