from fastapi import Depends
from fastapi import APIRouter
from app.models import Match
from app.schemas.schemas import MatchIn, MatchOut
from app.database.database import get_session

router = APIRouter(prefix='/matches', tags=['matches'])


@router.get('/', response_model=list[dict])
async def get_matches(location: int=0, pichichi: int=0, mvp: int=0, session=Depends(get_session)):
    return []


@router.get('/{id}', response_model=dict)
async def get_match(id: int, session=Depends(get_session)):
    return {}


@router.post('/', response_model=dict)
async def create_match(matchSchema: MatchIn, session=Depends(get_session)):
    return {}


@router.put('/{id}', response_model=dict)
async def update_match(id: int, matchSchema: MatchIn, session=Depends(get_session)):
    return {}


@router.delete('/{id}', response_model=dict)
async def delete_match(id: int, session=Depends(get_session)):
    return {}
