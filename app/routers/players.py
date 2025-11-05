from fastapi import Depends, APIRouter
from app.schemas.players import PlayerSlimSchema
from app.database.database import get_session
from app.services.players import PlayerService

router = APIRouter(prefix='/players', tags=['players'])


@router.get('/', response_model=list[PlayerSlimSchema])
async def get_players(session=Depends(get_session)) -> PlayerSlimSchema:
    service = PlayerService(session)
    players = await service.get_all_players()
    return players

"""
@router.get('/{id}', response_model=PlayerOut)
async def get_player(id: int, session=Depends(get_session)) -> JSONResponse:
    async with session() as session:
        stmt = select(models.Player).filter_by(id=id).order_by(models.Player.id)
        result = await session.execute(stmt)
        player = result.scalars().one()
        return player


@router.post('/', response_model=PlayerOut)
async def create_player(schema: PlayerIn, session=Depends(get_session)) -> JSONResponse:
    async with session() as session:
        player = models.Player(firstname=schema.firstname, lastname=schema.lastname, country_code=schema.country_code)
        session.add(player)
        await session.commit()
        return player


@router.put('/{id}', response_model=PlayerOut)
async def update_player(id: int, schema: PlayerIn, session=Depends(get_session)) -> JSONResponse:
    async with session() as session:
        stmt = select(models.Player).filter_by(id=id).order_by(models.Player.id)
        result = await session.execute(stmt)
        player = result.scalars().one()
        player.firstname = schema.firstname
        player.lastname = schema.lastname
        player.country_code = schema.country_code
        await session.commit()
        await session.update(player)
        return player


@router.delete('/{id}')
async def delete_player(id: int, session=Depends(get_session)) -> JSONResponse:
    async with session() as session:
        stmt = select(models.Player).filter_by(id=id)
        result = await session.execute(stmt)
        player = result.scalars().one()
        await session.delete(player)
        await session.commit()
        return JSONResponse({'ok': True})
"""