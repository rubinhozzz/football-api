from pydantic import BaseModel
import datetime

class Location(BaseModel):
    name: str
    postcode: str
    address: str
    is_active: bool

class Player(BaseModel):
   firstname: str
   lastname: str
   country_code: str

class Match(BaseModel):
	datetime: datetime.datetime
	teamA_name: str
	teamB_name: str
	teamA_score: int
	teamB_score: int
	location: Location
	mvp: Player
	pichichis: list[Player]