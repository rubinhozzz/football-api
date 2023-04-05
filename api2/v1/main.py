from fastapi import Request, FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware 
import database.models as models
from database.database import engine, Base, get_session
import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from database.schemas import Player

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def health() -> JSONResponse:
    return JSONResponse({"message": "It worked!!"})

@app.get("/players/{id}")
async def get_players(id: int, session: AsyncSession = Depends(get_session)) -> JSONResponse:
    try:
        stmt = select(models.Player).filter_by(id=id).order_by(models.Player.id)
        result = await session.execute(stmt)
        player = result.scalars().first()
        return jsonable_encoder(player)
    except Exception as ex:
        return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)    

@app.get("/players/")
async def get_players(session: AsyncSession = Depends(get_session)) -> JSONResponse:
    stmt = select(models.Player).order_by(models.Player.id)
    result = await session.execute(stmt)
    players = result.scalars().all()
    return jsonable_encoder(players)
   
@app.post("/players/")
async def create_player(player: Player, session: AsyncSession = Depends(get_session)) -> JSONResponse:
    try:
        async with session.begin():
            p = models.Player(firstname=player.firstname, lastname=player.lastname, country_code=player.country_code)
            session.add(p)
            await session.commit()
            return jsonable_encoder(p)
    except Exception as ex:
        print(ex)
        return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)   

@app.put("/players/{id}")
async def update_player(session: AsyncSession = Depends(get_session)) -> JSONResponse:
    stmt = select(models.Player).order_by(models.Player.id)
    r = await session.execute(stmt)
    for row in r.scalars():
        print(f"{row.id} {row.firstname} {row.lastname}")
    return JSONResponse({"message": "It worked!!"})

@app.delete('/players/{id}')
async def delete_player(id: int, session: AsyncSession = Depends(get_session)) -> JSONResponse:
    try:
        stmt = select(models.Player).filter_by(id=id)
        result = await session.execute(stmt)
        player = result.scalars().first()
        await session.delete(player)
        await session.commit()
        return JSONResponse({'ok': True})
    except Exception as ex:
        return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)    

async def async_main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

#asyncio.run(async_main())
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)