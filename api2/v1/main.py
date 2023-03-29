from fastapi import Request, FastAPI, Depends
from fastapi.responses import JSONResponse
import database.models as models
from database.database import engine, Base, get_session
import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

app = FastAPI()

@app.get("/", include_in_schema=False)
async def health() -> JSONResponse:
    return JSONResponse({"message": "It worked!!"})

@app.get("/players/")
async def get_players(session: AsyncSession = Depends(get_session)) -> JSONResponse:
    stmt = select(models.Player).order_by(models.Player.id)
    r = await session.execute(stmt)
    for row in r.scalars():
        print(f"{row.id} {row.firstname} {row.lastname}")
    return JSONResponse({"message": "It worked!!"})

async def async_main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

#asyncio.run(async_main())

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)