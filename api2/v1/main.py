from fastapi import Request, FastAPI
import database.models as models
from database.database import engine, Base
import asyncio

app = FastAPI()

@app.on_event("startup")
async def startup():
    #await database.connect()
    pass

@app.on_event("shutdown")
async def shutdown():
    #await database.disconnect()
    pass

@app.get("/players/")
async def get_players():
    #query = models.Player.select()
    #return await database.fetch_all(query)
    pass

async def async_main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(async_main())