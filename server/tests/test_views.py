import django.test
import ninja.testing

from team import models
from team import views


def get_test_client():
    return ninja.testing.TestClient(views.member_router)


def create_members(n, role):
    members = [
        dict(first_name=f'First{i}',
             last_name=f'Last{i}',
             email=f'a{i}@b{i}.com',
             phone=f'{i}00-{i}00-{i}000',
             role=role)
        for i in range(n)
    ]

    for m in members:
        created = models.Member.objects.create(**m)
        m['id'] = created.id

    return members


class TeamViewTestCase(django.test.TestCase):
    def test_list(self):
        members = create_members(10, 'regular')
        client = get_test_client()

        response = client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'items': members, 'count': len(members)})

        #
        # test pagination
        #
        response = client.get('/?limit=5&offset=0')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'items': members[:5], 'count': len(members)})

        response = client.get('/?limit=5&offset=2')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'items': members[2:7], 'count': len(members)})

    def test_get(self):
        members = create_members(2, 'regular')
        client = get_test_client()

        response = client.get('/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), members[0])

        response = client.get('/2')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), members[1])

        response = client.get('/100')
        self.assertEqual(response.status_code, 404)

    def test_put(self):
        members = create_members(2, 'regular')
        client = get_test_client()

        members[0]['first_name'] = 'changed'

        response = client.put('/1', json=members[0])
        self.assertEqual(response.status_code, 200)

        response = client.get('/1')
        self.assertEqual(response.status_code, 200)
        modified_member = response.json()
        self.assertEqual(modified_member['first_name'], 'changed')
        self.assertEqual(modified_member, members[0])

        #
        # test put on non-existent member
        #
        response = client.put('/100', json=members[0])
        self.assertEqual(response.status_code, 404)

    def test_put_with_used_email(self):
        members = create_members(2, 'regular')
        client = get_test_client()

        members[0]['email'] = members[1]['email']
        response = client.put('/1', json=members[0])
        self.assertEqual(response.status_code, 400)

    def test_post(self):
        member = dict(
            first_name='a',
            last_name='b',
            email='a@b.com',
            phone='100-000-0000',
            role='admin',
        )

        client = get_test_client()
        response = client.post('/', json=member)
        self.assertEqual(response.status_code, 200)
        result = response.json()
        self.assertEqual(result, {'ok': True, 'id': 1})

    def test_post_with_used_email(self):
        member = dict(
            first_name='a',
            last_name='b',
            email='a@b.com',
            phone='100-000-0000',
            role='admin',
        )

        client = get_test_client()

        # Add member
        response = client.post('/', json=member)
        self.assertEqual(response.status_code, 200)

        # Adding again should fail as email address is the same
        response = client.post('/', json=member)
        self.assertEqual(response.status_code, 400)
