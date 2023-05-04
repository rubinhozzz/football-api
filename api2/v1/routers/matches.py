from fastapi import Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter
from database.schemas import Match
import database.models as models
from database.database import get_session
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import NoResultFound

router = APIRouter(prefix='/matches', tags=['matches'])

@router.get('/')
async def get_matches(location: int=0, pichichi: int=0, mvp: int=0, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	try:
		print(location, pichichi, mvp)
		where = []
		if location:
			where.append(models.Match.location_id == location)
		if mvp:
			where.append(models.Match.mvp_id == mvp)
		stmt = select(models.Match).where(and_(*where))
		result = await session.execute(stmt)
		matches = result.scalars().all()
		return jsonable_encoder(matches)
	except Exception as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=500)    

@router.get('/{id}')
async def get_match(id: int, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	try:
		stmt = select(models.Match).filter_by(id=id)
		result = await session.execute(stmt)
		match = result.scalars().one()
		return jsonable_encoder(match)
	except NoResultFound as ex:
		return JSONResponse({'ok': False, 'error': str(ex)}, status_code=404)    

@router.post('/')
async def create_match(matchSchema: Match, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	async with session.begin():
		try:
			stmt = select(models.Location).filter_by(id=matchSchema.location).order_by(models.Location.id)
			result = await session.execute(stmt)
			location = result.scalars().one()
			match = models.Match(
				datetime= matchSchema.datetime,
				teamA_name= matchSchema.teamA_name,
				teamA_score= matchSchema.teamA_score,
				teamB_name= matchSchema.teamB_name,
				teamB_score= matchSchema.teamB_score)
			match.location = location
			# mvp
			if not matchSchema.mvp:
				match.mvp = None
			else:
				stmt = select(models.Player).filter_by(id=matchSchema.mvp)
				result = await session.execute(stmt)
				player = result.scalars().one()
				match.mvp = player
			# players
			match.players.clear()
			if matchSchema.teamA_players:
				for player_id in matchSchema.teamA_players:
					player = await get_player(player_id, session)
					pm = models.PlayerMatch(team='A')
					pm.player = player
					match.players.append(pm)
			if matchSchema.teamB_players:
				for player_id in matchSchema.teamB_players:
					player = await get_player(player_id, session)
					pm = models.PlayerMatch(team='B')
					pm.player = player
					match.players.append(pm)
			session.add(match)
			await session.commit()
			return jsonable_encoder(match)
		except NoResultFound as ex:
			return JSONResponse({'ok': False, 'error': str(ex)}, status_code=404)

@router.put('/{id}')
async def update_match(id: int, matchSchema: Match, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	async with session.begin():
		try:
			stmt = select(models.Match).filter_by(id=id)
			result = await session.execute(stmt)
			match = result.scalars().one()
			match.datetime = matchSchema.datetime
			match.teamA_name = matchSchema.teamA_name
			match.teamA_score = matchSchema.teamA_score
			match.teamB_name = matchSchema.teamB_name
			match.teamB_score = matchSchema.teamB_score
			if not matchSchema.mvp:
				match.mvp = None
			else:
				stmt = select(models.Player).filter_by(id=matchSchema.mvp)
				result = await session.execute(stmt)
				player = result.scalars().one()
				match.mvp = player
			# players
			match.players = []
			if matchSchema.teamA_players:
				for player_id in matchSchema.teamA_players:
					p1 = await get_player(player_id, session)
					p = models.PlayerMatch(team='A')
					p.player = p1
					match.players.append(p)
			if matchSchema.teamB_players:
				for player_id in matchSchema.teamB_players:
					p1 = await get_player(player_id, session)
					p = models.PlayerMatch(team='B')
					p.player = p1
					match.players.append(p)
			await session.commit()
			return jsonable_encoder(match)
		except NoResultFound as ex:
			return JSONResponse({'ok': False, 'error': str(ex)}, status_code=404)

@router.delete('/{id}')
async def delete_match(id: int, session: AsyncSession = Depends(get_session)) -> JSONResponse:
	async with session.begin():
		try:
			stmt = select(models.Match).filter_by(id=id)
			result = await session.execute(stmt)
			match = result.scalars().one()
			await session.delete(match)
			await session.commit()
			return JSONResponse({'ok': True})
		except NoResultFound as ex:
			return JSONResponse({'ok': False, 'error': str(ex)}, status_code=404)

async def get_player(id: int, session: AsyncSession = Depends(get_session)) -> models.Player | None:
	try:
		stmt = select(models.Player).filter_by(id=id)
		result = await session.execute(stmt)
		player = result.scalars().one()
		return player
	except NoResultFound as ex:
		return None

		
