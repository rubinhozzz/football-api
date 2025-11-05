from pydantic import BaseModel
from app.schemas import PlayerBaseSchema
import datetime
from typing import Optional


class PlayerSlimSchema(PlayerBaseSchema):
    pass


class PlayerCreateSchema(PlayerBaseSchema):
    pass


class PlayerUpdateSchema(BaseModel):
    pass
