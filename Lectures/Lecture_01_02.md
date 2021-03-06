## Языки программирования
### Лекция 1 03.09.2019
#### Вводная часть (немного истории)

* **PL/I** — не выжил, был неудобен
* 1968 **Algol-68** — совсем другое дело, создан учеными. 
    * Pascal, C пошли от него. 
    * "Замечательнейший" ЯП, но через 10 лет его пересмотрели. 
    * W-грамматики, может генерировать потенциально бесконечное множество контекстно-полных правил, символы генерировались особым образом, но механизм достаточно простой.
   
#####   *Всякая дополнительная инфа*
   
*Ортогональность* ЯП:
"Этот термин был введен в информатике для обозначения некой разновидности независимости или несвязанности. Два или более объекта ортогональны, если изменения, вносимые в один из них, не влияют на любой другой. В грамотно спроектированной системе программа базы данных будет ортогональной к интерфейсу пользователя: вы можете менять интерфейс пользователя без воздействия на базу данных и менять местами базы данных, не меняя интерфейса." 
  *"Программист-Прагматик. Путь от подмастерья к мастеру" Э. Хант, Д. Тома*
  
Чистые вычисления без изменения состояния памяти. Изменение состояния  — главная задача оператора. Главный оператор в ЯП (каком?) — оператор присваивания. Операторы управляют вычислениями

```
// Pascal
v := e; //выражение превратилось в оператор, вычисляется значение v
```
В С нет оператора присваивания, но есть оператор-выражения. Операции с побочными эффектами, присваивание — побочный эффект (а так же инкремент, декремент и т.п.). Получился ортогональный язык.

##### конец фрагмента

* **Ада** — разработка на деньги военных, 50% — непосредственно разработка, 50% — последующее сопровождение. 
    * Необходимость в последующей доработке и развитии языка
    * Необходимость в сокращении расходов на сопровождение => выделили несколько основных ЯП, чтобы вести на них разработку. В итоге выработанным требованиям мог удовлетворить 1 ЯП, был объявлен конкурс 1980: ЯП Pascal, Algol-68 и PL/I. Конкурс выиграли проекты, основанные на Pascal. В финале выбрали "зеленый" язык, который назвали Ада.
    * 1983 выработали окончательный стандарт.
    
2 основынх способа дизайна ЯП:

1. Сундук (принцип осознанных технологических потребностей) — осознается, что нужно для ЯП, и это включается в ЯП. Ада использует этот принцип, требования исследовали на протяжении 3 лет. Функции без побочных эффектов —  включены, процедуры сочли избыточными.
 2. Чемодан —  берется только то, без чего нельзя обойтись, принцип минимальонсти языковых конструкций. Есть проблемная область, ЯП конструируется только для этой области.
 
 Таким образом, Ада достаточно сложный ЯП, невозможно ни расширение, ни сужение стандарта, некоторая избыточность. Многословный язык. Основная проблемная область Ады — противоракетная оборона.Фактически яп можно считать мертвым, хотя есть GNAT — GNU транслятор для Ады. Встроенная проверка на границы массива, которую можно отключить. В С таких проверок в runtime нет. Индексирование массива (еще такое в basic и Fortran):
 ```
 a(i)
 ``` 
ПО должно быть "реального времени", т.е. надежным и с гарантированнм откликом.

С: если поля нет у структуры, то раньше (в компиляторе К. Ричи) генерировалось предупреждение, компилятор ставил нулевое смещение, теперь выдается ошибка.
```C
p->name;
```

В Аде нужна была надежность, поэтому:

1.  Runtime поддержка и статический контроль компилятором;
2. Работа в реальном времени;
3. Читабельность (из-за этого многословность, но не факт, что разраюотчики добились этим, чего хотели).
 

_

 * **Java**, 1995: первоначальная идея — пересылка программ по сети, создание апплетов (потом от этого октазались), так что Write Once Run Anywhere (WORA). Принцип работает из-за наличия Java-машин, но они не все совместимы: JVM (virtual machine) + JRTE (runtime edition, для каждой системы может быть свой, от этого и несовместимость).
    * JWI — интерфейс
    
Таким образом, любая попытка создать единый ЯП ведет к неудаче, каждый хорош в своей отрасли. 
=> Нужно определить само понятие ЯП.

##### Виды программирования
1. Игровое (учебное)
2. Научное
3. Индустриальное

Нам нужно индустриальное

### Лекция 2 03.09.2019

> Почему интерпретатор С — неуловимый Джо? Потому что его никто не ловит.

(Разговор за бэкенд и фронтенд)
Go: динамическая сборка мусора, нет классов (в этом отличия от С++), 
>Go — сильно улучшенный С

#### Парадигма программирования

Совокупность всех навыков, методов, инструментов и систем

3 парадигмы:

1. Процедурная (императивная) — от архитектуры Фон Неймана 
    * Fortran
    * Assembler
    * **C** — императивный
    * Появление ООП (классы, состоящие из экземпляров. Instance variables; class variables - статические данные). Объектно-императивные ЯП:
        * **C#**
        * **C++**
        * **python** 
2. Функицональная
    * **Рефал**
    * **Lisp**
3. Логическая 
    * **Prolog**

> Мой научный руководитель, уважаемый человек, пожилой... Ну сидел, извините меня, старый пердун, медленно по клавишам стучал, да вот я сейчас так же

