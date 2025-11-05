from app.models import Player
from sqlalchemy import select


async def get_all_players(self, session) -> list[Player]:
    async with session() as session:
        stmt = select(Player).order_by(Player.id)
        result = await session.execute(stmt)
        players = result.scalars().all()
        return players
