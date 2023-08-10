from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
import os

SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://{}:{}@{}/{}".format(
    os.environ['DB_USER'],
    os.environ['DB_PASS'],
    os.environ['DB_HOST'],
    os.environ['DB_DATABASE']
)

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)

Base = declarative_base()

async_session = async_sessionmaker(engine, expire_on_commit=False)

# Dependency
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session
