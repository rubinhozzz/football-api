from pydantic import BaseModel
import datetime
from typing import Optional

class Location(BaseModel):
    name: str
    postcode: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = True

class Player(BaseModel):
   firstname: str
   lastname: str
   country_code: Optional[str] = None

class Match(BaseModel):
	datetime: datetime.date
	teamA_name: str
	teamA_score: int
	teamA_players: Optional[list[int]] = None
	teamB_name: str
	teamB_score: int
	teamB_players: Optional[list[int]] = None
	location: Optional[int] = None
	#location_id: int | None = None
	mvp: Optional[int] = None
	#mvp_id: int | None = None
	pichichis: Optional[list[int]] = None
