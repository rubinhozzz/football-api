from fastapi import Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter
from database.schemas import Match
import database.models as models
from database.database import get_session
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import NoResultFound 

router = APIRouter(prefix='/matches', tags=['matches'])

@router.get('/')
async def get_matches(session: AsyncSession = Depends(get_session)) -> JSONResponse:
	try:
		stmt = select(models.Match).order_by(models.Match.id)
		result = await session.execute(stmt)
		matches = result.scalars().all()
		return jsonable_encoder(matches)
	except Exception as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)    
"""
@router.get('/{id}')
async def get_player(id: int, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	try:
		stmt = select(models.Player).filter_by(id=id).order_by(models.Player.id)
		result = await session.execute(stmt)
		player = result.scalars().one()
		return jsonable_encoder(player)
	except NoResultFound as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=404)    
	except Exception as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)    
"""
@router.post('/')
async def create_match(match: Match, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	print(match)
	async with session.begin():
		m = models.Match(
			datetime=match.datetime, 
			teamA_name=match.teamA_name,
			teamB_name=match.teamB_name,
			teamA_score=match.teamA_score,
			teamB_score=match.teamB_score)
			#location:
			#location: Mapped["Location"] = relationship(back_populates="match")
			#mvp_id: Mapped[int] = mapped_column(ForeignKey("player.id")) 
			#mvp: Mapped["Player"] = relationship(back_populates="match_mvp")
			#pichichis: Mapped[List["Player"]] = relationship(secondary="player_match")
		session.add(m)
		await session.commit()
		return jsonable_encoder(m)

"""
@router.put('/{id}')
async def update_player(id: int, playerSchema: Player, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	try:
		async with session.begin():
			stmt = select(models.Player).filter_by(id=id).order_by(models.Player.id)
			result = await session.execute(stmt)
			player = result.scalars().one()
			player.firstname = playerSchema.firstname
			player.lastname = playerSchema.lastname
			player.country_code = playerSchema.country_code
			await session.commit()
			return jsonable_encoder(player)
	except NoResultFound as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=404)
	except Exception as ex:
		print(ex)
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)   

@router.delete('/{id}')
async def delete_player(id: int, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	try:
		async with session.begin():
			stmt = select(models.Player).filter_by(id=id)
			result = await session.execute(stmt)
			player = result.scalars().one()
			await session.delete(player)
			await session.commit()
			return JSONResponse({'ok': True})
	except NoResultFound as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=404)    
	except Exception as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)    
"""