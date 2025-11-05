from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.routers.matches import router as match_router

app = FastAPI()
app.include_router(match_router)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://4.245.64.27",
    "http://4.245.64.27:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
"""
async def async_main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

#asyncio.run(async_main())
"""