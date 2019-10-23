## node-force

настроить дб-конфиг по примеру config/database.example.json  
запускать только npm run dev (билдиться криво)  
есть миграции и сидеры  
запускать сидеры на только созданных таблицах и только поочередно create-companies > create-departments > create-users > create-projects > create-projects_users  
есть пагинация на рутовых get "/?page=n&limit=m"  

### Связи  
Компания 1:n Отдел  
Юзер 1:1 Отдел  
Проект n:m Юзер  

### Структура  
user { name:required, login:required, password:required }
project { name:required, description }
company { name:required }
department { name:required }

#### /users  
post '/signup'  регистрация { name, login, password } эти обязательны   
post '/login'  token в response body  
get '/' (auth)  вытащить всех юзеров  
patch '/:id' (auth)  можно изменить только свои данные  

Все пути ниже заперты за токенами  
#### /projects  
get '/' все проекты  
post '/' создать новый проект  
patch '/:id' редактировать проект  
patch '/:id/users' добавить юзеров к проекту; отправить @usersIds: array в body ({"usersIds": [1,2,3]})  
delete '/:id' удалить проект(каскадно удаляться связи юзеров с этим проектом)  

#### /companies  
get '/' все компании  
post '/' создать компанию  
patch '/:id' редактировать компанию  
get '/:id/departments' все отделы компании с id  
post '/:id/departments' добавить отдел к компании с id. в body отправить филды для отдела({"name": "Бухгалтерия"}  
delete '/:id' удалить компанию(каскадно удаляться все отделы в этой компании)  

#### /departments  
patch '/:id/users' добавить юзеров в отдел  
patch '/:id' редактировать отдел  
delete '/:id' удалить отдел(всем юзерам этого отдела будет присвоен NULL в id отдела)  

