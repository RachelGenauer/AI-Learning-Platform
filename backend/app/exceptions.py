from fastapi import HTTPException
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND

class AlreadyExistsException(HTTPException):
    def __init__(self, resource_name: str):
        super().__init__(
            status_code=HTTP_400_BAD_REQUEST,
            detail=f"{resource_name} already exists"
        )

class NotFoundException(HTTPException):
    def __init__(self, resource_name: str):
        super().__init__(
            status_code=HTTP_404_NOT_FOUND,
            detail=f"{resource_name} not found"
        )

class BadRequestException(HTTPException):
    def __init__(self, detail: str = "Bad request"):
        super().__init__(status_code=400, detail=detail)