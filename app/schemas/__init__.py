from pydantic import BaseModel
import datetime
from typing import Optional


class PlayerBaseSchema(BaseModel):
    firstname: str
    lastname: Optional[str] = None
    country_code: Optional[str] = None
