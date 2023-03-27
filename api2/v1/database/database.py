import logging
from typing import AsyncIterator
#from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import declarative_base
#from sqlalchemy.orm import sessionmaker
#mport databases

logger = logging.getLogger(__name__)

SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://rubinhozzz:12345@localhost/aves"

#database = databases.Database(SQLALCHEMY_DATABASE_URL)

#metadata = MetaData()

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)

#SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autoflush=False,
    future=True,
)

async def get_session() -> AsyncIterator[async_sessionmaker]:
    try:
        yield AsyncSessionLocal
    except SQLAlchemyError as e:
        logger.exception(e)
