from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from routers.players import router as player_router
from routers.matches import router as match_router
from routers.locations import router as location_router

app = FastAPI()
app.include_router(player_router)
app.include_router(match_router)
app.include_router(location_router)

origins = [
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

@app.get("/")
def read_root():
    return {"Hello": "World"}