---
categoria: biblioteca
---

[Tortoise-ORM](https://tortoise-orm.readthedocs.io/en/latest/) é construído sobre o `asyncio` e é projetado para aplicações que precisam de alta performance e escalabilidade, especialmente quando se trata de operações assíncronas.

Python tem muitos ORMs existentes e maduros, infelizmente eles são projetados com um paradigma oposto de como a E/S é processada. `asyncio` é uma tecnologia relativamente nova que possui um modelo de simultaneidade diferente, e a maior mudança é em relação à forma como a E/S é tratada.

# Exemplo de utilização

Define your models like so:

```python
from tortoise.models import Model
from tortoise import fields

class Tournament(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()
```

Initialise your models and database like so:

```python
from tortoise import Tortoise, run_async

async def init():
    # Here we create a SQLite DB using file "db.sqlite3"
    #  also specify the app name of "models"
    #  which contain models from "app.models"
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['app.models']}
    )
    # Generate schemas according to models provided to `.init()` method. 
    # Will fail if schemas already exists.
    # It’s not recommended to be used as part of application workflow
    await Tortoise.generate_schemas()

# run_async is a helper function to run simple async Tortoise scripts.
run_async(init())
```

And use it like so:

```python
# Create instance by save
tournament = Tournament(name='New Tournament')
await tournament.save()

# Or by .create()
await Tournament.create(name='Another Tournament')

# Now search for a record
tour = await Tournament.filter(name__contains='Another').first()
print(tour.name)
```