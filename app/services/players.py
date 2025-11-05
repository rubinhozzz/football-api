from app.crud import players as players_crud
from app.models import Player


class PlayerService:
    def __init__(self, session):
        self.session = session

    async def get_all_players(self) -> list[Player]:
        return await players_crud.get_all_players(self, self.session)
