"""
async def async_main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

#asyncio.run(async_main())
"""
from api import app

if __name__ == '__main__':
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=8000)
