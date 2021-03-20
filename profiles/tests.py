from django.test import TestCase
from rest_framework.test import APIClient
from .models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user_a = User.objects.create_user(
            username='random', password='random!23')
        self.user_b = User.objects.create_user(
            username='jerry', password='random1@3')

    def get_client(self):
        client = APIClient()
        client.login(username=self.user_a.username, password='random!23')
        return client

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user_a
        second = self.user_b
        # added a follower
        first.profile.followers.add(second)
        second_user_following_whom = second.following.all()
        # from a user, check if other user is being followed
        qs = second_user_following_whom.filter(user=first)
        # new user is following no one
        firts_user_following_no_one = first.following.all()
        self.assertTrue(qs.exists())
        self.assertFalse(firts_user_following_no_one.exists())

    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(
            f'/api/profiles/{self.user_b.username}/follow',
            {'action': 'follow'}
        )
        r_data = response.json()
        count = r_data.get('count')
        self.assertEqual(count, 1)

    def test_unfollow_api_endpoint(self):
        first = self.user_a
        second = self.user_b
        first.profile.followers.add(second)

        client = self.get_client()
        response = client.post(
            f'/api/profiles/{self.user_b.username}/follow',
            {'action': 'unfollow'}
        )
        r_data = response.json()
        count = r_data.get('count')
        self.assertEqual(count, 0)

    def test_can_not_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(
            f'/api/profiles/{self.user_a.username}/follow',
            {'action': 'follow'}
        )
        r_data = response.json()
        count = r_data.get('count')
        self.assertEqual(count, 0)
