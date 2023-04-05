from pydantic import BaseModel

class Player(BaseModel):
   firstname: str
   lastname: str
   country_code: str