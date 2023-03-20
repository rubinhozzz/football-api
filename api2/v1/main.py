from fastapi import Request, FastAPI
import database.models as models
from database.database import SessionLocal, engine

models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def root():
    pass