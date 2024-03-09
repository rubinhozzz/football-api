from pydantic import BaseModel
import datetime
from typing import Optional


class LocationIn(BaseModel):
    name: str
    postcode: Optional[str] = None
    address: Optional[str] = None


class LocationOut(BaseModel):
    id: int
    name: str
    postcode: Optional[str] = None
    address: Optional[str] = None
    is_active: bool = True


class PlayerIn(BaseModel):
    firstname: str
    lastname: Optional[str] = None
    country_code: Optional[str] = None


class PlayerOut(BaseModel):
    id: int
    firstname: str
    lastname: Optional[str] = None
    country_code: Optional[str] = None
    active: bool


class MatchIn(BaseModel):
    datetime: datetime.date
    teamA_name: str
    teamA_score: int
    teamA_players: Optional[list[int]] = None
    teamB_name: str
    teamB_score: int
    teamB_players: Optional[list[int]] = None
    location_id: int
    mvp_id: Optional[int] = None
    pichichis: Optional[list[int]] = None


class MatchOut(BaseModel):
    id: int
    datetime: datetime.date
    teamA_name: str
    teamA_score: int
    teamA_players: Optional[list[int]] = None
    teamB_name: str
    teamB_score: int
    teamB_players: Optional[list[PlayerOut]] = None
    location: LocationOut
    location_id: int
    mvp: Optional[PlayerOut] = None
    mvp_id: Optional[int]
    pichichis: Optional[list[PlayerOut]] = None
