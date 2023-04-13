from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from config.config import config

SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://{}:{}@{}/{}".format(
    config.DB_USER,
    config.DB_PASS,
    config.DB_HOST,
    config.DB_DATABASE
)

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)
print(engine)

Base = declarative_base()

async_session = async_sessionmaker(engine, expire_on_commit=False)

# Dependency
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session
