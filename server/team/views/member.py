import typing

from django import http
from django import shortcuts
import django.db.utils as db_utils
import ninja
import ninja.pagination

from team import models

router = ninja.Router()


class MemberIn(ninja.Schema):
    first_name: str = ninja.Field(min_length=1, max_length=200)
    last_name: str = ninja.Field(min_length=1, max_length=200)
    email: str = ninja.Field(pattern=r'^[a-zA-Z0-9_. +-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', max_length=200)
    phone: str = ninja.Field(pattern=r'^\d{3}-?\d{3}-?\d{4}$', min_length=10, max_length=20)
    role: typing.Literal['admin', 'regular']


class MemberOut(ninja.Schema):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    role: str


def is_member_email_integrity_error(e):
    return (
        isinstance(e, db_utils.IntegrityError) and
        'team_member.email' in str(e))


INVALID_EMAIL_ERROR = http.JsonResponse({
    'ok': False,
    'error': 'email is already taken',
}, status=400)


@router.get('/', response=list[MemberOut])
@ninja.pagination.paginate
def list(request):
    return models.Member.objects.all().order_by('id')


@router.get('/{id}', response=MemberOut)
def get(request, id: int):
    return shortcuts.get_object_or_404(models.Member, id=id)


@router.put('/{id}')
def put(request, id: int, payload: MemberIn):
    member = shortcuts.get_object_or_404(models.Member, id=id)

    for attr, value in payload.dict().items():
        setattr(member, attr, value)

    try:
        member.save()
    except db_utils.IntegrityError as e:
        if is_member_email_integrity_error(e):
            return INVALID_EMAIL_ERROR
        raise

    return {'ok': True, 'id': id}


@router.post('/')
def post(request, payload: MemberIn):
    try:
        member = models.Member.objects.create(**payload.dict())
    except db_utils.IntegrityError as e:
        if is_member_email_integrity_error(e):
            return INVALID_EMAIL_ERROR
        raise

    return {'ok': True, 'id': member.id}


@router.delete('/{id}')
def delete(request, id):
    member = shortcuts.get_object_or_404(models.Member, id=id)
    member.delete()

    return {'ok': True}
